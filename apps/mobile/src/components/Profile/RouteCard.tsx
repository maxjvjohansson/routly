import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { Button } from "../Button/Button";

type Props = {
  route: any;
  onViewOnMap: (route: any) => void;
  onDelete?: (routeId: string) => void;
};

const Card = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.lg}px;
  border: 1px solid ${theme.colors.gray};
  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.md}px;
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.xs}px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.sm}px;
`;

const InfoText = styled.Text`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.grayDark};
`;

const Actions = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  gap: ${theme.spacing.xxs};
`;

export default function RouteCard({ route, onViewOnMap, onDelete }: Props) {
  return (
    <Card>
      <Title>{route.name}</Title>

      <InfoRow>
        <InfoText>{route.distance_km?.toFixed(1)} km</InfoText>
        <InfoText>+{route.elevation_gain} m</InfoText>
        <InfoText>{route.duration_estimate?.toFixed(0)} min</InfoText>
      </InfoRow>

      <Actions>
        <Button
          label="View Details"
          color="teal"
          onPress={() => onViewOnMap(route)}
        />
        <Button
          label="Delete Route"
          color="red"
          onPress={() => onDelete?.(route.id)}
        />
      </Actions>
    </Card>
  );
}
