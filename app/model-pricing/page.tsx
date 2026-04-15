"use client"

import Link from "next/link"
import { ZolaFaviconIcon } from "@/components/icons/zola"
import { SignInButton } from "@clerk/nextjs"
import { motion, useInView } from "motion/react"
import { useRef, useState, type ReactNode } from "react"
import { MODEL_CREDIT_RATES, PRICING_PLANS } from "@/lib/pricing"
import OpenAIIcon from "@/components/icons/openai"
import AnthropicIcon from "@/components/icons/anthropic"
import GeminiIcon from "@/components/icons/gemini"
import DeepSeekIcon from "@/components/icons/deepseek"
import GrokIcon from "@/components/icons/grok"
import PerplexityIcon from "@/components/icons/perplexity"
import MetaIcon from "@/components/icons/meta"
import {
  ArrowRight,
  Zap,
  TrendingUp,
  Crown,
} from "lucide-react"

/* ─── Animation helpers ─── */

function FadeIn({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerWrap({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: 0.04 } },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerChild = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

/* ─── Credits calculator ─── */

function CreditsCalculator() {
  const [tokens, setTokens] = useState(1000)
  const [selectedRate, setSelectedRate] = useState(13)

  const credits = Math.ceil(tokens / 1000) * selectedRate
  const proMessages = selectedRate > 0 ? Math.floor(100000 / (Math.ceil(tokens / 1000) * selectedRate)) : Infinity

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/[0.03] sm:p-8">
      <h3 className="mb-6 text-lg font-semibold">Credits Calculator</h3>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Tokens per message
          </label>
          <input
            type="range"
            min={200}
            max={10000}
            step={100}
            value={tokens}
            onChange={(e) => setTokens(Number(e.target.value))}
            className="w-full accent-emerald-500"
          />
          <div className="mt-1 flex justify-between text-xs text-zinc-400">
            <span>200</span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">
              {tokens.toLocaleString()} tokens
            </span>
            <span>10,000</span>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Model
          </label>
          <select
            value={selectedRate}
            onChange={(e) => setSelectedRate(Number(e.target.value))}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-white/10 dark:bg-zinc-900"
          >
            {MODEL_CREDIT_RATES.map((m) => (
              <option key={m.pattern} value={m.rate}>
                {m.label} ({m.rate === 0 ? "Free" : `${m.rate}x`})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl bg-zinc-50 p-4 dark:bg-white/[0.03] sm:grid-cols-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {selectedRate === 0 ? "Free" : credits}
          </div>
          <div className="text-xs text-zinc-500">credits / message</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">
            {selectedRate === 0 ? "∞" : proMessages.toLocaleString()}
          </div>
          <div className="text-xs text-zinc-500">messages on Pro</div>
        </div>
        <div className="col-span-2 text-center sm:col-span-1">
          <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
            {selectedRate === 0
              ? "$0"
              : `$${(credits * (99.9 / 100000)).toFixed(3)}`}
          </div>
          <div className="text-xs text-zinc-500">cost / message (Pro)</div>
        </div>
      </div>
    </div>
  )
}

/* ─── Data ─── */

const MODEL_ICON_MAP: Record<string, (p: React.SVGProps<SVGSVGElement>) => ReactNode> = {
  "gpt-5.4-nano": OpenAIIcon,
  "gpt-5.4-mini": OpenAIIcon,
  "gpt-5.4\"": OpenAIIcon,
  "gpt-5.4-pro": OpenAIIcon,
  "o4-mini": OpenAIIcon,
  "claude-sonnet-4.6": AnthropicIcon,
  "claude-opus-4.6": AnthropicIcon,
  "gemini-3.1-flash-lite": GeminiIcon,
  "gemini-3.1-pro": GeminiIcon,
  "grok-4.1-fast": GrokIcon,
  "grok-4.20": GrokIcon,
  "deepseek-r1:free": DeepSeekIcon,
  "deepseek-v3.2": DeepSeekIcon,
  "sonar-deep-research": PerplexityIcon,
  "sonar-pro": PerplexityIcon,
  "llama-3.3-8b-instruct:free": MetaIcon,
}

function getTierTag(rate: number): {
  label: string
  color: string
  icon: typeof Zap
} {
  if (rate === 0) return { label: "Free", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400", icon: Zap }
  if (rate <= 1) return { label: "Budget", color: "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400", icon: Zap }
  if (rate <= 10) return { label: "Standard", color: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400", icon: TrendingUp }
  if (rate <= 22) return { label: "Premium", color: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400", icon: Crown }
  return { label: "Ultra", color: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400", icon: Crown }
}

// avg ~1000 tokens per message
function estimateMessages(rate: number, credits: number): string {
  if (rate === 0) return "Unlimited"
  const msgs = Math.floor(credits / rate)
  return `~${msgs.toLocaleString()}`
}

const RECOMMENDATIONS = [
  {
    icon: Zap,
    title: "Everyday Tasks",
    subtitle: "Cheap & fast",
    models: ["GPT-5.4 Nano", "DeepSeek V3.2", "Gemini Flash Lite"],
    description: "Quick questions, summaries, translations. Use free and 1x models to stretch your credits.",
    color: "text-emerald-500",
    borderColor: "border-emerald-200 dark:border-emerald-500/20",
  },
  {
    icon: TrendingUp,
    title: "Complex Work",
    subtitle: "Best balance",
    models: ["GPT-5.4", "Claude Sonnet 4.6", "Gemini Pro"],
    description: "Coding, analysis, long-form writing. These 10-13x models offer the best quality-to-cost ratio.",
    color: "text-blue-500",
    borderColor: "border-blue-200 dark:border-blue-500/20",
  },
  {
    icon: Crown,
    title: "Maximum Quality",
    subtitle: "When it matters",
    models: ["Claude Opus 4.6", "GPT-5.4 Pro"],
    description: "Critical code review, deep research, complex reasoning. Reserve for tasks where quality is paramount.",
    color: "text-violet-500",
    borderColor: "border-violet-200 dark:border-violet-500/20",
  },
]

/* ─── Page ─── */

export default function ModelPricingPage() {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white">
      {/* ═══ Nav ═══ */}
      <header className="sticky top-0 z-20 border-b border-zinc-200/50 bg-white/60 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-base font-medium tracking-tight"
          >
            <ZolaFaviconIcon className="size-7" />
            <span className="font-semibold">Notto</span>
            <span className="font-normal opacity-50">AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/pricing"
              className="hidden text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white sm:inline"
            >
              Pricing
            </Link>
            <SignInButton mode="modal">
              <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white">
                Sign In
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-500/25">
                Start Free
              </button>
            </SignInButton>
          </div>
        </div>
      </header>

      {/* ═══ Hero ═══ */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(16,185,129,0.10), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-20 text-center sm:pt-28 lg:px-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-4 py-1.5 dark:border-emerald-500/30 dark:bg-emerald-500/10"
          >
            <span className="text-xs font-semibold tracking-wide text-emerald-600 dark:text-emerald-400">
              Transparent Pricing
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            AI Model Pricing &{" "}
            <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
              Credits Explained
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400"
          >
            Every model has a credit rate. Your message tokens × model rate =
            credits used.{" "}
            <span className="font-medium text-zinc-700 dark:text-zinc-200">
              Simple, predictable, no surprises.
            </span>
          </motion.p>

          {/* Formula */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mx-auto mt-8 inline-flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-4 font-mono text-sm dark:border-white/10 dark:bg-white/[0.03] sm:text-base"
          >
            <span className="text-zinc-400">credits</span>
            <span className="text-zinc-300">=</span>
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">
              ceil(tokens / 1000)
            </span>
            <span className="text-zinc-300">×</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
              model rate
            </span>
          </motion.div>
        </div>
      </section>

      {/* ═══ Quick summary: plans ═══ */}
      <section className="border-y border-zinc-100 bg-zinc-50/60 py-10 dark:border-white/5 dark:bg-zinc-900/50">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-6 px-6 sm:gap-10">
          {PRICING_PLANS.map((plan) => (
            <motion.div
              key={plan.tier}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`text-center ${plan.highlight ? "rounded-xl border-2 border-emerald-500 bg-white px-5 py-3 shadow-sm dark:bg-zinc-900" : ""}`}
            >
              <div className="text-xl font-bold text-zinc-900 dark:text-white">
                {plan.monthlyPrice === 0
                  ? "Free"
                  : `$${plan.monthlyPrice}`}
                {plan.monthlyPrice > 0 && (
                  <span className="text-sm font-normal text-zinc-400">/mo</span>
                )}
              </div>
              <div className="text-sm font-medium text-zinc-500">
                {plan.name}
              </div>
              <div className="text-xs text-zinc-400">
                {plan.credits.toLocaleString()} credits
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ Full pricing table ═══ */}
      <section className="border-b border-zinc-100 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              Complete Breakdown
            </p>
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Every Model, Every Rate
            </h2>
            <p className="mx-auto mb-12 mt-4 max-w-lg text-center text-zinc-500 dark:text-zinc-400">
              Cost per message based on ~1,000 tokens average. Actual usage
              varies by message length.
            </p>
          </FadeIn>

          {/* Table */}
          <FadeIn y={20}>
            <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_8px_40px_rgba(0,0,0,0.05)] dark:border-white/10 dark:shadow-none">
              {/* Header */}
              <div className="hidden grid-cols-12 border-b border-zinc-100 bg-zinc-50/80 px-6 py-3.5 dark:border-white/10 dark:bg-white/[0.03] sm:grid">
                <div className="col-span-4 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Model
                </div>
                <div className="col-span-1 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Rate
                </div>
                <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Credits/msg
                </div>
                <div className="col-span-1 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Tier
                </div>
                <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Free (500)
                </div>
                <div className="col-span-2 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Pro (100K)
                </div>
              </div>
              {/* Rows */}
              <StaggerWrap>
                {[...MODEL_CREDIT_RATES]
                  .sort((a, b) => a.rate - b.rate)
                  .map((model) => {
                    const Icon = MODEL_ICON_MAP[model.pattern]
                    const tier = getTierTag(model.rate)
                    const creditsPerMsg = model.rate === 0 ? 0 : model.rate
                    return (
                      <motion.div
                        key={model.pattern}
                        variants={staggerChild}
                        className="grid grid-cols-1 items-center gap-2 border-b border-zinc-50 px-6 py-4 transition-colors last:border-0 hover:bg-emerald-50/30 dark:border-white/5 dark:hover:bg-white/[0.02] sm:grid-cols-12 sm:gap-0"
                      >
                        {/* Model name + icon */}
                        <div className="col-span-4 flex items-center gap-3">
                          {Icon && <Icon className="h-6 w-6 shrink-0" />}
                          <span className="text-sm font-semibold">
                            {model.label}
                          </span>
                        </div>
                        {/* Rate */}
                        <div className="col-span-1 text-center">
                          <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">
                            {model.rate === 0 ? "Free" : `${model.rate}x`}
                          </span>
                        </div>
                        {/* Credits per message */}
                        <div className="col-span-2 text-center">
                          <span className="text-sm text-zinc-600 dark:text-zinc-300">
                            {creditsPerMsg === 0
                              ? "0"
                              : creditsPerMsg}
                          </span>
                        </div>
                        {/* Tier tag */}
                        <div className="col-span-1 text-center">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tier.color}`}
                          >
                            {tier.label}
                          </span>
                        </div>
                        {/* Free plan messages */}
                        <div className="col-span-2 text-center">
                          <span className="text-sm text-zinc-500">
                            {estimateMessages(model.rate, 500)}
                          </span>
                        </div>
                        {/* Pro plan messages */}
                        <div className="col-span-2 text-center">
                          <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                            {estimateMessages(model.rate, 100000)}
                          </span>
                        </div>
                      </motion.div>
                    )
                  })}
              </StaggerWrap>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-zinc-400">
              * Messages estimated at ~1,000 tokens each. Actual token usage
              varies by message length, context, and model response. Free models
              never consume credits.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Calculator ═══ */}
      <section className="border-b border-zinc-100 bg-zinc-50/50 dark:border-white/5 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Interactive
            </p>
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Estimate Your Usage
            </h2>
          </FadeIn>
          <FadeIn y={20}>
            <div className="mx-auto max-w-2xl">
              <CreditsCalculator />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Recommendations ═══ */}
      <section className="border-b border-zinc-100 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
              Which Model Should You Use?
            </p>
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
              Pick the Right Model for the Job
            </h2>
          </FadeIn>
          <StaggerWrap className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3">
            {RECOMMENDATIONS.map((rec) => {
              const Icon = rec.icon
              return (
                <motion.div
                  key={rec.title}
                  variants={staggerChild}
                  whileHover={{ y: -4 }}
                  className={`group rounded-2xl border bg-white p-7 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] dark:bg-white/[0.02] dark:shadow-none dark:hover:bg-white/[0.04] ${rec.borderColor}`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <Icon className={`h-6 w-6 ${rec.color}`} strokeWidth={2} />
                    <div>
                      <h3 className="text-base font-semibold">{rec.title}</h3>
                      <p className="text-xs text-zinc-400">{rec.subtitle}</p>
                    </div>
                  </div>
                  <p className="mb-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {rec.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {rec.models.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </StaggerWrap>
        </div>
      </section>

      {/* ═══ Bottom line ═══ */}
      <section className="border-b border-zinc-100 bg-zinc-50/50 dark:border-white/5 dark:bg-zinc-900/30">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <FadeIn>
            <div className="mx-auto max-w-3xl rounded-2xl border border-emerald-200 bg-emerald-50/50 p-8 text-center dark:border-emerald-500/20 dark:bg-emerald-500/5">
              <p className="text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl">
                $19.90/mo = 200–5,000+ messages
              </p>
              <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                depending on which models you use. Mix free and premium models to
                maximize your credits.
              </p>
              <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                Pro at $99.90/mo = up to 100,000+ messages with free models, or
                ~410 with Claude Sonnet
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(16,185,129,0.08), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 py-24 text-center lg:px-12">
          <FadeIn>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Try It Free — 500 Credits Included
            </h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-zinc-500 dark:text-zinc-400">
              No credit card required. Start chatting with every AI model today.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SignInButton mode="modal">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-zinc-900 px-8 py-4 text-base font-semibold text-white shadow-xl shadow-zinc-900/20 dark:bg-white dark:text-zinc-900 dark:shadow-white/10"
                >
                  <span className="relative z-10">
                    Start Chatting Free
                  </span>
                  <ArrowRight className="relative z-10 h-4 w-4" />
                  <span className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald-600 to-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-emerald-400 dark:to-emerald-500" />
                </motion.button>
              </SignInButton>
              <Link
                href="/pricing"
                className="inline-flex items-center rounded-full border border-zinc-200 bg-white/60 px-8 py-4 text-base font-medium text-zinc-700 backdrop-blur-sm transition-all hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-zinc-300 dark:hover:bg-white/10"
              >
                Compare Plans
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="border-t border-zinc-100 bg-zinc-50 dark:border-white/5 dark:bg-zinc-950">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-12">
          <div className="flex items-center gap-2">
            <ZolaFaviconIcon className="size-5" />
            <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
              © 2026 NottoAI
            </span>
          </div>
          <div className="flex gap-6">
            <Link
              href="/pricing"
              className="text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              Pricing
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              Terms
            </Link>
            <a
              href="mailto:contact@nottoai.com"
              className="text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
