import {
  BookOpenText,
  Brain,
  Code,
  Lightbulb,
  Notepad,
  PaintBrush,
  Sparkle,
} from "@phosphor-icons/react/dist/ssr"

export const NON_AUTH_DAILY_MESSAGE_LIMIT = 5
export const AUTH_DAILY_MESSAGE_LIMIT = 1000
export const REMAINING_QUERY_ALERT_THRESHOLD = 2
export const DAILY_FILE_UPLOAD_LIMIT = 5
export const DAILY_LIMIT_PRO_MODELS = 500

export const NON_AUTH_ALLOWED_MODELS = ["openrouter:openai/gpt-5.4-nano"]

export const FREE_MODELS_IDS = [
  "openrouter:meta-llama/llama-3.3-70b-instruct:free",
  "openrouter:openai/gpt-5.4-nano",
]

// Models available to free-tier users (credits still get charged normally).
// Cutoff: credit rate <= 5. Premium models (GPT-5.5, Claude, Gemini Pro,
// Sonar Pro, GPT-5.4, GPT-4o, Grok 4.20, etc.) require a paid plan.
export const FREE_TIER_ALLOWED_MODELS = [
  // free / rate 0
  "openrouter:meta-llama/llama-3.3-70b-instruct:free",
  // rate 1 — ultra-cheap
  "openrouter:openai/gpt-5.4-nano",
  "openrouter:openai/gpt-4o-mini",
  "openrouter:google/gemini-3.1-flash-lite-preview",
  "openrouter:x-ai/grok-4.1-fast",
  "openrouter:deepseek/deepseek-v3.2",
  "openrouter:deepseek/deepseek-v4-flash",
  // rate 2
  "openrouter:deepseek/deepseek-r1",
  "openrouter:deepseek/deepseek-v4-pro",
  // rate 4-5
  "openrouter:openai/gpt-5.4-mini",
  "openrouter:openai/o4-mini",
]

export const MODEL_DEFAULT = "openrouter:openai/gpt-5.4-nano"

export const APP_NAME = "NottoAI"
export const APP_DOMAIN = "https://nottoai.com"

export const SUGGESTIONS = [
  {
    label: "Summary",
    highlight: "Summarize",
    prompt: `Summarize`,
    items: [
      "Summarize the French Revolution",
      "Summarize the plot of Inception",
      "Summarize World War II in 5 sentences",
      "Summarize the benefits of meditation",
    ],
    icon: Notepad,
  },
  {
    label: "Code",
    highlight: "Help me",
    prompt: `Help me`,
    items: [
      "Help me write a function to reverse a string in JavaScript",
      "Help me create a responsive navbar in HTML/CSS",
      "Help me write a SQL query to find duplicate emails",
      "Help me convert this Python function to JavaScript",
    ],
    icon: Code,
  },
  {
    label: "Design",
    highlight: "Design",
    prompt: `Design`,
    items: [
      "Design a color palette for a tech blog",
      "Design a UX checklist for mobile apps",
      "Design 5 great font pairings for a landing page",
      "Design better CTAs with useful tips",
    ],
    icon: PaintBrush,
  },
  {
    label: "Research",
    highlight: "Research",
    prompt: `Research`,
    items: [
      "Research the pros and cons of remote work",
      "Research the differences between Apple Vision Pro and Meta Quest",
      "Research best practices for password security",
      "Research the latest trends in renewable energy",
    ],
    icon: BookOpenText,
  },
  {
    label: "Get inspired",
    highlight: "Inspire me",
    prompt: `Inspire me`,
    items: [
      "Inspire me with a beautiful quote about creativity",
      "Inspire me with a writing prompt about solitude",
      "Inspire me with a poetic way to start a newsletter",
      "Inspire me by describing a peaceful morning in nature",
    ],
    icon: Sparkle,
  },
  {
    label: "Think deeply",
    highlight: "Reflect on",
    prompt: `Reflect on`,
    items: [
      "Reflect on why we fear uncertainty",
      "Reflect on what makes a conversation meaningful",
      "Reflect on the concept of time in a simple way",
      "Reflect on what it means to live intentionally",
    ],
    icon: Brain,
  },
  {
    label: "Learn gently",
    highlight: "Explain",
    prompt: `Explain`,
    items: [
      "Explain quantum physics like I'm 10",
      "Explain stoicism in simple terms",
      "Explain how a neural network works",
      "Explain the difference between AI and AGI",
    ],
    icon: Lightbulb,
  },
]

export const SYSTEM_PROMPT_DEFAULT = `You are NottoAI, a helpful and thoughtful AI assistant.

Match response length to the question:
- Short, direct answers for quick questions, factual lookups, and small talk.
- Step-by-step, well-formatted responses for technical, conceptual, or open-ended questions — use headings, bullet lists, and fenced code blocks when they aid scanning.
- For complex topics, give the full answer the user needs without truncating; do not artificially shorten when depth is genuinely required.

Be direct, accurate, and grounded. If you are uncertain, say so. If a question is ambiguous, ask one clarifying question rather than guessing. Avoid filler, throat-clearing, and disclaimers that don't add information.`

export const MESSAGE_MAX_LENGTH = 10000
