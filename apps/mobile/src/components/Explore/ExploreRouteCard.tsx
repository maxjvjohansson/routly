import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { Button } from "../Button/Button";
import { Ionicons } from "@expo/vector-icons";
import RouteInfoItem from "../PreviewRouteCard/RouteInfoItem";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = {
  route: any;
  onView: (route: any) => void;
  onToggleLike?: (route: any) => void;
  isLiked?: boolean;
};

const Card = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.lg}px;
  border: 1px solid ${theme.colors.gray};
  padding: ${theme.spacing.md}px;
`;

const Title = styled.Text`
  font-family: ${theme.typography.fontSemiBold};
  font-size: ${theme.typography.md}px;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.sm}px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LikeButton = styled.TouchableOpacity`
  padding: ${theme.spacing.xxs}px;
`;

export default function ExploreRouteCard({
  route,
  onView,
  onToggleLike,
  isLiked = false,
}: Props) {
  const distance = route.distance_km?.toFixed(1);
  const ascent = route.elevation_gain ?? 0;
  const duration = route.duration_estimate?.toFixed(0);

  return (
    <Card>
      <Title>{route.name}</Title>

      <InfoRow>
        <RouteInfoItem
          label="Distance"
          value={` ${distance} km`}
          mode="compact"
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
          value={` ${ascent} m`}
          mode="compact"
          icon={
            <FontAwesome5
              name="mountain"
              size={16}
              color={theme.colors.grayDark}
            />
          }
        />
        <RouteInfoItem
          label="Elevation"
          value={` ${duration} min`}
          mode="compact"
          icon={
            <MaterialCommunityIcons
              name="clock-time-five"
              size={20}
              color={theme.colors.grayDark}
            />
          }
        />
      </InfoRow>

      <Actions>
        <Button
          label="View Details"
          color="teal"
          onPress={() => onView(route)}
        />

        {onToggleLike && (
          <LikeButton onPress={() => onToggleLike(route)}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={24}
              color={isLiked ? theme.colors.orange : theme.colors.grayDark}
            />
          </LikeButton>
        )}
      </Actions>
    </Card>
  );
}
