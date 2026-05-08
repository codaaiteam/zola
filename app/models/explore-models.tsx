"use client"

import AnthropicIcon from "@/components/icons/anthropic"
import DeepSeekIcon from "@/components/icons/deepseek"
import GeminiIcon from "@/components/icons/gemini"
import GrokIcon from "@/components/icons/grok"
import MetaIcon from "@/components/icons/meta"
import MistralIcon from "@/components/icons/mistral"
import OpenAIIcon from "@/components/icons/openai"
import PerplexityIcon from "@/components/icons/perplexity"
import { useUserPreferences } from "@/lib/user-preference-store/provider"
import { Eye, EyeSlash, MagnifyingGlass } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"
import type { ModelCardData } from "./types"

const PROVIDER_ICONS: Record<
  string,
  (p: React.SVGProps<SVGSVGElement>) => React.ReactNode
> = {
  openai: OpenAIIcon,
  anthropic: AnthropicIcon,
  google: GeminiIcon,
  gemini: GeminiIcon,
  deepseek: DeepSeekIcon,
  xai: GrokIcon,
  grok: GrokIcon,
  meta: MetaIcon,
  perplexity: PerplexityIcon,
  mistral: MistralIcon,
}

function ProviderIcon({ id, className }: { id: string; className?: string }) {
  const Icon = PROVIDER_ICONS[id] ?? OpenAIIcon
  return <Icon className={className} />
}

const CAPABILITY_FILTERS = [
  { key: "vision", label: "Vision" },
  { key: "tools", label: "Tools" },
  { key: "reasoning", label: "Reasoning" },
  { key: "webSearch", label: "Web Search" },
  { key: "openSource", label: "Open Source" },
] as const

const PRICE_TIERS = [
  { key: "free", label: "Free", test: (m: ModelCardData) => m.outputCost === 0 || m.tags.includes("free") },
  { key: "cheap", label: "< $1/M out", test: (m: ModelCardData) => (m.outputCost ?? 0) > 0 && (m.outputCost ?? 0) < 1 },
  { key: "mid", label: "$1–15/M out", test: (m: ModelCardData) => (m.outputCost ?? 0) >= 1 && (m.outputCost ?? 0) <= 15 },
  { key: "premium", label: "$15+/M out", test: (m: ModelCardData) => (m.outputCost ?? 0) > 15 },
] as const

