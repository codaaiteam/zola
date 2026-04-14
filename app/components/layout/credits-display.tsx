"use client"

import { useCallback, useEffect, useState } from "react"
import { fetchClient } from "@/lib/fetch"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SubscriptionInfo {
  tier: string
  credits: number
  maxCredits: number
}

export function CreditsDisplay() {
  const [info, setInfo] = useState<SubscriptionInfo | null>(null)

  const refresh = useCallback(() => {
    fetchClient("/api/subscription")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setInfo(data)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    refresh()
    // Poll every 15s to pick up credit changes after messages
    const interval = setInterval(refresh, 15_000)
    return () => clearInterval(interval)
  }, [refresh])

  // Also refresh when tab becomes visible (user switches back)
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh()
    }
    document.addEventListener("visibilitychange", onVisible)
    return () => document.removeEventListener("visibilitychange", onVisible)
  }, [refresh])

  if (!info) return null

  const percentage = Math.round((info.credits / info.maxCredits) * 100)
  const isLow = percentage <= 20

  return (
    <Link
      href="/pricing"
      className="pointer-events-auto flex items-center gap-2 rounded-full border px-3 py-1 text-xs transition-colors hover:bg-accent"
    >
      <div className="flex items-center gap-1.5">
        <div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
          <div
            className={cn(
              "h-full rounded-full transition-all",
              isLow ? "bg-red-500" : "bg-[#10B981]"
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className={cn("tabular-nums", isLow && "text-red-500")}>
          {info.credits.toLocaleString()}
        </span>
      </div>
      <span className="text-muted-foreground capitalize">{info.tier}</span>
    </Link>
  )
}
