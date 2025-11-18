"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import GenerateRouteForm from "../GenerateRouteForm/GenerateRouteForm";
import RoutlyMap from "../RoutlyMap/RoutlyMap";
import PreviewRouteCarousel from "../PreviewRouteCarousel/PreviewRouteCarousel";
import { WindDirectionOverlay } from "../WindDirectionOverlay/WindDirectionOverlay";

type Props = {
  mode?: "home" | "generate";
};

const RouteGenerationWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${theme.spacing.md};
  width: 100%;
  padding: ${theme.spacing.md};
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.radius.xl};
  max-width: 1200px;

  ${theme.media.md} {
    flex-direction: row;
    gap: ${theme.spacing.lg};
    padding: ${theme.spacing.xxl} ${theme.spacing.lg};
  }
`;

const LeftContainer = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RightContainer = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
`;

export default function GenerateRouteSection({ mode = "generate" }: Props) {
  const { routes, weatherByRoute, activeRouteIndex } = useRouteGeneration();
  const full = weatherByRoute?.[activeRouteIndex] ?? null;
  const weather = full?.weather ?? null;

  return (
    <RouteGenerationWrapper>
      <LeftContainer>
        {routes.length > 0 && mode === "generate" ? (
          <PreviewRouteCarousel />
        ) : (
          <GenerateRouteForm mode={mode} />
        )}
      </LeftContainer>

      <RightContainer>
        {weather && (
          <WindDirectionOverlay
            windSpeed={weather.windSpeed}
            windDirection={weather.windDirection}
          />
        )}
        <RoutlyMap />
      </RightContainer>
    </RouteGenerationWrapper>
  );
}
