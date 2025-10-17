"use client";

import GenerateRouteForm from "src/components/GenerateRouteForm/GenerateRouteForm";
import RoutlyMap from "src/components/RoutlyMap/RoutlyMap";
import styled from "styled-components";

const Title = styled.h1`
  color: #0598a8;
`;

export default function HomePage() {
  return (
    <div>
      <Title>Routly Web</Title>
      <RoutlyMap />
      <GenerateRouteForm />
    </div>
  );
}
