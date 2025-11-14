import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { Button } from "../Button/Button";
import { Ionicons } from "@expo/vector-icons";

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
  margin-bottom: ${theme.spacing.md}px;
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

const InfoText = styled.Text`
  font-family: ${theme.typography.fontRegular};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.grayDark};
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
  return (
    <Card>
      <Title>{route.name}</Title>

      <InfoRow>
        <InfoText>{route.distance_km?.toFixed(1)} km</InfoText>
        <InfoText>+{route.elevation_gain} m</InfoText>
        <InfoText>{route.duration_estimate?.toFixed(0)} min</InfoText>
      </InfoRow>

      <Actions>
        <Button label="View route" color="teal" onPress={() => onView(route)} />

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
