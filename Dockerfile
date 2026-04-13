# Base Node.js image
FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (including devDependencies for build)
RUN npm ci && npm cache clean --force

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Copy node_modules from deps
COPY --from=deps /app/node_modules ./node_modules

# Copy all project files
COPY . .

# Set Next.js telemetry to disabled
ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_ variables must be available at build time for Next.js
ENV NEXT_PUBLIC_SUPABASE_URL=https://hjvbqkyodafpzfmlevws.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdmJxa3lvZGFmcHpmbWxldndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NjM3MzcsImV4cCI6MjA5MTUzOTczN30.AHK6dDsz9kS-I04wkxccXvu1vdTKdJUUFE_Txt368Kg

# Dummy build-time values for server-side env vars that Next.js page collection reads
# Real values are injected at runtime by Railway environment variables
ENV ENCRYPTION_KEY=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=
ENV CSRF_SECRET=build-placeholder
ENV SUPABASE_SERVICE_ROLE=build-placeholder

# Build the application
RUN npm run build

# Verify standalone build was created
RUN ls -la .next/ && \
    if [ ! -d ".next/standalone" ]; then \
      echo "ERROR: .next/standalone directory not found. Make sure output: 'standalone' is set in next.config.ts"; \
      exit 1; \
    fi

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_ vars must also be available at runtime for server-side code
ENV NEXT_PUBLIC_SUPABASE_URL=https://hjvbqkyodafpzfmlevws.supabase.co
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqdmJxa3lvZGFmcHpmbWxldndzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5NjM3MzcsImV4cCI6MjA5MTUzOTczN30.AHK6dDsz9kS-I04wkxccXvu1vdTKdJUUFE_Txt368Kg

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy standalone application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose application port
EXPOSE 3000

# Set environment variable for port
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Health check to verify container is running properly
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the application
CMD ["node", "server.js"]
