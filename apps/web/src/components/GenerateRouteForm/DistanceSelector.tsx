"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxs};
`;

const LabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${theme.typography.sm};
  font-weight: 500;
  color: ${theme.colors.black};
`;

const RangeWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const RangeInput = styled.input<{ $fillPercent: number }>`
  width: 100%;
  height: ${theme.spacing.xxs};
  border-radius: 999px;
  appearance: none;
  background: ${({ $fillPercent, theme }) =>
    `linear-gradient(to right, ${theme.colors.teal} ${$fillPercent}%, ${theme.colors.grayLight} ${$fillPercent}%)`};
  outline: none;
  cursor: pointer;
  transition: background 0.2s ease;

  &::-webkit-slider-thumb {
    appearance: none;
    width: ${theme.spacing.md};
    height: ${theme.spacing.md};
    background: ${theme.colors.teal};
    border-radius: 50%;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  &::-webkit-slider-thumb:hover {
    transform: scale(1.1);
  }
`;

const ManualInput = styled.input`
  width: 80px;
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.xxs} ${theme.spacing.xs};
  font-size: ${theme.typography.sm};
  text-align: right;
  color: ${theme.colors.black};
  background: ${theme.colors.white};
  &:focus {
    border-color: ${theme.colors.teal};
    outline: none;
  }
`;

export default function DistanceSelector() {
  const { activity, distance, setDistance } = useRouteGeneration();
  const max = activity === "run" ? 40 : 200;
  const fillPercent = Math.min((distance / max) * 100, 100);

  return (
    <Container>
      <LabelRow>
        <span>Distance (km)</span>
        <ManualInput
          type="number"
          min={1}
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
        />
      </LabelRow>

      <RangeWrapper>
        <RangeInput
          type="range"
          min={1}
          max={max}
          step={1}
          value={Math.min(distance, max)}
          onChange={(e) => setDistance(Number(e.target.value))}
          $fillPercent={fillPercent}
        />
      </RangeWrapper>

      <LabelRow>
        <span>1 km</span>
        <span>{max} km</span>
      </LabelRow>
    </Container>
  );
}
