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
import { BiRun, BiCycling } from "react-icons/bi";
import { FaRoute, FaMountain, FaClock } from "react-icons/fa";
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import { exportRouteToGpx } from "@routly/lib/gpx/exportGpx";

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
  justify-content: space-between;
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

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};

  ${theme.media.md} {
    flex-direction: row;
    justify-content: space-between;
  }
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
                coordinates: route.coordinates.map((p: any) =>
                  p.elevation != null
                    ? [p.lng, p.lat, p.elevation]
                    : [p.lng, p.lat]
                ),
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
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/explore");
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
                <BiRun size={22} />
              ) : (
                <BiCycling size={22} />
              )
            }
          />
          <RouteInfoItem
            label="Distance"
            value={`${distance} km`}
            icon={<FaRoute size={18} />}
          />
          <RouteInfoItem
            label="Elevation"
            value={`+${ascent} m`}
            icon={<FaMountain size={18} />}
          />
          <RouteInfoItem
            label="Estimated time"
            value={`${duration} min`}
            icon={<FaClock size={18} />}
          />
        </InfoList>

        <ActionButtons>
          <Button
            label="Export GPX"
            color="orange"
            onClick={() => {
              if (!geojson) return;
              exportRouteToGpx(geojson, `${route.name || "route"}.gpx`);
            }}
            iconRight={<FiDownload size={20} />}
          />

          <Button
            label="Go Back"
            color="teal"
            onClick={handleGoBack}
            iconLeft={<FiArrowLeft size={20} />}
          />
        </ActionButtons>
      </InfoPanel>

      <MapContainer>
        <RoutlyMap routeData={geojson} isRoundTrip={route.is_roundtrip} />
      </MapContainer>
    </Wrapper>
  );
}
