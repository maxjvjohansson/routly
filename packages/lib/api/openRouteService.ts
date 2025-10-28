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

export async function fetchRouteWithElevation({
  start,
  end,
  distance,
  profile = "cycling-regular",
}: {
  start: [number, number];
  end?: [number, number];
  distance?: number; // Km
  profile?: ORSProfile;
}) {
  if (!ORS_API_KEY) throw new Error("ORS API key is not configured");

  const directionsUrl = `${ORS_BASE_URL}/directions/${profile}/geojson`;

  // Body if endpoint is defined in form, else get distance from directions API endpoint
  const body = end
    ? { coordinates: [start, end] }
    : {
        coordinates: [start],
        options: {
          round_trip: {
            length: (distance ?? 10) * 1000, // Km -> Meter
          },
        },
      };

  // Get directions from API endpoint
  const directionsRes = await fetch(directionsUrl, {
    method: "POST",
    headers: {
      Authorization: ORS_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!directionsRes.ok) {
    const text = await directionsRes.text();
    throw new Error(`ORS directions failed (${directionsRes.status}): ${text}`);
  }

  const routeData = await directionsRes.json();
  const geometry = routeData.features[0]?.geometry;
  const summary = routeData.features[0]?.properties?.summary;

  if (!geometry) throw new Error("ORS directions response missing geometry");

  // Get elevations/topography data based on directions
  const elevationRes = await fetch(
    "https://api.openrouteservice.org/elevation/line",
    {
      method: "POST",
      headers: {
        Authorization: ORS_API_KEY,
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

  // Combine directions, elevation and metadata
  const distanceKm = +(summary?.distance / 1000).toFixed(2);
  const durationMin = Math.round((summary?.duration ?? 0) / 60);

  const routeWithElevation = {
    ...routeData,
    features: [
      {
        ...routeData.features[0],
        geometry: elevationData.geometry,
        properties: {
          ...summary,
          distanceKm,
          durationMin,
        },
      },
    ],
  };

  return routeWithElevation;
}
