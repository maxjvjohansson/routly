"use client";

import Link from "next/link";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.gray};
  background-color: ${theme.colors.white};
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const LogoLink = styled(Link)`
  text-decoration: none;
`;

const Logo = styled.div`
  font-weight: 700;
  font-size: ${theme.typography.xl};
  color: ${theme.colors.teal};
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  color: ${theme.colors.black};
  &:hover {
    color: ${theme.colors.teal};
  }
`;

export default function Navbar() {
  return (
    <NavbarContainer>
      <LogoLink href="/" passHref>
        <Logo>Routly</Logo>
      </LogoLink>

      <NavLinks>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/generate">Generate</NavLink>
        <NavLink href="/explore">Explore</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
}
