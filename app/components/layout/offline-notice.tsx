"use client"

import { useTauri } from "@/app/hooks/use-tauri"
import { WifiSlash } from "@phosphor-icons/react"
import { useEffect, useState } from "react"

export function OfflineNotice() {
  const isTauri = useTauri()
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    if (!isTauri) return

    const handleOffline = () => setIsOffline(true)
    const handleOnline = () => setIsOffline(false)

    setIsOffline(!navigator.onLine)

    window.addEventListener("offline", handleOffline)
    window.addEventListener("online", handleOnline)

    return () => {
      window.removeEventListener("offline", handleOffline)
      window.removeEventListener("online", handleOnline)
    }
  }, [isTauri])

  if (!isOffline) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 text-center">
        <WifiSlash size={48} className="text-muted-foreground" />
        <h2 className="text-xl font-semibold">No Internet Connection</h2>
        <p className="text-muted-foreground max-w-sm text-sm">
          NottoAI requires an internet connection. Please check your network and try again.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  )
}
