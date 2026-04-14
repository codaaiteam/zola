import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createGuestServerClient } from "@/lib/supabase/server-guest"

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createGuestServerClient()
    if (!supabase) {
      return NextResponse.json({ tier: "free", credits: 500, maxCredits: 500 })
    }

    const { data: user } = await supabase
      .from("users")
      .select(
        "subscription_tier, subscription_status, credits_remaining, subscription_current_period_end"
      )
      .eq("id", userId)
      .single()

    if (!user) {
      return NextResponse.json({ tier: "free", credits: 500, maxCredits: 500 })
    }

    const tier = user.subscription_tier || "free"
    const credits = user.credits_remaining ?? 500
    const maxCreditsMap: Record<string, number> = {
      free: 500,
      basic: 15000,
      pro: 100000,
      enterprise: 210000,
    }

    return NextResponse.json({
      tier,
      status: user.subscription_status || "free",
      credits,
      maxCredits: maxCreditsMap[tier] || 500,
      periodEnd: user.subscription_current_period_end,
    })
  } catch (error) {
    console.error("Subscription fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch subscription" },
      { status: 500 }
    )
  }
}
