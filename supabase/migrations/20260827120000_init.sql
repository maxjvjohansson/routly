-- Routly — initial schema
--
-- This is the canonical definition of Routly's database. It is the single
-- source of truth for both setup paths:
--
--   1. Hosted Supabase: copy this whole file into the SQL Editor and run it.
--   2. Supabase CLI:     `supabase start` applies it automatically.
--
-- The script is idempotent — running it twice is safe and does nothing the
-- second time. See docs/DATABASE.md for the schema reference and the
-- reasoning behind the access rules.

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------

-- gen_random_uuid() lives in pgcrypto. On Supabase it is normally enabled
-- already; this makes a fresh local database work too.
create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- profiles — public-facing user data
-- ---------------------------------------------------------------------------
-- Supabase owns the private half of a user (email, password, confirmation
-- state) in the auth.users table, which application code cannot read
-- directly. profiles is the half Routly controls. The primary key IS the
-- auth.users id, so the two are always 1:1 and a deleted account takes its
-- profile with it.

create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  full_name  text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table  public.profiles is
  'Application-owned user data. 1:1 with auth.users; id is the auth user id.';
comment on column public.profiles.avatar_url is
  'Reserved for Supabase Storage avatars. Read and written by the settings form, but no upload UI ships yet.';

-- ---------------------------------------------------------------------------
-- routes — a generated and saved route
-- ---------------------------------------------------------------------------
-- The route geometry is stored as jsonb rather than PostGIS geography. That
-- is a deliberate trade-off: Routly never runs geometric queries in the
-- database, it only replays the line on a map, so jsonb keeps the stack
-- simple. The one location query that does exist (routes_near_me, below)
-- needs only the start point, which is why start_lat/start_lng are also
-- stored as plain columns.

