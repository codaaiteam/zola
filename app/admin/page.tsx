import { createGuestServerClient } from "@/lib/supabase/server-guest"
import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

const ADMIN_EMAILS = ["bread888@gmail.com"]

type EventType =
  | "dmg_download"
  | "ios_reserve"
  | "landing_cta"
  | "pricing_cta"

type EventRow = {
  id: string
  event_type: EventType
  email: string | null
  cta_name: string | null
  referrer: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  user_agent: string | null
  ip_hash: string | null
  user_id: string | null
  created_at: string
}

function classify(referrer: string | null, utm_source: string | null) {
  if (utm_source) return utm_source
  if (!referrer) return "direct"
  try {
    const u = new URL(referrer)
    return u.hostname.replace(/^www\./, "")
  } catch {
    return "unknown"
  }
}

export default async function AdminPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const user = await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress
  if (!email || !ADMIN_EMAILS.includes(email.toLowerCase())) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <div className="space-y-2">
          <p className="text-lg font-medium">Not authorized.</p>
          <p className="text-muted-foreground text-sm">
            Signed in as {email ?? "unknown"}.
          </p>
        </div>
      </div>
    )
  }

  const supabase = await createGuestServerClient()
  if (!supabase) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <p>Supabase not configured.</p>
      </div>
    )
  }

  const { data: events, error } = await supabase
    .from("nottoai_download_events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(2000)

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <p className="text-red-600">Query failed: {error.message}</p>
      </div>
    )
  }

  const rows = (events ?? []) as EventRow[]
  const counts: Record<EventType, number> = {
    dmg_download: 0,
    ios_reserve: 0,
    landing_cta: 0,
    pricing_cta: 0,
  }
  const sources: Record<string, number> = {}
  for (const row of rows) {
    counts[row.event_type]++
    const src = classify(row.referrer, row.utm_source)
    sources[src] = (sources[src] ?? 0) + 1
  }
  const sortedSources = Object.entries(sources).sort((a, b) => b[1] - a[1])

  const reserves = rows.filter(
    (r) => r.event_type === "ios_reserve" && r.email
  )
  const since24h = Date.now() - 24 * 60 * 60 * 1000
  const last24 = rows.filter(
    (r) => new Date(r.created_at).getTime() > since24h
  ).length

  return (
    <div className="min-h-screen bg-white px-6 py-10 text-zinc-900">
      <div className="mx-auto max-w-5xl space-y-10">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">
            NottoAI · Admin
          </h1>
          <p className="text-sm text-zinc-500">
            Events tracking · last {rows.length} rows
          </p>
        </header>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Stat label="DMG downloads" value={counts.dmg_download} />
          <Stat label="iOS reserves" value={counts.ios_reserve} />
          <Stat label="Landing CTA" value={counts.landing_cta} />
          <Stat label="Pricing CTA" value={counts.pricing_cta} />
          <Stat label="Last 24h total" value={last24} />
        </section>

        <section>
          <h2 className="mb-3 text-base font-medium">Sources</h2>
          <div className="overflow-hidden rounded-lg border border-zinc-200">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-2">Source</th>
                  <th className="px-4 py-2 text-right">Events</th>
                </tr>
              </thead>
              <tbody>
                {sortedSources.map(([src, n]) => (
                  <tr key={src} className="border-t border-zinc-100">
                    <td className="px-4 py-2">{src}</td>
                    <td className="px-4 py-2 text-right tabular-nums">{n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-base font-medium">
            iOS Reservations ({reserves.length})
          </h2>
          <div className="overflow-hidden rounded-lg border border-zinc-200">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Source</th>
                  <th className="px-4 py-2">When</th>
                </tr>
              </thead>
              <tbody>
                {reserves.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-zinc-400"
                    >
                      No reservations yet.
                    </td>
                  </tr>
                ) : (
                  reserves.map((r) => (
                    <tr key={r.id} className="border-t border-zinc-100">
                      <td className="px-4 py-2 font-medium">{r.email}</td>
                      <td className="px-4 py-2 text-zinc-500">
                        {classify(r.referrer, r.utm_source)}
                      </td>
                      <td className="px-4 py-2 text-zinc-500">
                        {new Date(r.created_at).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-base font-medium">
            Recent events ({rows.slice(0, 100).length})
          </h2>
          <div className="overflow-hidden rounded-lg border border-zinc-200">
            <table className="w-full text-sm">
              <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-2">Event</th>
                  <th className="px-4 py-2">Detail</th>
                  <th className="px-4 py-2">Source</th>
                  <th className="px-4 py-2">When</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 100).map((r) => (
                  <tr key={r.id} className="border-t border-zinc-100">
                    <td className="px-4 py-2">{r.event_type}</td>
                    <td className="px-4 py-2 text-zinc-500">
                      {r.email ?? r.cta_name ?? "—"}
                    </td>
                    <td className="px-4 py-2 text-zinc-500">
                      {classify(r.referrer, r.utm_source)}
                    </td>
                    <td className="px-4 py-2 text-zinc-500">
                      {new Date(r.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4">
      <div className="text-xs text-zinc-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold tabular-nums">{value}</div>
    </div>
  )
}
