# Roadmap

[GitHub Issues](https://github.com/maxjvjohansson/routly/issues) is the source
of truth for what needs doing — each issue holds the actual requirements. This
page adds the three things an issue tracker does not tell you: **where in the
code to start**, **how big the job is**, and **which issues block which**.

New here? Read [SETUP.md](./SETUP.md) to get the app running, then
[CONTRIBUTING.md](./CONTRIBUTING.md) for the workflow.

## Start here

Self-contained, no new external APIs, no architectural decisions. Good first
pull requests.

### Fix the known defects

Three real bugs are documented in
[DATABASE.md → Known issues](./DATABASE.md#known-issues) and
[CONTRIBUTING.md → Good first contributions](./CONTRIBUTING.md#good-first-contributions).
They have no issue numbers because they were found while writing these docs.
The Explore activity filter one is the most valuable: the Running and Cycling
filters currently return zero routes.

### [#30](https://github.com/maxjvjohansson/routly/issues/30) — Loading animation

**Small.** Loading states are currently bare text in four places:

```
apps/web/src/app/routes/[id]/page.tsx:107        "Loading route..."
apps/web/src/components/Explore/ExploreRoutesList.tsx:35   "Loading..."
apps/web/src/components/Profile/SavedRoutesList.tsx:40     "Loading..."
apps/web/src/components/AuthForm/AuthForm.tsx:170          "Loading..."
```

Build one component, replace all four. Remember the Expo equivalents — the
mobile app has its own copies of these screens.

### [#44](https://github.com/maxjvjohansson/routly/issues/44) — Elevation graph

**Small to medium.** No new data needed: every saved route already stores
per-point elevation in its `coordinates` column, and `calculateTotalAscent()`
in `packages/lib/routeAlgorithms/` already walks it. The work is a chart
component on the route detail page
(`apps/web/src/app/routes/[id]/page.tsx`), which currently shows ascent as a
single number.

Note the storage format when you read it —
`{lat, lng, elevation}` objects, not GeoJSON arrays. See
[DATABASE.md](./DATABASE.md#routes).

### [#53](https://github.com/maxjvjohansson/routly/issues/53) — Weather check on saved routes

**Small to medium.** The endpoint already exists —
`apps/web/src/app/api/weather/route.ts` takes `?lat=&lon=` — and the detail
page already has `start_lat` / `start_lng` in hand. This is mostly wiring a
button and presenting the response. `RouteWeatherInfo.tsx` in
`PreviewRouteCard/` already renders weather during generation and can likely
be reused.

## Features

Larger, but still contained within the existing architecture.

### [#54](https://github.com/maxjvjohansson/routly/issues/54) — Error and success UI

**Medium.** Partly foundated already:
`packages/lib/hooks/useRouteActionsWithFeedback.ts` centralises
`statusMessage` / `statusType` (`"success" | "error"`) for route actions. What
is missing is a shared component to render it consistently, unified timing,
and WCAG-checked colours in the theme — which means touching
`packages/ui/theme/`.

Worth coordinating with
[#55](https://github.com/maxjvjohansson/routly/issues/55), since both edit the
theme.

### [#24](https://github.com/maxjvjohansson/routly/issues/24) — Address search

**Medium.** Needs a geocoding provider (OpenRouteService has a Pelias
geocoding endpoint; Nominatim is the common free alternative). Add it
server-side following the existing pattern — a route in
`apps/web/src/app/api/` plus a wrapper in `packages/lib/api/` — so the key
stays off the client.

The entry point is `LocationInputs.tsx`, and it is worth understanding why
this issue exists:

```ts
// apps/web/src/components/GenerateRouteForm/LocationInputs.tsx:88
const tryParseCoords = (val: string): [number, number] | null => {
  const [lat, lon] = val.split(",").map(Number);
  return !isNaN(lat) && !isNaN(lon) ? [lon, lat] : null;
};
```

The field's placeholder says _"Enter starting location"_, but the only input it
accepts is a `lat, lng` pair. A user typing a street name gets silence. So
this is a correctness fix as much as a feature.

### [#10](https://github.com/maxjvjohansson/routly/issues/10) — Google and Apple auth

**Medium — but do the profile trigger first.** There is no OAuth code in the
repo yet; `packages/lib/supabase/auth.ts` is where it goes, alongside
`handleSignUp` and `handleLogin`.

**The blocker:** profile rows are created client-side inside `handleSignUp()`,
immediately after `signUp()` returns. An OAuth sign-in never calls that
function — Supabase creates the user during the provider callback — so a
Google or Apple user would land in `auth.users` with **no `profiles` row**.
`useProfileSettings.fetchProfile()` uses `.single()`, so the settings page
would break for exactly those users.

Move profile creation into a database trigger on `auth.users` first (see
[DATABASE.md → Known issues](./DATABASE.md#known-issues)). That is a
prerequisite, not a nice-to-have.

### [#11](https://github.com/maxjvjohansson/routly/issues/11) — Language support

**Medium to large.** Every user-facing string is currently inline in JSX,
across both apps. The mechanical part is extraction; the design decision is
where the dictionary lives so both web and Expo can read it — which points at
`packages/lib`, following the pattern in
[CONTRIBUTING.md](./CONTRIBUTING.md#where-to-put-things).

Doing this after [#54](https://github.com/maxjvjohansson/routly/issues/54)
avoids extracting the error strings twice.

## Routing intelligence

The most interesting work, and the most involved. All three touch route
generation itself.

### [#35](https://github.com/maxjvjohansson/routly/issues/35) — Lighting awareness

**Large.** Street-lamp data via the Overpass API, used as a generation
parameter. Two hard parts beyond the integration: Overpass is slow and
rate-limited, so results likely need caching, and lamp data has to be
reconciled against ORS geometry rather than queried independently.

Start from `packages/lib/api/openRouteService.ts` to see how the existing
profile fallback (`cycling-regular` → `cycling-road` → `foot-walking`) is
structured.

### [#23](https://github.com/maxjvjohansson/routly/issues/23) — Smart mode

**Large. Depends on [#35](https://github.com/maxjvjohansson/routly/issues/35)**
— the issue itself says to hook the two together.

`packages/lib/routeAlgorithms/fetchCombinedRouteData.ts` already fetches
several candidates with weather per route, so the prefetching half partly
exists. The new work is the ranking: scoring candidates on wind and elevation,
and rejecting roundtrips that wander. Note that the current point-to-point
ranking is deliberately simple (shortest valid route) — that is the code to
replace.

### [#36](https://github.com/maxjvjohansson/routly/issues/36) — Traffic awareness

**Large, and start by choosing the provider.** Realtime traffic and roadworks
data is the one item here with no obvious free source, so the first
contribution could just be a written comparison of options on the issue.

## Refactors

### [#55](https://github.com/maxjvjohansson/routly/issues/55) — Theme consistency

**Large but entirely mechanical, and unblocked.** The issue reads as if the
provider is missing; it is not. Both apps already wrap their tree:

```
apps/web/src/app/ClientWrapper.tsx:21   <ThemeProvider theme={theme}>
apps/mobile/src/app/_layout.tsx:35      <ThemeProvider theme={nativeTheme}>
```

The problem is that roughly **75 files** bypass it, importing the theme
directly instead:

```ts
import { webTheme as theme } from "@routly/ui/theme/web";
```

So the job is migrating those files to read `props.theme`, then keeping them
that way. No architectural decisions, just breadth — which makes it splittable
across several small pull requests, one directory at a time. Doing it unlocks
dark mode, which is otherwise impossible.

If you are looking for something to pair with a first contribution, this is
the one where a single component's worth of work is genuinely useful on its
own.
