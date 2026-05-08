import { createGuestServerClient } from "@/lib/supabase/server-guest"
import { auth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  const chatId = req.nextUrl.searchParams.get("chatId")
  if (!chatId) {
    return NextResponse.json({ error: "missing_chat_id" }, { status: 400 })
  }

  const limitParam = req.nextUrl.searchParams.get("limit")
  const limit = limitParam ? Math.min(parseInt(limitParam, 10) || 0, 500) : 0

  const supabase = await createGuestServerClient()
  if (!supabase) {
    return NextResponse.json({ messages: [] })
  }

  // Verify chat ownership before returning messages
  const { data: chat, error: chatErr } = await supabase
    .from("chats")
    .select("id, user_id")
    .eq("id", chatId)
    .maybeSingle()

  if (chatErr) {
    console.error("Failed to verify chat:", chatErr)
    return NextResponse.json({ error: "fetch_failed" }, { status: 500 })
  }
  if (!chat) {
    return NextResponse.json({ messages: [] })
  }
  if (chat.user_id !== userId) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 })
  }

  let query = supabase
    .from("messages")
    .select(
      "id, content, role, experimental_attachments, created_at, parts, message_group_id, model"
    )
    .eq("chat_id", chatId)

  if (limit > 0) {
    query = query.order("created_at", { ascending: false }).limit(limit)
  } else {
    query = query.order("created_at", { ascending: true })
  }

  const { data, error } = await query

  if (error) {
    console.error("Failed to fetch messages:", error)
    return NextResponse.json({ error: "fetch_failed" }, { status: 500 })
  }

  // If we ordered desc for limit, flip back to ascending for the client
  const messages = limit > 0 ? (data ?? []).reverse() : (data ?? [])
  return NextResponse.json({ messages })
}
