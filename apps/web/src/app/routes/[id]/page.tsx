"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useRouter } from "next/navigation";
import { webTheme as theme } from "@routly/ui/theme/web";
import { useAuth } from "@routly/lib/context/AuthContext";
import RoutlyMap from "src/components/RoutlyMap/RoutlyMap";
import { Button } from "src/components/Button/Button";
import RouteInfoItem from "src/components/PreviewRouteCard/RouteInfoItem";
import type { FeatureCollection, LineString } from "geojson";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${theme.spacing.sm};
  width: 100%;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.xl};
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 10px 15px rgba(0, 0, 0, 0.1);

  ${theme.media.md} {
    flex-direction: row;
    gap: ${theme.spacing.lg};
  }
`;

const InfoPanel = styled.div`
  flex: 1;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const MapContainer = styled.div`
  flex: 1;
  border-radius: ${theme.radius.lg};
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: ${theme.typography.lg};
  font-weight: 700;
  color: ${theme.colors.black};
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const BackButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default function RouteDetailPage() {
  const { id } = useParams();
  const { supabase } = useAuth();
  const router = useRouter();
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

  if (loading) return <p style={{ padding: "2rem" }}>Loading route...</p>;
  if (!route) return <p style={{ padding: "2rem" }}>Route not found.</p>;

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
          <Button
            label="Back to Profile"
            color="teal"
            onClick={() => router.push("/profile")}
          />
        </BackButtonWrapper>
      </InfoPanel>

      <MapContainer>
        <RoutlyMap routeData={geojson} isRoundTrip={route.is_roundtrip} />
      </MapContainer>
    </Wrapper>
  );
}
