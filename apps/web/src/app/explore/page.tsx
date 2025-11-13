"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

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

export default function ExplorePage() {
  return (
    <Container>
      <Header>
        <Heading>Discover community routes</Heading>
        <Intro>
          Explore running and cycling routes created by other Routly users near
          you.
        </Intro>
      </Header>
    </Container>
  );
}
