# Setup

Getting Routly running on your own machine, against your own Supabase project
and your own API keys. Budget about 30 minutes the first time; most of it is
waiting for signup emails from the four API providers.

The web app is the one to start with. Mobile is a proof-of-concept and needs
Xcode, so it is optional — see [Mobile](#mobile-optional) at the end.

## 1. Prerequisites

|         | Version  | Notes                                                                                                |
| ------- | -------- | ---------------------------------------------------------------------------------------------------- |
| Node.js | ≥ 20.9.0 | Enforced by `engines` in the root `package.json`                                                     |
| npm     | 11.6.0   | Pinned via `packageManager`. Other versions generally work; the lockfile was generated with this one |
| Git     | any      |                                                                                                      |

Optional, depending on which path you pick later:

- **Docker Desktop** — only if you want to run Postgres locally via the
  Supabase CLI instead of using a hosted project.
- **Xcode + iOS Simulator** — only for the mobile app. Last verified on iOS
  Simulator 18.6.

## 2. Fork, clone, install

Fork the repository on GitHub first, then clone your fork:

```bash
git clone https://github.com/<your-username>/routly
cd routly
npm install
```

`npm install` is run **once from the root**. This is an npm workspaces
monorepo, so the root install wires up all four packages (`apps/web`,
`apps/mobile`, `packages/ui`, `packages/lib`). Do not run `npm install` inside
an individual app.

## 3. Get your API keys

Four providers. Each has a free tier that covers local development.

### Supabase — database and auth (required)

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **Project Settings → API Keys**.
3. Copy the **Project URL** and the **publishable** (anon) key.

The publishable key is safe to ship in a client bundle _provided Row Level
Security is enabled_ — which the schema in step 4 does. Read
[DATABASE.md](./DATABASE.md#row-level-security) before you touch those
policies.

> **Free projects pause after about a week of inactivity.** If the app
> suddenly cannot reach the database, check the Supabase dashboard and resume
> the project.

### MapTiler — map tiles (required for web)

Sign up at [maptiler.com](https://www.maptiler.com/) and copy your API key
from the dashboard. Used only by the web app's MapLibre map
(`RoutlyMap.tsx`); the mobile app uses Apple/Google Maps through
`react-native-maps` instead and needs no key.

### OpenRouteService — routing and elevation (required)

Sign up at [openrouteservice.org](https://openrouteservice.org/dev/#/signup)
and create a token. The free tier is rate-limited but fine for development.

This key is **server-side only** — it is read in a Next.js API route and never
reaches the browser. See [Where the keys live](#where-the-keys-live).

### Google Weather — wind and weather (required)

1. Create a project in the [Google Cloud
   Console](https://console.cloud.google.com/).
2. Enable the **Weather API**.
3. Create an API key under **APIs & Services → Credentials**.

Billing must be enabled on the Google Cloud project even though the free tier
covers development usage. This is the one provider that asks for a card. Also
server-side only.

## 4. Set up the database

Your Supabase project starts empty — no tables. Pick one of the two paths.

### Path A — hosted project, paste the SQL (recommended)

Fastest way in, and it mirrors how the app runs in production.

1. Open your Supabase project → **SQL Editor** → **New query**.
2. Copy the entire contents of
   [`supabase/migrations/20260827120000_init.sql`](../supabase/migrations/20260827120000_init.sql)
   and paste it in.
3. Run it.

That creates the three tables, their indexes, all RLS policies and the
`routes_near_me` function. The script is idempotent, so re-running it after a
schema edit is safe.

**Then turn off email confirmation**, or sign-up will fail:

> **Authentication → Sign In / Providers → Email → Confirm email: off**

This is not cosmetic. Routly creates the `profiles` row from the client right
after `signUp()`, which requires a session. With confirmation on, `signUp()`
returns a user but no session, RLS rejects the insert, and you end up with an
account that has no profile. The full explanation is in
[DATABASE.md](./DATABASE.md#known-issues).

Optionally, after you have signed up in the app, run
[`supabase/seed.sql`](../supabase/seed.sql) the same way to get a few demo
routes so Explore is not empty.

### Path B — local Postgres via the Supabase CLI

Gives you an isolated database that never pauses, plus real migration history.
Requires Docker Desktop.

```bash
npm install -g supabase   # or: brew install supabase/tap/supabase
supabase init             # creates supabase/config.toml; leaves migrations alone
supabase start            # boots Postgres + Auth, applies supabase/migrations/
```

`supabase start` prints a local **API URL** and **anon key** — use those in
step 5 instead of your hosted project's values. Email confirmation is off by
default locally, and `supabase start` also gives you Inbucket, a fake inbox,
for any auth emails.

Useful afterwards:

```bash
supabase db reset          # wipe and re-apply all migrations + seed.sql
supabase migration new <name>   # start a new migration file
supabase stop
```

Note that `config.toml` is generated by `supabase init` rather than committed,
because its contents are tied to your CLI version.

## 5. Environment variables

Web and mobile use **separate env files** with different variable prefixes.
Copy the examples:

```bash
cp apps/web/.env.local.example apps/web/.env.local
cp apps/mobile/.env.example apps/mobile/.env      # only if running mobile
```

### `apps/web/.env.local`

```bash
NEXT_PUBLIC_API_BASE_URL=

NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

NEXT_PUBLIC_MAPTILER_KEY=

ORS_API_KEY=
GOOGLE_WEATHER_API_KEY=
```

> **`NEXT_PUBLIC_API_BASE_URL` must stay empty.** Next.js resolves `/api`
> relative to the current origin. Setting it to `http://localhost:3000` breaks
> the deployed build, because the browser would then call localhost from
> production.

### `apps/mobile/.env`

```bash
EXPO_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

EXPO_PUBLIC_API_BASE_URL=http://localhost:3000   # currently ignored, see below
```

**The two Supabase variables are the only ones mobile actually reads.** It
needs no ORS, Google or MapTiler keys: routing and weather go through the web
app's API routes, which hold those keys server-side, and maps are native.

`EXPO_PUBLIC_API_BASE_URL` is in the example file because that is clearly the
intent, but nothing on the mobile side reads it today — the base URL is
hardcoded. See [Mobile](#mobile-optional).

### Where the keys live

Worth understanding before you add a feature that calls an external API:

| Key                        | Read by                                                                        | Reaches the browser?                                  |
| -------------------------- | ------------------------------------------------------------------------------ | ----------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_*`   | Client, in both apps                                                           | Yes — safe, because RLS is enforced                   |
| `NEXT_PUBLIC_MAPTILER_KEY` | `RoutlyMap.tsx`                                                                | Yes — restrict it by domain in the MapTiler dashboard |
| `ORS_API_KEY`              | `packages/lib/api/openRouteService.ts`, only ever from `/api/openrouteservice` | **No**                                                |
| `GOOGLE_WEATHER_API_KEY`   | `packages/lib/api/googleWeather.ts`, only ever from `/api/weather`             | **No**                                                |

The `NEXT_PUBLIC_` / `EXPO_PUBLIC_` prefix is what makes a variable
client-visible. Never add either prefix to the ORS or Google keys — that would
publish them in the bundle.

## 6. Run it

From the repository root:

```bash
npm run dev
```

Turborepo starts the web and mobile dev servers in parallel. Web is on
[http://localhost:3000](http://localhost:3000).

Just one app:

```bash
cd apps/web && npm run dev      # Next.js only
cd apps/mobile && npm run dev   # Expo only
```

Other root commands:

```bash
npm run build        # build everything
npm run lint
npm run check-types  # per-package; packages without the script are a no-op, which is normal
npm run format       # prettier
```

## 7. Create an account

Most of the app is behind auth — `/generate`, `/profile` and `/settings` are
protected by `apps/web/src/proxy.ts`, which redirects signed-out visitors to
`/login`. Only `/`, `/login`, `/signup` and `/explore` are public.

So: sign up in the app, then generate and save a route.

## Mobile (optional)

The Expo app mirrors the web flow but is a local proof-of-concept — it is not
distributed, and it depends on the web app running.

```bash
cd apps/mobile && npm run dev
```

Two things to know:

**The web app must be running.** Mobile fetches `/api/openrouteservice` and
`/api/weather` from the Next.js server, so `npm run dev` in `apps/web` has to
be up or route generation fails.

**The API base URL is hardcoded, not read from the environment.** Despite
`EXPO_PUBLIC_API_BASE_URL` existing in `.env.example`, the mobile route form
contains:

```ts
// apps/mobile/src/components/GenerateRouteForm/GenerateRouteForm.tsx:57
const base = "http://localhost:3000";
```

So the variable has no effect. `localhost` resolves to the host machine inside
the iOS Simulator, which is why this works there — but on a **physical
device** it points at the phone itself and route generation fails. To test on
a device today you have to edit that line to your machine's LAN address, e.g.
`http://192.168.1.42:3000`.

The tidy fix is to read the variable in the mobile form. Note that reusing
`getApiBase()` from `packages/lib/utils/` will _not_ work: its first branch is
`if (typeof window !== "undefined") return ""`, and React Native defines a
`window` global, so it returns an empty string on native. Read
`process.env.EXPO_PUBLIC_API_BASE_URL` directly instead.

## Troubleshooting

**Sign-up fails, or the account exists but the profile is missing.** Email
confirmation is still on in Supabase. Turn it off (step 4) and sign up again.
The orphaned `auth.users` row can be deleted from **Authentication → Users**.

**Everything loads but the database calls fail.** Either your Supabase project
is paused (free tier, ~1 week idle) or the URL/key pair is wrong. Note that
the variable is `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, not `..._ANON_KEY`.

**Route generation returns a 500.** Check the terminal running Next, not the
browser console — ORS and Google errors surface server-side. Usually a missing
`ORS_API_KEY`, an exhausted ORS rate limit, or the Weather API not enabled on
the Google Cloud project.

**The map is blank on web.** Missing or invalid `NEXT_PUBLIC_MAPTILER_KEY`.
Client-side variables are inlined at build time, so restart the dev server
after editing `.env.local`.

**Explore's Running/Cycling filters return nothing.** That is a known bug, not
your setup — see
[DATABASE.md → Known issues](./DATABASE.md#known-issues).

**`npm run check-types` reports nothing for some packages.** Expected.
`packages/ui` and `packages/lib` have no `check-types` script, and Turbo
treats a missing script as a no-op.

**Mobile route generation fails on a physical device.** The base URL is
hardcoded to `localhost`, which only works in the simulator. See
[Mobile](#mobile-optional).

**Stale behaviour after changing env vars or `turbo.json`.** Clear the Turbo
cache with `rm -rf .turbo` and restart.
