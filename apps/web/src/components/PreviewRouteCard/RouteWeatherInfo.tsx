import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { formatWindDirection } from "@routly/lib/routeAlgorithms/formatWindDirection";

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: ${theme.colors.grayDark};

  ${theme.media.md} {
    font-size: ${theme.typography.sm};
  }
`;

const Left = styled.div`
  display: flex;
  gap: ${theme.spacing.xxs};
`;

const Label = styled.span`
  font-size: 0.875rem;
  font-weight: 500;

  ${theme.media.md} {
    font-size: ${theme.typography.sm};
  }
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

  const windLabel: string =
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
