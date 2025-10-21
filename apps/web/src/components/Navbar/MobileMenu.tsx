"use client";

import { useState } from "react";
import { handleLogout } from "@routly/lib/supabase/auth";
import {
  HamburgerButton,
  MobileMenuWrapper,
  MobileLink,
  MobileButton,
} from "./styles";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const onLogout = async () => {
    try {
      await handleLogout();
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <HamburgerButton
        aria-label="Toggle menu"
        $open={open}
        onClick={() => setOpen((p) => !p)}
      >
        <span />
        <span />
        <span />
      </HamburgerButton>

      <MobileMenuWrapper $open={open}>
        <MobileLink href="/">Home</MobileLink>
        <MobileLink href="/generate">Generate</MobileLink>
        <MobileLink href="/explore">Explore</MobileLink>
        <MobileLink href="/profile">Profile</MobileLink>
        <MobileLink href="/settings">Profile Settings</MobileLink>
        <MobileButton onClick={onLogout}>Logout</MobileButton>
      </MobileMenuWrapper>
    </>
  );
}
