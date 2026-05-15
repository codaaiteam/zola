import { SYSTEM_PROMPT_DEFAULT } from "@/lib/config"
import { getAllModels } from "@/lib/models"
import { getProviderForModel } from "@/lib/openproviders/provider-map"
import type { ProviderWithoutOllama } from "@/lib/user-keys"
import { Attachment } from "@ai-sdk/ui-utils"
import { Message as MessageAISDK, streamText, ToolSet } from "ai"
import {
  incrementMessageCount,
  logUserMessage,
  storeAssistantMessage,
  validateAndTrackUsage,
} from "./api"
import { deductCredits } from "@/lib/usage"
import { createErrorResponse, extractErrorMessage } from "./utils"

export const maxDuration = 60

type ChatRequest = {
  messages: MessageAISDK[]
  chatId: string
  userId: string
  model: string
  isAuthenticated: boolean
  systemPrompt: string
  enableSearch: boolean
  message_group_id?: string
  editCutoffTimestamp?: string
  skipUserMessageLog?: boolean
}

export async function POST(req: Request) {
  try {
    const {
      messages,
      chatId,
      userId,
      model,
      isAuthenticated,
      systemPrompt,
      enableSearch,
      message_group_id,
      editCutoffTimestamp,
      skipUserMessageLog,
    } = (await req.json()) as ChatRequest

    if (!messages || !chatId || !userId) {
      return new Response(
        JSON.stringify({ error: "Error, missing information" }),
        { status: 400 }
      )
    }

    const supabase = await validateAndTrackUsage({
      userId,
      model,
      isAuthenticated,
    })

    // Increment message count
    if (supabase) {
      await incrementMessageCount({ supabase, userId })
    }

    const userMessage = messages[messages.length - 1]

    // If editing, delete messages from cutoff BEFORE saving the new user message
    if (supabase && editCutoffTimestamp) {
      try {
        await supabase
          .from("messages")
          .delete()
          .eq("chat_id", chatId)
          .gte("created_at", editCutoffTimestamp)
      } catch (err) {
        console.error("Failed to delete messages from cutoff:", err)
      }
    }

    if (supabase && userMessage?.role === "user" && !skipUserMessageLog) {
      await logUserMessage({
        supabase,
        userId,
        chatId,
        content: userMessage.content,
        attachments: userMessage.experimental_attachments as Attachment[],
        model,
        isAuthenticated,
        message_group_id,
      })
    }

    const allModels = await getAllModels()
    const modelConfig = allModels.find((m) => m.id === model)

    if (!modelConfig || !modelConfig.apiSdk) {
      throw new Error(`Model ${model} not found`)
    }

    const today = new Date().toISOString().slice(0, 10)
    const identityFooter = `

---
Identity & freshness:
- You are NottoAI. NottoAI is a multi-model chat app that routes to many underlying LLMs (OpenAI, Anthropic, Google, DeepSeek, xAI, Meta, etc.) via OpenRouter. If asked "what model are you?", answer truthfully that you are running on the model the user selected (you do not always know which one). Do not claim to be GPT, Claude, Gemini, or any other specific brand unless you are absolutely certain.
- Today's date is ${today}. Use this as ground truth for "what year is it / what's today's date" type questions.
- Do NOT invent a specific knowledge cutoff date (no "my training data ends in April 2023" style answers). If your built-in knowledge of a topic feels stale, say so honestly and suggest the user toggle web search if they need fresh info — but never guess the exact cutoff month.`
    const effectiveSystemPrompt =
      (systemPrompt || SYSTEM_PROMPT_DEFAULT) + identityFooter

    let apiKey: string | undefined
    if (isAuthenticated && userId) {
      const { getEffectiveApiKey } = await import("@/lib/user-keys")
      const provider = getProviderForModel(model)
      apiKey =
        (await getEffectiveApiKey(userId, provider as ProviderWithoutOllama)) ||
        undefined
    }

    const result = streamText({
      model: modelConfig.apiSdk(apiKey, { enableSearch }),
      system: effectiveSystemPrompt,
      messages: messages,
      tools: {} as ToolSet,
      maxSteps: 10,
      onError: (err: unknown) => {
        console.error("Streaming error occurred:", err)
        // Don't set streamError anymore - let the AI SDK handle it through the stream
      },

      onFinish: async ({ response, usage }) => {
        if (supabase) {
          await storeAssistantMessage({
            supabase,
            chatId,
            messages:
              response.messages as unknown as import("@/app/types/api.types").Message[],
            message_group_id,
            model,
          })

          // Deduct credits based on actual token usage
          // Fall back to estimate (~1000 tokens) if provider doesn't report usage
          const tokens = usage?.totalTokens || 1000
          try {
            await deductCredits(supabase, userId, model, tokens, chatId)
          } catch (err) {
            console.error("Failed to deduct credits:", err)
          }
        }
      },
    })

    return result.toDataStreamResponse({
      sendReasoning: true,
      sendSources: true,
      getErrorMessage: (error: unknown) => {
        console.error("Error forwarded to client:", error)
        return extractErrorMessage(error)
      },
    })
  } catch (err: unknown) {
    console.error("Error in /api/chat:", err)
    const error = err as {
      code?: string
      message?: string
      statusCode?: number
    }

    return createErrorResponse(error)
  }
}
