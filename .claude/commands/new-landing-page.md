---
description: Create a new SEO landing page (e.g. /new-landing-page "Claude Opus 4.7" or /new-landing-page "GPT-5.4 比较")
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebSearch, Agent
---

# Create a New SEO Landing Page

You are creating a new SEO-optimized landing page for the NottoAI project. The user will provide a **topic** as the argument (e.g. "Claude Opus 4.7", "GPT-5.4 vs Claude", "Best AI Models 2026").

## Steps

### 1. Research the topic

- Use `WebSearch` to find the latest information, features, benchmarks, and news about the topic
- Gather enough data to write compelling, factual content
- Note any leaked/unconfirmed info and mark it clearly on the page

### 2. Determine the route slug

- Convert the topic to a URL-friendly slug (e.g. "Claude Opus 4.7" → `claude-opus-4-7`)
- The page will live at `app/<slug>/page.tsx`
- Confirm the directory doesn't already exist

### 3. Create the page component

Create `app/<slug>/page.tsx` following these **mandatory patterns** from the existing codebase:

#### Layout & Overlay
- Must use `"use client"` directive
- Root div MUST have `className="fixed inset-0 z-50 overflow-y-auto bg-white text-zinc-900 dark:bg-zinc-950 dark:text-white"` — this overlays the sidebar
- Export as `export default function`

#### Light/Dark Mode
- ALL colors must have `dark:` variants
- Light mode: white/zinc backgrounds, zinc-900 text
- Dark mode: zinc-950 background, white text
- Sections that are always dark (like benchmark bars) use `bg-zinc-950 text-white` without conditional

#### Nav Header (copy this pattern exactly)
```tsx
<header className="sticky top-0 z-20 border-b border-zinc-200/50 bg-white/60 backdrop-blur-xl dark:border-white/5 dark:bg-zinc-950/80">
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
    <Link href="/" className="inline-flex items-center gap-1.5 text-base font-medium tracking-tight">
      <ZolaFaviconIcon className="size-7" />
      <span className="font-semibold">Notto</span>
      <span className="font-normal opacity-50">AI</span>
    </Link>
    <div className="flex items-center gap-4">
      <Link href="/pricing" className="hidden text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white sm:inline">Pricing</Link>
      <SignInButton mode="modal">
        <button className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-all hover:bg-zinc-50 hover:shadow-sm dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/5 dark:hover:text-white">Sign In</button>
      </SignInButton>
      <SignInButton mode="modal">
        <button className="rounded-full bg-<ACCENT>-600 px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-<ACCENT>-500 hover:shadow-lg hover:shadow-<ACCENT>-500/25">
          <CTA TEXT>
        </button>
      </SignInButton>
    </div>
  </div>
</header>
```

#### Footer (copy this pattern exactly)
```tsx
<footer className="border-t border-zinc-100 bg-zinc-50 dark:border-white/5 dark:bg-zinc-950">
  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row lg:px-12">
    <div className="flex items-center gap-2">
      <ZolaFaviconIcon className="size-5" />
      <span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">© 2026 NottoAI</span>
    </div>
    <div className="flex gap-6">
      <Link href="/pricing" className="text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">Pricing</Link>
      <Link href="/privacy" className="text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">Privacy</Link>
      <Link href="/terms" className="text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">Terms</Link>
      <a href="mailto:contact@nottoai.com" className="text-sm text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300">Contact</a>
    </div>
  </div>
</footer>
```

#### Required Imports
```tsx
import Link from "next/link"
import { ZolaFaviconIcon } from "@/components/icons/zola"
import { SignInButton } from "@clerk/nextjs"
import { motion, useInView, useScroll, useTransform } from "motion/react"
```

#### Provider Icons (use as needed)
```tsx
import AnthropicIcon from "@/components/icons/anthropic"
import OpenAIIcon from "@/components/icons/openai"
import GeminiIcon from "@/components/icons/gemini"
import DeepSeekIcon from "@/components/icons/deepseek"
import GrokIcon from "@/components/icons/grok"
import PerplexityIcon from "@/components/icons/perplexity"
import XaiIcon from "@/components/icons/xai"
import MetaIcon from "@/components/icons/meta"
```

#### Animation Helpers (include these in every page)
- `FadeIn` — fade + slide up on scroll into view
- `StaggerWrap` + `staggerChild` — staggered reveal for grids
- `Counter` — animated number counter
- `TextReveal` — word-by-word headline reveal

Copy these from `app/claude-opus-4-7/page.tsx` as reference.

#### Section Patterns
Each page should have 5-8 sections from this menu (pick what fits the topic):

| Section | When to use |
|---|---|
| Hero with gradient + TextReveal headline | Always (first section) |
| Stats bar with Counter | When you have 3-4 key numbers |
| Feature/capability bento grid (3-col) | When listing features/capabilities |
| Benchmark bars (always-dark section) | When comparing performance scores |
| Comparison table (us vs them or multi-model) | When comparing models/products |
| Use cases (2-col cards) | When showing applications |
| Timeline | When showing version history |
| How it works (3-step) | When explaining a process |
| Pricing comparison | When showing cost savings |
| Final CTA | Always (last section before footer) |

#### Color Accents
Pick a primary accent color that fits the topic brand:
- Anthropic/Claude → `violet`
- OpenAI/GPT → `blue`
- Google/Gemini → `cyan`
- General/NottoAI → `emerald`
- Comparison pages → `indigo`

### 4. Register the route as public

Add the slug to the public routes in `middleware.ts`:
```ts
const isPublicRoute = createRouteMatcher([
  // ... existing routes
  "/<slug>",   // ← add here
])
```

### 5. Add to sitemap

Add an entry in `app/sitemap.ts`:
```ts
{
  url: `${baseUrl}/<slug>`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.8,
},
```

### 6. Add footer link

Add a link in the main landing page footer at `app/components/landing/landing-page.tsx`:
```tsx
<Link href="/<slug>" className="text-sm text-zinc-400 hover:text-zinc-600"><Page Title></Link>
```

### 7. Verify

- Run `npx eslint app/<slug>/page.tsx` to check for lint errors
- Run `npx tsc --noEmit 2>&1 | grep "<slug>"` to check for type errors
- Fix any issues found

### 8. Report

Tell the user:
- The route URL
- What sections were included
- That it needs `npm run dev` to preview
- Remind them to commit when satisfied
