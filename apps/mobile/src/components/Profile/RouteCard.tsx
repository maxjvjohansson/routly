import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { Button } from "../Button/Button";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import RouteInfoItem from "../PreviewRouteCard/RouteInfoItem";
import {
  formatDuration,
  formatAscent,
  formatDistance,
} from "@routly/lib/utils/routeFormatters";

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

const Actions = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  gap: ${theme.spacing.xxs}px;
`;

export default function RouteCard({
  route,
  onViewOnMap,
  onRename,
  onDelete,
}: Props) {
  const distance: string = formatDistance(route.distance_km);
  const ascent: number = formatAscent(route.elevation_gain);
  const duration: string = formatDuration(route.duration_estimate);

  return (
    <Card>
      <TitleRow>
        <Title>{route.name}</Title>
        <EditButton onPress={() => onRename(route)}>
          <FontAwesome5 name="edit" size={20} color={theme.colors.black} />
        </EditButton>
      </TitleRow>

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
          onPress={() => onViewOnMap(route)}
        />
        <Button
          label="Delete Route"
          color="red"
          onPress={() => onDelete(route)}
          iconRight={
            <MaterialCommunityIcons
              name="delete"
              size={22}
              color={theme.colors.white}
            />
          }
        />
      </Actions>
    </Card>
  );
}
