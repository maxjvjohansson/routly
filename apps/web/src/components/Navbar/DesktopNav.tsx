"use client";

import { NavLinks, NavLink } from "./styles";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "@routly/lib/context/AuthContext";

export default function DesktopNav() {
  const { user } = useAuth();
  return (
    <NavLinks>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/test">Generate</NavLink>
      <NavLink href="/explore">Explore</NavLink>
      <NavLink href="/about">About</NavLink>

      {!user ? <NavLink href="/login">Sign in</NavLink> : <ProfileDropdown />}
    </NavLinks>
  );
}
