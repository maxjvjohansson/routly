"use client";

import GenerateRouteSection from "src/components/GenerateRouteSection/GenerateRouteSection";
import Hero from "src/components/Hero/Hero";
import HowItWorksSection from "src/components/HowItWorksSection/HowItWorksSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorksSection />
      <GenerateRouteSection />
    </>
  );
}
