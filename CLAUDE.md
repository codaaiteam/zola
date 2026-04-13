# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Next.js dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — Next/ESLint
- `npm run type-check` — `tsc --noEmit`

No test runner is configured. See `INSTALL.md` for full setup (auth, file uploads, Supabase, Ollama, Docker).

Quick start (cloud): set `OPENAI_API_KEY` in `.env.local` and `npm run dev`.
Quick start (local): install Ollama, `ollama pull llama3.2`, then `npm run dev` — Zola auto-detects local models.
Docker: `docker-compose -f docker-compose.ollama.yml up`.
Bundle analysis: `ANALYZE=true npm run build`.

## Architecture

Zola is a Next.js 16 (App Router, React 19) chat UI that fronts many LLM providers via the Vercel AI SDK. Supabase is optional — without it the app runs in a guest/local mode.

### Model + provider layer (`lib/`)

- `lib/models/` — model registry. Each provider has a `data/<provider>.ts` file exporting `ModelConfig[]`. Every model carries an `apiSdk(apiKey, opts)` factory that returns a `LanguageModelV1`. `index.ts` aggregates them into `STATIC_MODELS`, then `getAllModels()` merges in dynamically-detected Ollama models (5-min cache). Use `getModelInfo(id)` for sync lookups; it falls back to static models when the cache is cold.
- `lib/openproviders/` — thin factory (`openproviders(modelId, settings, apiKey)`) that picks the right `@ai-sdk/*` provider based on `provider-map.ts`. Per-user `apiKey` overrides the env-key default by calling each provider's `create*` constructor. Ollama is wrapped through `createOpenAI` against `OLLAMA_BASE_URL`.
- `lib/user-keys.ts` + `lib/encryption.ts` — BYOK keys are stored encrypted in Supabase and resolved at request time via `getEffectiveApiKey`.
- `lib/config.ts` — central feature flags, defaults, free-model list, system prompt.

### Chat request flow

`app/api/chat/route.ts` is the single streaming endpoint:
1. `validateAndTrackUsage` (in `app/api/chat/api.ts`) enforces per-user/guest quotas against Supabase and returns the client (or `null` in guest mode — most DB writes are conditional on `supabase` being non-null).
2. `logUserMessage` persists the user turn. If `editCutoffTimestamp` is set, messages at/after that timestamp are deleted first (this powers user-message editing).
3. `getAllModels()` → `modelConfig.apiSdk(apiKey, { enableSearch })` builds the provider; `streamText` runs it and `onFinish` calls `storeAssistantMessage`.
4. `toDataStreamResponse` returns the AI SDK data stream. Errors are normalized through `app/api/chat/utils.ts`.

### Persistence (`lib/chat-store/`)

Dual-layer: IndexedDB (via `idb-keyval`, see `persist.ts`, DB `zola-db`) caches chats/messages on the client, and Supabase is the server source of truth when configured. `chats/` and `messages/` each expose `api.ts` (network) and `provider.tsx` (React context using TanStack Query). Treat IDB as cache — server writes flow through `app/api/*` routes guarded by CSRF.

### Auth, security, middleware

- `middleware.ts` runs `updateSession` (Supabase SSR cookie refresh), enforces CSRF on POST/PUT/DELETE via `lib/csrf.ts` (header `x-csrf-token` must match the `csrf_token` cookie), and sets a strict CSP. Note `runtime: "nodejs"` and the matcher excludes `/api`.
- Supabase clients live in `lib/supabase/` (`client.ts` browser, `server.ts` SSR, `server-guest.ts` for unauthenticated flows). Always use the right one for the context.

### Frontend structure

- `app/` — App Router routes. `app/components/` holds feature components (`chat/`, `chat-input/`, `multi-chat/`, `history/`, `layout/`).
- `components/` — shared primitives: `ui/` (shadcn/ui), `prompt-kit/`, `motion-primitives/`, `common/`, `icons/`.
- State: TanStack Query for server state, Zustand stores under `lib/model-store/`, `lib/user-store/`, `lib/user-preference-store/`. Providers are composed in `app/layout.tsx`.

## Conventions

- Imports use `@/*` paths (see `tsconfig.json`). Prettier sorts imports via `@ianvs/prettier-plugin-sort-imports`.
- When adding a new provider/model: add a `lib/models/data/<provider>.ts` entry, register the provider in `lib/openproviders/provider-map.ts` and `index.ts`, and ensure `apiSdk` accepts `(apiKey, opts)`.
- When touching `app/api/*` routes, remember the CSRF requirement — client fetches must go through helpers that attach `x-csrf-token`.
- DB writes in the chat route are conditional on `supabase` being truthy; preserve guest-mode compatibility.

### API routes

Beyond the main `app/api/chat/route.ts` streaming endpoint, the app exposes: `create-chat`, `create-guest`, `csrf` (token generation), `health`, `models` (available models list), `projects`, `providers`, `rate-limits`, `toggle-chat-pin`, `update-chat-model`, `user-key-status`, `user-keys`, `user-preferences`. All state-changing routes require CSRF; the middleware matcher explicitly excludes `/api` from session refresh but CSRF is enforced at the middleware level for POST/PUT/DELETE.
