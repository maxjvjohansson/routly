"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const Dot = styled.div<{ $active?: boolean }>`
  width: ${theme.spacing.xs};
  height: ${theme.spacing.xs};
  border-radius: ${theme.radius.full};
  background-color: ${({ $active }) =>
    $active ? theme.colors.orange : theme.colors.gray};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export function CarouselDots({
  count,
  activeIndex,
  onDotClick,
}: {
  count: number;
  activeIndex: number;
  onDotClick?: (index: number) => void;
}) {
  if (count <= 1) return null;

  return (
    <DotsContainer>
      {Array.from({ length: count }).map((_, i) => (
        <Dot
          key={i}
          $active={i === activeIndex}
          onClick={() => onDotClick?.(i)}
        />
      ))}
    </DotsContainer>
  );
}
