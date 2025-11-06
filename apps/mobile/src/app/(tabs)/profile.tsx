import { useState, useEffect } from "react";
import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { useAuth } from "@routly/lib/context/AuthContext";
import ProfileHeader from "src/components/Profile/ProfileHeader";
import { FlatList } from "react-native";
import RouteCard from "src/components/Profile/RouteCard";
import { useRouter } from "expo-router";

const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.md}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.lg}px;
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.sm}px;
`;

export default function ProfileScreen() {
  const { supabase, user } = useAuth();
  const [routes, setRoutes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRoutes = async () => {
      if (!supabase || !user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from("routes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      if (!error) setRoutes(data || []);
      setLoading(false);
    };
    fetchRoutes();
  }, [supabase, user]);

  const handleViewOnMap = (route: any) => {
    router.push(`/route/${route.id}`);
  };

  return (
    <Container>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RouteCard route={item} onViewOnMap={handleViewOnMap} />
        )}
        ListHeaderComponent={
          <>
            <ProfileHeader user={user} />
            <Title>Saved Routes</Title>
          </>
        }
        contentContainerStyle={{ paddingBottom: theme.spacing.xxl }}
        ListEmptyComponent={
          loading ? (
            <Title style={{ color: theme.colors.grayDark }}>Loading…</Title>
          ) : (
            <Title style={{ color: theme.colors.grayDark }}>
              No saved routes yet.
            </Title>
          )
        }
      />
    </Container>
  );
}
