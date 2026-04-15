import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createGuestServerClient } from "@/lib/supabase/server-guest"

export async function GET(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createGuestServerClient()
    if (!supabase) {
      return NextResponse.json({ logs: [], daily: [], byModel: [] })
    }

    const url = new URL(req.url)
    const days = parseInt(url.searchParams.get("days") || "30", 10)
    const since = new Date()
    since.setDate(since.getDate() - days)

    // Recent logs (last 50)
    const { data: logs } = await supabase
      .from("credit_logs")
      .select("id, model_id, tokens_used, credits_cost, credits_after, chat_id, created_at")
      .eq("user_id", userId)
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: false })
      .limit(50)

    // Daily aggregation
    const { data: allLogs } = await supabase
      .from("credit_logs")
      .select("model_id, credits_cost, tokens_used, created_at")
      .eq("user_id", userId)
      .gte("created_at", since.toISOString())
      .order("created_at", { ascending: true })

    // Aggregate by day
    const dailyMap = new Map<string, { credits: number; messages: number }>()
    const modelMap = new Map<
      string,
      { credits: number; messages: number; tokens: number }
    >()

    for (const log of allLogs ?? []) {
      const day = log.created_at.slice(0, 10)
      const d = dailyMap.get(day) ?? { credits: 0, messages: 0 }
      d.credits += log.credits_cost
      d.messages += 1
      dailyMap.set(day, d)

      const m = modelMap.get(log.model_id) ?? {
        credits: 0,
        messages: 0,
        tokens: 0,
      }
      m.credits += log.credits_cost
      m.messages += 1
      m.tokens += log.tokens_used
      modelMap.set(log.model_id, m)
    }

    const daily = Array.from(dailyMap.entries()).map(([date, data]) => ({
      date,
      ...data,
    }))

    const byModel = Array.from(modelMap.entries())
      .map(([modelId, data]) => ({
        modelId,
        ...data,
      }))
      .sort((a, b) => b.credits - a.credits)

    const totalCredits = byModel.reduce((s, m) => s + m.credits, 0)
    const totalMessages = byModel.reduce((s, m) => s + m.messages, 0)

    return NextResponse.json({
      logs: logs ?? [],
      daily,
      byModel,
      totalCredits,
      totalMessages,
    })
  } catch (error) {
    console.error("Usage fetch error:", error)
    return NextResponse.json(
      { error: "Failed to fetch usage" },
      { status: 500 }
    )
  }
}
