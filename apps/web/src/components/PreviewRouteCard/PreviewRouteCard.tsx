"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import RouteInfoItem from "./RouteInfoItem";
import RouteWeatherInfo from "./RouteWeatherInfo";
import { calculateTotalAscent } from "@routly/lib/routeAlgorithms/calculateTotalAscent";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { useSaveRouteWithFeedback } from "@routly/lib/hooks/useSaveRouteWithFeedback";
import { useState } from "react";
import NameRouteModal from "../Modal/NameRouteModal";

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

const ErrorText = styled.p`
  color: ${theme.colors.red};
  font-size: ${theme.typography.sm};
  text-align: center;
  margin-top: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xs};
`;

const SuccessText = styled.p`
  color: ${theme.colors.green};
  font-size: ${theme.typography.sm};
  text-align: center;
  margin-top: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xs};
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
  const { activity, isRoundTrip, startPoint, endPoint } = useRouteGeneration();
  const { handleSaveRoute, loading, statusMessage, statusType } =
    useSaveRouteWithFeedback();
  const [showModal, setShowModal] = useState(false);
  const summary: any = route?.features?.[0]?.properties ?? {};
  const distance: any = summary?.distanceKm?.toFixed(1) ?? "—";
  const ascent: number = calculateTotalAscent(route);
  const duration: any = summary?.durationMin?.toFixed(0) ?? "—";
  const averageRunSpeedKmH: number = 10;
  const adjustedRunTimeMin: number = (distance / averageRunSpeedKmH) * 60;

  const activityText: string =
    activity.charAt(0).toUpperCase() + activity.slice(1);

  const onConfirmName = async (name: string) => {
    const normalizedActivity =
      activity === "run"
        ? "running"
        : activity === "cycle"
          ? "cycling"
          : activity;

    await handleSaveRoute({
      name,
      activity: normalizedActivity,
      isRoundTrip,
      routeData: route,
      startName: startPoint ? "Start point" : null,
      endName: endPoint ? "End point" : null,
    });
    setShowModal(false);
  };

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
          label={loading ? "Saving..." : "Save route"}
          color="teal"
          fullWidth
          disabled={loading}
          onClick={() => setShowModal(true)}
        />
      </ButtonWrapper>

      <NameRouteModal
        isOpen={showModal}
        defaultValue={`Route ${index + 1}`}
        loading={loading}
        onCancel={() => setShowModal(false)}
        onConfirm={onConfirmName}
      />

      {statusMessage &&
        (statusType === "error" ? (
          <ErrorText>{statusMessage}</ErrorText>
        ) : (
          <SuccessText>{statusMessage}</SuccessText>
        ))}

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
