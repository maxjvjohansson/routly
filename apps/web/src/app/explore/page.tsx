"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useAuth } from "@routly/lib/context/AuthContext";
import { webTheme as theme } from "@routly/ui/theme/web";
import ExploreRoutesList from "src/components/Explore/ExploreRoutesList";
import FilterBar from "src/components/Explore/FilterBar";
import { Button } from "src/components/Button/Button";
import { useRouter } from "next/navigation";

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  background-color: ${theme.colors.white};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Heading = styled.h1`
  font-size: ${theme.typography["2xl"]};
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.black};

  ${theme.media.md} {
    font-size: ${theme.typography["3xl"]};
  }
`;

const Intro = styled.p`
  color: ${theme.colors.grayDark};
  font-size: ${theme.typography.md};
`;

const NearMeButtonWrapper = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const ButtonWrapper = styled.div`
  margin-top: ${theme.spacing.xl};
`;

const LoggedOutBox = styled.div`
  margin-top: ${theme.spacing.lg};
  text-align: center;
`;

const LoggedOutText = styled.p`
  color: ${theme.colors.grayDark};
  font-size: ${theme.typography.md};
  margin-bottom: ${theme.spacing.lg};
`;

const AuthButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
`;

export default function ExplorePage() {
  const { supabase, user } = useAuth();
  const router = useRouter();

  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const PAGE_SIZE = 6;
  const [page, setPage] = useState(1);

  // Filters
  const [activity, setActivity] = useState<"all" | "running" | "cycling">(
    "all"
  );
  const [roundtrip, setRoundtrip] = useState<"all" | "roundtrip" | "p2p">(
    "all"
  );
  const [sort, setSort] = useState("newest");
  const [isLiked, setIsLiked] = useState(false);
  const [nearMe, setNearMe] = useState(false);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // Likes
  const [likedRouteIds, setLikedRouteIds] = useState<string[]>([]);

  const distanceKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;

    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  // Fetch user likes
  const fetchLikes = useCallback(async () => {
    if (!supabase || !user) return;

    const { data, error } = await supabase
      .from("route_likes")
      .select("route_id")
      .eq("user_id", user.id);

    if (error) {
      console.error("Failed to fetch likes:", error);
      return;
    }

    if (data) {
      setLikedRouteIds(data.map((item: { route_id: any }) => item.route_id));
    }
  }, [supabase, user]);

  // Toggle like/unlike
  const toggleLike = async (route: any) => {
    if (!supabase || !user) return;

    const alreadyLiked = likedRouteIds.includes(route.id);

    if (alreadyLiked) {
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

  useEffect(() => {
    fetchLikes();
  }, [fetchLikes]);

  // Fetch routes
  const fetchRoutes = useCallback(async () => {
    if (!supabase) return;

    setLoading(true);

    // If Near Me is active, bypass pagination and call RPC instead
    if (nearMe && userPos) {
      const { data, error } = await supabase.rpc("routes_near_me", {
        lat: userPos.lat,
        lng: userPos.lng,
      });

      if (error) console.error("RPC near_me error:", error);

      if (data) {
        setRoutes(data);
      }

      setLoading(false);
      return;
    }

    // Normal fetch (paginated)
    const from = 0;
    const to = PAGE_SIZE * page - 1;

    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!error && data) setRoutes(data);
    setLoading(false);
  }, [supabase, page, nearMe, userPos]);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes, nearMe, userPos]);

  // Filtering logic
  const filteredRoutes = useMemo(() => {
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
      return list.sort((a, b) => {
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
    }

    if (sort === "distance_asc") {
      list.sort((a, b) => a.distance_km - b.distance_km);
    }

    if (sort === "distance_desc") {
      list.sort((a, b) => b.distance_km - a.distance_km);
    }

    if (sort === "newest") {
      list.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    return list;
  }, [
    routes,
    activity,
    roundtrip,
    isLiked,
    sort,
    likedRouteIds,
    nearMe,
    userPos,
  ]);

  const getLocation = useCallback(() => {
    if (!navigator?.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setNearMe(true);
      },
      (err) => {
        console.warn("Location error:", err);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <Container>
      <Header>
        <Heading>Discover community routes</Heading>

        {!user ? (
          <LoggedOutBox>
            <LoggedOutText>
              Log in or create an account to explore routes created by Routly
              users.
            </LoggedOutText>

            <AuthButtons>
              <Button
                label="Log in"
                color="orange"
                onClick={() => router.push("/login")}
              />
              <Button
                label="Sign up"
                color="black"
                onClick={() => router.push("/signup")}
              />
            </AuthButtons>
          </LoggedOutBox>
        ) : (
          <Intro>
            Explore running and cycling routes created by other Routly users
            near you.
          </Intro>
        )}
      </Header>

      {user && (
        <>
          <NearMeButtonWrapper>
            <Button
              label={
                nearMe ? "📍 Showing routes near you" : "📍 Show routes near me"
              }
              color="orange"
              onClick={() => {
                if (!nearMe) {
                  getLocation();
                } else {
                  setNearMe(false);
                  setUserPos(null);
                  setPage(1);
                }
              }}
            />
          </NearMeButtonWrapper>

          {!nearMe && (
            <FilterBar
              activity={activity}
              setActivity={setActivity}
              roundtrip={roundtrip}
              setRoundtrip={setRoundtrip}
              sort={sort}
              setSort={setSort}
              isLiked={isLiked}
              setIsLiked={setIsLiked}
            />
          )}

          <ExploreRoutesList
            routes={filteredRoutes}
            loading={loading}
            onToggleLike={toggleLike}
            likedRouteIds={likedRouteIds}
          />

          {!nearMe && (
            <ButtonWrapper>
              <Button
                label="Load more"
                color="orange"
                onClick={() => setPage((prev) => prev + 1)}
              />
            </ButtonWrapper>
          )}
        </>
      )}
    </Container>
  );
}
