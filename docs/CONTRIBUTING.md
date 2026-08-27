# Contributing

Routly is used as a teaching example, so this guide assumes you have forked
the repository and want to make a change without breaking the monorepo's
conventions.

Start with [SETUP.md](./SETUP.md) if the app is not running yet.

## Workflow

1. **Fork** the repository on GitHub.
2. **Branch** off `develop`. `main` is the deployed branch; `develop` is where
   work lands.
   ```bash
   git switch develop
   git pull
   git switch -c fix/explore-activity-filter
   ```
3. **Make the change**, and run the checks below before committing.
4. **Open a pull request** against `develop`, describing what changed and how
   you verified it.

### Before you commit

```bash
npm run lint
npm run check-types
npm run build
```

`npm run build` catches the class of error that `check-types` misses — a
client component importing something server-only, or a Next.js build-time
failure. Worth the extra minute.

## Commit messages

The history uses four prefixes. Capital letter after the colon, imperative
mood, no trailing period.

| Prefix    | For                           |
| --------- | ----------------------------- |
| `Add:`    | New files or features         |
| `Update:` | Changes to existing behaviour |
| `Fix:`    | Bug fixes                     |
| `Remove:` | Deletions                     |

```
Fix: Align Explore activity filter with stored run/cycle values
Add: Elevation graph component to route detail page
```

Keep a pull request to one concern. A bug fix that also reformats twelve files
is hard to review and harder to revert.

## Repository layout

```
apps/
  web/       Next.js 16 (App Router, Turbopack) — the production app
  mobile/    Expo Router — local proof-of-concept
packages/
  ui/        Design tokens only (baseTheme + webTheme + nativeTheme)
  lib/       All shared logic: Supabase clients, hooks, route algorithms,
             GPX export, validation, contexts
supabase/
  migrations/  Canonical schema
  seed.sql     Optional demo data
docs/
```

Both apps use the same path aliases:

```
@routly/ui/*   → packages/ui/*
@routly/lib/*  → packages/lib/*
```

### Where to put things

**Logic goes in `packages/lib`.** If it is a hook, an algorithm, a validator or
a Supabase call, it belongs there so both apps can use it. Anything in
`packages/lib` must be free of web-only and native-only APIs unless you use
the platform-file pattern below.

**Components do not get shared.** `packages/ui` holds design tokens — colours,
spacing, typography — and nothing else. Components are implemented separately
per platform, because styled-components for the web and
styled-components/native are different targets. The two implementations are
kept visually consistent by both consuming the same theme. Do not try to
extract a shared component; that is a deliberate architectural choice, not an
oversight.

### The `.native.ts` pattern

When shared logic genuinely needs different platform APIs, add a sibling
`.native.ts` file. Metro picks `.native.ts` for Expo; the Next.js bundler
picks the plain `.ts`. Neither needs configuration.

```
packages/lib/supabase/client.ts          createBrowserClient + cookies
packages/lib/supabase/client.native.ts   createClient + AsyncStorage

packages/lib/gpx/exportGpx.ts            Blob download
packages/lib/gpx/exportGpx.native.ts     expo-file-system + expo-sharing
```

**Only add a `.native.ts` when the platform APIs actually differ.** If the
logic is identical, one file serves both — otherwise you have two copies of
the same code to keep in sync.

`useExploreRoutes` shows the cost of getting this slightly wrong. The only
platform-specific part of that hook is how it obtains the user's position —
`navigator.geolocation` on web, `expo-location` on native — but the split was
made at the whole-file level, so roughly 200 lines of identical filtering,
sorting and like-toggling logic exist twice, and the two copies have already
drifted in their error handling. If you change one, change both.

## Working with the database

The schema is a checked-in artefact. Do not change it only in the Supabase
dashboard — the next contributor gets your code with a schema that cannot
support it.

To change it:

1. Add a **new** file in `supabase/migrations/`, named
   `<timestamp>_<description>.sql`. Never edit
   `20260827120000_init.sql`; someone else's database has already applied it.
   ```bash
   supabase migration new add_route_visibility   # if using the CLI
   ```
2. Write the change so it is safe to run against a database with rows in it —
   new columns nullable or with a default, no destructive rewrites.
3. **Add or update the RLS policies in the same migration.** A new table with
   RLS off is a data leak, because the client connects with a key that ships
   in the bundle.
4. Update [DATABASE.md](./DATABASE.md) in the same pull request.

Read [DATABASE.md → Row Level Security](./DATABASE.md#row-level-security)
before writing a policy. In particular, note that some client code relies on
RLS to scope a query rather than filtering explicitly.

## Code style

Prettier and ESLint are configured at the root; `npm run format` applies
Prettier across the workspace.

Beyond that, match the surrounding code. Two conventions worth stating because
they are easy to get wrong:

- **Styling is styled-components**, with the theme imported explicitly
  (`import { webTheme as theme } from "@routly/ui/theme/web"`) rather than
  read from props. Use theme tokens — `theme.spacing.lg`,
  `theme.colors.black` — not raw values.
- **Server-side secrets stay server-side.** ORS and Google Weather are called
  only from `apps/web/src/app/api/*`. Never add a `NEXT_PUBLIC_` or
  `EXPO_PUBLIC_` prefix to those keys.

## Good first contributions

The known defects in
[DATABASE.md → Known issues](./DATABASE.md#known-issues) are all
self-contained and real:

- **The Explore activity filter matches nothing** — routes are saved as
  `'run'`/`'cycle'` but filtered as `'running'`/`'cycling'`. Pick one
  vocabulary, apply it in both places, and consider whether existing rows need
  migrating.
- **Sign-up depends on email confirmation being off** — move profile creation
  into a trigger on `auth.users` and drop the client-side insert.
- **`updated_at` is never updated** except by `renameRoute()` — a
  `before update` trigger fixes it for every table at once.

Outside the database, one more self-contained fix:

- **The mobile app hardcodes its API base URL.**
  `apps/mobile/src/components/GenerateRouteForm/GenerateRouteForm.tsx:57` sets
  `const base = "http://localhost:3000"`, so `EXPO_PUBLIC_API_BASE_URL` is
  ignored and the app cannot run against a physical device. Read the variable
  instead — but not via `getApiBase()`, whose
  `typeof window !== "undefined"` guard returns `""` on React Native. While
  you are there, note that this whole form duplicates
  `fetchCombinedRouteData()` from `packages/lib`; consolidating the two is a
  larger but more valuable change.

Beyond those, [ROADMAP.md](./ROADMAP.md) walks through every open issue with a
starting point in the code and an effort estimate, sorted so the
self-contained work comes first.
