"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { ZolaFaviconIcon } from "@/components/icons/zola"
import { fetchClient } from "@/lib/fetch"
import { MODEL_CREDIT_RATES } from "@/lib/pricing"
import { cn } from "@/lib/utils"
import { ArrowLeft, BarChart3, Clock, Coins, MessageSquare, Zap } from "lucide-react"

/* ─── Types ─── */

interface CreditLog {
  id: string
  model_id: string
  tokens_used: number
  credits_cost: number
  credits_after: number
  chat_id: string | null
  created_at: string
}

interface DailyUsage {
  date: string
  credits: number
  messages: number
}

interface ModelUsage {
  modelId: string
  credits: number
  messages: number
  tokens: number
}

interface SubscriptionInfo {
  tier: string
  credits: number
  maxCredits: number
  periodEnd?: string
}

interface UsageData {
  logs: CreditLog[]
  daily: DailyUsage[]
  byModel: ModelUsage[]
  totalCredits: number
  totalMessages: number
}

/* ─── Helpers ─── */

function getModelLabel(modelId: string): string {
  const entry = MODEL_CREDIT_RATES.find(
    (r) => modelId.includes(r.pattern.replace(/"/g, ""))
  )
  return entry?.label ?? modelId
}

function getModelRate(modelId: string): number {
  const entry = MODEL_CREDIT_RATES.find(
    (r) => modelId.includes(r.pattern.replace(/"/g, ""))
  )
  return entry?.rate ?? 1
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  })
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

/* ─── Bar chart (pure CSS) ─── */

function DailyChart({ daily }: { daily: DailyUsage[] }) {
  if (daily.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
        No usage data yet. Start chatting to see your daily usage here.
      </div>
    )
  }

  const maxCredits = Math.max(...daily.map((d) => d.credits), 1)

  // Show last 14 days
  const recent = daily.slice(-14)

  return (
    <div className="flex h-48 items-end gap-1.5 sm:gap-2">
      {recent.map((d) => {
        const height = Math.max(4, (d.credits / maxCredits) * 100)
        return (
          <div
            key={d.date}
            className="group relative flex flex-1 flex-col items-center"
          >
            {/* Tooltip */}
            <div className="pointer-events-none absolute -top-14 left-1/2 z-10 hidden -translate-x-1/2 rounded-lg border bg-popover px-3 py-1.5 text-xs shadow-md group-hover:block">
              <p className="font-semibold">{d.credits} credits</p>
              <p className="text-muted-foreground">{d.messages} msgs</p>
            </div>
            {/* Bar */}
            <div
              className="w-full rounded-t-sm bg-[#10B981] transition-all group-hover:bg-[#059669]"
              style={{ height: `${height}%` }}
            />
            {/* Label */}
            <span className="mt-1.5 text-[10px] text-muted-foreground">
              {formatDate(d.date).split(" ")[1]}
            </span>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Model breakdown ─── */

function ModelBreakdown({
  byModel,
  totalCredits,
}: {
  byModel: ModelUsage[]
  totalCredits: number
}) {
  if (byModel.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
        No model usage recorded yet.
      </div>
    )
  }

  const COLORS = [
    "bg-[#10B981]",
    "bg-violet-500",
    "bg-cyan-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-blue-500",
    "bg-orange-500",
    "bg-pink-500",
  ]

  return (
    <div className="space-y-3">
      {byModel.slice(0, 8).map((m, i) => {
        const pct = totalCredits > 0 ? (m.credits / totalCredits) * 100 : 0
        const rate = getModelRate(m.modelId)
        return (
          <div key={m.modelId}>
            <div className="mb-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {getModelLabel(m.modelId)}
                </span>
                <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {rate}x
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{m.messages} msgs</span>
                <span className="font-semibold text-foreground">
                  {m.credits.toLocaleString()} cr
                </span>
              </div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className={`h-full rounded-full ${COLORS[i % COLORS.length]} transition-all`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Page ─── */

export default function UsagePage() {
  const [sub, setSub] = useState<SubscriptionInfo | null>(null)
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [days, setDays] = useState(30)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const [subRes, usageRes] = await Promise.all([
        fetchClient("/api/subscription"),
        fetchClient(`/api/usage?days=${days}`),
      ])
      const subData = await subRes.json()
      const usageData = await usageRes.json()
      if (!subData.error) setSub(subData)
      if (!usageData.error) setUsage(usageData)
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }, [days])

  useEffect(() => {
    refresh()
  }, [refresh])

  const percentage = sub
    ? Math.round((sub.credits / sub.maxCredits) * 100)
    : 0
  const isLow = percentage <= 20

  return (
    <div className="bg-background min-h-screen w-screen">
      {/* Header */}
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-base font-medium tracking-tight"
          >
            <ZolaFaviconIcon className="size-7" />
            <span className="font-semibold tracking-[-0.02em]">Notto</span>
            <span className="font-semibold italic tracking-[-0.02em]">AI</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Chat
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
            Usage Dashboard
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Track your credit usage, model breakdown, and spending history.
          </p>
        </div>

        {/* How credits work */}
        <div className="mb-8 rounded-xl border bg-muted/30 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">
                How credits work:{" "}
                <span className="font-mono text-xs text-muted-foreground">
                  credits = ceil(tokens / 1,000) × model rate
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                Each message uses tokens (input + output). Different models have
                different rates — e.g. GPT-5.4 Nano is 1x, Claude Sonnet is 13x.
                Free models cost 0 credits.
              </p>
            </div>
            <Link
              href="/model-pricing"
              className="shrink-0 text-xs font-medium text-[#10B981] hover:underline"
            >
              See all model rates →
            </Link>
          </div>
        </div>

        {loading && !usage ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-foreground" />
          </div>
        ) : (
          <>
            {/* ═══ Overview cards ═══ */}
            <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Credits remaining */}
              <div className="rounded-xl border p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Coins className="h-4 w-4 text-[#10B981]" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Credits Remaining
                  </span>
                </div>
                <div className="text-2xl font-bold">
                  {sub?.credits.toLocaleString() ?? "—"}
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      isLow ? "bg-red-500" : "bg-[#10B981]"
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {sub?.credits.toLocaleString()} / {sub?.maxCredits.toLocaleString()} ({percentage}%)
                </p>
              </div>

              {/* Plan */}
              <div className="rounded-xl border p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-violet-500" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Current Plan
                  </span>
                </div>
                <div className="text-2xl font-bold capitalize">
                  {sub?.tier ?? "—"}
                </div>
                {sub?.periodEnd && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    Resets{" "}
                    {new Date(sub.periodEnd).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                )}
                <Link
                  href="/pricing"
                  className="mt-2 inline-block text-xs font-medium text-[#10B981] hover:underline"
                >
                  {sub?.tier === "free" ? "Upgrade Plan" : "Manage Plan"}
                </Link>
              </div>

              {/* Credits used (period) */}
              <div className="rounded-xl border p-5">
                <div className="mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-cyan-500" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Credits Used ({days}d)
                  </span>
                </div>
                <div className="text-2xl font-bold">
                  {usage?.totalCredits.toLocaleString() ?? "0"}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  across {usage?.totalMessages ?? 0} messages
                </p>
              </div>

              {/* Messages (period) */}
              <div className="rounded-xl border p-5">
                <div className="mb-3 flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Messages ({days}d)
                  </span>
                </div>
                <div className="text-2xl font-bold">
                  {usage?.totalMessages.toLocaleString() ?? "0"}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  avg{" "}
                  {usage && usage.totalMessages > 0
                    ? Math.round(
                        usage.totalCredits / usage.totalMessages
                      )
                    : 0}{" "}
                  credits/msg
                </p>
              </div>
            </div>

            {/* ═══ Time range toggle ═══ */}
            <div className="mb-6 flex items-center gap-2">
              {[7, 14, 30].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                    days === d
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {d}d
                </button>
              ))}
            </div>

            {/* ═══ Charts row ═══ */}
            <div className="mb-8 grid gap-6 lg:grid-cols-2">
              {/* Daily usage chart */}
              <div className="rounded-xl border p-6">
                <h2 className="mb-4 text-sm font-semibold">
                  Daily Credit Usage
                </h2>
                <DailyChart daily={usage?.daily ?? []} />
              </div>

              {/* Model breakdown */}
              <div className="rounded-xl border p-6">
                <h2 className="mb-4 text-sm font-semibold">
                  Usage by Model
                </h2>
                <ModelBreakdown
                  byModel={usage?.byModel ?? []}
                  totalCredits={usage?.totalCredits ?? 0}
                />
              </div>
            </div>

            {/* ═══ Recent transactions ═══ */}
            <div className="rounded-xl border">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-sm font-semibold">Recent Transactions</h2>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Last {days} days
                </div>
              </div>

              {!usage?.logs.length ? (
                <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                  No transactions yet. Credits will be logged as you chat.
                </div>
              ) : (
                <div className="divide-y">
                  {usage.logs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between px-6 py-3 transition-colors hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-xs font-bold">
                          {getModelRate(log.model_id)}x
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {getModelLabel(log.model_id)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {log.tokens_used.toLocaleString()} tokens × {getModelRate(log.model_id)}x = {log.credits_cost} credits
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-red-500">
                          -{log.credits_cost}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {timeAgo(log.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
