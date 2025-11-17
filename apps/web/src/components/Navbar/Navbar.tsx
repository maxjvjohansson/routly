"use client";

import { useState, useEffect } from "react";
import {
  NavbarContainer,
  Logo,
  LogoLink,
  LogoWrapper,
  LogoImage,
} from "./styles";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";
import logo from "src/assets/images/routly_logo.svg";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <NavbarContainer $scrolled={scrolled}>
      <LogoWrapper>
        <LogoLink href="/">
          <LogoImage src={logo} alt="Routly Logo" priority />
          <Logo>Routly</Logo>
        </LogoLink>
      </LogoWrapper>

      <DesktopNav />
      <MobileMenu />
    </NavbarContainer>
  );
}
