import { useState } from "react";
import { useAuth } from "@routly/lib/context/AuthContext";
import { calculateTotalAscent } from "@routly/lib/routeAlgorithms/calculateTotalAscent";

type LineCoordinates = [number, number, number?];

type SavePayload = {
  name: string;
  activity: string;
  isRoundTrip: boolean;
  routeData: GeoJSON.FeatureCollection;
};

export const useRouteActions = () => {
  const { supabase, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const saveRoute = async ({
    name,
    activity,
    isRoundTrip,
    routeData,
  }: SavePayload) => {
    if (!user) throw new Error("User not logged in");
    setLoading(true);
    setError(null);

    try {
      const feature = routeData?.features?.[0];
      if (!feature || feature.geometry.type !== "LineString") {
        throw new Error("Invalid route geometry");
      }

      const coords = feature.geometry.coordinates as LineCoordinates[];
      const props = feature.properties as any;

      const formattedCoords = coords.map(([lng, lat, elevation]) => ({
        lat,
        lng,
        elevation: elevation ?? 0,
      }));

      const [startLng, startLat] = coords[0];
      const [endLng, endLat] = isRoundTrip
        ? coords[0]
        : coords[coords.length - 1];

      const payload = {
        user_id: user.id,
        name: name || "Untitled route",
        activity,
        distance_km: props.distanceKm ?? null,
        elevation_gain: calculateTotalAscent(routeData),
        duration_estimate: props.durationMin ?? null,
        coordinates: formattedCoords,
        start_lat: startLat,
        start_lng: startLng,
        end_lat: endLat,
        end_lng: endLng,
        is_roundtrip: isRoundTrip,
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

  const renameRoute = async (id: string, newName: string) => {
    if (!user) throw new Error("User not logged in");
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from("routes")
        .update({ name: newName, updated_at: new Date().toISOString() })
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error("Error renaming route:", err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteRoute = async (id: string) => {
    if (!user) throw new Error("User not logged in");
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.from("routes").delete().eq("id", id);
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error("Error deleting route:", err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { saveRoute, renameRoute, deleteRoute, loading, error };
};
