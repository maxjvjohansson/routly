import styled, { css } from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { formatWindDirection } from "@routly/lib/routeAlgorithms/formatWindDirection";
import React from "react";

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
        {icon && <>{icon}</>}
        <Label>Wind</Label>
      </Left>
      <Value>{windLabel}</Value>
    </Row>
  );
}
