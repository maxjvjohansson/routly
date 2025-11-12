import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { formatWindDirection } from "@routly/lib/routeAlgorithms/formatWindDirection";

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.Text`
  font-family: ${theme.typography.fontMedium};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.grayDark};
`;

const Value = styled.Text`
  font-family: ${theme.typography.fontSemiBold};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.black};
`;

export default function RouteWeatherInfo({
  weather,
}: {
  weather?: {
    windCardinal?: string;
    windSpeed?: number;
    temperature?: number;
    condition?: string;
  } | null;
}) {
  if (!weather) return null;

  const { windCardinal, windSpeed } = weather;

  const windLabel =
    windCardinal && windSpeed != null
      ? `${formatWindDirection(windCardinal)} (${windSpeed} m/s)`
      : (windCardinal ?? "—");

  return (
    <Row>
      <Label>Wind</Label>
      <Value>{windLabel}</Value>
    </Row>
  );
}
