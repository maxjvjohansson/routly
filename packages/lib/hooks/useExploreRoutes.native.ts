import { useState, useCallback, useEffect, useMemo } from "react";
import { Alert } from "react-native";
import * as Location from "expo-location";
import { useAuth } from "@routly/lib/context/AuthContext";
import { distanceKm } from "../utils/distance";

const PAGE_SIZE = 6;

type ActivityFilter = "all" | "running" | "cycling";
type RoundtripFilter = "all" | "roundtrip" | "p2p";
type SortOption = "newest" | "distance_asc" | "distance_desc";

type UserPos = { lat: number; lng: number } | null;

type Route = {
  id: string;
  activity: string;
  is_roundtrip: boolean;
  start_lat: number;
  start_lng: number;
  distance_km: number;
  created_at: string;
};

export function useExploreRoutes() {
  const { supabase, user } = useAuth();

  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  const [activity, setActivity] = useState<ActivityFilter>("all");
  const [roundtrip, setRoundtrip] = useState<RoundtripFilter>("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const [nearMe, setNearMe] = useState<boolean>(false);
  const [userPos, setUserPos] = useState<UserPos>(null);

  const [likedRouteIds, setLikedRouteIds] = useState<string[]>([]);

  // Fetch likes
  const fetchLikes = useCallback(async () => {
    if (!supabase || !user) return;

    const { data, error } = await supabase
      .from("route_likes")
      .select("route_id")
      .eq("user_id", user.id);

    if (error) {
      console.error("Failed to fetch likes", error);
      return;
    }

    if (data) {
      setLikedRouteIds(data.map((i: { route_id: string }) => i.route_id));
    }
  }, [supabase, user]);

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  // Fetch routes
  const fetchRoutes = useCallback(async () => {
    if (!supabase) return;

    setLoading(true);

    if (nearMe && userPos) {
      const { data, error } = await supabase.rpc("routes_near_me", {
        lat: userPos.lat,
        lng: userPos.lng,
      });

      if (error) console.error("routes_near_me RPC error:", error);

      if (data) setRoutes(data as Route[]);
      setLoading(false);
      return;
    }

    // Standard paginated fetch
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .order("created_at", { ascending: false })
      .range(0, PAGE_SIZE * page - 1);

    if (error) console.error("Fetch routes error", error);
    if (data) setRoutes(data as Route[]);
    setLoading(false);
  }, [supabase, page, nearMe, userPos]);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  // Toggle Like
  const toggleLike = async (route: Route) => {
    if (!supabase || !user) return;

    const already = likedRouteIds.includes(route.id);

    if (already) {
      const { error } = await supabase
        .from("route_likes")
        .delete()
        .eq("route_id", route.id)
        .eq("user_id", user.id);

      if (!error) {
        setLikedRouteIds((prev) => prev.filter((id) => id !== route.id));
      }
    } else {
      const { error } = await supabase.from("route_likes").insert({
        route_id: route.id,
        user_id: user.id,
      });

      if (!error) {
        setLikedRouteIds((prev) => [...prev, route.id]);
      }
    }
  };

  // Filtering + sorting
  const filteredRoutes = useMemo<Route[]>(() => {
    let list = [...routes];

    if (activity !== "all") {
      list = list.filter((r) => r.activity === activity);
    }

    if (roundtrip !== "all") {
      list = list.filter((r) =>
        roundtrip === "roundtrip" ? r.is_roundtrip : !r.is_roundtrip
      );
    }

    if (isLiked) {
      list = list.filter((r) => likedRouteIds.includes(r.id));
    }

    if (nearMe && userPos) {
      list.sort((a, b) => {
        const distA = distanceKm(
          userPos.lat,
          userPos.lng,
          a.start_lat,
          a.start_lng
        );
        const distB = distanceKm(
          userPos.lat,
          userPos.lng,
          b.start_lat,
          b.start_lng
        );
        return distA - distB;
      });
      return list;
    }

    if (sort === "newest") {
      list.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else if (sort === "distance_asc") {
      list.sort((a, b) => a.distance_km - b.distance_km);
    } else if (sort === "distance_desc") {
      list.sort((a, b) => b.distance_km - a.distance_km);
    }

    return list;
  }, [
    routes,
    activity,
    roundtrip,
    isLiked,
    sort,
    nearMe,
    userPos,
    likedRouteIds,
  ]);

  // Native Geo-Location (expo-location)
  const getLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required.");
        return;
      }

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setUserPos({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      setNearMe(true);
      setPage(1);
    } catch (error) {
      console.error("Location error:", error);
      Alert.alert("Error", "Could not get current location.");
    }
  }, []);

  return {
    routes,
    filteredRoutes,
    loading,

    activity,
    setActivity,
    roundtrip,
    setRoundtrip,
    sort,
    setSort,
    isLiked,
    setIsLiked,

    nearMe,
    setNearMe,
    userPos,
    setUserPos,
    getLocation,

    likedRouteIds,
    toggleLike,

    page,
    setPage,
  };
}
