import { useState } from "react";
import { useAuth } from "@routly/lib/context/AuthContext";
import { calculateTotalAscent } from "@routly/lib/routeAlgorithms/calculateTotalAscent";

type LineCoordinates = [number, number, number?];

export const useSaveRoute = () => {
  const { supabase, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const saveRoute = async ({
    name,
    activity,
    isRoundTrip,
    routeData,
    seed,
    profileUsed,
    startName,
    endName,
  }: {
    name: string;
    activity: string;
    isRoundTrip: boolean;
    routeData: GeoJSON.FeatureCollection;
    seed?: number | null;
    profileUsed?: string;
    startName?: string;
    endName?: string;
  }) => {
    if (!user) throw new Error("User not logged in");
    setLoading(true);
    setError(null);

    try {
      const feature = routeData?.features?.[0];
      if (!feature || feature.geometry.type !== "LineString") {
        throw new Error("Invalid route geometry");
      }

      // Type assert as LineString
      const coords = feature.geometry.coordinates as LineCoordinates[];

      const summary = (feature.properties as any)?.summary || {};

      // Explicit typing inside map
      const formattedCoords = coords.map(
        ([lng, lat, elevation]: LineCoordinates) => ({
          lat,
          lng,
          elevation: elevation ?? 0,
        })
      );

      const payload = {
        user_id: user.id,
        name: name || "Untitled route",
        activity,
        distance_km: summary.distance ? summary.distance / 1000 : null,
        elevation_gain: calculateTotalAscent(routeData),
        duration_estimate: summary.duration ? summary.duration / 60 : null,
        coordinates: formattedCoords,
        start_location: startName || null,
        end_location: endName || null,
        is_roundtrip: isRoundTrip,
        seed: seed || null,
        profile_used: profileUsed || null,
      };

      const { data, error } = await supabase.from("routes").insert(payload);
      if (error) throw error;

      return data;
    } catch (err) {
      console.error("Error saving route:", err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { saveRoute, loading, error };
};
