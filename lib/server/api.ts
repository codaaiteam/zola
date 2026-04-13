import { auth } from "@clerk/nextjs/server"
import { createGuestServerClient } from "@/lib/supabase/server-guest"
import { isSupabaseEnabled } from "../supabase/config"

/**
 * Validates the user's identity using Clerk and returns a Supabase client
 * for database operations.
 */
export async function validateUserIdentity(
  userId: string,
  isAuthenticated: boolean
) {
  if (!isSupabaseEnabled) {
    return null
  }

  // Use service role client for all DB operations
  const supabase = await createGuestServerClient()

  if (!supabase) {
    throw new Error("Failed to initialize Supabase client")
  }

  if (isAuthenticated) {
    // Verify with Clerk that the user is actually authenticated
    const { userId: clerkUserId } = await auth()

    if (!clerkUserId) {
      throw new Error("Unable to get authenticated user")
    }

    if (clerkUserId !== userId) {
      throw new Error("User ID does not match authenticated user")
    }
  }

  return supabase
}
