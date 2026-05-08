-- nottoai_download_events: tracks DMG downloads, iOS reservations, landing CTA clicks
-- Public (no auth) inserts via service role from /api/track; reads by admin only.

create table if not exists public.nottoai_download_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null check (event_type in (
    'dmg_download',
    'ios_reserve',
    'landing_cta',
    'pricing_cta'
  )),
  email text,
  cta_name text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  user_agent text,
  ip_hash text,
  user_id text,
  created_at timestamptz not null default now()
);

create index if not exists nottoai_download_events_event_type_idx on public.nottoai_download_events (event_type, created_at desc);
create index if not exists nottoai_download_events_created_at_idx on public.nottoai_download_events (created_at desc);
create index if not exists nottoai_download_events_email_idx on public.nottoai_download_events (email) where email is not null;

alter table public.nottoai_download_events enable row level security;
-- No policies → only service role can read/write. /api/track and /admin use service role.
