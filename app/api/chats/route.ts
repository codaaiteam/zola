import { createGuestServerClient } from "@/lib/supabase/server-guest"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  const supabase = await createGuestServerClient()
  if (!supabase) {
    return NextResponse.json({ chats: [] })
  }

  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("user_id", userId)
    .order("pinned", { ascending: false })
    .order("pinned_at", { ascending: false, nullsFirst: false })
    .order("updated_at", { ascending: false })

  if (error) {
    console.error("Failed to fetch chats:", error)
    return NextResponse.json({ error: "fetch_failed" }, { status: 500 })
  }

  return NextResponse.json({ chats: data ?? [] })
}
