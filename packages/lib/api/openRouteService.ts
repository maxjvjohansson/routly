const ORS_BASE_URL = "https://api.openrouteservice.org/v2";
const ORS_API_KEY = process.env.ORS_API_KEY;

if (!ORS_API_KEY) {
  console.warn("Missing ORS API key in environment variables");
}

export type ORSProfile =
  | "cycling-regular"
  | "cycling-road"
  | "foot-walking"
  | "foot-hiking";

// Snap point to nearest accessible road/path
async function snapToNearest(
  coord: [number, number]
): Promise<[number, number]> {
  try {
    const res = await fetch(`${ORS_BASE_URL}/nearest`, {
      method: "POST",
      headers: {
        Authorization: ORS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coordinates: [coord] }),
    });

    if (!res.ok) return coord;
    const data = await res.json();
    return data.coordinates?.[0] ?? coord;
  } catch {
    return coord;
  }
}

export async function fetchRouteWithElevation({
  start,
  end,
  distance,
  profile = "cycling-regular",
}: {
  start: [number, number];
  end?: [number, number];
  distance?: number; // km
  profile?: ORSProfile;
}) {
  if (!ORS_API_KEY) throw new Error("ORS API key is not configured");

  // Fallback profiles
  const profileFallbacks: Record<ORSProfile, ORSProfile[]> = {
    "cycling-regular": ["cycling-road", "foot-walking"],
    "cycling-road": ["foot-walking"],
    "foot-walking": ["foot-hiking"],
    "foot-hiking": [],
  };

  // Snap-points to nearest working road/profile
  const snappedStart = await snapToNearest(start);
  const snappedEnd = end ? await snapToNearest(end) : undefined;

  // Get routes with fallback profiles
  const profilesToTry = [profile, ...(profileFallbacks[profile] || [])];
  let routeData: any;
  let usedProfile: ORSProfile = profile;

  for (const prof of profilesToTry) {
    const directionsUrl = `${ORS_BASE_URL}/directions/${prof}/geojson`;
    const body = end
      ? { coordinates: [snappedStart, snappedEnd] }
      : {
          coordinates: [snappedStart],
          options: { round_trip: { length: (distance ?? 10) * 1000 } },
        };

    const directionsRes = await fetch(directionsUrl, {
      method: "POST",
      headers: {
        Authorization: ORS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!directionsRes.ok) {
      console.warn(
        `ORS ${prof} failed (${directionsRes.status}), trying fallback...`
      );
      continue;
    }

    routeData = await directionsRes.json();
    usedProfile = prof;
    break;
  }

  if (!routeData) throw new Error("ORS could not find a valid route");

  const geometry = routeData.features?.[0]?.geometry;
  const summary = routeData.features?.[0]?.properties?.summary;
  if (!geometry) throw new Error("ORS directions response missing geometry");

  // Elevation data
  const elevationRes = await fetch(
    "https://api.openrouteservice.org/elevation/line",
    {
      method: "POST",
      headers: {
        Authorization: ORS_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        format_in: "geojson",
        format_out: "geojson",
        geometry,
      }),
    }
  );

  if (!elevationRes.ok) {
    const text = await elevationRes.text();
    throw new Error(`ORS elevation failed (${elevationRes.status}): ${text}`);
  }

  const elevationData = await elevationRes.json();

  // Clear eventual nulls from elevation data and replace with 0
  const cleanedGeometry = {
    ...elevationData.geometry,
    coordinates: elevationData.geometry.coordinates.map((coord: number[]) => {
      const [lng, lat, ele] = coord;
      return [lng, lat, ele ?? 0];
    }),
  };

  // Metadata
  const distanceKm = +(summary?.distance / 1000).toFixed(2);
  const durationMin = Math.round((summary?.duration ?? 0) / 60);

  return {
    ...routeData,
    features: [
      {
        ...routeData.features[0],
        geometry: cleanedGeometry,
        properties: {
          ...summary,
          usedProfile,
          distanceKm,
          durationMin,
        },
      },
    ],
  };
}
