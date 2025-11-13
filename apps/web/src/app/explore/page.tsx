"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useAuth } from "@routly/lib/context/AuthContext";
import { webTheme as theme } from "@routly/ui/theme/web";
import ExploreRoutesList from "src/components/Explore/ExploreRoutesList";
import FilterBar from "src/components/Explore/FilterBar";

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

export default function ExplorePage() {
  const { supabase } = useAuth();
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [activity, setActivity] = useState<"all" | "running" | "cycling">(
    "all"
  );
  const [roundtrip, setRoundtrip] = useState<"all" | "roundtrip" | "p2p">(
    "all"
  );
  const [sort, setSort] = useState("newest");

  // Fetch routes
  const fetchRoutes = useCallback(async () => {
    if (!supabase) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("routes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRoutes(data || []);
    } catch (err) {
      console.error("Failed to fetch routes:", err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  // Filter Logic
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
  }, [routes, activity, roundtrip, sort]);

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
      />

      <ExploreRoutesList routes={filteredRoutes} loading={loading} />
    </Container>
  );
}
