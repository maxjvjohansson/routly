"use client";

import styled from "styled-components";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import PreviewRouteCard from "../PreviewRouteCard/PreviewRouteCard";

const Section = styled.section`
  margin-top: 32px;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  @media (min-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function RoutePreviewSection() {
  const { routes, weatherByRoute, activeRouteIndex, setActiveRouteIndex } =
    useRouteGeneration();

  if (!routes?.length) return null;

  return (
    <Section>
      {routes.map((route, i) => (
        <PreviewRouteCard
          key={i}
          index={i}
          route={route}
          weather={weatherByRoute?.[i]?.weather}
          isActive={i === activeRouteIndex}
          onSelect={() => setActiveRouteIndex(i)}
        />
      ))}
    </Section>
  );
}
