"use client";

import { useState, useEffect } from "react";
import { NavbarContainer, Logo, LogoLink } from "./styles";
import DesktopNav from "./DesktopNav";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <NavbarContainer $scrolled={scrolled}>
      <LogoLink href="/" passHref>
        <Logo>Routly</Logo>
      </LogoLink>

      <DesktopNav />
      <MobileMenu />
    </NavbarContainer>
  );
}
