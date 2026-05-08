export type ModelCardData = {
  id: string
  name: string
  provider: string
  providerId: string
  modelFamily: string | null
  baseProviderId: string
  description: string | null
  tags: string[]
  contextWindow: number | null
  inputCost: number | null
  outputCost: number | null
  priceUnit: string | null
  vision: boolean
  tools: boolean
  audio: boolean
  reasoning: boolean
  webSearch: boolean
  openSource: boolean
  speed: "Fast" | "Medium" | "Slow" | null
  intelligence: "Low" | "Medium" | "High" | null
  icon: string | null
  releasedAt: string | null
}
