# Routly

Routly is a route generation platform for runners and cyclists. Enter a
starting point, select activity and distance, and Routly generates
optimized circular or point-to-point routes using real-time wind,
elevation and weather data.

The web version is fully functional and deployed on Vercel. The mobile
version (Expo) is currently a proof-of-concept but supports the full
core flow.

## Features

- Route generation for both roundtrip and point-to-point, powered by
  ORS Directions.
- Wind and elevation analysis to minimize headwind exposure and avoid
  unnecessary climbing.
- Interactive map: MapLibre on Web with custom MapTiler styling, and
  React Native Maps on Expo.
- Save and manage routes: rename, delete and revisit previously saved
  routes.
- GPX export compatible with Strava, Garmin and other training apps.
- Shared design foundation across Web and Mobile using a centralized
  theme (colors, spacing, typography). Component implementations are
  platform-specific but visually consistent.
- Monorepo setup using Turborepo, enabling shared packages and running
  both Web and Expo development servers from a single root command.

## Tech Stack

### Web (Next.js)

- Next.js (React, TypeScript)
- Styled Components
- MapLibre
- MapTiler (Custom map styling)

### Mobile (Expo)

- Expo (React Native, TypeScript)
- React Native Maps
- Styled Components

### Backend

- Next.js API Routes
- OpenRouteService Directions API (routes + elevation)
- Google Weather API (wind + weather)

### Database & Auth

- Supabase (Postgres, Auth, Storage)

### Hosting

- Vercel (Web + API)

### Integrations

- GPX export

## Project Structure

    /apps
      /web       → Next.js application
      /mobile    → Expo application (proof-of-concept)
    /packages
      /ui        → Shared design system
      /lib       → Business logic, routing algorithms, utilities

## Core Logic Overview

- Multi-step routing algorithm using ORS.
- Wind direction overlay.
- Custom elevation gain calculation from ORS geometry.
- Multiple route alternatives with weather, elevation and wind
  metadata.
- Simple route-ranking logic for point-to-point (shortest valid route,
  surface-aware).

## Authentication

- Supabase email/password authentication.

## Storing Routes and Route Operations

Users can save generated routes (GeoJSON + metadata). Supported actions:

- Save
- Rename
- Delete
- View saved routes on profile
- Export route as GPX for external use
- Browse and filter routes from other users on the Explore page (filter by activity, distance, and proximity)
- View or download routes created by others

## Running Locally

### Requirements

- Xcode + latest working iOS simulator\
  **Latest known working version: iOS Simulator 18.6**
- ORS API key, Google Weather API key, Supabase project/API keys, Maptiler API key (not included in
  repo),

### 1. Clone repository

    git clone https://github.com/maxjvjohansson/routly
    cd routly

### 2. Install dependencies

    npm install

### 3. Environment Variables

Routly uses **different env files** for Web and Mobile.

---

#### Web: `apps/web/.env.local`

    NEXT_PUBLIC_API_BASE_URL=
    NEXT_PUBLIC_SUPABASE_URL=
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
    SUPABASE_SERVICE_ROLE_KEY=
    NEXT_PUBLIC_MAPTILER_KEY=
    ORS_API_KEY=
    GOOGLE_WEATHER_API_KEY=

**Important:**\
`NEXT_PUBLIC_API_BASE_URL` must stay **empty**.

---

#### Mobile: `apps/mobile/.env`

    EXPO_PUBLIC_API_BASE_URL=http://localhost:3000

    EXPO_PUBLIC_SUPABASE_URL=
    EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

    ORS_API_KEY=
    GOOGLE_WEATHER_API_KEY=

---

### 4. Start development servers from project root

    npm run dev

Starts both Web (Next.js) and Mobile (Expo).

---

### 5. Using the App

To explore the full functionality, you need to create an account in the app/or on the website.

---

## Roadmap/Future Development

- Smart mode: background fetching and ranking to present the most optimal route based on wind and elevation.
- Preferred-surface and preferred-light routing improvements (e.g. gravel, asphalt or roads with street lamps).
- Elevation graph component in UI.
- Optional address-based start input using an address API.
