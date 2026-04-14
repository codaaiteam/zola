"use client"

import Link from "next/link"
import { ZolaFaviconIcon } from "@/components/icons/zola"
import { SignInButton } from "@clerk/nextjs"
import { motion, useInView } from "motion/react"
import { useRef, type ReactNode } from "react"
import {
  Zap,
  KeyRound,
  Globe,
  FileUp,
  MessageSquareText,
  ArrowLeftRight,
} from "lucide-react"
import OpenAIIcon from "@/components/icons/openai"
import AnthropicIcon from "@/components/icons/anthropic"
import GeminiIcon from "@/components/icons/gemini"
import DeepSeekIcon from "@/components/icons/deepseek"
import GrokIcon from "@/components/icons/grok"
import PerplexityIcon from "@/components/icons/perplexity"
import XaiIcon from "@/components/icons/xai"
import MetaIcon from "@/components/icons/meta"

const MODEL_LOGOS = [
  { icon: OpenAIIcon, name: "OpenAI", label: "GPT-5.4" },
  { icon: AnthropicIcon, name: "Anthropic", label: "Claude" },
  { icon: GeminiIcon, name: "Google", label: "Gemini" },
  { icon: DeepSeekIcon, name: "DeepSeek", label: "DeepSeek" },
  { icon: GrokIcon, name: "xAI", label: "Grok" },
  { icon: PerplexityIcon, name: "Perplexity", label: "Perplexity" },
  { icon: MetaIcon, name: "Meta", label: "Llama" },
]

const WHY_BETTER = [
  {
    us: "All 16+ models in one place",
    them: "One model per $20/mo subscription",
  },
  {
    us: "Switch models mid-conversation",
    them: "Copy-paste between tabs",
  },
  {
    us: "Compare answers from different AIs",
    them: "Guess which AI is better",
  },
  {
    us: "One bill, all models included",
    them: "4+ separate subscriptions",
  },
]

const STEPS = [
  {
    num: "1",
    title: "Ask anything",
    desc: "Type your question like you normally would. NottoAI works with every AI model.",
  },
  {
    num: "2",
    title: "Switch models instantly",
    desc: "Try GPT-5.4, then Claude, then Gemini — one click to switch. Same conversation.",
  },
  {
    num: "3",
    title: "Get better answers",
    desc: "Different models excel at different tasks. Use the best one for each question.",
  },
]

