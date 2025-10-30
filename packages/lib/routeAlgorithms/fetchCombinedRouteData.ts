import { getApiBase } from "../utils/getApiBase";
import { roundTripSeeds } from "../data/roundTripSeeds";

export async function fetchCombinedRouteData(
  start: [number, number],
  end: [number, number] | null,
  distance: number,
  activity: string
) {
  const base: string = getApiBase();
  const isRoundTrip: boolean = !end;

  const profile = activity === "run" ? "foot-walking" : "cycling-regular";

  let routeResults: { profile: string; seed?: number | null; data: any }[] = [];

  if (isRoundTrip) {
    // Roundtrip mode: generate 3 unique routes using different seeds
    const startIndex = Math.floor(Math.random() * roundTripSeeds.length);
    const seeds = Array.from(
      { length: 3 },
      (_, i) => roundTripSeeds[(startIndex + i) % roundTripSeeds.length]
    );

    routeResults = await Promise.all(
      seeds.map(async (seed) => {
        const res = await fetch(`${base}/api/openrouteservice`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ start, distance, profile, seed }),
        });
        if (!res.ok) throw new Error(`ORS request failed (seed: ${seed})`);
        const data = await res.json();
        return { profile, seed, data };
      })
    );
  } else {
    // Point-to-point mode: generate one direct route (seed is ignored by ORS)
    const res = await fetch(`${base}/api/openrouteservice`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ start, end, distance, profile }),
    });
    if (!res.ok) throw new Error("ORS request failed (direct route)");
    const data = await res.json();
    routeResults = [{ profile, seed: null, data }];
  }

  // Fetch weather for each route based on its midpoint
  const weatherResults = await Promise.all(
    routeResults.map(async (r, i) => {
      const coords = r.data?.features?.[0]?.geometry?.coordinates;
      if (!coords?.length) {
        console.warn(`No coordinates found for route ${i + 1}`);
        return { routeIndex: i, weather: null };
      }

      const midpoint = coords[Math.floor(coords.length / 2)];
      const [lon, lat] = midpoint;

      const weatherRes = await fetch(
        `${base}/api/weather?lat=${lat}&lon=${lon}`
      );
      if (!weatherRes.ok)
        throw new Error(`Weather request failed for route ${i + 1}`);
      const weather = await weatherRes.json();

      return { routeIndex: i, seed: r.seed, profile: r.profile, weather };
    })
  );

  // Return all routes with their respective weather data
  return { routes: routeResults, weatherByRoute: weatherResults };
}