create table if not exists public.routes (
  id                uuid primary key default gen_random_uuid(),
  user_id           uuid not null references auth.users (id) on delete cascade,
  name              text not null default 'Untitled route',
  activity          text not null,
  distance_km       double precision,
  elevation_gain    double precision,
  duration_estimate double precision,
  coordinates       jsonb not null,
  start_lat         double precision not null,
  start_lng         double precision not null,
  end_lat           double precision,
  end_lng           double precision,
  is_roundtrip      boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

comment on column public.routes.activity is
  'Stored values are ''run'' and ''cycle'' (written by ActivitySelect). Note that the Explore filter compares against ''running''/''cycling'' — see docs/DATABASE.md, Known issues.';
comment on column public.routes.coordinates is
  'Ordered array of {lat, lng, elevation} objects. Elevation is metres, 0 when ORS returned none.';
comment on column public.routes.distance_km is
  'Kilometres, from the ORS response.';
comment on column public.routes.elevation_gain is
  'Total ascent in metres, computed client-side by calculateTotalAscent() rather than taken from ORS.';
comment on column public.routes.duration_estimate is
  'ORS estimated duration in minutes.';
comment on column public.routes.end_lat is
  'Equals start_lat for roundtrips. Null only for rows written before this column existed.';

-- Every list view in the app is "newest first", either globally (Explore) or
-- per user (Profile). These two indexes cover both.
create index if not exists routes_created_at_idx
  on public.routes (created_at desc);
create index if not exists routes_user_id_created_at_idx
  on public.routes (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- route_likes — join table between a user and a route they liked
-- ---------------------------------------------------------------------------

create table if not exists public.route_likes (
  id         uuid primary key default gen_random_uuid(),
  route_id   uuid not null references public.routes (id) on delete cascade,
  user_id    uuid not null references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- A user can like a route once. Enforced as a unique index rather than a
-- table constraint because "add constraint if not exists" is not valid
-- Postgres, and this file has to stay re-runnable.
create unique index if not exists route_likes_route_id_user_id_key
  on public.route_likes (route_id, user_id);

-- toggleLike() looks up the current user's likes by user_id on every load.
create index if not exists route_likes_user_id_idx
  on public.route_likes (user_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
-- Routly talks to Postgres straight from the browser and the Expo app using
-- the publishable (anon) key. There is no trusted server layer in between,
-- so these policies are the entire authorisation model. If RLS is off, the
-- publishable key is a full read/write key to your database.
--
-- Policies are dropped and recreated so this file can be re-run after an
-- edit without hitting "policy already exists".

alter table public.profiles    enable row level security;
alter table public.routes      enable row level security;
alter table public.route_likes enable row level security;

-- profiles: private to their owner. Nothing in the UI displays another
-- user's name yet, so there is no public read policy. Add one if you build
-- route attribution on Explore.
drop policy if exists "Profiles are viewable by their owner" on public.profiles;
create policy "Profiles are viewable by their owner"
  on public.profiles for select
  using (auth.uid() = id);

-- The insert policy is what makes sign-up work: handleSignUp() creates the
-- profile row from the client, so the new user must be allowed to insert
-- exactly one row, keyed to their own id.
drop policy if exists "Users can create their own profile" on public.profiles;
create policy "Users can create their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- routes: world-readable. Explore is a public path in
-- packages/lib/config/routes.ts, so signed-out visitors must be able to read
-- routes too — hence no auth.uid() check here. Writes stay owner-only.
drop policy if exists "Routes are viewable by everyone" on public.routes;
create policy "Routes are viewable by everyone"
  on public.routes for select
  using (true);

drop policy if exists "Users can insert their own routes" on public.routes;
create policy "Users can insert their own routes"
  on public.routes for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own routes" on public.routes;
create policy "Users can update their own routes"
  on public.routes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- This policy is load-bearing. deleteRoute() in useRouteActions.ts issues
-- `delete().eq("id", id)` with no user_id filter, so the only thing stopping
-- one user from deleting another user's route is this USING clause.
drop policy if exists "Users can delete their own routes" on public.routes;
create policy "Users can delete their own routes"
  on public.routes for delete
  using (auth.uid() = user_id);

-- route_likes: a user sees and manages only their own likes. Like counts are
-- not displayed anywhere, so no aggregate read policy is needed.
drop policy if exists "Users can view their own likes" on public.route_likes;
create policy "Users can view their own likes"
  on public.route_likes for select
  using (auth.uid() = user_id);

drop policy if exists "Users can like routes" on public.route_likes;
create policy "Users can like routes"
  on public.route_likes for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can remove their own likes" on public.route_likes;
create policy "Users can remove their own likes"
  on public.route_likes for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- routes_near_me — RPC backing the "Near me" filter on Explore
-- ---------------------------------------------------------------------------
-- Called from useExploreRoutes.ts as
--   supabase.rpc("routes_near_me", { lat, lng })
-- so the argument names must stay lat and lng.
--
-- Distance is the haversine formula against each route's start point. There
-- is no PostGIS dependency, matching the jsonb choice above. The least/
-- greatest clamp guards acos() against floating-point drift past ±1, which
-- would otherwise raise "input is out of range" for a point compared to
-- itself.
--
-- security invoker (the default, stated explicitly for clarity) means the
-- function runs as the caller, so the RLS policies above still apply to its
-- results.

-- Any existing overload is dropped first. This matters when applying this
-- file to a database that already has the function: "create or replace" only
-- replaces a function with an identical signature, so adding the radius_km
-- parameter would create a second overload instead. supabase.rpc() would then
-- fail with "function name is not unique" because {lat, lng} matches both.
do $$
declare
  fn record;
begin
  for fn in
    select oid::regprocedure as sig
    from pg_proc
    where pronamespace = 'public'::regnamespace
      and proname = 'routes_near_me'
  loop
    execute format('drop function %s', fn.sig);
  end loop;
end $$;

create function public.routes_near_me (
  lat       double precision,
  lng       double precision,
  radius_km double precision default 50
)
returns setof public.routes
language sql
stable
security invoker
set search_path = public
as $$
  select r.*
  from public.routes r
  where 6371 * acos(
          least(1, greatest(-1,
            cos(radians(lat)) * cos(radians(r.start_lat)) *
            cos(radians(r.start_lng) - radians(lng)) +
            sin(radians(lat)) * sin(radians(r.start_lat))
          ))
        ) <= radius_km
  order by 6371 * acos(
          least(1, greatest(-1,
            cos(radians(lat)) * cos(radians(r.start_lat)) *
            cos(radians(r.start_lng) - radians(lng)) +
            sin(radians(lat)) * sin(radians(r.start_lat))
          ))
        )
  limit 50;
$$;

comment on function public.routes_near_me is
  'Routes ordered by great-circle distance from (lat, lng) to the route start point, within radius_km. Called by the Near me filter on Explore.';
