export type PlanTier = "free" | "pro" | "team"

export interface PricingPlan {
  name: string
  tier: PlanTier
  monthlyPrice: number
  yearlyPrice: number
  description: string
  features: string[]
  limits: {
    dailyMessages: number
    dailyProModelMessages: number
    fileUploads: number
  }
  highlight?: boolean
  cta: string
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    tier: "free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Get started with lightweight models",
    features: [
      "GPT-4.1 Nano, DeepSeek R1 Free, Llama 3.3",
      "10 messages per day",
      "Basic chat features",
      "Conversation history",
    ],
    limits: {
      dailyMessages: 10,
      dailyProModelMessages: 0,
      fileUploads: 0,
    },
    cta: "Get Started",
  },
  {
    name: "Pro",
    tier: "pro",
    monthlyPrice: 9.9,
    yearlyPrice: 99,
    description: "Full access to all AI models",
    features: [
      "All models: GPT-4o, Claude 3.5, Gemini, Grok, DeepSeek",
      "300 messages per day",
      "100 pro model messages per day",
      "File & image uploads",
      "Web search",
      "BYOK support",
      "Priority response speed",
    ],
    limits: {
      dailyMessages: 300,
      dailyProModelMessages: 100,
      fileUploads: 20,
    },
    highlight: true,
    cta: "Upgrade to Pro",
  },
  {
    name: "Team",
    tier: "team",
    monthlyPrice: 24.9,
    yearlyPrice: 249,
    description: "For teams that need more power",
    features: [
      "Everything in Pro",
      "1000 messages per day",
      "500 pro model messages per day",
      "Unlimited file uploads",
      "Custom system prompts",
      "Shared prompt library",
      "Usage analytics",
      "Priority support",
    ],
    limits: {
      dailyMessages: 1000,
      dailyProModelMessages: 500,
      fileUploads: -1, // unlimited
    },
    cta: "Contact Us",
  },
]
