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
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { exportRouteToGpxNative } from "@routly/lib/gpx/exportGpx.native";

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

const ActionButtons = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm}px;
  margin-top: ${theme.spacing.xxs}px;
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
                coordinates: route.coordinates.map((p: any) => [
                  p.lng,
                  p.lat,
                  p.elevation ?? 0,
                ]),
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
          <RouteInfoItem
            label="Activity"
            value={activity}
            icon={
              activity === "Running" ? (
                <MaterialIcons
                  name="directions-run"
                  size={22}
                  color={theme.colors.grayDark}
                />
              ) : (
                <Ionicons
                  name="bicycle"
                  size={22}
                  color={theme.colors.grayDark}
                />
              )
            }
          />
          <RouteInfoItem
            label="Distance"
            value={` ${distance} km`}
            icon={
              <FontAwesome5
                name="route"
                size={18}
                color={theme.colors.grayDark}
              />
            }
          />
          <RouteInfoItem
            label="Elevation"
            value={` +${ascent} m`}
            icon={
              <FontAwesome5
                name="mountain"
                size={16}
                color={theme.colors.grayDark}
              />
            }
          />
          <RouteInfoItem
            label="Estimated Time"
            value={` ${duration} min`}
            icon={
              <MaterialCommunityIcons
                name="clock-time-five"
                size={20}
                color={theme.colors.grayDark}
              />
            }
          />
        </InfoList>

        <ActionButtons>
          <Button
            label="Export GPX"
            color="orange"
            fullWidth
            iconLeft={
              <Ionicons
                name="download-outline"
                size={18}
                color={theme.colors.white}
              />
            }
            onPress={() => {
              if (geojson) {
                exportRouteToGpxNative(geojson, route.name);
              }
            }}
          />

          <Button
            label="Go Back"
            color="teal"
            fullWidth
            onPress={handleGoBack}
            iconLeft={
              <Ionicons
                name="arrow-back"
                size={18}
                color={theme.colors.white}
              />
            }
          />
        </ActionButtons>
      </InfoPanel>
      <RoutlyMap routeData={geojson} isRoundTrip={route.is_roundtrip} />
    </Wrapper>
  );
}
