#!/bin/sh

# Debug: print env vars (remove after confirming it works)
echo "=== Runtime ENV Check ==="
echo "NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL:-(not set)}"
echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY:+set (hidden)}"
echo "SUPABASE_SERVICE_ROLE=${SUPABASE_SERVICE_ROLE:+set (hidden)}"
echo "CSRF_SECRET=${CSRF_SECRET:+set (hidden)}"
echo "ENCRYPTION_KEY=${ENCRYPTION_KEY:+set (hidden)}"
echo "========================="

exec node server.js
