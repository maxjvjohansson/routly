const ORS_BASE_URL = "https://api.openrouteservice.org/v2";
const ORS_API_KEY = process.env.ORS_API_KEY || process.env.ORS_API_KEY;

if (!ORS_API_KEY) {
  console.warn("Missing ORS API key in environment variables");
}

export type ORSProfile =
  | "cycling-regular"
  | "cycling-road"
  | "foot-walking"
  | "foot-hiking";

export async function fetchRouteWithElevation({
  coordinates,
  profile = "cycling-regular",
}: {
  coordinates: [number, number][];
  profile?: ORSProfile;
}) {
  if (!ORS_API_KEY) throw new Error("ORS API key is not configured");

  // Directions endpoint (For route coordinates)
  const directionsUrl = `${ORS_BASE_URL}/directions/${profile}/geojson`;
  const directionsRes = await fetch(directionsUrl, {
    method: "POST",
    headers: {
      Authorization: ORS_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ coordinates }),
  });

  if (!directionsRes.ok) {
    const text = await directionsRes.text();
    throw new Error(`ORS directions failed (${directionsRes.status}): ${text}`);
  }

  const routeData = await directionsRes.json();
  const geometry = routeData.features[0]?.geometry;

  if (!geometry) {
    throw new Error("ORS directions response missing geometry");
  }

  // Elevations endpoint (For topography data of direction coordinates)
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

  const routeWithElevation = {
    ...routeData,
    features: [
      {
        ...routeData.features[0],
        geometry: elevationData.geometry,
      },
    ],
  };

  return routeWithElevation;
}
