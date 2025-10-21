"use client";

import { NavbarContainer, Logo, LogoLink } from "./styles";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <NavbarContainer>
      <LogoLink href="/" passHref>
        <Logo>Routly</Logo>
      </LogoLink>

      <DesktopNav />
      <MobileMenu />
    </NavbarContainer>
  );
}
