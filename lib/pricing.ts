export type PlanTier = "free" | "pro" | "team" | "business" | "enterprise"

export interface PricingPlan {
  name: string
  tier: PlanTier
  monthlyPrice: number
  yearlyPrice: number
  description: string
  features: string[]
  credits: number
  highlight?: boolean
  cta: string
}

// 1 credit = 1,000 tokens. Different models consume credits at different rates.
export const MODEL_CREDIT_RATES: { pattern: string; rate: number; label: string }[] = [
  { pattern: "deepseek-r1:free", rate: 0, label: "DeepSeek R1 (Free)" },
  { pattern: "llama-3.3-8b-instruct:free", rate: 0, label: "Llama 3.3 8B (Free)" },
  { pattern: "gpt-5.4-nano", rate: 1, label: "GPT-5.4 Nano" },
  { pattern: "gemini-3.1-flash-lite", rate: 1, label: "Gemini 3.1 Flash Lite" },
  { pattern: "grok-4.1-fast", rate: 1, label: "Grok 4.1 Fast" },
  { pattern: "deepseek-v3.2", rate: 1, label: "DeepSeek V3.2" },
  { pattern: "gpt-5.4-mini", rate: 4, label: "GPT-5.4 Mini" },
  { pattern: "o4-mini", rate: 5, label: "O4 Mini" },
  { pattern: "grok-4.20", rate: 6, label: "Grok 4.20" },
  { pattern: "gemini-3.1-pro", rate: 10, label: "Gemini 3.1 Pro" },
  { pattern: "sonar-deep-research", rate: 8, label: "Perplexity Deep Research" },
  { pattern: "sonar-pro", rate: 13, label: "Perplexity Sonar Pro" },
  { pattern: "gpt-5.4\"", rate: 13, label: "GPT-5.4" },
  { pattern: "claude-sonnet-4.6", rate: 13, label: "Claude Sonnet 4.6" },
  { pattern: "claude-opus-4.6", rate: 22, label: "Claude Opus 4.6" },
  { pattern: "gpt-5.4-pro", rate: 150, label: "GPT-5.4 Pro" },
]

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    tier: "free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "For testing only",
    features: [
      "GPT-5.4 Nano & free models",
      "500 credits / month",
      "Basic chat features",
    ],
    credits: 500,
    cta: "Try Free",
  },
  {
    name: "Pro",
    tier: "pro",
    monthlyPrice: 9.9,
    yearlyPrice: 99,
    description: "Full access to all AI models",
    features: [
      "GPT-5.4, Claude, Gemini & 16+ models",
      "8,000 credits / month (~5,000+ messages)",
      "File & image uploads",
      "Web search",
      "Priority response speed",
    ],
    credits: 8000,
    highlight: true,
    cta: "Unlock All Models",
  },
  {
    name: "Team",
    tier: "team",
    monthlyPrice: 24.9,
    yearlyPrice: 249,
    description: "For teams that need more power",
    features: [
      "Everything in Pro",
      "22,000 credits / month",
      "Unlimited file uploads",
      "Custom system prompts",
      "Shared prompt library",
    ],
    credits: 22000,
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
      "100,000 credits / month",
      "GPT-5.4 Pro & premium models",
      "API access",
      "Usage analytics dashboard",
      "Dedicated support",
    ],
    credits: 100000,
    cta: "Get Business",
  },
  {
    name: "Enterprise",
    tier: "enterprise",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    description: "Maximum power for organizations",
    features: [
      "Everything in Business",
      "210,000 credits / month",
      "All premium models",
      "SSO & team management",
      "SLA guarantee (99.9%)",
      "Dedicated account manager",
    ],
    credits: 210000,
    cta: "Contact Sales",
  },
]
