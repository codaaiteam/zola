import { createGuestServerClient } from "@/lib/supabase/server-guest"
import { auth } from "@clerk/nextjs/server"
import { createHash } from "crypto"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const VALID_EVENT_TYPES = [
  "dmg_download",
  "ios_reserve",
  "landing_cta",
  "pricing_cta",
] as const

type EventType = (typeof VALID_EVENT_TYPES)[number]

type TrackBody = {
  event_type: EventType
  email?: string
  cta_name?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer?: string
}

const IP_HASH_SALT = process.env.IP_HASH_SALT ?? "nottoai-ip-salt"

function hashIp(ip: string | null): string | null {
  if (!ip) return null
  return createHash("sha256").update(`${IP_HASH_SALT}:${ip}`).digest("hex")
}

function isValidEmail(value: unknown): value is string {
  return (
    typeof value === "string" &&
    value.length <= 320 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  )
}

export async function POST(req: NextRequest) {
  let body: TrackBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 })
  }

  if (!VALID_EVENT_TYPES.includes(body.event_type)) {
    return NextResponse.json({ error: "invalid_event_type" }, { status: 400 })
  }

  if (body.event_type === "ios_reserve" && !isValidEmail(body.email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 })
  }

  const supabase = await createGuestServerClient()
  if (!supabase) {
    return NextResponse.json({ ok: true, persisted: false })
  }

  const headerList = await headers()
  const ip =
    headerList.get("cf-connecting-ip") ??
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headerList.get("x-real-ip") ??
    null
  const userAgent = headerList.get("user-agent")?.slice(0, 500) ?? null

  const { userId } = await auth()

  const { error } = await supabase.from("nottoai_download_events").insert({
    event_type: body.event_type,
    email: body.event_type === "ios_reserve" ? body.email!.toLowerCase() : null,
    cta_name: body.cta_name?.slice(0, 100) ?? null,
    referrer: body.referrer?.slice(0, 500) ?? null,
    utm_source: body.utm_source?.slice(0, 100) ?? null,
    utm_medium: body.utm_medium?.slice(0, 100) ?? null,
    utm_campaign: body.utm_campaign?.slice(0, 100) ?? null,
    user_agent: userAgent,
    ip_hash: hashIp(ip),
    user_id: userId,
  })

  if (error) {
    console.error("track insert failed", error)
    return NextResponse.json({ error: "insert_failed" }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
