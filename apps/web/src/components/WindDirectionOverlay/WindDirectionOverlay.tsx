"use client";

import styled from "styled-components";
import { FaLocationArrow } from "react-icons/fa";
import { webTheme as theme } from "@routly/ui/theme/web";

const Wrapper = styled.div`
  position: absolute;
  top: ${theme.spacing.xs};
  left: ${theme.spacing.xs};
  z-index: 1;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);

  padding: ${theme.spacing.xs};
  border-radius: ${theme.radius.xl};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const Arrow = styled.div<{ $deg: number }>`
  transform: rotate(${({ $deg }) => $deg}deg);
  transform-origin: center;
  transition: transform 0.25s ease;
`;

const Text = styled.span`
  font-size: ${theme.typography.sm};
  font-weight: 500;
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
      <Arrow $deg={iconRotation}>
        <FaLocationArrow size={18} color={theme.colors.orange} />
      </Arrow>

      <Text>{windSpeed.toFixed(1)} m/s</Text>
    </Wrapper>
  );
}
