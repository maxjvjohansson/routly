"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useAuth } from "@routly/lib/context/AuthContext";
import { webTheme as theme } from "@routly/ui/theme/web";
import ExploreRoutesList from "src/components/Explore/ExploreRoutesList";
import FilterBar from "src/components/Explore/FilterBar";
import { Button } from "src/components/Button/Button";

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

const ButtonWrapper = styled.div`
  margin-top: ${theme.spacing.xl};
`;

export default function ExplorePage() {
  const { supabase, user } = useAuth();

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

  // Likes
  const [likedRouteIds, setLikedRouteIds] = useState<string[]>([]);

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

    const from = 0;
    const to = PAGE_SIZE * page - 1;

    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .order("created_at", { ascending: false })
      .range(from, to);

    if (!error && data) setRoutes(data);
    setLoading(false);
  }, [supabase, page]);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

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

    if (sort === "distance_asc")
      list.sort((a, b) => a.distance_km - b.distance_km);
    if (sort === "distance_desc")
      list.sort((a, b) => b.distance_km - a.distance_km);

    if (sort === "newest")
      list.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

    return list;
  }, [routes, activity, roundtrip, isLiked, sort, likedRouteIds]);

  return (
    <Container>
      <Header>
        <Heading>Discover community routes</Heading>
        <Intro>
          Explore running and cycling routes created by other Routly users near
          you.
        </Intro>
      </Header>

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

      <ExploreRoutesList
        routes={filteredRoutes}
        loading={loading}
        onToggleLike={toggleLike}
        likedRouteIds={likedRouteIds}
      />
      <ButtonWrapper>
        <Button
          label="Load more"
          color="orange"
          onClick={() => setPage((prev) => prev + 1)}
        />
      </ButtonWrapper>
    </Container>
  );
}
