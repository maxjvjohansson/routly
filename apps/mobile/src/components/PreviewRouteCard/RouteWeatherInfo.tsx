import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { formatWindDirection } from "@routly/lib/routeAlgorithms/formatWindDirection";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

type Props = {
  weather?: {
    windCardinal?: string;
    windSpeed?: number;
    temperature?: number;
    condition?: string;
  } | null;
};

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Left = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.xxs}px;
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

function getConditionIcon(condition?: string) {
  if (!condition)
    return (
      <FontAwesome5 name="cloud" size={18} color={theme.colors.grayDark} />
    );

  const c = condition.toLowerCase();

  if (c.includes("sun") || c.includes("clear"))
    return <FontAwesome5 name="sun" size={18} color={theme.colors.grayDark} />;

  if (c.includes("cloud") && c.includes("part"))
    return (
      <FontAwesome5 name="cloud-sun" size={18} color={theme.colors.grayDark} />
    );

  if (c.includes("cloud"))
    return (
      <FontAwesome5 name="cloud" size={18} color={theme.colors.grayDark} />
    );

  if (c.includes("rain"))
    return (
      <FontAwesome5 name="cloud-rain" size={18} color={theme.colors.grayDark} />
    );

  if (c.includes("snow"))
    return (
      <FontAwesome5 name="snowflake" size={18} color={theme.colors.grayDark} />
    );

  if (c.includes("fog"))
    return <FontAwesome5 name="smog" size={18} color={theme.colors.grayDark} />;

  return <FontAwesome5 name="cloud" size={18} color={theme.colors.grayDark} />;
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
        <Value>
          {condition || "—"}
          {temperature != null ? ` · ${temperature}°C` : ""}
        </Value>
      </Row>

      <Row>
        <Left>
          <FontAwesome5 name="wind" size={16} color={theme.colors.grayDark} />
          <Label>Wind</Label>
        </Left>
        <Value>{windLabel}</Value>
      </Row>
    </>
  );
}
