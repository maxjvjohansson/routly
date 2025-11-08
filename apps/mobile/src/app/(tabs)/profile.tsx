import { useState, useEffect, useCallback } from "react";
import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { useAuth } from "@routly/lib/context/AuthContext";
import ProfileHeader from "src/components/Profile/ProfileHeader";
import SavedRoutesList from "src/components/Profile/SavedRoutesList";

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.md}px;
`;

export default function ProfileScreen() {
  const { supabase, user } = useAuth();
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoutes = useCallback(async () => {
    if (!supabase || !user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("routes")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (!error) setRoutes(data || []);
    setLoading(false);
  }, [supabase, user]);

  useEffect(() => {
    fetchRoutes();
  }, [fetchRoutes]);

  return (
    <Container>
      <ProfileHeader user={user} />
      <SavedRoutesList
        routes={routes}
        loading={loading}
        refetch={fetchRoutes}
      />
    </Container>
  );
}
