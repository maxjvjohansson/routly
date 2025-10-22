"use client";

import { useState, useRef, useEffect } from "react";
import { handleLogout } from "@routly/lib/supabase/auth";
import {
  DropdownWrapper,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownItemLink,
} from "./styles";
import { isProtectedPath } from "@routly/lib/config/routes";
import { useRouter, usePathname } from "next/navigation";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onLogout = async () => {
    try {
      await handleLogout();
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
    <DropdownWrapper ref={ref}>
      <Avatar onClick={() => setOpen((prev) => !prev)}></Avatar>
      {open && (
        <Dropdown>
          <DropdownItemLink href="/profile">Profile</DropdownItemLink>
          <DropdownItemLink href="/settings">Profile Settings</DropdownItemLink>
          <DropdownItem onClick={onLogout}>Logout</DropdownItem>
        </Dropdown>
      )}
    </DropdownWrapper>
  );
}
