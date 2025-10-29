import { getApiBase } from "../utils/getApiBase";
import { roundTripSeeds } from "../data/roundTripSeeds";

export async function fetchCombinedRouteData(
  start: [number, number],
  end: [number, number] | null,
  distance: number,
  activity: string
) {
  const base = getApiBase();

  const profile = activity === "run" ? "foot-walking" : "cycling-regular";

  // Get 3 unique seeds from roundTripSeeds (no doubles)
  // Randomize a startpoint in array and get 3 following seeds
  const startIndex = Math.floor(Math.random() * roundTripSeeds.length);
  const seeds = Array.from(
    { length: 3 },
    (_, i) => roundTripSeeds[(startIndex + i) % roundTripSeeds.length]
  );

  console.log("Using seeds:", seeds);

  // 3 calls with the same profile but different seeds
  const routeResults = await Promise.all(
    seeds.map(async (seed) => {
      const res = await fetch(`${base}/api/openrouteservice`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start, end, distance, profile, seed }),
      });
      if (!res.ok) throw new Error(`ORS request failed (seed: ${seed})`);
      const data = await res.json();
      return { profile, seed, data };
    })
  );

  // Get weather once for midpoint of first route
  const coords = routeResults[0]?.data?.features?.[0]?.geometry?.coordinates;
  const midpoint = coords[Math.floor(coords.length / 2)];
  const [lon, lat] = midpoint;

  const weatherRes = await fetch(`${base}/api/weather?lat=${lat}&lon=${lon}`);
  if (!weatherRes.ok) throw new Error("Weather request failed");
  const weather = await weatherRes.json();

  // Return everything together as unified object
  return { routes: routeResults, weather };
}
