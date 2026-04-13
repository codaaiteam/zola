"use client"

import { useState } from "react"
import { Check } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { PRICING_PLANS } from "@/lib/pricing"
import { APP_NAME } from "@/lib/config"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  )

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="text-xl font-medium tracking-tight">
            {APP_NAME}
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm">
              Back to Chat
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Access the best AI models in one place. Pay for what you need.
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                billingPeriod === "monthly"
                  ? "bg-foreground text-background"
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
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly
              <span className="ml-1.5 text-xs text-emerald-500">Save 17%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {PRICING_PLANS.map((plan) => {
            const price =
              billingPeriod === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice / 12

            return (
              <div
                key={plan.tier}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-6",
                  plan.highlight
                    ? "border-foreground ring-foreground/10 shadow-lg ring-1"
                    : "border-border"
                )}
              >
                {plan.highlight && (
                  <div className="bg-foreground text-background absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-0.5 text-xs font-medium">
                    Most Popular
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-foreground text-lg font-semibold">
                    {plan.name}
                  </h2>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {plan.monthlyPrice === 0 ? (
                    <div className="text-foreground text-4xl font-semibold">
                      Free
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-foreground text-4xl font-semibold">
                        ${price.toFixed(price % 1 === 0 ? 0 : 1)}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        /month
                      </span>
                    </div>
                  )}
                  {billingPeriod === "yearly" && plan.yearlyPrice > 0 && (
                    <p className="text-muted-foreground mt-1 text-xs">
                      ${plan.yearlyPrice} billed yearly
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Button
                  className={cn(
                    "mb-6 w-full",
                    plan.highlight
                      ? ""
                      : "bg-background text-foreground border hover:bg-accent"
                  )}
                  variant={plan.highlight ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>

                {/* Features */}
                <ul className="flex-1 space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check
                        className="text-foreground mt-0.5 size-4 shrink-0"
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

        {/* Model Table */}
        <div className="mt-20">
          <h2 className="text-foreground mb-8 text-center text-2xl font-semibold">
            Model Access by Plan
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-muted-foreground py-3 text-left font-medium">
                    Model
                  </th>
                  <th className="text-muted-foreground py-3 text-center font-medium">
                    Free
                  </th>
                  <th className="text-muted-foreground py-3 text-center font-medium">
                    Pro
                  </th>
                  <th className="text-muted-foreground py-3 text-center font-medium">
                    Team
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { model: "GPT-4.1 Nano", free: true, pro: true, team: true },
                  {
                    model: "DeepSeek R1 (Free)",
                    free: true,
                    pro: true,
                    team: true,
                  },
                  {
                    model: "Llama 3.3 8B (Free)",
                    free: true,
                    pro: true,
                    team: true,
                  },
                  { model: "GPT-4o / GPT-4.1", free: false, pro: true, team: true },
                  {
                    model: "Claude 3.5 Sonnet / Opus",
                    free: false,
                    pro: true,
                    team: true,
                  },
                  {
                    model: "Gemini 2.0 Pro / Flash",
                    free: false,
                    pro: true,
                    team: true,
                  },
                  { model: "Grok", free: false, pro: true, team: true },
                  {
                    model: "DeepSeek R1 / V3",
                    free: false,
                    pro: true,
                    team: true,
                  },
                  {
                    model: "Mistral Large",
                    free: false,
                    pro: true,
                    team: true,
                  },
                  {
                    model: "Perplexity Sonar",
                    free: false,
                    pro: true,
                    team: true,
                  },
                  {
                    model: "Ollama (Local)",
                    free: true,
                    pro: true,
                    team: true,
                  },
                ].map((row) => (
                  <tr key={row.model} className="border-b last:border-0">
                    <td className="text-foreground py-3 font-medium">
                      {row.model}
                    </td>
                    <td className="py-3 text-center">
                      {row.free ? (
                        <Check
                          className="text-foreground mx-auto size-4"
                          weight="bold"
                        />
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      {row.pro ? (
                        <Check
                          className="text-foreground mx-auto size-4"
                          weight="bold"
                        />
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      {row.team ? (
                        <Check
                          className="text-foreground mx-auto size-4"
                          weight="bold"
                        />
                      ) : (
                        <span className="text-muted-foreground/40">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h2 className="text-foreground mb-8 text-center text-2xl font-semibold">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-2xl space-y-6">
            {[
              {
                q: "What happens when I reach my daily limit?",
                a: "You can wait for the next day when limits reset, or upgrade to a higher plan for more messages. Free-tier models like GPT-4.1 Nano remain available.",
              },
              {
                q: "Can I bring my own API keys?",
                a: "Yes! Pro and Team plans support BYOK (Bring Your Own Key). Add your own OpenAI, Anthropic, or other API keys to use your personal quotas.",
              },
              {
                q: "What are pro model messages?",
                a: "Pro models include GPT-4o, Claude 3.5, Gemini Pro, and other premium models. These have separate daily limits because they cost more to run.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes, you can cancel your subscription at any time. You will retain access until the end of your billing period.",
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 7-day money-back guarantee if you are not satisfied with your plan.",
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
