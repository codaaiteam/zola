import { createClient } from "@/lib/supabase/client"
import { isSupabaseEnabled } from "@/lib/supabase/config"
import type { Message as MessageAISDK } from "ai"
import { readFromIndexedDB, writeToIndexedDB } from "../persist"

export interface ExtendedMessageAISDK extends MessageAISDK {
  message_group_id?: string
  model?: string
}

type RawMessage = {
  id: string | number
  content: string | null
  role: string
  experimental_attachments: unknown
  created_at: string | null
  parts: unknown
  message_group_id: string | null
  model: string | null
}

function mapRawMessage(message: RawMessage): MessageAISDK {
  return {
    ...message,
    id: String(message.id),
    role: message.role as MessageAISDK["role"],
    content: message.content ?? "",
    createdAt: new Date(message.created_at || ""),
    parts: (message?.parts as MessageAISDK["parts"]) || undefined,
    experimental_attachments:
      message.experimental_attachments as MessageAISDK["experimental_attachments"],
  } as MessageAISDK
}

async function fetchMessagesFromApi(
  chatId: string,
  limit?: number
): Promise<MessageAISDK[] | null> {
  try {
    const url = new URL("/api/messages", window.location.origin)
    url.searchParams.set("chatId", chatId)
    if (limit && limit > 0) url.searchParams.set("limit", String(limit))
    const res = await fetch(url.toString(), { credentials: "include" })
    if (!res.ok) return null
    const data = (await res.json()) as { messages?: RawMessage[] }
    return (data.messages ?? []).map(mapRawMessage)
  } catch (err) {
    console.error("Failed to fetch messages from API:", err)
    return null
  }
}

export async function getMessagesFromDb(
  chatId: string
): Promise<MessageAISDK[]> {
  // fallback to local cache only
  if (!isSupabaseEnabled) {
    const cached = await getCachedMessages(chatId)
    return cached
  }

  const fromApi = await fetchMessagesFromApi(chatId)
  return fromApi ?? []
}

export async function getLastMessagesFromDb(
  chatId: string,
  limit: number = 2
): Promise<MessageAISDK[]> {
  if (!isSupabaseEnabled) {
    const cached = await getCachedMessages(chatId)
    return cached.slice(-limit)
  }

  const fromApi = await fetchMessagesFromApi(chatId, limit)
  return fromApi ?? []
}

async function insertMessageToDb(
  chatId: string,
  message: ExtendedMessageAISDK
) {
  const supabase = createClient()
  if (!supabase) return

  await supabase.from("messages").insert({
    chat_id: chatId,
    role: message.role,
    content: message.content,
    experimental_attachments: message.experimental_attachments,
    created_at: message.createdAt?.toISOString() || new Date().toISOString(),
    message_group_id: message.message_group_id || null,
    model: message.model || null,
  })
}

async function insertMessagesToDb(
  chatId: string,
  messages: ExtendedMessageAISDK[]
) {
  const supabase = createClient()
  if (!supabase) return

  const payload = messages.map((message) => ({
    chat_id: chatId,
    role: message.role,
    content: message.content,
    experimental_attachments: message.experimental_attachments,
    created_at: message.createdAt?.toISOString() || new Date().toISOString(),
    message_group_id: message.message_group_id || null,
    model: message.model || null,
  }))

  await supabase.from("messages").insert(payload)
}

async function deleteMessagesFromDb(chatId: string) {
  const supabase = createClient()
  if (!supabase) return

  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("chat_id", chatId)

  if (error) {
    console.error("Failed to clear messages from database:", error)
  }
}

type ChatMessageEntry = {
  id: string
  messages: MessageAISDK[]
}

export async function getCachedMessages(
  chatId: string
): Promise<MessageAISDK[]> {
  const entry = await readFromIndexedDB<ChatMessageEntry>("messages", chatId)

  if (!entry || Array.isArray(entry)) return []

  return (entry.messages || []).sort(
    (a, b) => +new Date(a.createdAt || 0) - +new Date(b.createdAt || 0)
  )
}

export async function cacheMessages(
  chatId: string,
  messages: MessageAISDK[]
): Promise<void> {
  await writeToIndexedDB("messages", { id: chatId, messages })
}

export async function addMessage(
  chatId: string,
  message: MessageAISDK
): Promise<void> {
  await insertMessageToDb(chatId, message)
  const current = await getCachedMessages(chatId)
  const updated = [...current, message]

  await writeToIndexedDB("messages", { id: chatId, messages: updated })
}

export async function setMessages(
  chatId: string,
  messages: MessageAISDK[]
): Promise<void> {
  await insertMessagesToDb(chatId, messages)
  await writeToIndexedDB("messages", { id: chatId, messages })
}

export async function clearMessagesCache(chatId: string): Promise<void> {
  await writeToIndexedDB("messages", { id: chatId, messages: [] })
}

export async function clearMessagesForChat(chatId: string): Promise<void> {
  await deleteMessagesFromDb(chatId)
  await clearMessagesCache(chatId)
}
