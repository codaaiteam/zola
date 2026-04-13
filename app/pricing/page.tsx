"use client"

import { useState } from "react"
import { Check } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { PRICING_PLANS, MODEL_CREDIT_RATES } from "@/lib/pricing"
import { APP_NAME } from "@/lib/config"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">(
    "monthly"
  )

  return (
    <div className="bg-background min-h-screen">
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

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {/* Title */}
        <div className="mb-12 text-center">
          <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Pay by credits. Different models, different rates. Use what you
            need.
          </p>

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
        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-5">
          {PRICING_PLANS.map((plan) => {
            const price =
              billingPeriod === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice / 12

            return (
              <div
                key={plan.tier}
                className={cn(
                  "relative flex flex-col rounded-2xl border p-5",
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

                <div className="mb-4">
                  <h2 className="text-foreground text-lg font-semibold">
                    {plan.name}
                  </h2>
                  <p className="text-muted-foreground mt-1 text-xs">
                    {plan.description}
                  </p>
                </div>

                <div className="mb-4">
                  {plan.monthlyPrice === 0 ? (
                    <div className="text-foreground text-3xl font-semibold">
                      Free
                    </div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-foreground text-3xl font-semibold">
                        ${price.toFixed(price % 1 === 0 ? 0 : 1)}
                      </span>
                      <span className="text-muted-foreground text-sm">
                        /mo
                      </span>
                    </div>
                  )}
                  {billingPeriod === "yearly" && plan.yearlyPrice > 0 && (
                    <p className="text-muted-foreground mt-1 text-xs">
                      ${plan.yearlyPrice} billed yearly
                    </p>
                  )}
                  <p className="text-muted-foreground mt-2 text-xs font-medium">
                    {plan.credits.toLocaleString()} credits / month
                  </p>
                </div>

                <Button
                  className="mb-4 w-full text-sm"
                  variant={plan.highlight ? "default" : "outline"}
                  size="sm"
                >
                  {plan.cta}
                </Button>

                <ul className="flex-1 space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs">
                      <Check
                        className="text-foreground mt-0.5 size-3.5 shrink-0"
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

        {/* Credit Rates Table */}
        <div className="mt-20">
          <h2 className="text-foreground mb-4 text-center text-2xl font-semibold">
            Credit Rates by Model
          </h2>
          <p className="text-muted-foreground mb-8 text-center text-sm">
            1 credit = 1,000 tokens (input + output combined). More powerful
            models consume more credits per token.
          </p>
          <div className="mx-auto max-w-2xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-muted-foreground py-3 text-left font-medium">
                    Model
                  </th>
                  <th className="text-muted-foreground py-3 text-right font-medium">
                    Credits / 1K tokens
                  </th>
                  <th className="text-muted-foreground py-3 text-right font-medium">
                    ~Messages per 1K credits
                  </th>
                </tr>
              </thead>
              <tbody>
                {MODEL_CREDIT_RATES.map((model) => {
                  // Estimate: avg message = 1.5K tokens (500 in + 1000 out)
                  const msgsPerK =
                    model.rate === 0
                      ? "Unlimited"
                      : Math.floor(1000 / (model.rate * 1.5)).toString()
                  return (
                    <tr key={model.label} className="border-b last:border-0">
                      <td className="text-foreground py-2.5 font-medium">
                        {model.label}
                      </td>
                      <td className="text-muted-foreground py-2.5 text-right">
                        {model.rate === 0 ? (
                          <span className="text-emerald-500 font-medium">
                            Free
                          </span>
                        ) : (
                          model.rate
                        )}
                      </td>
                      <td className="text-muted-foreground py-2.5 text-right">
                        {msgsPerK}
                      </td>
                    </tr>
                  )
                })}
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
                q: "How do credits work?",
                a: "1 credit = 1,000 tokens. Each model consumes credits at different rates based on its cost. Cheaper models like GPT-5.4 Nano use 1 credit per 1K tokens, while premium models like Claude Opus 4.6 use 22 credits. Free models (DeepSeek R1, Llama) don't consume any credits.",
              },
              {
                q: "What counts as a token?",
                a: "Both input (your message + conversation history) and output (AI response) count towards token usage. A typical short conversation uses about 1,500 tokens per exchange.",
              },
              {
                q: "What happens when I run out of credits?",
                a: "You can still use free models (DeepSeek R1, Llama 3.3). Credits reset at the beginning of each billing cycle. Unused credits do not roll over.",
              },
              {
                q: "Can I cancel anytime?",
                a: "Yes. You retain access until the end of your billing period.",
              },
              {
                q: "Do you offer refunds?",
                a: "We offer a 7-day money-back guarantee if you are not satisfied.",
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
