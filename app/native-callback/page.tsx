"use client"

import { useSignIn } from "@clerk/nextjs"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function NativeCallbackPage() {
  const { signIn } = useSignIn()
  const params = useSearchParams()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!signIn) return

    const ticket = params.get("ticket")
    if (!ticket) {
      setError("Missing sign-in ticket")
      return
    }

    let cancelled = false

    const run = async () => {
      const createResult = await signIn.create({
        strategy: "ticket",
        ticket,
      })
      if (cancelled) return
      if (createResult.error) {
        setError(createResult.error.message ?? "Failed to redeem ticket")
        return
      }

      if (signIn.status !== "complete") {
        setError(`Unexpected sign-in status: ${signIn.status}`)
        return
      }

      const finalizeResult = await signIn.finalize()
      if (cancelled) return
      if (finalizeResult.error) {
        setError(
          finalizeResult.error.message ?? "Failed to finalize sign-in"
        )
        return
      }

      router.replace("/")
    }
    run()

    return () => {
      cancelled = true
    }
  }, [signIn, params, router])

  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="space-y-3">
        {error ? (
          <>
            <p className="text-destructive text-lg">Sign-in failed</p>
            <p className="text-muted-foreground text-sm">{error}</p>
            <button
              className="bg-primary text-primary-foreground rounded-md px-4 py-2"
              onClick={() => router.replace("/sign-in")}
            >
              Try again
            </button>
          </>
        ) : (
          <p className="text-lg">Signing you in…</p>
        )}
      </div>
    </div>
  )
}