const FEATURES = [
  {
    icon: Zap,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "All Models, One Price",
    description:
      "GPT-5.4, Claude, Gemini, Grok, DeepSeek — switch between 16+ models without separate subscriptions.",
  },
  {
    icon: KeyRound,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "Bring Your Own Keys",
    description:
      "Use your own API keys for complete control and privacy. Your keys are encrypted and never stored in plain text.",
  },
  {
    icon: Globe,
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
    title: "Web Search Built In",
    description:
      "Get real-time answers with integrated web search. No copy-pasting between tabs.",
  },
  {
    icon: FileUp,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "File Uploads",
    description:
      "Upload images, PDFs, and documents. Analyze, summarize, or ask questions about any file.",
  },
  {
    icon: MessageSquareText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Conversation History",
    description:
      "All your chats are saved and searchable. Pick up where you left off, across any model.",
  },
  {
    icon: ArrowLeftRight,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    title: "Switch Models Mid-Chat",
    description:
      "Start with GPT, continue with Claude, compare with Gemini — all in the same thread.",
  },
]

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
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function StaggerChildren({
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
        visible: { transition: { staggerChildren: 0.1 } },
        hidden: {},
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
}

export function LandingPage() {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white text-zinc-900">
      {/* Nav */}
      <header className="sticky top-0 z-10 border-b border-zinc-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-base font-medium tracking-tight"
          >
            <ZolaFaviconIcon className="size-7" />
            <span className="font-medium">Notto</span>
            <span className="font-normal opacity-60">AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/pricing"
              className="hidden text-sm text-zinc-500 transition-colors hover:text-zinc-900 sm:inline"
            >
              Pricing
            </Link>
            <SignInButton mode="modal">
              <button className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50">
                Sign In
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600">
                Get Started Free
              </button>
            </SignInButton>
          </div>
        </div>
      </header>

      {/* Hero — gradient bg */}
      <section className="bg-gradient-to-b from-white to-[#f8faf9]">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-20 text-center sm:pt-28 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-emerald-700">
              16+ AI Models — One Subscription
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mx-auto max-w-5xl text-5xl font-bold leading-[1.08] tracking-tight text-zinc-900 sm:text-7xl"
          >
            Use GPT-5.4, Claude & Gemini
            <br />
            <span className="text-emerald-500">in One Chat</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-500 sm:text-xl"
          >
            <span className="font-semibold text-zinc-800">Pay once. Use every AI model.</span>
            <br />
            <span className="font-medium text-emerald-600">Save $50+ every month</span>{" "}
            vs paying for each tool separately.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/30"
              >
                Start Using All Models Now
                <span>→</span>
              </motion.button>
            </SignInButton>
            <Link
              href="/pricing"
              className="inline-flex items-center rounded-xl border border-zinc-200 px-8 py-4 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              View Pricing
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-5 flex flex-col items-center gap-2"
          >
            <p className="text-sm text-zinc-400">
              No credit card required · 500 free credits included
            </p>
            <p className="text-xs font-medium text-zinc-500">
              Join 10,000+ users saving $50+/month
            </p>
          </motion.div>
        </div>
      </section>

      {/* Model logos */}
      <section className="border-y border-zinc-100 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-zinc-400">
            Powered by the best AI models
          </p>
          <StaggerChildren className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {MODEL_LOGOS.map(({ icon: Icon, name, label }) => (
              <motion.div
                key={name}
                variants={staggerItem}
                whileHover={{ scale: 1.1, y: -4 }}
                className="group flex flex-col items-center gap-2"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm transition-all group-hover:border-emerald-300 group-hover:bg-emerald-50 group-hover:shadow-md">
                  <Icon className="h-8 w-8" />
                </div>
                <span className="text-xs font-medium text-zinc-500 transition-colors group-hover:text-emerald-600">
                  {label}
                </span>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gradient-to-b from-white to-zinc-50/50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn>
            <h2 className="mb-4 text-center text-4xl font-bold tracking-tight sm:text-5xl">
              How It Works
            </h2>
            <p className="mx-auto mb-16 max-w-xl text-center text-lg text-zinc-500">
              Three steps to better AI answers
            </p>
          </FadeIn>

          <StaggerChildren className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {STEPS.map((step) => (
              <motion.div key={step.num} variants={staggerItem} className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-2xl font-bold text-white shadow-lg shadow-emerald-500/20"
                >
                  {step.num}
                </motion.div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Chat mockup */}
      <section className="border-t border-zinc-100 bg-zinc-50/50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <FadeIn y={40}>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_10px_60px_rgba(0,0,0,0.08)]">
            <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
              <span className="ml-4 text-xs text-zinc-400">NottoAI</span>
            </div>
            <div className="flex flex-col gap-5 p-6 sm:p-10">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
                  U
                </div>
                <div className="rounded-2xl rounded-tl-md bg-zinc-100 px-4 py-3">
                  <p className="text-sm text-zinc-700">
                    Compare the pros and cons of React vs Vue for a new project
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900">
                  <OpenAIIcon className="h-4 w-4 invert" />
                </div>
                <div className="max-w-xl rounded-2xl rounded-tl-md border border-zinc-100 bg-white px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  <p className="text-sm leading-relaxed text-zinc-600">
                    Here&apos;s a comparison of React vs Vue for a new project:
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-blue-50 p-3">
                      <p className="text-xs font-semibold text-blue-700">
                        React
                      </p>
                      <p className="mt-1 text-xs text-blue-600">
                        Larger ecosystem, more jobs, JSX flexibility
                      </p>
                    </div>
                    <div className="rounded-lg bg-green-50 p-3">
                      <p className="text-xs font-semibold text-green-700">
                        Vue
                      </p>
                      <p className="mt-1 text-xs text-green-600">
                        Easier learning curve, built-in state management
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                {MODEL_LOGOS.slice(0, 5).map(({ icon: Icon, label }, i) => (
                  <div
                    key={label}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      i === 0
                        ? "border-2 border-emerald-500 bg-emerald-50 text-emerald-700"
                        : "border border-zinc-200 bg-white text-zinc-500 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </div>
                ))}
                <span className="rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs text-zinc-400">
                  +11 more
                </span>
              </div>
            </div>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* Why NottoAI > ChatGPT */}
      <section className="border-t border-zinc-100">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn>
            <h2 className="mb-4 text-center text-4xl font-bold tracking-tight sm:text-5xl">
              Why NottoAI is Better
              <br className="hidden sm:block" />{" "}
              <span className="text-emerald-500">Than ChatGPT</span>
            </h2>
            <p className="mx-auto mb-16 max-w-xl text-center text-lg text-zinc-500">
              ChatGPT gives you one model. We give you all of them.
            </p>
          </FadeIn>

          <FadeIn y={20}>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
            {/* Table header */}
            <div className="grid grid-cols-2 border-b border-zinc-100 bg-zinc-50">
              <div className="px-6 py-4 text-sm font-semibold text-emerald-600">
                ✓ NottoAI
              </div>
              <div className="border-l border-zinc-100 px-6 py-4 text-sm font-semibold text-zinc-400">
                ✕ Individual Subscriptions
              </div>
            </div>
            {/* Table rows */}
            {WHY_BETTER.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-2 border-b border-zinc-50 last:border-0 transition-colors hover:bg-emerald-50/30"
              >
                <div className="flex items-center gap-2 px-6 py-4">
                  <span className="text-emerald-500">✓</span>
                  <span className="text-sm font-medium text-zinc-700">
                    {row.us}
                  </span>
                </div>
                <div className="flex items-center gap-2 border-l border-zinc-100 px-6 py-4">
                  <span className="text-red-400">✕</span>
                  <span className="text-sm text-zinc-400">{row.them}</span>
                </div>
              </div>
            ))}
          </div>
          </FadeIn>
        </div>
      </section>

      {/* Features grid */}
      <section className="border-t border-zinc-100 bg-gradient-to-b from-zinc-50/50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn>
            <div className="mb-16 text-center">
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Everything You Need
              </h2>
              <p className="mt-4 text-lg text-zinc-500">
                Built for people who use AI every day
              </p>
            </div>
          </FadeIn>

          <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feat) => {
              const Icon = feat.icon
              return (
              <motion.div
                variants={staggerItem}
                key={feat.title}
                className="group rounded-2xl border border-zinc-200 bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all hover:border-emerald-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${feat.iconBg} group-hover:bg-emerald-50`}
                >
                  <Icon className={`h-5 w-5 ${feat.iconColor} group-hover:text-emerald-600`} strokeWidth={2} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {feat.description}
                </p>
              </motion.div>
              )
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* Comparison */}
      <section className="border-t border-zinc-100">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn>
            <h2 className="mb-4 text-center text-4xl font-bold tracking-tight sm:text-5xl">
              Stop Paying for Multiple
              <br className="hidden sm:block" /> Subscriptions
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-center text-lg text-zinc-500">
              One plan that gives you everything
            </p>
          </FadeIn>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <h3 className="mb-5 text-lg font-semibold text-red-500">
                Pay for 4 Tools Separately
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="text-red-400">✕</span>
                  ChatGPT Plus — $20/mo
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="text-red-400">✕</span>
                  Claude Pro — $20/mo
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="text-red-400">✕</span>
                  Gemini Advanced — $20/mo
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="text-red-400">✕</span>
                  Perplexity Pro — $20/mo
                </li>
              </ul>
              <div className="mt-6 border-t border-zinc-100 pt-5">
                <p className="text-sm text-zinc-400">$20 × 4 tools =</p>
                <span className="text-2xl font-bold text-red-500">
                  $80+/mo
                </span>
                <p className="mt-1 text-xs text-zinc-400">
                  4 apps · 4 logins · 4 bills · no model switching
                </p>
              </div>
            </div>

            <div className="relative rounded-2xl border-2 border-emerald-500 bg-emerald-50/30 p-8 shadow-[0_10px_30px_rgba(16,185,129,0.1)]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-500 px-3 py-0.5 text-xs font-semibold text-white">
                BEST VALUE
              </div>
              <div className="mb-5 flex items-center gap-2">
                <h3 className="text-lg font-semibold text-emerald-600">
                  All Models. One Subscription.
                </h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-zinc-700">
                  <span className="text-emerald-500">✓</span>
                  All 16+ AI models included
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-700">
                  <span className="text-emerald-500">✓</span>
                  100,000 credits / month
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-700">
                  <span className="text-emerald-500">✓</span>
                  Compare answers from different AIs
                </li>
                <li className="flex items-center gap-2 text-sm text-zinc-700">
                  <span className="text-emerald-500">✓</span>
                  One login · one bill · zero hassle
                </li>
              </ul>
              <div className="mt-6 border-t border-emerald-200 pt-5">
                <span className="text-2xl font-bold text-emerald-600">
                  $99.90/mo
                </span>
                <p className="mt-1 text-xs font-medium text-emerald-600">
                  Better answers + less hassle + save time
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model showcase */}
      <section className="border-t border-zinc-100 bg-gradient-to-b from-zinc-50/50 to-white">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <FadeIn>
            <h2 className="mb-4 text-center text-4xl font-bold tracking-tight sm:text-5xl">
              All the Models You Need
            </h2>
            <p className="mx-auto mb-12 max-w-xl text-center text-lg text-zinc-500">
              Switch between models instantly — pick the right one for every task
            </p>
          </FadeIn>

          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[
              { icon: OpenAIIcon, name: "GPT-5.4 Nano", tag: "Fast", tagColor: "bg-blue-50 text-blue-600" },
              { icon: OpenAIIcon, name: "GPT-5.4", tag: "Smart", tagColor: "bg-blue-50 text-blue-600" },
              { icon: OpenAIIcon, name: "GPT-5.4 Pro", tag: "Best", tagColor: "bg-violet-50 text-violet-600" },
              { icon: OpenAIIcon, name: "O4 Mini", tag: "Reasoning", tagColor: "bg-orange-50 text-orange-600" },
              { icon: AnthropicIcon, name: "Claude Sonnet", tag: "Writing", tagColor: "bg-amber-50 text-amber-600" },
              { icon: AnthropicIcon, name: "Claude Opus", tag: "Premium", tagColor: "bg-violet-50 text-violet-600" },
              { icon: GeminiIcon, name: "Gemini Pro", tag: "Research", tagColor: "bg-cyan-50 text-cyan-600" },
              { icon: GrokIcon, name: "Grok 4.20", tag: "Creative", tagColor: "bg-rose-50 text-rose-600" },
              { icon: DeepSeekIcon, name: "DeepSeek V3", tag: "Free", tagColor: "bg-emerald-50 text-emerald-600" },
              { icon: DeepSeekIcon, name: "DeepSeek R1", tag: "Free", tagColor: "bg-emerald-50 text-emerald-600" },
              { icon: PerplexityIcon, name: "Sonar Pro", tag: "Search", tagColor: "bg-teal-50 text-teal-600" },
              { icon: MetaIcon, name: "Llama 3.3", tag: "Free", tagColor: "bg-emerald-50 text-emerald-600" },
            ].map(({ icon: Icon, name, tag, tagColor }) => (
              <div
                key={name}
                className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-md"
              >
                <Icon className="h-8 w-8 shrink-0" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-800">
                    {name}
                  </p>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${tagColor}`}
                  >
                    {tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-zinc-100 bg-gradient-to-b from-white to-emerald-50/30">
        <div className="mx-auto max-w-7xl px-6 py-28 text-center lg:px-12">
          <FadeIn>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to Use Every AI Model?
            </h2>
            <p className="mt-6 text-lg text-zinc-500">
              Join 10,000+ users who switched to NottoAI.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
          <div className="mt-8 flex flex-col items-center gap-3">
            <SignInButton mode="modal">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/30"
              >
                Start Using All Models Now
                <span>→</span>
              </motion.button>
            </SignInButton>
            <p className="text-sm text-zinc-400">
              No credit card required · 500 free credits included
            </p>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 bg-zinc-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-12">
          <div className="flex items-center gap-2">
            <ZolaFaviconIcon className="size-5" />
            <span className="text-sm font-medium text-zinc-500">
              © 2026 NottoAI
            </span>
          </div>
          <div className="flex gap-6">
            <Link
              href="/pricing"
              className="text-sm text-zinc-400 hover:text-zinc-600"
            >
              Pricing
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-zinc-400 hover:text-zinc-600"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-zinc-400 hover:text-zinc-600"
            >
              Terms
            </Link>
            <a
              href="mailto:contact@nottoai.com"
              className="text-sm text-zinc-400 hover:text-zinc-600"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
