"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import RouteInfoItem from "./RouteInfoItem";
import RouteWeatherInfo from "./RouteWeatherInfo";

const Card = styled.div<{ $active?: boolean }>`
  border: ${({ $active }) =>
    $active
      ? `2px solid ${theme.colors.orange}`
      : `1px solid ${theme.colors.gray}`};
  background: ${theme.colors.white};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition:
    border 0.2s ease,
    box-shadow 0.2s ease;
`;

const Title = styled.h3`
  font-size: ${theme.typography.md};
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.black};
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
`;

const DetailsSection = styled.details<{ $active?: boolean }>`
  margin-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.grayLight};
  padding-top: ${theme.spacing.xs};

  summary {
    cursor: pointer;
    color: ${({ $active }) =>
      $active ? theme.colors.orange : theme.colors.teal};
    font-weight: 500;
    font-size: ${theme.typography.sm};
  }
`;

type Props = {
  index: number;
  route: GeoJSON.FeatureCollection;
  weather?: any;
  isActive: boolean;
  onSelect: () => void;
};

export default function PreviewRouteCard({
  index,
  route,
  weather,
  isActive,
  onSelect,
}: Props) {
  const summary: any = route?.features?.[0]?.properties ?? {};
  const distance = summary?.distanceKm?.toFixed(1) ?? "—";
  const elevation = summary?.ascent?.toFixed(0) ?? "—";
  const duration = summary?.durationMin?.toFixed(0) ?? "—";

  return (
    <Card $active={isActive}>
      <Title>Route {index + 1}</Title>

      <InfoList>
        <RouteInfoItem label="Distance" value={`${distance} km`} />
        <RouteInfoItem label="Elevation" value={`+${elevation} m`} />
        <RouteWeatherInfo weather={weather} />
      </InfoList>

      <Button
        label={isActive ? "Active route" : "View route"}
        color={isActive ? "orange" : "teal"}
        fullWidth
        onClick={onSelect}
      />

      <DetailsSection $active={isActive}>
        <summary>More details</summary>
        <p>Est. duration: {duration} min</p>
      </DetailsSection>
    </Card>
  );
}
