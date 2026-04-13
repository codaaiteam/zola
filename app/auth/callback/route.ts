import { MODEL_DEFAULT } from "@/lib/config"
import { isSupabaseEnabled } from "@/lib/supabase/config"
import { createClient } from "@/lib/supabase/server"
import { createGuestServerClient } from "@/lib/supabase/server-guest"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const next = searchParams.get("next") ?? "/"

  // Determine redirect base URL (handle reverse proxy)
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    new URL(origin).host
  const protocol =
    request.headers.get("x-forwarded-proto") ||
    (host?.includes("localhost") ? "http" : "https")
  const baseUrl = `${protocol}://${host}`

  try {
    if (!isSupabaseEnabled) {
      return NextResponse.redirect(
        `${baseUrl}/auth/error?message=${encodeURIComponent("Supabase is not enabled.")}`
      )
    }

    const code = searchParams.get("code")
    if (!code) {
      return NextResponse.redirect(
        `${baseUrl}/auth/error?message=${encodeURIComponent("Missing authentication code")}`
      )
    }

    const supabase = await createClient()
    const supabaseAdmin = await createGuestServerClient()

    if (!supabase || !supabaseAdmin) {
      return NextResponse.redirect(
        `${baseUrl}/auth/error?message=${encodeURIComponent("Supabase client not available.")}`
      )
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("Auth callback error:", error.message)
      return NextResponse.redirect(
        `${baseUrl}/auth/error?message=${encodeURIComponent(error.message)}`
      )
    }

    const user = data?.user
    if (!user || !user.id || !user.email) {
      return NextResponse.redirect(
        `${baseUrl}/auth/error?message=${encodeURIComponent("Missing user info")}`
      )
    }

    try {
      const { error: insertError } = await supabaseAdmin.from("users").insert({
        id: user.id,
        email: user.email,
        created_at: new Date().toISOString(),
        message_count: 0,
        premium: false,
        favorite_models: [MODEL_DEFAULT],
      })

      if (insertError && insertError.code !== "23505") {
        console.error("Error inserting user:", insertError)
      }
    } catch (err) {
      console.error("User insert error:", err)
      // Non-fatal: user might already exist
    }

    return NextResponse.redirect(`${baseUrl}${next}`)
  } catch (err) {
    console.error("Auth callback unhandled error:", err)
    // Last resort: redirect to error page
    return NextResponse.redirect(
      `${baseUrl}/auth/error?message=${encodeURIComponent("An unexpected error occurred during authentication.")}`
    )
  }
}
