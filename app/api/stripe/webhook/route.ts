import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { stripe, PRODUCT_TO_TIER } from "@/lib/stripe"
import { PRICING_PLANS } from "@/lib/pricing"
import { createGuestServerClient } from "@/lib/supabase/server-guest"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  const supabase = await createGuestServerClient()
  if (!supabase) {
    console.error("Supabase not available for webhook processing")
    return NextResponse.json(
      { error: "Database unavailable" },
      { status: 500 }
    )
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session
        const clerkUserId = session.metadata?.clerk_user_id
        const customerId =
          typeof session.customer === "string" ? session.customer : null

        if (clerkUserId && customerId) {
          await supabase
            .from("users")
            .update({ stripe_customer_id: customerId })
            .eq("id", clerkUserId)
        }
        break
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionChange(supabase, subscription)
        break
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription
        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : null

        if (customerId) {
          await supabase
            .from("users")
            .update({
              subscription_id: null,
              subscription_status: "free",
              subscription_tier: "free",
              subscription_current_period_end: null,
              premium: false,
              credits_remaining: 500,
            })
            .eq("stripe_customer_id", customerId)
        }
        break
      }

      case "invoice.paid": {
        // Reset credits on successful payment (new billing cycle)
        const invoice = event.data.object as Stripe.Invoice
        const customerId =
          typeof invoice.customer === "string" ? invoice.customer : null
        const subscriptionId =
          typeof invoice.parent?.subscription_details?.subscription === "string"
            ? invoice.parent.subscription_details.subscription
            : null

        if (customerId && subscriptionId) {
          // Look up the subscription to determine the tier
          const sub = await stripe.subscriptions.retrieve(subscriptionId)
          const productId =
            typeof sub.items.data[0]?.price.product === "string"
              ? sub.items.data[0].price.product
              : null
          const tier = productId ? PRODUCT_TO_TIER[productId] : null
          const plan = PRICING_PLANS.find((p) => p.tier === tier)

          if (plan) {
            await supabase
              .from("users")
              .update({
                credits_remaining: plan.credits,
                credits_reset_at: new Date().toISOString(),
              })
              .eq("stripe_customer_id", customerId)
          }
        }
        break
      }
    }
  } catch (error) {
    console.error("Webhook handler error:", error)
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    )
  }

  return NextResponse.json({ received: true })
}

async function handleSubscriptionChange(
  supabase: Awaited<ReturnType<typeof createGuestServerClient>>,
  subscription: Stripe.Subscription
) {
  if (!supabase) return

  const customerId =
    typeof subscription.customer === "string" ? subscription.customer : null
  if (!customerId) return

  const productId =
    typeof subscription.items.data[0]?.price.product === "string"
      ? subscription.items.data[0].price.product
      : null
  const tier = productId ? PRODUCT_TO_TIER[productId] : "free"
  const plan = PRICING_PLANS.find((p) => p.tier === tier)
  const isActive =
    subscription.status === "active" || subscription.status === "trialing"

  await supabase
    .from("users")
    .update({
      subscription_id: subscription.id,
      subscription_status: subscription.status,
      subscription_tier: tier,
      subscription_current_period_end: subscription.items.data[0]
        ? new Date(
            subscription.items.data[0].current_period_end * 1000
          ).toISOString()
        : null,
      premium: isActive && tier !== "free",
      credits_remaining: plan?.credits ?? 500,
    })
    .eq("stripe_customer_id", customerId)
}
