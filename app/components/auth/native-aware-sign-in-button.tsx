"use client"

import { SignInButton as ClerkSignInButton } from "@clerk/nextjs"
import { useEffect, useState, type ReactNode } from "react"

type Props = {
  children: ReactNode
  mode?: "modal" | "redirect"
  forceRedirectUrl?: string
  fallbackRedirectUrl?: string
  signUpForceRedirectUrl?: string
  signUpFallbackRedirectUrl?: string
}

export function SignInButton({ children, ...rest }: Props) {
  const [isNative, setIsNative] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const { Capacitor } = await import("@capacitor/core")
        if (!cancelled) setIsNative(Capacitor.isNativePlatform())
      } catch {
        // capacitor not available — stay on web behavior
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (!isNative) {
    return <ClerkSignInButton {...rest}>{children}</ClerkSignInButton>
  }

  const handleClick = async () => {
    try {
      const { Browser } = await import("@capacitor/browser")
      await Browser.open({
        url: "https://nottoai.com/sign-in/native-bridge",
        presentationStyle: "fullscreen",
      })
    } catch (err) {
      console.error("Failed to open native sign-in browser", err)
    }
  }

  return (
    <span
      role="button"
      onClick={handleClick}
      style={{ display: "contents", cursor: "pointer" }}
    >
      {children}
    </span>
  )
}
