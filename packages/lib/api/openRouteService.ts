const ORS_BASE_URL = "https://api.openrouteservice.org/v2";
const ORS_API_KEY = process.env.ORS_API_KEY;

export type ORSProfile =
  | "cycling-regular"
  | "cycling-road"
  | "foot-walking"
  | "foot-hiking";

export async function fetchRouteWithElevation({
  start,
  end,
  distance,
  profile = "cycling-regular",
  attempt = 1,
}: {
  start: [number, number];
  end?: [number, number];
  distance?: number;
  profile?: ORSProfile;
  attempt?: number;
}) {
  if (!ORS_API_KEY) throw new Error("ORS API key missing");

  const directionsUrl = `${ORS_BASE_URL}/directions/${profile}/geojson`;

  // Include elevation + units directly in body
  const body = end
    ? {
        coordinates: [start, end],
        elevation: true,
        units: "km",
      }
    : {
        coordinates: [start],
        elevation: true,
        units: "km",
        options: {
          round_trip: {
            length: (distance ?? 10) * 1000,
            points: 6,
            seed: Math.floor(Math.random() * 1000),
          },
          avoid_features: ["ferries"],
        },
      };

  const res = await fetch(directionsUrl, {
    method: "POST",
    headers: {
      Authorization: ORS_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    if (attempt === 1 && profile === "cycling-regular") {
      console.warn("Retrying with 'cycling-road'...");
      return fetchRouteWithElevation({
        start,
        end,
        distance,
        profile: "cycling-road",
        attempt: 2,
      });
    }
    if (attempt === 2 && profile === "cycling-road") {
      console.warn("Retrying with 'foot-walking'...");
      return fetchRouteWithElevation({
        start,
        end,
        distance,
        profile: "foot-walking",
        attempt: 3,
      });
    }

    const text = await res.text();
    throw new Error(`ORS request failed (${res.status}): ${text}`);
  }

  const routeData = await res.json();
  const feature = routeData.features?.[0];
  const geometry = feature?.geometry;
  const summary = feature?.properties?.summary;

  if (!geometry?.coordinates?.length || geometry.coordinates.length < 30) {
    if (attempt < 3) {
      console.warn("Route unrealistic — retrying with fallback profile...");
      const nextProfile =
        profile === "cycling-regular"
          ? "cycling-road"
          : profile === "cycling-road"
            ? "foot-walking"
            : "foot-hiking";
      return fetchRouteWithElevation({
        start,
        end,
        distance,
        profile: nextProfile,
        attempt: attempt + 1,
      });
    }
    throw new Error("ORS route seems invalid or too short");
  }

  // Extract elevation correctly (now in geometry)
  const distanceKm = +(summary?.distance ?? 0).toFixed(2);
  const durationMin = Math.round((summary?.duration ?? 0) / 60);

  return {
    ...routeData,
    features: [
      {
        ...feature,
        geometry,
        properties: {
          ...summary,
          distanceKm,
          durationMin,
          usedProfile: profile,
        },
      },
    ],
  };
}
