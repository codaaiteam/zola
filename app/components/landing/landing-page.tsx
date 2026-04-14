"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ZolaFaviconIcon } from "@/components/icons/zola"
import { SignInButton } from "@clerk/nextjs"

const FEATURES = [
  {
    icon: "⚡",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500",
    title: "All Models, One Price",
    description:
      "GPT-5.4, Claude, Gemini, Grok, DeepSeek — switch between 16+ models without separate subscriptions.",
  },
  {
    icon: "🔒",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500",
    title: "Bring Your Own Keys",
    description:
      "Use your own API keys for complete control and privacy. Your keys are encrypted and never stored in plain text.",
  },
  {
    icon: "🌐",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-500",
    title: "Web Search Built In",
    description:
      "Get real-time answers with integrated web search. No copy-pasting between tabs — ask and get up-to-date information.",
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

const PROVIDERS = [
  "OpenAI",
  "Anthropic",
  "Google",
  "xAI",
  "DeepSeek",
  "Perplexity",
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Nav */}
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-base font-medium tracking-tight"
        >
          <ZolaFaviconIcon className="size-7" />
          <span className="font-medium">Notto</span>
          <span className="font-normal opacity-80">AI</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:inline"
          >
            Pricing
          </Link>
          <SignInButton mode="modal">
            <button className="rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800">
              Sign In
            </button>
          </SignInButton>
          <SignInButton mode="modal">
            <button className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600">
              Get Started Free
            </button>
          </SignInButton>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-24 text-center lg:px-12">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-medium text-zinc-400">
            16+ AI Models in One Place
          </span>
        </div>

        <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight sm:text-7xl">
          One Chat.
          <br />
          Every AI Model.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl">
          Stop juggling ChatGPT, Claude, and Gemini subscriptions. Access
          GPT-5.4, Claude Opus, Gemini Pro, DeepSeek, Grok — all from one
          interface.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <SignInButton mode="modal">
            <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-emerald-600">
              Start Chatting Free
              <span>→</span>
            </button>
          </SignInButton>
          <Link
            href="/pricing"
            className="inline-flex items-center rounded-lg border border-zinc-800 bg-zinc-900 px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-zinc-800"
          >
            View Pricing
          </Link>
        </div>
      </section>

      {/* Mockup */}
      <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-12">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-[0_0_80px_rgba(16,185,129,0.08)]">
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-950 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
          </div>
          <div className="flex flex-col items-center gap-6 p-8 sm:p-12">
            <div className="flex w-full max-w-xl items-start gap-3 rounded-xl bg-zinc-800 p-4">
              <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-500" />
              <p className="text-sm leading-relaxed text-zinc-300">
                Explain quantum computing in simple terms
              </p>
            </div>
            <div className="flex w-full max-w-xl items-start gap-3 rounded-xl bg-[#1a1a2e] p-4">
              <div className="h-8 w-8 shrink-0 rounded-full bg-purple-500" />
              <p className="text-sm leading-relaxed text-zinc-400">
                Think of quantum computing like a maze. A regular computer tries
                one path at a time. A quantum computer explores all paths
                simultaneously...
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["GPT-5.4", "Claude Opus", "Gemini Pro", "DeepSeek", "Grok"].map(
                (model, i) => (
                  <span
                    key={model}
                    className={`rounded-full px-3 py-1 font-mono text-xs ${
                      i === 1
                        ? "border border-emerald-500 bg-emerald-500/20 text-emerald-500"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {model}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-zinc-900 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-12">
          <p className="mb-8 font-mono text-[11px] font-medium uppercase tracking-widest text-zinc-600">
            Powered by the best AI models
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {PROVIDERS.map((name) => (
              <span
                key={name}
                className="text-lg font-semibold text-zinc-700"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Why NottoAI?
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Everything you need to get the most out of AI
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((feat) => (
            <div
              key={feat.title}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-8"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feat.iconBg}`}
              >
                <span className="text-xl">{feat.icon}</span>
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feat.title}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison */}
      <section className="border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12">
          <h2 className="mb-12 text-center text-4xl font-bold tracking-tight sm:text-5xl">
            Stop Paying for Multiple
            <br className="hidden sm:block" /> Subscriptions
          </h2>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-8">
              <h3 className="mb-4 text-lg font-semibold text-red-500">
                Without NottoAI
              </h3>
              <ul className="space-y-3">
                {COMPETITORS.map((item) => (
                  <li key={item} className="text-sm text-zinc-400">
                    ✕ {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-zinc-800 pt-4">
                <span className="text-xl font-bold text-red-500">
                  Total: $80+/mo
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-emerald-500 bg-emerald-500/5 p-8">
              <h3 className="mb-4 text-lg font-semibold text-emerald-500">
                With NottoAI Pro
              </h3>
              <ul className="space-y-3">
                {BENEFITS.map((item) => (
                  <li key={item} className="text-sm text-zinc-200">
                    ✓ {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-emerald-500/30 pt-4">
                <span className="text-xl font-bold text-emerald-500">
                  Just $99.90/mo
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-zinc-900">
        <div className="mx-auto max-w-7xl px-6 py-28 text-center lg:px-12">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Ready to try every AI model?
          </h2>
          <p className="mt-6 text-lg text-zinc-400">
            Start free with 500 credits. No credit card required.
          </p>
          <div className="mt-10">
            <SignInButton mode="modal">
              <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-10 py-4 text-lg font-semibold text-white transition-colors hover:bg-emerald-600">
                Get Started Free
                <span>→</span>
              </button>
            </SignInButton>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-12">
          <p className="text-xs text-zinc-600">
            © 2026 NottoAI. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-zinc-600 hover:text-zinc-400">
              Privacy
            </span>
            <span className="text-xs text-zinc-600 hover:text-zinc-400">
              Terms
            </span>
            <span className="text-xs text-zinc-600 hover:text-zinc-400">
              Contact
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}
