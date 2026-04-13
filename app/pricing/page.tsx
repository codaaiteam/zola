"use client"

import { useState } from "react"
import { Check } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { PRICING_PLANS } from "@/lib/pricing"
import { ZolaFaviconIcon } from "@/components/icons/zola"
import Link from "next/link"
import { cn } from "@/lib/utils"

const USAGE_EXAMPLES = [
  { model: "GPT-5.4 Nano", messages: "~5,300", note: "Fast everyday tasks" },
  {
    model: "Claude Sonnet 4.6",
    messages: "~410",
    note: "Complex writing & analysis",
  },
  { model: "Gemini 3.1 Pro", messages: "~530", note: "Research & reasoning" },
  { model: "GPT-5.4", messages: "~410", note: "Advanced problem solving" },
]

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  )

  // Main 3 plans: Free, Basic, Pro
  const mainPlans = PRICING_PLANS.filter(
    (p) => p.tier === "free" || p.tier === "basic" || p.tier === "pro"
  )
  const enterprisePlan = PRICING_PLANS.find((p) => p.tier === "enterprise")

  return (
    <div className="bg-background min-h-screen w-screen">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-base font-medium tracking-tight"
          >
            <ZolaFaviconIcon className="size-7" />
            <span className="font-medium">Notto</span>
            <span className="font-normal opacity-80">AI</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              Back to Chat
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Trust bar */}
        <div className="mb-6 text-center">
          <p className="text-muted-foreground text-sm">
            Supports GPT-5.4, Claude, Gemini, DeepSeek, Grok & more
          </p>
        </div>

        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
            One Subscription. All AI Models.
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Stop paying for multiple AI subscriptions. Access every model in one
            place.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                billingPeriod === "monthly"
                  ? "bg-[#10B981] text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                billingPeriod === "yearly"
                  ? "bg-[#10B981] text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly
              <span className="ml-1.5 text-xs opacity-80">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Plans — 3 columns */}
        <div className="grid items-stretch gap-8 md:grid-cols-3">
          {mainPlans.map((plan) => {
            const price =
              billingPeriod === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice / 12
            const isPro = plan.tier === "pro"
            const isFree = plan.tier === "free"

            return (
              <div
                key={plan.tier}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-6",
                  isPro
                    ? "scale-[1.03] border-2 border-[#10B981] shadow-lg shadow-[#10B981]/10"
                    : "border-border",
                  isFree && "opacity-75"
                )}
              >
                {isPro && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#10B981] px-3 py-0.5 text-xs font-medium text-white">
                    Most Popular
                  </div>
                )}

                <div className="mb-5">
                  <h2 className="text-foreground text-lg font-semibold">
                    {plan.name}
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-5">
                  {plan.monthlyPrice === 0 ? (
                    <div className="text-foreground text-4xl font-semibold">
                      Free
                    </div>
                  ) : (
                    <>
                      <div className="flex items-baseline gap-1">
                        <span className="text-foreground text-4xl font-semibold">
                          ${price.toFixed(price % 1 === 0 ? 0 : 1)}
                        </span>
                        <span className="text-muted-foreground text-sm">
                          /mo
                        </span>
                      </div>
                      {billingPeriod === "yearly" && (
                        <p className="text-muted-foreground mt-1 text-xs">
                          ${plan.yearlyPrice} billed yearly
                        </p>
                      )}
                    </>
                  )}
                </div>

                <Button
                  className={cn(
                    "mb-5 w-full",
                    !isPro &&
                      "border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                  variant={isPro ? "default" : "outline"}
                  size="default"
                >
                  {plan.cta}
                </Button>

                <ul className="flex-1 space-y-2.5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          isPro ? "text-[#10B981]" : "text-muted-foreground"
                        )}
                        weight="bold"
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Enterprise — separate, below */}
        {enterprisePlan && (
          <div className="mt-12 rounded-2xl border p-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <h3 className="text-foreground text-lg font-semibold">
                  Need more power?
                </h3>
                <p className="text-muted-foreground text-sm">
                  {enterprisePlan.name} &mdash;{" "}
                  {enterprisePlan.credits.toLocaleString()} credits/mo,
                  dedicated support, API access & SSO.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-foreground text-xl font-semibold">
                  $
                  {billingPeriod === "monthly"
                    ? enterprisePlan.monthlyPrice
                    : (enterprisePlan.yearlyPrice / 12).toFixed(1)}
                  /mo
                </span>
                <Button variant="outline" size="sm">
                  {enterprisePlan.cta}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Usage examples */}
        <div className="mt-20">
          <h2 className="text-foreground mb-2 text-center text-2xl font-semibold">
            What can you do with Pro?
          </h2>
          <p className="text-muted-foreground mb-8 text-center text-sm">
            100,000 credits per month gets you approximately:
          </p>
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {USAGE_EXAMPLES.map((ex) => (
              <div
                key={ex.model}
                className="rounded-xl border p-4 text-center"
              >
                <div className="text-foreground text-2xl font-semibold">
                  {ex.messages}
                </div>
                <div className="text-foreground mt-1 text-sm font-medium">
                  {ex.model}
                </div>
                <div className="text-muted-foreground mt-0.5 text-xs">
                  {ex.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why NottoAI */}
        <div className="mt-20">
          <h2 className="text-foreground mb-8 text-center text-2xl font-semibold">
            Why NottoAI?
          </h2>
          <div className="mx-auto max-w-2xl space-y-6">
            {[
              {
                q: "Why not use ChatGPT directly?",
                a: "NottoAI lets you switch between all AI models in one place — no multiple subscriptions needed. ChatGPT Plus is $20/mo for one model. NottoAI Pro gives you 16+ models.",
              },
              {
                q: "How do credits work?",
                a: "Credits are simple: different models cost different amounts. Lightweight models like GPT-5.4 Nano use very few credits, while premium models like Claude Opus use more. Free models like DeepSeek R1 don't use any credits at all.",
              },
              {
                q: "What happens when I run out of credits?",
                a: "You can still use free models (DeepSeek R1, Llama 3.3). Credits reset at the beginning of each billing cycle.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. You retain access until the end of your billing period. 7-day money-back guarantee.",
              },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-foreground font-medium">{item.q}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
