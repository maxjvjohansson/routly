import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import React from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const Wrapper = styled.View`
  position: absolute;
  top: ${theme.spacing.sm}px;
  left: ${theme.spacing.sm}px;
  z-index: 999;

  background-color: rgba(255, 255, 255, 0.9);
  padding: ${theme.spacing.xs}px;
  border-radius: ${theme.radius.lg}px;
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.xs}px;
`;

const Arrow = styled.View<{ deg: number }>`
  transform: ${({ deg }: { deg: any }) => `rotate(${deg}deg)`};
`;

const Text = styled.Text`
  font-family: ${theme.typography.fontMedium};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.black};
`;

export function WindDirectionOverlay({
  windSpeed,
  windDirection,
}: {
  windSpeed: number | null;
  windDirection: number | null;
}) {
  if (windSpeed == null || windDirection == null) return null;

  // Convert degrees to UI arrow rotation
  // Google gives METEOROLOGICAL degrees: 0° = North, clockwise.
  // FaLocationArrow icon points "North-East" by default (45° offset).
  const baseRotation: number = windDirection;
  const iconRotation: number = baseRotation - 45;

  return (
    <Wrapper>
      <Arrow deg={iconRotation}>
        <FontAwesome5
          name="location-arrow"
          size={20}
          color={theme.colors.orange}
        />
      </Arrow>

      <Text>{windSpeed.toFixed(1)} m/s</Text>
    </Wrapper>
  );
}
