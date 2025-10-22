"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "src/context/AuthContext";
import {
  HamburgerButton,
  MobileMenuWrapper,
  MobileLink,
  MobileButton,
} from "./styles";
import { handleLogout } from "@routly/lib/supabase/auth";
import { isProtectedPath } from "@routly/lib/config/routes";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setOpen((p) => !p);
  const closeMenu = () => setOpen(false);

  const onLogout = async () => {
    try {
      await handleLogout();
      closeMenu();
      if (isProtectedPath(pathname)) {
        router.replace("/");
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <>
      <HamburgerButton
        aria-label="Toggle menu"
        $open={open}
        onClick={toggleMenu}
      >
        <span />
        <span />
        <span />
      </HamburgerButton>

      <MobileMenuWrapper $open={open}>
        <MobileLink href="/" onClick={closeMenu}>
          Home
        </MobileLink>
        <MobileLink href="/generate" onClick={closeMenu}>
          Generate
        </MobileLink>
        <MobileLink href="/explore" onClick={closeMenu}>
          Explore
        </MobileLink>

        {user ? (
          <>
            <MobileLink href="/profile" onClick={closeMenu}>
              Profile
            </MobileLink>
            <MobileLink href="/settings" onClick={closeMenu}>
              Profile Settings
            </MobileLink>
            <MobileButton onClick={onLogout}>Logout</MobileButton>
          </>
        ) : (
          <MobileLink href="/login" onClick={closeMenu}>
            Sign in
          </MobileLink>
        )}
      </MobileMenuWrapper>
    </>
  );
}
