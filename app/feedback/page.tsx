"use client"

import { ZolaFaviconIcon } from "@/components/icons/zola"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/toast"
import { createClient } from "@/lib/supabase/client"
import { isSupabaseEnabled } from "@/lib/supabase/config"
import { useUser } from "@/lib/user-store/provider"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function FeedbackPage() {
  const { user } = useUser()
  const [feedback, setFeedback] = useState("")
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!feedback.trim() || !user?.id) return

    setStatus("submitting")
    try {
      if (!isSupabaseEnabled) {
        toast({ title: "Feedback not available", status: "error" })
        return
      }
      const supabase = createClient()
      if (!supabase) return

      const { error } = await supabase.from("feedback").insert({
        message: feedback,
        user_id: user.id,
      })

      if (error) {
        toast({ title: "Failed to submit feedback", status: "error" })
        setStatus("idle")
        return
      }

      setStatus("success")
    } catch {
      toast({ title: "Something went wrong", status: "error" })
      setStatus("idle")
    }
  }

  return (
    <div className="bg-background min-h-screen w-screen">
      <header className="border-b">
        <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-base font-medium tracking-tight"
          >
            <ZolaFaviconIcon className="size-7" />
            <span className="font-medium">Notto</span>
            <span className="font-normal opacity-80">AI</span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Chat
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        {status === "success" ? (
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-emerald-100 p-3 dark:bg-emerald-500/10">
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
            <h1 className="text-foreground text-2xl font-semibold">
              Thank you!
            </h1>
            <p className="text-muted-foreground mt-2">
              Your feedback helps make NottoAI better.
            </p>
            <Link href="/" className="mt-6">
              <Button>Back to Chat</Button>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="text-foreground text-2xl font-semibold">
              Feedback
            </h1>
            <p className="text-muted-foreground mt-2 text-sm">
              What would make NottoAI better for you? We read every message.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us what you think..."
                className="border-input bg-background text-foreground placeholder:text-muted-foreground min-h-[160px] w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                autoFocus
                disabled={status === "submitting"}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Logged in as {user?.email}
                </p>
                <Button
                  type="submit"
                  disabled={!feedback.trim() || status === "submitting"}
                >
                  {status === "submitting" ? "Sending..." : "Send Feedback"}
                </Button>
              </div>
            </form>
          </>
        )}
      </main>
    </div>
  )
}
