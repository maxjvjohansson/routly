import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

type ButtonColor = keyof typeof theme.colors;

type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  color?: ButtonColor;
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

const StyledButton = styled.button<{
  $variant?: "solid" | "outline";
  $color?: ButtonColor;
  $fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  gap: ${({ theme }) => theme.spacing.xxs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radius.lg};
  font-size: ${({ theme }) => theme.typography.sm};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  background-color: ${({ theme, $variant, $color }) =>
    $variant === "outline"
      ? "transparent"
      : $color
        ? theme.colors[$color]
        : theme.colors.black};

  color: ${({ theme, $variant }) =>
    $variant === "outline" ? theme.colors.black : theme.colors.white};

  border: ${({ theme, $variant, $color }) =>
    $variant === "outline"
      ? `1px solid ${theme.colors.gray}`
      : `1px solid transparent`};

  &:hover {
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 1px solid ${({ theme }) => theme.colors.teal};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ theme }) => theme.media.md} {
    font-size: ${({ theme }) => theme.typography.md};
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
}: ButtonProps) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    $variant={variant}
    $color={color}
    $fullWidth={fullWidth}
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
