"use client"

type EventType =
  | "dmg_download"
  | "ios_reserve"
  | "landing_cta"
  | "pricing_cta"

type TrackPayload = {
  email?: string
  cta_name?: string
}

function readUtmFromLocation() {
  if (typeof window === "undefined") {
    return {
      utm_source: undefined,
      utm_medium: undefined,
      utm_campaign: undefined,
      referrer: undefined,
    }
  }
  const url = new URL(window.location.href)
  return {
    utm_source: url.searchParams.get("utm_source") ?? undefined,
    utm_medium: url.searchParams.get("utm_medium") ?? undefined,
    utm_campaign: url.searchParams.get("utm_campaign") ?? undefined,
    referrer: document.referrer || undefined,
  }
}

export async function track(eventType: EventType, payload: TrackPayload = {}) {
  const utm = readUtmFromLocation()
  try {
    const res = await fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        event_type: eventType,
        ...utm,
        ...payload,
      }),
      keepalive: true,
    })
    if (!res.ok) {
      const data = await res.json().catch(() => null)
      return { ok: false as const, error: data?.error ?? "track_failed" }
    }
    return { ok: true as const }
  } catch {
    return { ok: false as const, error: "network_error" }
  }
}
