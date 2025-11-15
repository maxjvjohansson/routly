import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

type ButtonColor = keyof typeof theme.colors;

type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "toggle";
  color?: ButtonColor;
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  active?: boolean;
};

const StyledButton = styled.button<{
  $variant?: "solid" | "outline" | "toggle";
  $color?: ButtonColor;
  $fullWidth?: boolean;
  $active?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  gap: ${({ theme }) => theme.spacing.xxs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.radius.lg};
  font-size: ${theme.typography.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ $variant, theme, $color, $active }) =>
    $variant === "toggle"
      ? `
      font-weight: 500;
        background-color: ${
          $active ? theme.colors.teal : theme.colors.grayLight
        };
        color: ${$active ? theme.colors.white : theme.colors.black};
        border: 1px solid ${$active ? theme.colors.teal : theme.colors.gray};
        box-shadow: none;
        &:hover {
          background-color: ${$active ? theme.colors.teal : theme.colors.grayLight};
        }
      `
      : `
        background-color: ${
          $variant === "outline"
            ? "transparent"
            : $color
              ? theme.colors[$color]
              : theme.colors.black
        };
        color: ${
          $variant === "outline" ? theme.colors.black : theme.colors.white
        };
        border: ${
          $variant === "outline"
            ? `1px solid ${theme.colors.gray}`
            : "1px solid transparent"
        };
        &:hover { opacity: 0.8; }
      `}

  &:focus-visible {
    outline: 1px solid ${theme.colors.teal};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Button = ({
  label,
  onClick,
  variant = "solid",
  color = "black",
  disabled,
  fullWidth,
  iconLeft,
  iconRight,
  type = "button",
  active = false,
}: ButtonProps) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    $variant={variant}
    $color={color}
    $fullWidth={fullWidth}
    type={type}
    $active={active}
  >
    {iconLeft && (
      <span style={{ display: "flex", marginRight: theme.spacing.xxs }}>
        {iconLeft}
      </span>
    )}
    {label}
    {iconRight && (
      <span style={{ display: "flex", marginLeft: theme.spacing.xxs }}>
        {iconRight}
      </span>
    )}
  </StyledButton>
);
