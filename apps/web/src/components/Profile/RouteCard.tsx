import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";

type Props = {
  route: any;
  onViewOnMap: (route: any) => void;
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

const Title = styled.h4`
  font-size: ${theme.typography.md};
  font-weight: 600;
  color: ${theme.colors.black};
`;

const InfoRow = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  font-size: ${theme.typography.sm};
  color: ${theme.colors.grayDark};
`;

const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.sm};
`;

export default function RouteCard({ route, onViewOnMap }: Props) {
  return (
    <Card>
      <Title>{route.name}</Title>

      <InfoRow>
        <span>{route.distance_km?.toFixed(1)} km</span>
        <span>{route.elevation_gain} m</span>
        <span>{route.duration_estimate?.toFixed(0)} min</span>
      </InfoRow>

      <Actions>
        <Button
          label="View Details"
          color="teal"
          fullWidth
          onClick={() => onViewOnMap(route)}
        />
        <Button label="Delete Route" color="red" fullWidth onClick={() => {}} />
      </Actions>
    </Card>
  );
}
