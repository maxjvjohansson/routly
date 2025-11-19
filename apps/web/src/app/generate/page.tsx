"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import GenerateRouteSection from "src/components/GenerateRouteSection/GenerateRouteSection";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  background-color: ${theme.colors.white};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.md};
`;

const Heading = styled.h1`
  font-size: ${theme.typography["2xl"]};
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.black};

  ${theme.media.md} {
    font-size: ${theme.typography["3xl"]};
  }
`;

const Intro = styled.p`
  color: ${theme.colors.grayDark};
  font-size: ${theme.typography.md};
`;

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const refreshed = searchParams.get("r");

  useEffect(() => {
    // HACK: Force a hard refresh on first visit to /generate
    // This is a temporary fix to the 307 redirect loop bug
    if (!refreshed) {
      window.location.href = "/generate?r=1";
    }
  }, [refreshed]);

  return (
    <Container>
      <Header>
        <Heading>Generate your route</Heading>
        <Intro>
          Choose your activity and let Routly find the perfect path for you.
        </Intro>
      </Header>
      <GenerateRouteSection />
    </Container>
  );
}
