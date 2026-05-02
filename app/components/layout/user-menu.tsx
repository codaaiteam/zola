"use client"

import { UserButton, useUser } from "@clerk/nextjs"
import { SignInButton } from "@/app/components/auth/native-aware-sign-in-button"
import { Button } from "@/components/ui/button"

export function UserMenu() {
  const { isSignedIn, isLoaded } = useUser()

  if (!isLoaded) return null

  if (!isSignedIn) {
    return (
      <SignInButton mode="modal">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
      </SignInButton>
    )
  }

  return <UserButton />
}
