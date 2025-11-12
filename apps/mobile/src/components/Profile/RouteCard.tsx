import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { Button } from "../Button/Button";

type Props = {
  route: any;
  onViewOnMap: (route: any) => void;
  onRename: (route: any) => void;
  onDelete: (route: any) => void;
};

const Card = styled.View`
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.lg}px;
  border: 1px solid ${theme.colors.gray};
  padding: ${theme.spacing.md}px;
  margin-bottom: ${theme.spacing.md}px;
`;

const TitleRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xs}px;
`;

const Title = styled.Text`
  font-family: ${theme.typography.fontSemiBold};
  font-size: ${theme.typography.md}px;
  color: ${theme.colors.black};
`;

const EditButton = styled.TouchableOpacity`
  padding: ${theme.spacing.xxs}px;
`;

const InfoRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm}px;
  margin-bottom: ${theme.spacing.sm}px;
`;

const InfoText = styled.Text`
  font-family: ${theme.typography.fontRegular};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.grayDark};
`;

const Actions = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  gap: ${theme.spacing.xxs}px;
`;

export default function RouteCard({
  route,
  onViewOnMap,
  onRename,
  onDelete,
}: Props) {
  return (
    <Card>
      <TitleRow>
        <Title>{route.name}</Title>
        <EditButton onPress={() => onRename(route)}>
          <Title>✎</Title>
        </EditButton>
      </TitleRow>

      <InfoRow>
        <InfoText>{route.distance_km?.toFixed(1)} km</InfoText>
        <InfoText>+{route.elevation_gain} m</InfoText>
        <InfoText>{route.duration_estimate?.toFixed(0)} min</InfoText>
      </InfoRow>

      <Actions>
        <Button label="View" color="teal" onPress={() => onViewOnMap(route)} />
        <Button label="Delete" color="red" onPress={() => onDelete(route)} />
      </Actions>
    </Card>
  );
}
