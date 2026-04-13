export type PlanTier = "free" | "pro" | "team" | "business" | "enterprise"

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
      "All 20+ models: GPT-4.1, Claude, Gemini, Grok, DeepSeek",
      "300 messages per day",
      "100 pro model messages per day",
      "File & image uploads",
      "Web search",
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
      "1,000 messages per day",
      "500 pro model messages per day",
      "Unlimited file uploads",
      "Custom system prompts",
      "Shared prompt library",
      "Priority support",
    ],
    limits: {
      dailyMessages: 1000,
      dailyProModelMessages: 500,
      fileUploads: -1,
    },
    cta: "Get Team",
  },
  {
    name: "Business",
    tier: "business",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "For power users and growing teams",
    features: [
      "Everything in Team",
      "5,000 messages per day",
      "2,000 pro model messages per day",
      "GPT-4.5 Preview & premium models",
      "API access",
      "Usage analytics dashboard",
      "Custom model routing",
      "Dedicated support channel",
    ],
    limits: {
      dailyMessages: 5000,
      dailyProModelMessages: 2000,
      fileUploads: -1,
    },
    cta: "Get Business",
  },
  {
    name: "Enterprise",
    tier: "enterprise",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    description: "Unlimited power for organizations",
    features: [
      "Everything in Business",
      "Unlimited messages",
      "Unlimited pro model messages",
      "All premium & preview models",
      "SSO & team management",
      "Custom model fine-tuning",
      "SLA guarantee (99.9% uptime)",
      "Dedicated account manager",
      "On-premise deployment option",
    ],
    limits: {
      dailyMessages: -1,
      dailyProModelMessages: -1,
      fileUploads: -1,
    },
    cta: "Contact Sales",
  },
]
