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

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      window.location.href = "/";
    } catch (err) {
      console.error(err);
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
