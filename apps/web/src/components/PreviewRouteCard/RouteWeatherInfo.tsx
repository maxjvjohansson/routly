import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { formatWindDirection } from "@routly/lib/routeAlgorithms/formatWindDirection";
import {
  FaWind,
  FaSun,
  FaCloud,
  FaCloudSun,
  FaCloudRain,
  FaSnowflake,
  FaSmog,
} from "react-icons/fa";

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
  align-items: center;
`;

const Label = styled.span`
  font-weight: 500;
  color: ${theme.colors.grayDark};
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
};

function getConditionIcon(condition?: string) {
  if (!condition) return <FaCloud size={18} />;
  const c = condition.toLowerCase();

  if (c.includes("sun") || c.includes("clear")) return <FaSun size={18} />;
  if (c.includes("cloud") && c.includes("part"))
    return <FaCloudSun size={18} />;
  if (c.includes("cloud")) return <FaCloud size={18} />;
  if (c.includes("rain")) return <FaCloudRain size={18} />;
  if (c.includes("snow")) return <FaSnowflake size={18} />;
  if (c.includes("fog")) return <FaSmog size={18} />;

  return <FaCloud size={18} />;
}

export default function RouteWeatherInfo({ weather }: Props) {
  if (!weather) return null;

  const { windCardinal, windSpeed, temperature, condition } = weather;

  const windLabel: string =
    windCardinal && windSpeed != null
      ? `${formatWindDirection(windCardinal)} (${windSpeed} m/s)`
      : "—";

  const icon = getConditionIcon(condition);

  return (
    <>
      <Row>
        <Left>
          {icon}
          <Label>Weather</Label>
        </Left>
        <Value>{temperature != null ? ` ${temperature}°C` : ""}</Value>
      </Row>

      <Row>
        <Left>
          <FaWind size={18} />
          <Label>Wind</Label>
        </Left>
        <Value>{windLabel}</Value>
      </Row>
    </>
  );
}
