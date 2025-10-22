"use client";

import { NavLinks, NavLink } from "./styles";
import ProfileDropdown from "./ProfileDropdown";
import { useAuth } from "src/context/AuthContext";

export default function DesktopNav() {
  const { user } = useAuth();
  return (
    <NavLinks>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/generate">Generate</NavLink>
      <NavLink href="/explore">Explore</NavLink>

      {!user ? <NavLink href="/login">Sign in</NavLink> : <ProfileDropdown />}
    </NavLinks>
  );
}
