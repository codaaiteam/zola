import { LayoutApp } from "@/app/components/layout/layout-app"
import { getAllModels } from "@/lib/models"
import { ExploreModels } from "./explore-models"
import type { ModelCardData } from "./types"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Explore Models",
  description:
    "Browse 16+ AI models in NottoAI. Click any model to start chatting, or pin which models appear in your picker.",
}

export default async function ModelsPage() {
  const fullModels = await getAllModels()

  // Drop the apiSdk fn — not serializable, not needed in the UI
  const models: ModelCardData[] = fullModels.map((m) => ({
    id: m.id,
    name: m.name,
    provider: m.provider,
    providerId: m.providerId,
    modelFamily: m.modelFamily ?? null,
    baseProviderId: m.baseProviderId,
    description: m.description ?? null,
    tags: m.tags ?? [],
    contextWindow: m.contextWindow ?? null,
    inputCost: m.inputCost ?? null,
    outputCost: m.outputCost ?? null,
    priceUnit: m.priceUnit ?? null,
    vision: !!m.vision,
    tools: !!m.tools,
    audio: !!m.audio,
    reasoning: !!m.reasoning,
    webSearch: !!m.webSearch,
    openSource: !!m.openSource,
    speed: m.speed ?? null,
    intelligence: m.intelligence ?? null,
    icon: m.icon ?? null,
    releasedAt: m.releasedAt ?? null,
  }))

  return (
    <LayoutApp>
      <ExploreModels models={models} />
    </LayoutApp>
  )
}
