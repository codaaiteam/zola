import { currentUser } from "@clerk/nextjs/server"
import { isSupabaseEnabled } from "@/lib/supabase/config"
import { createGuestServerClient } from "@/lib/supabase/server-guest"
import {
  convertFromApiFormat,
  defaultPreferences,
} from "@/lib/user-preference-store/utils"
import type { UserProfile } from "./types"

export async function getUserProfile(): Promise<UserProfile | null> {
  const clerkUser = await currentUser()

  if (!clerkUser) {
    // Not signed in
    return null
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress || ""
  const displayName =
    clerkUser.firstName || clerkUser.username || email.split("@")[0] || ""
  const profileImage = clerkUser.imageUrl || ""

  // If Supabase is enabled, sync user and load preferences
  if (isSupabaseEnabled) {
    const supabase = await createGuestServerClient()
    if (supabase) {
      // Upsert user into Supabase
      const { error: upsertError } = await supabase.from("users").upsert(
        {
          id: clerkUser.id,
          email,
          display_name: displayName,
          profile_image: profileImage,
          anonymous: false,
          credits_remaining: 100,
          created_at: new Date().toISOString(),
        },
        { onConflict: "id", ignoreDuplicates: true }
      )

      if (upsertError && upsertError.code !== "23505") {
        console.error("Error upserting user:", upsertError)
      }

      // Fetch user with preferences
      const { data: userProfileData } = await supabase
        .from("users")
        .select("*, user_preferences(*)")
        .eq("id", clerkUser.id)
        .single()

      if (userProfileData) {
        const formattedPreferences = userProfileData.user_preferences
          ? convertFromApiFormat(userProfileData.user_preferences)
          : defaultPreferences

        return {
          ...userProfileData,
          profile_image: profileImage,
          display_name: displayName,
          preferences: formattedPreferences,
        } as UserProfile
      }
    }
  }

  // Fallback: return profile from Clerk data only
  return {
    id: clerkUser.id,
    email,
    display_name: displayName,
    profile_image: profileImage,
    anonymous: false,
    preferences: defaultPreferences,
  } as UserProfile
}
