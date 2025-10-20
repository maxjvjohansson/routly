"use client";

import GenerateRouteForm from "src/components/GenerateRouteForm/GenerateRouteForm";
import RoutlyMap from "src/components/RoutlyMap/RoutlyMap";

export default function HomePage() {
  return (
    <>
      <GenerateRouteForm />
      <RoutlyMap />
    </>
  );
}
