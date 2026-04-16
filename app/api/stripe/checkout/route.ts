import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { stripe, STRIPE_PRICES } from "@/lib/stripe"
import { createGuestServerClient } from "@/lib/supabase/server-guest"
import type { PlanTier } from "@/lib/pricing"

function getBaseUrl(req: NextRequest): string {
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host")
  const proto = req.headers.get("x-forwarded-proto") || "https"
  return host ? `${proto}://${host}` : req.nextUrl.origin
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { tier, billingPeriod } = (await req.json()) as {
      tier: PlanTier
      billingPeriod: "monthly" | "yearly"
    }

    if (tier === "free") {
      return NextResponse.json(
        { error: "Cannot checkout free plan" },
        { status: 400 }
      )
    }

    const prices = STRIPE_PRICES[tier]
    if (!prices) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const priceId =
      billingPeriod === "yearly" && "yearly" in prices
        ? prices.yearly
        : prices.monthly

    // Check if user already has a Stripe customer ID
    const supabase = await createGuestServerClient()
    let stripeCustomerId: string | null = null

    if (supabase) {
      const { data: user } = await supabase
        .from("users")
        .select("stripe_customer_id, email")
        .eq("id", userId)
        .single()

      if (user?.stripe_customer_id) {
        stripeCustomerId = user.stripe_customer_id
      } else if (user?.email) {
        // Create a new Stripe customer
        const customer = await stripe.customers.create({
          email: user.email,
          metadata: { clerk_user_id: userId },
        })
        stripeCustomerId = customer.id

        await supabase
          .from("users")
          .update({ stripe_customer_id: customer.id })
          .eq("id", userId)
      }
    }

    const sessionParams: Parameters<typeof stripe.checkout.sessions.create>[0] =
      {
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${getBaseUrl(req)}/?checkout=success`,
        cancel_url: `${getBaseUrl(req)}/pricing?checkout=cancelled`,
        metadata: { clerk_user_id: userId, tier },
        subscription_data: {
          metadata: { clerk_user_id: userId, tier },
        },
      }

    if (stripeCustomerId) {
      sessionParams.customer = stripeCustomerId
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    // Log checkout initiation to orders table
    if (supabase) {
      await supabase.from("nottoai_orders").insert({
        user_id: userId,
        event_type: "checkout_initiated",
        status: "pending",
        tier,
        billing_period: billingPeriod,
        stripe_customer_id: stripeCustomerId,
        stripe_session_id: session.id,
        stripe_price_id: priceId,
      })
    }

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Stripe checkout error:", error)
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    )
  }
}
