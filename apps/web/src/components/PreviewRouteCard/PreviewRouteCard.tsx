"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import RouteInfoItem from "./RouteInfoItem";
import RouteWeatherInfo from "./RouteWeatherInfo";
import { calculateTotalAscent } from "@routly/lib/routeAlgorithms/calculateTotalAscent";

const Card = styled.div<{ $active?: boolean }>`
  width: 100%;
  border: ${({ $active }) =>
    $active
      ? `2px solid ${theme.colors.orange}`
      : `1px solid ${theme.colors.gray}`};
  background: ${theme.colors.white};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
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
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const DetailsSection = styled.details`
  margin-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.grayLight};
  padding-top: ${theme.spacing.xs};
`;

const Summary = styled.summary<{ $active?: boolean }>`
  cursor: pointer;
  color: ${({ $active }) =>
    $active ? theme.colors.orange : theme.colors.teal};
  font-weight: 500;
  font-size: ${theme.typography.sm};
`;

const DetailsText = styled.p`
  margin-top: ${theme.spacing.xs};
  color: ${theme.colors.grayDark};
`;

type Props = {
  index: number;
  route: GeoJSON.FeatureCollection;
  weather?: any;
  isActive: boolean;
  onSelect: () => void;
  onSaveRequest: (index: number, route: GeoJSON.FeatureCollection) => void;
};

export default function PreviewRouteCard({
  index,
  route,
  weather,
  isActive,
  onSelect,
  onSaveRequest,
}: Props) {
  const summary: any = route?.features?.[0]?.properties ?? {};
  const distance: any = summary?.distanceKm?.toFixed(1) ?? "—";
  const ascent: number = calculateTotalAscent(route);
  const duration: any = summary?.durationMin?.toFixed(0) ?? "—";
  const activityText =
    summary?.profile === "cycling-regular" ? "Cycling" : "Running";

  return (
    <Card $active={isActive}>
      <Title>Route {index + 1}</Title>

      <InfoList>
        <RouteInfoItem label="Activity" value={activityText} />
        <RouteInfoItem label="Distance" value={`${distance} km`} />
        <RouteInfoItem label="Elevation" value={`+${ascent} m`} />
        <RouteWeatherInfo weather={weather} />
      </InfoList>

      <ButtonWrapper>
        <Button
          label={isActive ? "Active route" : "View route"}
          color={isActive ? "orange" : "teal"}
          fullWidth
          onClick={onSelect}
        />
        <Button
          label="Save route"
          color="teal"
          fullWidth
          onClick={() => onSaveRequest(index, route)}
        />
      </ButtonWrapper>

      <DetailsSection>
        <Summary $active={isActive}>More details</Summary>
        <DetailsText>Est. duration: {duration} min</DetailsText>
      </DetailsSection>
    </Card>
  );
}
