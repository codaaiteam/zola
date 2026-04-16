import type { ModelConfig } from "@/lib/models/types"

/**
 * Build a map of lowercase aliases → model ID for @mention matching.
 * Includes full name, short name variants, and common shorthands.
 */
export function getModelAliases(
  models: ModelConfig[]
): Map<string, string> {
  const aliases = new Map<string, string>()

  for (const model of models) {
    const name = model.name.toLowerCase()
    // Full name: "Claude Sonnet 4.6" → claude-sonnet-4.6
    aliases.set(name, model.id)

    // First word: "Claude" → claude-sonnet-4.6 (first match wins)
    const firstWord = name.split(" ")[0]
    if (firstWord && !aliases.has(firstWord)) {
      aliases.set(firstWord, model.id)
    }

    // Two-word prefix: "Claude Sonnet" → claude-sonnet-4.6
    const words = name.split(" ")
    if (words.length >= 2) {
      const twoWord = `${words[0]} ${words[1]}`
      if (!aliases.has(twoWord)) {
        aliases.set(twoWord, model.id)
      }
    }

    // Model ID itself: "gpt-5.4" → gpt-5.4
    aliases.set(model.id.toLowerCase(), model.id)
  }

  return aliases
}

/**
 * Extract @mentioned model IDs from message text.
 * Returns deduplicated array of model IDs.
 */
export function parseMentions(
  text: string,
  models: ModelConfig[]
): string[] {
  const aliases = getModelAliases(models)

  // Sort alias keys by length descending so longer names match first
  const sortedKeys = Array.from(aliases.keys()).sort(
    (a, b) => b.length - a.length
  )

  // Build a regex that matches @alias for each known alias
  // Escape special regex chars in alias names
  const escaped = sortedKeys.map((k) =>
    k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  )
  if (escaped.length === 0) return []

  const pattern = new RegExp(`@(${escaped.join("|")})(?=\\s|@|$)`, "gi")
  const found = new Set<string>()

  let match
  while ((match = pattern.exec(text)) !== null) {
    const alias = match[1].toLowerCase()
    const modelId = aliases.get(alias)
    if (modelId) found.add(modelId)
  }

  return Array.from(found)
}

/**
 * Remove @mention tokens from text, leaving clean prompt content.
 */
export function stripMentions(
  text: string,
  models: ModelConfig[]
): string {
  const aliases = getModelAliases(models)
  const sortedKeys = Array.from(aliases.keys()).sort(
    (a, b) => b.length - a.length
  )
  const escaped = sortedKeys.map((k) =>
    k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  )
  if (escaped.length === 0) return text

  const pattern = new RegExp(
    `@(${escaped.join("|")})(?=\\s|@|$)`,
    "gi"
  )
  return text.replace(pattern, "").replace(/\s{2,}/g, " ").trim()
}

/**
 * Find the @mention query at the cursor position (text after last @).
 * Returns null if no active mention query.
 */
export function getActiveMentionQuery(
  text: string,
  cursorPos: number
): { query: string; start: number } | null {
  // Look backwards from cursor for @
  const before = text.slice(0, cursorPos)
  const atIdx = before.lastIndexOf("@")
  if (atIdx === -1) return null

  // @ must be at start or preceded by whitespace
  if (atIdx > 0 && !/\s/.test(before[atIdx - 1])) return null

  const query = before.slice(atIdx + 1)
  // No spaces allowed in active query (means user finished typing the mention)
  // Actually allow spaces for multi-word model names like "Claude Sonnet"
  // But stop if there are 3+ words (likely past the mention)
  if (query.split(/\s+/).length > 3) return null

  return { query, start: atIdx }
}

/**
 * Filter models by a partial query string for autocomplete.
 */
export function filterModelsForMention(
  query: string,
  models: ModelConfig[]
): ModelConfig[] {
  if (!query) return models

  const q = query.toLowerCase()
  return models.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      (m.modelFamily && m.modelFamily.toLowerCase().includes(q)) ||
      m.id.toLowerCase().includes(q)
  )
}
