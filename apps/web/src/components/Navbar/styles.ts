import styled from "styled-components";
import Link from "next/link";
import { webTheme as theme } from "@routly/ui/theme/web";

export const NavbarContainer = styled.nav<{ $scrolled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${theme.spacing.xxl};
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.black};
  background-color: ${theme.colors.black};
  position: sticky;
  top: 0;
  z-index: 999;
  transition: box-shadow 0.2s ease;
  ${({ $scrolled }) =>
    $scrolled &&
    `
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  `};
`;

export const LogoLink = styled(Link)`
  text-decoration: none;
`;

export const Logo = styled.div`
  font-weight: 700;
  font-size: ${theme.typography.xl};
  color: ${theme.colors.white};
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

export const NavLinks = styled.div`
  display: none;
  align-items: center;
  gap: ${theme.spacing.md};

  ${theme.media.md} {
    display: flex;
  }
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  font-weight: 400;
  color: ${theme.colors.white};
  &:hover {
    font-weight: 500;
    color: ${theme.colors.tealLight};
    text-decoration: underline;
  }
`;

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const Avatar = styled.div`
  width: ${theme.spacing.lg};
  height: ${theme.spacing.lg};
  border-radius: ${theme.radius.full};
  background-color: ${theme.colors.teal};
  color: ${theme.colors.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  &:hover {
    opacity: 0.8;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: ${theme.spacing.xl};
  right: 0;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.grayLight};
  border-radius: ${theme.radius.md};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  min-width: 200px;
  overflow: hidden;
`;

export const DropdownItem = styled.button`
  all: unset;
  background: none;
  border: none;
  text-align: left;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.typography.sm};
  font-weight: 500;
  color: ${theme.colors.black};
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.grayLight};
    color: ${theme.colors.teal};
  }
`;

export const DropdownItemLink = styled(Link)`
  text-decoration: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-size: ${theme.typography.sm};
  font-weight: 500;
  border-bottom: 1px solid ${theme.colors.gray};
  color: ${theme.colors.black};
  cursor: pointer;
  display: block;
  &:hover {
    background-color: ${theme.colors.grayLight};
    color: ${theme.colors.teal};
  }
`;

export const HamburgerButton = styled.button<{ $open: boolean }>`
  position: relative;
  width: 28px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  z-index: 1000;
  @media (min-width: 768px) {
    display: none;
  }

  span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: ${theme.colors.white};
    border-radius: ${theme.radius.sm};
    transition: all 0.3s ease-out;
    transform-origin: center;
  }

  span:nth-child(1) {
    transform: ${({ $open }) =>
      $open ? "rotate(45deg) translate(5px, 5px);" : "none"};
  }

  span:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
  }

  span:nth-child(3) {
    transform: ${({ $open }) =>
      $open ? "rotate(-45deg) translate(7px, -6px)" : "none"};
  }
`;

export const MobileMenuWrapper = styled.div<{ $open: boolean }>`
  position: absolute;
  top: ${theme.spacing.xxl};
  right: 0;
  width: 100%;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  display: ${({ $open }) => ($open ? "flex" : "none")};
  flex-direction: column;
  z-index: 999;
`;

export const MobileLink = styled(Link)`
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid ${theme.colors.gray};
  color: ${theme.colors.black};
  &:hover {
    color: ${theme.colors.teal};
  }
`;

export const MobileButton = styled.button`
  all: unset;
  display: block;
  width: 100%;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  font-family: inherit;
  font-size: inherit;
  font-weight: 500;
  color: ${theme.colors.black};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.teal};
  }
`;
