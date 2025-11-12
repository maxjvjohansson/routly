import styled from "styled-components";
import { TouchableOpacity, Text, View } from "react-native";
import { nativeTheme as theme } from "@routly/ui/theme/native";

type ButtonColor = keyof typeof theme.colors;

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "solid" | "outline" | "toggle";
  color?: ButtonColor;
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  active?: boolean;
};

interface StyledButtonProps {
  $variant?: "solid" | "outline" | "toggle";
  $color?: ButtonColor;
  $fullWidth?: boolean;
  $disabled?: boolean;
  $active?: boolean;
}

const StyledButton = styled(TouchableOpacity)<StyledButtonProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  padding: ${theme.spacing.xs}px ${theme.spacing.lg}px;
  border-radius: ${theme.radius.lg}px;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  border-width: 1px;

  ${({ $variant, $color, $active }) => {
    switch ($variant) {
      case "outline":
        return `
          background-color: transparent;
          border-color: ${theme.colors.gray};
        `;
      case "toggle":
        return `
          background-color: ${
            $active ? theme.colors[$color ?? "teal"] : theme.colors.grayLight
          };
          border-color: ${
            $active ? theme.colors[$color ?? "teal"] : theme.colors.gray
          };
        `;
      default:
        return `
          background-color: ${theme.colors[$color ?? "black"]};
          border-color: transparent;
        `;
    }
  }}
`;

const Label = styled(Text)<{ $variant?: string; $active?: boolean }>`
  font-size: ${theme.typography.sm}px;
  font-family: ${({ $variant }) =>
    $variant === "toggle"
      ? theme.typography.fontMedium
      : theme.typography.fontSemiBold};
  color: ${({ $variant, $active }) =>
    $variant === "toggle"
      ? $active
        ? theme.colors.white
        : theme.colors.black
      : $variant === "outline"
        ? theme.colors.black
        : theme.colors.white};
`;

const IconLeft = styled(View)`
  margin-right: ${theme.spacing.xxs}px;
`;

const IconRight = styled(View)`
  margin-left: ${theme.spacing.xxs}px;
`;

export const Button = ({
  label,
  onPress,
  variant = "solid",
  color = "black",
  disabled,
  fullWidth,
  iconLeft,
  iconRight,
  active = false,
}: ButtonProps) => (
  <StyledButton
    activeOpacity={0.8}
    onPress={onPress}
    disabled={disabled}
    $variant={variant}
    $color={color}
    $fullWidth={fullWidth}
    $disabled={disabled}
    $active={active}
    accessibilityRole="button"
    accessibilityState={{ disabled: !!disabled }}
  >
    {iconLeft ? <IconLeft>{iconLeft}</IconLeft> : null}
    <Label $variant={variant} $active={active}>
      {label}
    </Label>
    {iconRight ? <IconRight>{iconRight}</IconRight> : null}
  </StyledButton>
);
