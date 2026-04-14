export type PlanTier = "free" | "basic" | "pro" | "enterprise"

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

/** Returns the credit cost for a given model ID, defaults to 1 */
export function getModelCreditCost(modelId: string): number {
  const entry = MODEL_CREDIT_RATES.find((r) => modelId.includes(r.pattern.replace(/"/g, "")))
  return entry?.rate ?? 1
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    tier: "free",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Try basic models",
    features: [
      "GPT-5.4 Nano & free models",
      "500 credits / month",
      "Basic chat",
    ],
    credits: 500,
    cta: "Get Started",
  },
  {
    name: "Basic",
    tier: "basic",
    monthlyPrice: 19.9,
    yearlyPrice: 199,
    description: "For regular use",
    features: [
      "Access most models",
      "15,000 credits / month",
      "File uploads",
      "Conversation history",
    ],
    credits: 15000,
    cta: "Get Basic",
  },
  {
    name: "Pro",
    tier: "pro",
    monthlyPrice: 99.9,
    yearlyPrice: 999,
    description: "Best value for power users",
    features: [
      "All premium models (GPT-5.4, Claude, Gemini)",
      "100,000 credits / month",
      "Priority response speed",
      "Web search",
      "Best cost per message",
    ],
    credits: 100000,
    highlight: true,
    cta: "Unlock All Models",
  },
  {
    name: "Enterprise",
    tier: "enterprise",
    monthlyPrice: 199.9,
    yearlyPrice: 1999,
    description: "For heavy usage & teams",
    features: [
      "Everything in Pro",
      "210,000 credits / month",
      "Dedicated support",
      "API access",
      "SSO & team management",
    ],
    credits: 210000,
    cta: "Contact Sales",
  },
]
