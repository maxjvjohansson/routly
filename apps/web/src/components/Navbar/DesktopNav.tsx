"use client";

import { NavLinks, NavLink } from "./styles";
import ProfileDropdown from "./ProfileDropdown";

export default function DesktopNav() {
  return (
    <NavLinks>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/generate">Generate</NavLink>
      <NavLink href="/explore">Explore</NavLink>

      <ProfileDropdown />
    </NavLinks>
  );
}
