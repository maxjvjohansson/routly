# Routly

Routly is a route generation platform for runners and cyclists. Enter a
starting point, select activity and distance, and Routly generates optimized
circular or point-to-point routes using real-time wind, elevation and weather
data.

The web version is fully functional and deployed on Vercel. The mobile version
(Expo) is currently a proof-of-concept but supports the full core flow.

## Quick start

```bash
git clone https://github.com/<your-username>/routly
cd routly
npm install
cp apps/web/.env.local.example apps/web/.env.local
```

Then three things that are easy to miss:

1. **Fill in `apps/web/.env.local`** — you need your own Supabase project plus
   MapTiler, OpenRouteService and Google Weather keys. All have free tiers.
2. **Create the database schema.** A new Supabase project is empty. Paste
   [`supabase/migrations/20260827120000_init.sql`](supabase/migrations/20260827120000_init.sql)
   into the Supabase SQL Editor and run it.
3. **Turn off email confirmation** in Supabase (_Authentication → Sign In /
   Providers → Email_), or sign-up will fail.

```bash
npm run dev   # web on http://localhost:3000, plus Expo
```

Sign up in the app to reach the route generator — `/generate`, `/profile` and
`/settings` are behind auth.

**[→ Full setup guide](docs/SETUP.md)** for API key walkthroughs, running
Postgres locally with the Supabase CLI, the mobile app, and troubleshooting.

## Documentation

|                                              |                                                                                                        |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| [docs/SETUP.md](docs/SETUP.md)               | Prerequisites, API keys, environment variables, both database paths, running the apps, troubleshooting |
| [docs/DATABASE.md](docs/DATABASE.md)         | Schema reference, ERD, Row Level Security model, the `routes_near_me` RPC, known issues                |
| [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) | Fork workflow, monorepo conventions, migrations, good first contributions                              |

## Features

- Route generation for both roundtrip and point-to-point, powered by ORS
  Directions.
- Wind and elevation analysis to minimize headwind exposure and avoid
  unnecessary climbing.
- Interactive map: MapLibre on Web with custom MapTiler styling, and React
  Native Maps on Expo.
- Save and manage routes: rename, delete and revisit previously saved routes.
- GPX export compatible with Strava, Garmin and other training apps.
- Browse, filter and download routes from other users on the Explore page
  (by activity, distance and proximity).
- Shared design foundation across Web and Mobile using a centralized theme
  (colors, spacing, typography). Component implementations are
  platform-specific but visually consistent.
- Monorepo setup using Turborepo, enabling shared packages and running both
  Web and Expo development servers from a single root command.

## Tech stack

**Web** — Next.js (App Router, Turbopack), React, TypeScript, styled-components,
MapLibre, MapTiler.

**Mobile** — Expo (Expo Router), React Native, TypeScript,
styled-components/native, react-native-maps.

**Backend** — Next.js API routes proxying the OpenRouteService Directions API
(routes + elevation) and the Google Weather API (wind + weather).

**Database & auth** — Supabase (Postgres, Auth, Storage), with Row Level
Security as the authorization layer.

**Hosting** — Vercel (web + API).

## Project structure

```
apps/
  web/       Next.js application — the production app
  mobile/    Expo application (proof-of-concept)
packages/
  ui/        Shared design tokens
  lib/       Business logic, routing algorithms, hooks, utilities
supabase/
  migrations/  Canonical database schema
  seed.sql     Optional demo data
docs/
```

Shared logic lives in `packages/lib` and is imported by both apps through the
`@routly/lib/*` alias. Components are deliberately **not** shared — only
design tokens are, via `@routly/ui/*`. See
[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md#where-to-put-things) for the
reasoning.

## Core logic overview

- Multi-step routing algorithm using ORS, with profile fallback
  (`cycling-regular` → `cycling-road` → `foot-walking`).
- Wind direction overlay.
- Custom elevation gain calculation from ORS geometry.
- Multiple route alternatives with weather, elevation and wind metadata.
- Simple route-ranking logic for point-to-point (shortest valid route,
  surface-aware).

## Roadmap

- Smart mode: background fetching and ranking to present the most optimal
  route based on wind and elevation.
- Preferred-surface and preferred-light routing improvements (e.g. gravel,
  asphalt or roads with street lamps).
- Elevation graph component in UI.
- Optional address-based start input using an address API.

## License

MIT — see [LICENSE](LICENSE).
