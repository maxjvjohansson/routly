import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { formatWindDirection } from "@routly/lib/routeAlgorithms/formatWindDirection";

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: ${theme.typography.sm};
  color: ${theme.colors.grayDark};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const Label = styled.span`
  font-weight: 500;
`;

const Value = styled.span`
  font-weight: 600;
  color: ${theme.colors.black};
`;

type Props = {
  weather?: {
    windCardinal?: string;
    windSpeed?: number;
    temperature?: number;
    condition?: string;
  } | null;
  icon?: React.ReactNode;
};

export default function RouteWeatherInfo({ weather, icon }: Props) {
  if (!weather) return null;

  const { windCardinal, windSpeed } = weather;

  const windLabel =
    windCardinal && windSpeed != null
      ? `${formatWindDirection(windCardinal)} (${windSpeed} m/s)`
      : (windCardinal ?? "—");

  return (
    <Row>
      <Left>
        {icon && <span>{icon}</span>}
        <Label>Wind</Label>
      </Left>
      <Value>{windLabel}</Value>
    </Row>
  );
}
