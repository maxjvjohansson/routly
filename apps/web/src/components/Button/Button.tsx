import styled from "styled-components";

type ButtonProps = {
  title: string;
  onClick?: () => void;
  color?: string;
  variant?: "solid" | "outline";
  icon?: React.ReactNode;
  disabled?: boolean;
};

const StyledButton = styled.button<{
  color?: string;
  $variant?: "solid" | "outline";
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${({ theme, $variant, color }) =>
    $variant === "outline" ? "transparent" : color || theme.colors.black};
  color: ${({ theme, $variant, color }) =>
    $variant === "outline" ? color || theme.colors.black : theme.colors.white};
  border: ${({ theme, color, $variant }) =>
    $variant === "outline"
      ? `2px solid ${color || theme.colors.black}`
      : "none"};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.white};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Button = ({
  title,
  onClick,
  color,
  variant = "solid",
  icon,
  disabled,
}: ButtonProps) => (
  <StyledButton
    onClick={onClick}
    disabled={disabled}
    color={color}
    $variant={variant}
  >
    {icon && <span style={{ marginRight: 8 }}>{icon}</span>}
    {title}
  </StyledButton>
);
