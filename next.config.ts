import bundleAnalyzer from "@next/bundle-analyzer"
import type { NextConfig } from "next"

// Configure bundle analyzer and wrap the Next config factory
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

const nextConfig: NextConfig = withBundleAnalyzer({
  output: "standalone",
  turbopack: {},
  env: {
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL ||
      "https://hjvbqkyodafpzfmlevws.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdmJxa3lvZGFmcHpmbWxldndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NjM3MzcsImV4cCI6MjA5MTUzOTczN30.AHK6dDsz9kS-I04wkxccXvu1vdTKdJUUFE_Txt368Kg",
  },
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  serverExternalPackages: ["shiki", "vscode-oniguruma"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
})

export default nextConfig
