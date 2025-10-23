const ORS_BASE_URL = "https://api.openrouteservice.org/v2";
const ORS_API_KEY =
  process.env.EXPO_PUBLIC_ORS_API_KEY || process.env.NEXT_PUBLIC_ORS_API_KEY;

if (!ORS_API_KEY) {
  console.warn("Missing ORS API key in environment variables");
}

export type ORSProfile =
  | "cycling-regular"
  | "cycling-road"
  | "foot-walking"
  | "foot-hiking";

export async function fetchRoute({
  coordinates,
  profile = "cycling-regular",
}: {
  coordinates: [number, number][];
  profile?: ORSProfile;
}) {
  const res = await fetch(`${ORS_BASE_URL}/directions/${profile}`, {
    method: "POST",
    headers: {
      Authorization: ORS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ coordinates }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ORS request failed: ${text}`);
  }

  return res.json();
}
