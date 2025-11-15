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
import { MdOutlineSaveAlt, MdCheck } from "react-icons/md";

const Card = styled.div<{ $active?: boolean }>`
  width: 100%;
  border: ${({ $active }) =>
    $active
      ? `2px solid ${theme.colors.orange}`
      : `1px solid ${theme.colors.gray}`};
  background: ${theme.colors.white};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.md};

  ${theme.media.md} {
    padding: ${theme.spacing.lg};
  }
`;

const Title = styled.h3`
  font-size: ${theme.typography.lg};
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
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
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};

  ${theme.media.md} {
    flex-direction: row;
  }
`;

const DetailsSection = styled.details`
  margin-top: ${theme.spacing.sm};
  border-top: 1px solid ${theme.colors.grayLight};
  padding-top: ${theme.spacing.sm};
`;

const Summary = styled.summary<{ $active?: boolean }>`
  cursor: pointer;
  color: ${({ $active }) =>
    $active ? theme.colors.orange : theme.colors.teal};
  font-weight: 500;
  font-size: ${theme.typography.sm};
  padding: ${theme.spacing.xs} 0;
  list-style: none;
  user-select: none;

  &::-webkit-details-marker {
    display: none;
  }

  &::before {
    content: "▸ ";
    display: inline-block;
    margin-right: ${theme.spacing.xs};
    transition: transform 0.2s ease;
  }

  &:hover {
    opacity: 0.8;
  }
`;

const DetailsContent = styled.div`
  padding-top: ${theme.spacing.xs};
`;

const DetailsText = styled.p`
  color: ${theme.colors.grayDark};
  font-size: ${theme.typography.sm};
  margin-bottom: ${theme.spacing.xs};

  &:last-child {
    margin-bottom: 0;
  }
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
          iconRight={isActive ? <MdCheck size={20} /> : undefined}
        />
        <Button
          label="Save route"
          color="teal"
          fullWidth
          onClick={() => onSaveRequest(index, route)}
          iconRight={<MdOutlineSaveAlt size={20} />}
        />
      </ButtonWrapper>

      <DetailsSection>
        <Summary $active={isActive}>More details</Summary>
        <DetailsContent>
          <DetailsText>Est. duration: {duration} min</DetailsText>
          {activity === "run" && (
            <DetailsText>
              Est. (running pace): {adjustedRunTimeMin.toFixed(0)} min
            </DetailsText>
          )}
        </DetailsContent>
      </DetailsSection>
    </Card>
  );
}
