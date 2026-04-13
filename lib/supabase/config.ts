// Check at runtime whether Supabase is configured.
// Cannot use a simple const because NEXT_PUBLIC_ vars get inlined at build time,
// and they may not be available during the build phase (e.g. Railway Nixpacks).
export function getIsSupabaseEnabled(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Keep backward compatibility — this will be true at runtime when env vars are set
export const isSupabaseEnabled = getIsSupabaseEnabled()
