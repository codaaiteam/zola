import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
  typescript: true,
})

// Product IDs
export const STRIPE_PRODUCTS = {
  free: "prod_UKaHJQzCqAG5D4",
  basic: "prod_UKaHyV6QbApqNr",
  pro: "prod_UKaHxTtrO0AhiL",
  enterprise: "prod_UKaHxrYlCjMEL5",
} as const

// Price IDs
export const STRIPE_PRICES = {
  free: {
    monthly: "price_1TLvDcLv5k7MCGvMaCfAUO33",
  },
  basic: {
    monthly: "price_1TLvDlLv5k7MCGvMh3Ji0IdX",
    yearly: "price_1TLvDoLv5k7MCGvMjY6ZtHc3",
  },
  pro: {
    monthly: "price_1TLvDoLv5k7MCGvM1N24DwSu",
    yearly: "price_1TLvDpLv5k7MCGvMWsCtg0Z2",
  },
  enterprise: {
    monthly: "price_1TLvDqLv5k7MCGvMpWPVHWy2",
    yearly: "price_1TLvDqLv5k7MCGvM0aZru0uM",
  },
} as const

// Map Stripe product IDs back to tier names
export const PRODUCT_TO_TIER: Record<string, string> = {
  [STRIPE_PRODUCTS.free]: "free",
  [STRIPE_PRODUCTS.basic]: "basic",
  [STRIPE_PRODUCTS.pro]: "pro",
  [STRIPE_PRODUCTS.enterprise]: "enterprise",
}
