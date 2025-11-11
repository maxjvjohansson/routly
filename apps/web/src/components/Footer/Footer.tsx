"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import Link from "next/link";

const Container = styled.footer`
  width: 100%;
  background: ${theme.colors.teal};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${theme.spacing.lg};

  ${theme.media.md} {
    text-align: left;
    align-items: flex-start;
    padding: ${theme.spacing.xxl} ${theme.spacing.xl};
  }
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};
  width: 100%;
  max-width: 1100px;

  ${theme.media.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const LogoText = styled.h3`
  font-size: ${theme.typography["2xl"]};
  font-weight: 700;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.sm};

  ${theme.media.md} {
    flex-direction: row;
    gap: ${theme.spacing.lg};
  }

  a {
    color: ${theme.colors.white};
    text-decoration: none;
    font-size: ${theme.typography.md};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin-top: ${theme.spacing.lg};
`;

const BottomRow = styled.div`
  width: 100%;
  max-width: 1100px;
  text-align: center;
  font-size: ${theme.typography.sm};
  color: ${theme.colors.white};

  ${theme.media.md} {
    text-align: right;
  }
`;

export default function Footer() {
  return (
    <Container>
      <TopRow>
        <LogoText>Routly</LogoText>
        <NavLinks>
          <Link href="/">Home</Link>
          <Link href="/generate">Generate</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/about">About</Link>
        </NavLinks>
      </TopRow>

      <Divider />

      <BottomRow>
        © {new Date().getFullYear()} Routly. All rights reserved.
      </BottomRow>
    </Container>
  );
}
