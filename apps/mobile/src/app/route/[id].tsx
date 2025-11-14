"use client";

import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { useAuth } from "@routly/lib/context/AuthContext";
import { Button } from "src/components/Button/Button";
import RoutlyMap from "src/components/RoutlyMap/RoutlyMap";
import RouteInfoItem from "src/components/PreviewRouteCard/RouteInfoItem";
import type { FeatureCollection, LineString } from "geojson";

const Wrapper = styled.View`
  flex: 1;
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
`;

const InfoPanel = styled.View`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.radius.lg}px;
  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.sm}px;
`;

const Title = styled.Text`
  font-family: ${theme.typography.fontSemiBold};
  font-size: ${theme.typography.lg}px;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.sm}px;
`;

const InfoList = styled.View`
  flex-direction: column;
  gap: ${theme.spacing.xs}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const BackButtonWrapper = styled.View`
  margin-top: ${theme.spacing.md}px;
  align-items: flex-end;
`;

export default function RouteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { supabase } = useAuth();
  const router = useRouter();
  const navigation = useNavigation();
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase || !id) return;

    const fetchRoute = async () => {
      const { data, error } = await supabase
        .from("routes")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setRoute(data);
      setLoading(false);
    };

    fetchRoute();
  }, [supabase, id]);

  if (loading) return <Title style={{ padding: 20 }}>Loading route…</Title>;
  if (!route) return <Title style={{ padding: 20 }}>Route not found.</Title>;

  // Convert coordinates to GeoJSON
  const geojson: FeatureCollection<LineString> | null =
    route.coordinates && Array.isArray(route.coordinates)
      ? {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: route.coordinates.map((p: any) => [p.lng, p.lat]),
              },
              properties: {},
            },
          ],
        }
      : null;

  const distance = route.distance_km?.toFixed(1);
  const ascent = route.elevation_gain ?? 0;
  const duration = route.duration_estimate?.toFixed(0);
  const activity =
    route.activity.charAt(0).toUpperCase() + route.activity.slice(1);

  const handleGoBack = (): void => {
    if (navigation.canGoBack()) {
      router.back();
    } else {
      router.replace("/explore");
    }
  };

  return (
    <Wrapper>
      <InfoPanel>
        <Title>{route.name}</Title>

        <InfoList>
          <RouteInfoItem label="Activity" value={activity} />
          <RouteInfoItem label="Distance" value={`${distance} km`} />
          <RouteInfoItem label="Elevation" value={`+${ascent} m`} />
          <RouteInfoItem label="Estimated time" value={`${duration} min`} />
        </InfoList>

        <BackButtonWrapper>
          <Button label="Go Back" color="teal" onPress={handleGoBack} />
        </BackButtonWrapper>
      </InfoPanel>
      <RoutlyMap routeData={geojson} isRoundTrip={route.is_roundtrip} />
    </Wrapper>
  );
}
