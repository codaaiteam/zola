"use client"

import { SignInButton as ClerkSignInButton } from "@clerk/nextjs"
import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react"

type Props = {
  children: ReactNode
  mode?: "modal" | "redirect"
  forceRedirectUrl?: string
  fallbackRedirectUrl?: string
  signUpForceRedirectUrl?: string
  signUpFallbackRedirectUrl?: string
}

type ClickableProps = { onClick?: (e: MouseEvent) => void }

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

  const openNativeBridge = async (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
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
    <>
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child
        const typed = child as ReactElement<ClickableProps>
        const childOnClick = typed.props.onClick
        return cloneElement(typed, {
          onClick: (e: MouseEvent) => {
            childOnClick?.(e)
            void openNativeBridge(e)
          },
        })
      })}
    </>
  )
}
