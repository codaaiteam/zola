"use client"

import { UserButton, SignInButton, useUser } from "@clerk/nextjs"
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
