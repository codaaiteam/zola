"use client"

import { SignIn } from "@clerk/nextjs"
import { useEffect, useState } from "react"

export default function SignInPage() {
  const [isCapacitor, setIsCapacitor] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const detect = async () => {
      try {
        const { Capacitor } = await import("@capacitor/core")
        if (cancelled) return

        if (Capacitor.isNativePlatform()) {
          setIsCapacitor(true)
          const { Browser } = await import("@capacitor/browser")
          const url = `https://nottoai.com/sign-in/native-bridge`
          await Browser.open({ url, presentationStyle: "fullscreen" })
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    detect()
    return () => {
      cancelled = true
    }
  }, [])

  if (isCapacitor) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <div className="space-y-3">
          <p className="text-lg">Opening sign-in in your browser…</p>
          <p className="text-muted-foreground text-sm">
            Complete sign-in there, then you'll be returned to the app.
          </p>
        </div>
      </div>
    )
  }

  if (loading) return null

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  )
}
