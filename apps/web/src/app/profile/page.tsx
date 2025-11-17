"use client";

import { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useAuth } from "@routly/lib/context/AuthContext";
import { webTheme as theme } from "@routly/ui/theme/web";
import ProfileHeader from "src/components/Profile/ProfileHeader";
import SavedRoutesList from "src/components/Profile/SavedRoutesList";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: ${theme.typography.xl};
  font-weight: 700;
  color: ${theme.colors.black};
`;

export default function ProfilePage() {
  const { user, supabase } = useAuth();
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutes = useCallback(async () => {
    if (!user || !supabase) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("routes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setRoutes(data || []);
    } catch (err) {
      console.error("Failed to fetch routes:", err);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  return (
    <Container>
      <ProfileHeader user={user} />
      <Title>Saved Routes</Title>
      <SavedRoutesList
        routes={routes}
        loading={loading}
        refetch={fetchRoutes}
      />
    </Container>
  );
}
