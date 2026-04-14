import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { createGuestServerClient } from "@/lib/supabase/server-guest"

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createGuestServerClient()
    if (!supabase) {
      return NextResponse.json(
        { error: "Database unavailable" },
        { status: 500 }
      )
    }

    const { data: user } = await supabase
      .from("users")
      .select("stripe_customer_id")
      .eq("id", userId)
      .single()

    if (!user?.stripe_customer_id) {
      return NextResponse.json(
        { error: "No subscription found" },
        { status: 404 }
      )
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: `${req.nextUrl.origin}/pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe portal error:", error)
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 }
    )
  }
}
