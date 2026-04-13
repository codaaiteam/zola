// NEXT_PUBLIC_ vars are inlined at build time by Next.js.
// If the build environment has them, this will be true.
// If not (e.g. Railway Nixpacks without build-time env vars), this will be false.
// We also check at runtime for server-side code.
export const isSupabaseEnabled = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)
