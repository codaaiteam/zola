"use client"

import { filterModelsForMention } from "@/lib/mentions"
import type { ModelConfig } from "@/lib/models/types"
import { PROVIDERS } from "@/lib/providers"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

type MentionAutocompleteProps = {
  query: string
  models: ModelConfig[]
  selectedIndex: number
  onSelect: (model: ModelConfig) => void
  visible: boolean
}

export function MentionAutocomplete({
  query,
  models,
  selectedIndex,
  onSelect,
  visible,
}: MentionAutocompleteProps) {
  const listRef = useRef<HTMLDivElement>(null)
  const filtered = filterModelsForMention(query, models)

  // Scroll selected item into view
  useEffect(() => {
    if (!listRef.current) return
    const items = listRef.current.querySelectorAll("[data-mention-item]")
    const el = items[selectedIndex] as HTMLElement
    el?.scrollIntoView({ block: "nearest" })
  }, [selectedIndex])

  if (!visible || filtered.length === 0) return null

  return (
    <div
      ref={listRef}
      className="bg-popover absolute bottom-full left-0 z-50 mb-2 max-h-72 w-72 overflow-y-auto rounded-xl border shadow-lg"
    >
      <div className="p-1">
        <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Mention a model
        </div>
        {filtered.map((model, i) => {
          const provider = PROVIDERS.find((p) => p.id === model.icon)
          const Icon = provider?.icon
          return (
            <button
              key={model.id}
              data-mention-item
              type="button"
              onMouseDown={(e) => {
                e.preventDefault()
                onSelect(model)
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                i === selectedIndex
                  ? "bg-accent text-accent-foreground"
                  : "hover:bg-accent/50"
              )}
            >
              {Icon && <Icon className="size-5 shrink-0" />}
              <span className="truncate">{model.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