export function ExploreModels({ models }: { models: ModelCardData[] }) {
  const router = useRouter()
  const { preferences, toggleModelVisibility, isModelHidden } =
    useUserPreferences()
  const [query, setQuery] = useState("")
  const [providerFilter, setProviderFilter] = useState<string | null>(null)
  const [capFilter, setCapFilter] = useState<string | null>(null)
  const [priceFilter, setPriceFilter] = useState<string | null>(null)

  const providers = useMemo(() => {
    const set = new Map<string, string>()
    models.forEach((m) => {
      if (!set.has(m.baseProviderId)) set.set(m.baseProviderId, m.provider)
    })
    return Array.from(set.entries()).map(([id, label]) => ({ id, label }))
  }, [models])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return models.filter((m) => {
      if (q && !`${m.name} ${m.description ?? ""} ${m.tags.join(" ")}`
        .toLowerCase()
        .includes(q)) return false
      if (providerFilter && m.baseProviderId !== providerFilter) return false
      if (capFilter && !(m as unknown as Record<string, boolean>)[capFilter])
        return false
      if (priceFilter) {
        const tier = PRICE_TIERS.find((t) => t.key === priceFilter)
        if (tier && !tier.test(m)) return false
      }
      return true
    })
  }, [models, query, providerFilter, capFilter, priceFilter])

  const hiddenCount = preferences.hiddenModels.length

  const handleChat = (modelId: string) => {
    router.push(`/?model=${encodeURIComponent(modelId)}`)
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Explore Models
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Click any model to start a chat. Use the eye icon to control which
          models appear in your picker.
          {hiddenCount > 0 ? (
            <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              {hiddenCount} hidden
            </span>
          ) : null}
        </p>
      </header>

      {/* Search + filters */}
      <div className="mb-6 space-y-3">
        <div className="relative">
          <MagnifyingGlass
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search models, e.g. claude, vision, free…"
            className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none dark:border-zinc-800 dark:bg-zinc-950"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={providerFilter === null}
            onClick={() => setProviderFilter(null)}
          >
            All providers
          </FilterChip>
          {providers.map((p) => (
            <FilterChip
              key={p.id}
              active={providerFilter === p.id}
              onClick={() =>
                setProviderFilter(providerFilter === p.id ? null : p.id)
              }
            >
              <ProviderIcon id={p.id} className="size-3.5" />
              {p.label}
            </FilterChip>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {CAPABILITY_FILTERS.map((c) => (
            <FilterChip
              key={c.key}
              active={capFilter === c.key}
              onClick={() => setCapFilter(capFilter === c.key ? null : c.key)}
            >
              {c.label}
            </FilterChip>
          ))}
          <span className="mx-1 self-center text-zinc-300">·</span>
          {PRICE_TIERS.map((t) => (
            <FilterChip
              key={t.key}
              active={priceFilter === t.key}
              onClick={() =>
                setPriceFilter(priceFilter === t.key ? null : t.key)
              }
            >
              {t.label}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-200 p-12 text-center text-sm text-zinc-500 dark:border-zinc-800">
          No models match those filters.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <ModelCard
              key={m.id}
              model={m}
              hidden={isModelHidden(m.id)}
              onChat={() => handleChat(m.id)}
              onToggle={() => toggleModelVisibility(m.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
        active
          ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-200"
      }`}
    >
      {children}
    </button>
  )
}

function ModelCard({
  model,
  hidden,
  onChat,
  onToggle,
}: {
  model: ModelCardData
  hidden: boolean
  onChat: () => void
  onToggle: () => void
}) {
  const isFree = model.outputCost === 0 || model.tags.includes("free")

  return (
    <div
      className={`group relative flex flex-col rounded-xl border p-4 transition-all hover:border-zinc-300 hover:shadow-sm dark:hover:border-zinc-700 ${
        hidden
          ? "border-dashed border-zinc-300 bg-zinc-50/50 dark:border-zinc-700 dark:bg-zinc-900/50"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <ProviderIcon id={model.baseProviderId} className="size-4" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight text-zinc-900 dark:text-zinc-100">
              {model.name}
            </div>
            <div className="text-xs text-zinc-500">{model.provider}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggle}
          aria-label={hidden ? "Show in picker" : "Hide from picker"}
          title={hidden ? "Show in picker" : "Hide from picker"}
          className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
        >
          {hidden ? <EyeSlash size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {model.description ? (
        <p className="mb-3 line-clamp-3 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {model.description}
        </p>
      ) : null}

      <div className="mb-3 flex flex-wrap gap-1">
        {model.reasoning ? <Tag>reasoning</Tag> : null}
        {model.vision ? <Tag>vision</Tag> : null}
        {model.tools ? <Tag>tools</Tag> : null}
        {model.webSearch ? <Tag>web</Tag> : null}
        {model.openSource ? <Tag>open-source</Tag> : null}
        {isFree ? <Tag tone="green">free</Tag> : null}
      </div>

      <dl className="mt-auto mb-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-zinc-500">
        {model.contextWindow ? (
          <>
            <dt>Context</dt>
            <dd className="text-right text-zinc-700 dark:text-zinc-300">
              {formatContext(model.contextWindow)}
            </dd>
          </>
        ) : null}
        {model.inputCost !== null && model.outputCost !== null ? (
          <>
            <dt>Price /1M</dt>
            <dd className="text-right text-zinc-700 dark:text-zinc-300">
              ${model.inputCost} / ${model.outputCost}
            </dd>
          </>
        ) : null}
        {model.intelligence ? (
          <>
            <dt>Intelligence</dt>
            <dd className="text-right text-zinc-700 dark:text-zinc-300">
              {model.intelligence}
            </dd>
          </>
        ) : null}
        {model.speed ? (
          <>
            <dt>Speed</dt>
            <dd className="text-right text-zinc-700 dark:text-zinc-300">
              {model.speed}
            </dd>
          </>
        ) : null}
      </dl>

      <button
        type="button"
        onClick={onChat}
        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Chat with {model.name}
      </button>
    </div>
  )
}

function Tag({
  children,
  tone = "default",
}: {
  children: React.ReactNode
  tone?: "default" | "green"
}) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium ${
        tone === "green"
          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
      }`}
    >
      {children}
    </span>
  )
}

function formatContext(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`
  if (n >= 1_000) return `${Math.round(n / 1000)}K`
  return `${n}`
}
