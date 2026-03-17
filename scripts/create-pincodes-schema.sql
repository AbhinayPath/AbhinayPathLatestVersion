-- Pincodes schema optimized for frequent searches
-- Keys derived from data.json: PostOfficeName, Pincode, City, District, State

create table if not exists public.pincodes (
  id bigserial primary key,
  post_office_name text not null,
  pincode text not null check (pincode ~ '^[0-9]{6}$'),
  city text,
  district text,
  state text,
  pincode_int int generated always as (nullif(pincode, '')::int) stored
);

-- Indexes for fast lookups
create index if not exists pincodes_pincode_idx on public.pincodes (pincode);
create index if not exists pincodes_pincode_int_idx on public.pincodes (pincode_int);
create index if not exists pincodes_city_idx on public.pincodes (city);
create index if not exists pincodes_district_idx on public.pincodes (district);
create index if not exists pincodes_state_idx on public.pincodes (state);

-- Trigram index for partial/fuzzy name searches
create extension if not exists pg_trgm;
create index if not exists pincodes_post_office_name_trgm_idx on public.pincodes using gin (post_office_name gin_trgm_ops);

-- Full-text search across common fields
alter table public.pincodes add column if not exists ts_search tsvector generated always as (
  to_tsvector('simple', coalesce(post_office_name,'') || ' ' || coalesce(city,'') || ' ' || coalesce(district,'') || ' ' || coalesce(state,''))
) stored;
create index if not exists pincodes_ts_search_idx on public.pincodes using gin (ts_search);

-- Read-only access for anon and authenticated clients
alter table public.pincodes enable row level security;
create policy if not exists "pincodes read" on public.pincodes for select to anon, authenticated using (true);