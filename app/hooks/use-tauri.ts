"use client"

import { useEffect, useState } from "react"

export function useTauri() {
  const [isTauri, setIsTauri] = useState(false)

  useEffect(() => {
    setIsTauri("__TAURI_INTERNALS__" in window)
  }, [])

  return isTauri
}
