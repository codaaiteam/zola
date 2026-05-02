"use client"

import { useEffect } from "react"

export function NativeDeeplinkListener() {
  useEffect(() => {
    let appHandle: { remove: () => void } | null = null
    let cancelled = false

    const setup = async () => {
      try {
        const { Capacitor } = await import("@capacitor/core")
        if (!Capacitor.isNativePlatform() || cancelled) return

        const [{ App }, { Browser }] = await Promise.all([
          import("@capacitor/app"),
          import("@capacitor/browser"),
        ])

        const handle = await App.addListener("appUrlOpen", async (event) => {
          if (!event?.url?.startsWith("nottoai://auth-callback")) return

          try {
            await Browser.close()
          } catch {
            // ignore
          }

          const url = new URL(event.url)
          const ticket = url.searchParams.get("ticket")
          if (!ticket) return

          window.location.href = `/native-callback?ticket=${encodeURIComponent(ticket)}`
        })

        if (cancelled) {
          handle.remove()
        } else {
          appHandle = handle
        }
      } catch {
        // not in capacitor, ignore
      }
    }

    setup()

    return () => {
      cancelled = true
      appHandle?.remove()
    }
  }, [])

  return null
}
