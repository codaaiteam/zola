"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { fetchClient } from "@/lib/fetch"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface SubscriptionInfo {
  tier: string
  credits: number
  maxCredits: number
}

export function CreditsDisplay() {
  const [info, setInfo] = useState<SubscriptionInfo | null>(null)
  const [showWarning, setShowWarning] = useState(false)
  const hasShownWarning = useRef(false)

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
    const interval = setInterval(refresh, 15_000)
    return () => clearInterval(interval)
  }, [refresh])

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh()
    }
    document.addEventListener("visibilitychange", onVisible)
    return () => document.removeEventListener("visibilitychange", onVisible)
  }, [refresh])

  // Show warning popup when usage hits 70%
  useEffect(() => {
    if (!info || hasShownWarning.current) return
    const used = ((info.maxCredits - info.credits) / info.maxCredits) * 100
    if (used >= 70) {
      setShowWarning(true)
      hasShownWarning.current = true
    }
  }, [info])

  if (!info) return null

  const percentage = Math.round((info.credits / info.maxCredits) * 100)
  const isLow = percentage <= 20

  return (
    <>
      <Link
        href="/usage"
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

      {/* 70% usage warning popup */}
      {showWarning && (
        <div className="pointer-events-auto fixed right-4 bottom-4 z-50 w-80 rounded-xl border bg-background p-4 shadow-lg">
          <button
            onClick={() => setShowWarning(false)}
            className="absolute right-3 top-3 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
          >
            <X className="size-3.5" />
          </button>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10">
              <span className="text-sm">⚡</span>
            </div>
            <p className="text-sm font-semibold">Credits Running Low</p>
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            You&apos;ve used over 70% of your credits.
            {info.tier === "free"
              ? " Upgrade to get more credits and unlock premium models."
              : " Consider upgrading for more credits."}
          </p>
          <div className="flex gap-2">
            <Link
              href="/pricing"
              className="flex-1 rounded-lg bg-[#10B981] px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-[#059669]"
              onClick={() => setShowWarning(false)}
            >
              {info.tier === "free" ? "Upgrade Now" : "Get More Credits"}
            </Link>
            <button
              onClick={() => setShowWarning(false)}
              className="rounded-lg border px-3 py-1.5 text-xs text-muted-foreground hover:bg-accent"
            >
              Later
            </button>
          </div>
        </div>
      )}
    </>
  )
}
