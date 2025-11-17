import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import RouteInfoItem from "../PreviewRouteCard/RouteInfoItem";
import { FaClock, FaMountain, FaRoute, FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

type Props = {
  route: any;
  onViewOnMap: (route: any) => void;
  onRename: (route: any) => void;
  onDelete: (route: any) => void;
};

const Card = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.h4`
  font-size: ${theme.typography.md};
  font-weight: 600;
  color: ${theme.colors.black};
`;

const EditButton = styled.button`
  background: transparent;
  border: none;
  color: ${theme.colors.black};
  font-size: ${theme.typography.lg};
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const InfoRow = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  font-size: ${theme.typography.sm};
  color: ${theme.colors.grayDark};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
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
        <EditButton onClick={() => onRename(route)}>
          <FaRegEdit size={22} />
        </EditButton>
      </TitleRow>

      <InfoRow>
        <RouteInfoItem
          mode="compact"
          value={`${route.distance_km?.toFixed(1)} km`}
          icon={<FaRoute size={18} />}
        />
        <RouteInfoItem
          mode="compact"
          value={`${route.elevation_gain} m`}
          icon={<FaMountain size={18} />}
        />
        <RouteInfoItem
          mode="compact"
          value={`${route.duration_estimate?.toFixed(0)} min`}
          icon={<FaClock size={18} />}
        />
      </InfoRow>

      <Actions>
        <Button
          label="View Details"
          color="teal"
          fullWidth
          onClick={() => onViewOnMap(route)}
        />
        <Button
          label="Delete Route"
          color="red"
          fullWidth
          onClick={() => onDelete(route)}
          iconRight={<MdDelete size={20} />}
        />
      </Actions>
    </Card>
  );
}
