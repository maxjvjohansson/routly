import { useState } from "react";
import styled from "styled-components/native";
import { Text, View } from "react-native";
import { Button } from "../Button/Button";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import RouteInfoItem from "./RouteInfoItem";
import RouteWeatherInfo from "./RouteWeatherInfo";

const Card = styled(View)<{ $active?: boolean }>`
  border-width: ${({ $active }: { $active: any }) => ($active ? 2 : 1)}px;
  border-color: ${({ $active }: { $active: any }) =>
    $active ? theme.colors.orange : theme.colors.gray};
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.lg}px;
  padding: ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.md}px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const Title = styled(Text)`
  font-size: ${theme.typography.md}px;
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.sm}px;
`;

const InfoList = styled(View)`
  gap: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const DetailsSection = styled(View)`
  border-top-width: 1px;
  border-top-color: ${theme.colors.grayLight};
`;

const DetailsToggle = styled(Text)<{ $active?: boolean }>`
  color: ${({ $active }: { $active: any }) =>
    $active ? theme.colors.orange : theme.colors.teal};
  font-weight: 500;
  font-size: ${theme.typography.sm}px;
  margin-top: ${theme.spacing.xs}px;
`;

export default function PreviewRouteCard({
  index,
  route,
  weather,
  isActive,
  onSelect,
}: {
  index: number;
  route: GeoJSON.FeatureCollection;
  weather?: any;
  isActive: boolean;
  onSelect: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);
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
        onPress={onSelect}
      />

      <DetailsSection>
        <DetailsToggle
          $active={isActive}
          onPress={() => setShowDetails((v) => !v)}
        >
          {showDetails ? "Hide details" : "More details"}
        </DetailsToggle>

        {showDetails && (
          <Text
            style={{
              marginTop: theme.spacing.xs,
              color: theme.colors.grayDark,
            }}
          >
            Est. duration: {duration} min
          </Text>
        )}
      </DetailsSection>
    </Card>
  );
}
