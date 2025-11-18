"use client";

import Hero from "src/components/Hero/Hero";
import GenerateRouteSection from "src/components/GenerateRouteSection/GenerateRouteSection";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import HowItWorksSection from "src/components/HowItWorksSection/HowItWorksSection";
import LifestyleSection from "src/components/LifestyleSection/LifestyleSection";

const TryItSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: ${theme.colors.white};
  padding: ${theme.spacing.xxl} ${theme.spacing.md};
  gap: ${theme.spacing.xl};
`;

const Heading = styled.h2`
  font-size: ${theme.typography["2xl"]};
  font-weight: 700;
  color: ${theme.colors.black};
  ${theme.media.md} {
    font-size: ${theme.typography["3xl"]};
  }
`;

const Subtext = styled.p`
  font-size: ${theme.typography.md};
  color: ${theme.colors.grayDark};
  max-width: 600px;
  line-height: 1.6;

  ${theme.media.md} {
    font-size: ${theme.typography.lg};
  }
`;

export default function HomePage() {
  return (
    <>
      <Hero />
      <LifestyleSection />
      <HowItWorksSection />

      <TryItSection>
        <Heading>Try it yourself</Heading>
        <Subtext>
          Generate your own route in seconds, test the same engine that powers
          Routly’s smart route suggestions.
        </Subtext>
        <GenerateRouteSection mode="home" />
      </TryItSection>
    </>
  );
}
