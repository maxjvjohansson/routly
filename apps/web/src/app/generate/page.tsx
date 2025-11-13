"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import GenerateRouteSection from "src/components/GenerateRouteSection/GenerateRouteSection";

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
  h1 {
    font-size: ${theme.typography["2xl"]};
    font-weight: 700;
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.black};
  }

  p {
    color: ${theme.colors.grayDark};
    font-size: ${theme.typography.md};
  }

  ${theme.media.md} {
    h1 {
      font-size: ${theme.typography["3xl"]};
    }
  }
`;

export default function GeneratePage() {
  return (
    <Container>
      <Header>
        <h1>Generate your route</h1>
        <p>
          Choose your activity and let Routly find the perfect path for you.
        </p>
      </Header>
      <GenerateRouteSection />
    </Container>
  );
}
