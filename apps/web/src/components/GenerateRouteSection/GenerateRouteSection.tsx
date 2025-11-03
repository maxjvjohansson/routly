"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import GenerateRouteForm from "../GenerateRouteForm/GenerateRouteForm";
import RoutlyMap from "../RoutlyMap/RoutlyMap";
import PreviewRouteCarousel from "../PreviewRouteCarousel/PreviewRouteCarousel";

const RouteGenerationWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: ${theme.spacing.sm};
  width: 100%;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.xl};
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.1),
    0 10px 15px rgba(0, 0, 0, 0.1);

  ${theme.media.md} {
    flex-direction: row;
    gap: ${theme.spacing.lg};
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
`;

export default function GenerateRouteSection() {
  const { routes } = useRouteGeneration();

  return (
    <RouteGenerationWrapper>
      <LeftContainer>
        {routes.length > 0 ? <PreviewRouteCarousel /> : <GenerateRouteForm />}
      </LeftContainer>

      <RightContainer>
        <RoutlyMap />
      </RightContainer>
    </RouteGenerationWrapper>
  );
}
