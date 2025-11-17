import { act, useState } from "react";
import styled from "styled-components/native";
import { Button } from "../Button/Button";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import RouteInfoItem from "./RouteInfoItem";
import RouteWeatherInfo from "./RouteWeatherInfo";
import { calculateTotalAscent } from "@routly/lib/routeAlgorithms/calculateTotalAscent";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { formatActivityLabel } from "@routly/lib/utils/activityText";

const Card = styled.View<{ $active?: boolean; $width?: number }>`
  width: ${({ $width }: { $width: any }) => ($width ? `${$width}px` : "auto")};
  border-width: ${({ $active }: { $active: any }) => ($active ? 2 : 1)}px;
  border-color: ${({ $active }: { $active: any }) =>
    $active ? theme.colors.orange : theme.colors.gray};
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.lg}px;
  padding: ${theme.spacing.lg}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const Title = styled.Text`
  font-family: ${theme.typography.fontSemiBold};
  font-size: ${theme.typography.md}px;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.sm}px;
`;

const InfoList = styled.View`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.xxs}px;
`;

const DetailsSection = styled.View`
  border-top: 1px solid ${theme.colors.grayLight};
`;

const DetailsToggle = styled.Text<{ $active?: boolean }>`
  color: ${({ $active }: { $active: any }) =>
    $active ? theme.colors.orange : theme.colors.teal};
  font-family: ${theme.typography.fontMedium};
  font-size: ${theme.typography.sm}px;
  margin-top: ${theme.spacing.xs}px;
`;

const DetailsText = styled.Text`
  font-family: ${theme.typography.fontRegular};
  margin-top: ${theme.spacing.xs}px;
  color: ${theme.colors.grayDark};
`;

export default function PreviewRouteCard({
  index,
  route,
  weather,
  isActive,
  onSelect,
  onSaveRequest,
  width,
}: {
  index: number;
  route: GeoJSON.FeatureCollection;
  weather?: any;
  isActive: boolean;
  onSelect: () => void;
  onSaveRequest: (index: number, route: GeoJSON.FeatureCollection) => void;
  width?: number;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const { activity } = useRouteGeneration();

  const summary: any = route?.features?.[0]?.properties ?? {};
  const distance: any = summary?.distanceKm?.toFixed(1) ?? "—";
  const ascent: number = calculateTotalAscent(route);
  const duration: any = summary?.durationMin?.toFixed(0) ?? "—";
  const averageRunSpeedKmH = 10;
  const adjustedRunTimeMin: number = (distance / averageRunSpeedKmH) * 60;
  const activityText: string = formatActivityLabel(activity);

  return (
    <Card $active={isActive} $width={width}>
      <Title>Route {index + 1}</Title>

      <InfoList>
        <RouteInfoItem
          label="Activity"
          value={activityText}
          icon={
            activity === "run" ? (
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
          value={`${distance} km`}
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
          value={`+${ascent} m`}
          icon={
            <FontAwesome5
              name="mountain"
              size={16}
              color={theme.colors.grayDark}
            />
          }
        />
        <RouteWeatherInfo
          weather={weather}
          icon={
            <FontAwesome5 name="wind" size={18} color={theme.colors.grayDark} />
          }
        />
      </InfoList>

      <ButtonWrapper>
        <Button
          label={isActive ? "Active route" : "View route"}
          color={isActive ? "orange" : "teal"}
          onPress={onSelect}
          iconRight={
            isActive ? (
              <MaterialIcons
                name="check"
                size={22}
                color={theme.colors.white}
              />
            ) : undefined
          }
        />
        <Button
          label="Save route"
          color="teal"
          onPress={() => onSaveRequest(index, route)}
          iconRight={
            <MaterialIcons
              name="save-alt"
              size={22}
              color={theme.colors.white}
            />
          }
        />
      </ButtonWrapper>

      <DetailsSection>
        <DetailsToggle
          $active={isActive}
          onPress={() => setShowDetails((v) => !v)}
        >
          {showDetails ? "Hide details" : "More details"}
        </DetailsToggle>

        {showDetails && (
          <DetailsText>Est. duration: {duration} min</DetailsText>
        )}
        {showDetails && activity === "run" && (
          <DetailsText>
            Est. (running pace): {adjustedRunTimeMin.toFixed(0)} min
          </DetailsText>
        )}
      </DetailsSection>
    </Card>
  );
}
