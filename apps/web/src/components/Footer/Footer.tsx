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
`;

const FooterLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: ${theme.colors.white};
  font-size: ${theme.typography.md};
  padding-bottom: 2px;

  transition: color 0.25s ease;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -1px;
    width: 0%;
    height: 2px;
    background-color: ${theme.colors.white};
    transition: width 0.3s ease;
  }

  &:hover {
    color: ${theme.colors.white};
  }

  &:hover::after {
    width: 100%;
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
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/generate">Generate</FooterLink>
          <FooterLink href="/explore">Explore</FooterLink>
          <FooterLink href="/about">About</FooterLink>
        </NavLinks>
      </TopRow>

      <Divider />

      <BottomRow>
        © {new Date().getFullYear()} Routly. All rights reserved.
      </BottomRow>
    </Container>
  );
}
