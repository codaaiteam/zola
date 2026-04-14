"use client"

import Link from "next/link"
import { ZolaFaviconIcon } from "@/components/icons/zola"
import { SignInButton } from "@clerk/nextjs"
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

const FEATURES = [
  {
    icon: "⚡",
    iconBg: "bg-emerald-50",
    title: "All Models, One Price",
    description:
      "GPT-5.4, Claude, Gemini, Grok, DeepSeek — switch between 16+ models without separate subscriptions.",
  },
  {
    icon: "🔒",
    iconBg: "bg-purple-50",
    title: "Bring Your Own Keys",
    description:
      "Use your own API keys for complete control and privacy. Your keys are encrypted and never stored in plain text.",
  },
  {
    icon: "🌐",
    iconBg: "bg-cyan-50",
    title: "Web Search Built In",
    description:
      "Get real-time answers with integrated web search. No copy-pasting between tabs — ask and get up-to-date information.",
  },
  {
    icon: "📁",
    iconBg: "bg-amber-50",
    title: "File Uploads",
    description:
      "Upload images, PDFs, and documents. Analyze, summarize, or ask questions about any file with any model.",
  },
  {
    icon: "💬",
    iconBg: "bg-blue-50",
    title: "Conversation History",
    description:
      "All your chats are saved and searchable. Pick up where you left off, across any model.",
  },
  {
    icon: "🔄",
    iconBg: "bg-rose-50",
    title: "Switch Models Mid-Chat",
    description:
      "Start a conversation with GPT, continue with Claude, compare with Gemini — all in the same thread.",
  },
]

const COMPETITORS = [
  "ChatGPT Plus — $20/mo",
  "Claude Pro — $20/mo",
  "Gemini Advanced — $20/mo",
  "Perplexity Pro — $20/mo",
]

const BENEFITS = [
  "All 16+ AI models included",
  "100,000 credits / month",
  "Web search & file uploads",
  "Priority response speed",
]

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

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20 text-center sm:pt-28 lg:px-12">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-zinc-500">
            16+ AI Models in One Place
          </span>
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.08] tracking-tight text-zinc-900 sm:text-7xl">
          One Chat.
          <br />
          Every AI Model.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-500 sm:text-xl">
          Stop juggling ChatGPT, Claude, and Gemini subscriptions. Access
          GPT-5.4, Claude Opus, Gemini Pro, DeepSeek, Grok — all from one
          interface.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <SignInButton mode="modal">
            <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-600">
              Start Chatting Free
              <span>→</span>
            </button>
          </SignInButton>
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-xl border border-zinc-200 px-8 py-3.5 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* Model logos carousel */}
      <section className="border-y border-zinc-100 bg-zinc-50/50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-zinc-400">
            Powered by the best AI models
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {MODEL_LOGOS.map(({ icon: Icon, name, label }) => (
              <div
                key={name}
                className="flex flex-col items-center gap-2"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm">
                  <Icon className="h-8 w-8" />
                </div>
                <span className="text-xs font-medium text-zinc-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat mockup */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-200/50">
          <div className="flex items-center gap-2 border-b border-zinc-100 bg-zinc-50 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-4 text-xs text-zinc-400">NottoAI</span>
          </div>
          <div className="flex flex-col gap-5 p-6 sm:p-10">
            {/* User message */}
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
            {/* AI response */}
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900">
                <OpenAIIcon className="h-4 w-4 invert" />
              </div>
              <div className="max-w-xl rounded-2xl rounded-tl-md border border-zinc-100 bg-white px-4 py-3 shadow-sm">
                <p className="text-sm leading-relaxed text-zinc-600">
                  Here&apos;s a comparison of React vs Vue for a new project:
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="rounded-lg bg-blue-50 p-3">
                    <p className="text-xs font-semibold text-blue-700">React</p>
                    <p className="mt-1 text-xs text-blue-600">
                      Larger ecosystem, more jobs, JSX flexibility
                    </p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-3">
                    <p className="text-xs font-semibold text-green-700">Vue</p>
                    <p className="mt-1 text-xs text-green-600">
                      Easier learning curve, built-in state management
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Model switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {MODEL_LOGOS.slice(0, 5).map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                    i === 0
                      ? "border-2 border-emerald-500 bg-emerald-50 text-emerald-700"
                      : "border border-zinc-200 bg-white text-zinc-500"
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
      </section>

      {/* Features */}
      <section className="border-t border-zinc-100 bg-zinc-50/50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Why NottoAI?
            </h2>
            <p className="mt-4 text-lg text-zinc-500">
              Everything you need to get the most out of AI
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="rounded-2xl border border-zinc-200 bg-white p-7 transition-shadow hover:shadow-lg hover:shadow-zinc-100"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feat.iconBg}`}
                >
                  <span className="text-xl">{feat.icon}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="border-t border-zinc-100">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <h2 className="mb-4 text-center text-4xl font-bold tracking-tight sm:text-5xl">
            Stop Paying for Multiple
            <br className="hidden sm:block" /> Subscriptions
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-lg text-zinc-500">
            One subscription replaces them all
          </p>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="rounded-2xl border border-zinc-200 bg-white p-8">
              <h3 className="mb-5 text-lg font-semibold text-red-500">
                Without NottoAI
              </h3>
              <ul className="space-y-3">
                {COMPETITORS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-zinc-500"
                  >
                    <span className="text-red-400">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-zinc-100 pt-5">
                <span className="text-2xl font-bold text-red-500">
                  $80+/mo
                </span>
                <span className="ml-2 text-sm text-zinc-400">total</span>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-emerald-500 bg-emerald-50/30 p-8">
              <div className="mb-5 flex items-center gap-2">
                <h3 className="text-lg font-semibold text-emerald-600">
                  With NottoAI Pro
                </h3>
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  Save 80%
                </span>
              </div>
              <ul className="space-y-3">
                {BENEFITS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-zinc-700"
                  >
                    <span className="text-emerald-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-emerald-200 pt-5">
                <span className="text-2xl font-bold text-emerald-600">
                  $99.90/mo
                </span>
                <span className="ml-2 text-sm text-zinc-400">everything included</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model showcase grid */}
      <section className="border-t border-zinc-100 bg-zinc-50/50">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <h2 className="mb-4 text-center text-4xl font-bold tracking-tight sm:text-5xl">
            All the Models You Need
          </h2>
          <p className="mx-auto mb-12 max-w-xl text-center text-lg text-zinc-500">
            From lightweight everyday tasks to complex reasoning — pick the right model for the job
          </p>

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
                className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md"
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
      <section className="border-t border-zinc-100">
        <div className="mx-auto max-w-7xl px-6 py-28 text-center lg:px-12">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to try every AI model?
          </h2>
          <p className="mt-6 text-lg text-zinc-500">
            Start free with 500 credits. No credit card required.
          </p>
          <div className="mt-10">
            <SignInButton mode="modal">
              <button className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-10 py-4 text-lg font-semibold text-white shadow-lg shadow-emerald-500/20 transition-colors hover:bg-emerald-600">
                Get Started Free
                <span>→</span>
              </button>
            </SignInButton>
          </div>
          <p className="mt-4 text-sm text-zinc-400">
            Free models available forever — no credit card needed
          </p>
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
            <span className="text-sm text-zinc-400 hover:text-zinc-600">
              Privacy
            </span>
            <span className="text-sm text-zinc-400 hover:text-zinc-600">
              Terms
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
