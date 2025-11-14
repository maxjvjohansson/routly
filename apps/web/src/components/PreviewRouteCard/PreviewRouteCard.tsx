"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import RouteInfoItem from "./RouteInfoItem";
import RouteWeatherInfo from "./RouteWeatherInfo";
import { calculateTotalAscent } from "@routly/lib/routeAlgorithms/calculateTotalAscent";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { formatActivityLabel } from "@routly/lib/utils/activityText";
import { BiRun, BiCycling } from "react-icons/bi";
import { FaRoute, FaMountain, FaWind } from "react-icons/fa";

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
  const { activity } = useRouteGeneration();
  const summary: any = route?.features?.[0]?.properties ?? {};
  const distance: any = summary?.distanceKm?.toFixed(1) ?? "—";
  const ascent: number = calculateTotalAscent(route);
  const duration: any = summary?.durationMin?.toFixed(0) ?? "—";
  const averageRunSpeedKmH = 10;
  const adjustedRunTimeMin: number = (distance / averageRunSpeedKmH) * 60;
  const activityText = formatActivityLabel(activity);

  return (
    <Card $active={isActive}>
      <Title>Route {index + 1}</Title>

      <InfoList>
        <RouteInfoItem
          label="Activity"
          value={activityText}
          icon={
            activity === "run" ? <BiRun size={22} /> : <BiCycling size={22} />
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
        <RouteWeatherInfo weather={weather} icon={<FaWind size={18} />} />
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
        {activity === "run" && (
          <DetailsText>
            Est. (running pace): {adjustedRunTimeMin.toFixed(0)} min
          </DetailsText>
        )}
      </DetailsSection>
    </Card>
  );
}
