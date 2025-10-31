import styled from "styled-components/native";
import { Text, View } from "react-native";
import { nativeTheme as theme } from "@routly/ui/theme/native";

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.grayDark};
  font-weight: 500;
`;

const Value = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.black};
  font-weight: 600;
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
      ? `${windCardinal} (${windSpeed} m/s)`
      : (windCardinal ?? "—");

  return (
    <Row>
      <Label>Wind</Label>
      <Value>{windLabel}</Value>
    </Row>
  );
}
