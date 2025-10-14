import styled from "styled-components";
import { TouchableOpacity, Text, View } from "react-native";
import { nativeTheme as theme } from "@routly/ui/theme/native";

type ButtonColor = keyof typeof theme.colors;

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "solid" | "outline";
  color?: ButtonColor;
  disabled?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
};

interface StyledButtonProps {
  $variant?: "solid" | "outline";
  $color?: ButtonColor;
  $fullWidth?: boolean;
  $disabled?: boolean;
}

const StyledButton = styled(TouchableOpacity)<
  StyledButtonProps & { theme: typeof theme }
>`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};

  padding: ${({ theme }) => `${theme.spacing.xs}px ${theme.spacing.lg}px`};

  border-radius: ${({ theme }) => theme.radius.lg}px;

  background-color: ${({ theme, $variant, $color }) =>
    $variant === "outline" ? "transparent" : theme.colors[$color ?? "black"]};

  border-width: ${({ $variant }) => ($variant === "outline" ? 1 : 0)}px;
  border-color: ${({ theme, $variant }) =>
    $variant === "outline" ? theme.colors.gray : "transparent"};

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
`;

const Label = styled(Text)<{ $variant?: "solid" | "outline" }>`
  color: ${({ theme, $variant }) =>
    $variant === "outline" ? theme.colors.black : theme.colors.white};
  font-size: ${({ theme }) => theme.typography.sm}px;
  font-weight: 600;
`;

const IconLeft = styled(View)`
  margin-right: ${({ theme }) => theme.spacing.xxs}px;
`;
const IconRight = styled(View)`
  margin-left: ${({ theme }) => theme.spacing.xxs}px;
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
}: ButtonProps) => (
  <StyledButton
    activeOpacity={0.8}
    onPress={onPress}
    disabled={disabled}
    $variant={variant}
    $color={color}
    $fullWidth={fullWidth}
    $disabled={disabled}
    accessibilityRole="button"
    accessibilityState={{ disabled: !!disabled }}
  >
    {iconLeft ? <IconLeft>{iconLeft}</IconLeft> : null}
    <Label $variant={variant}>{label}</Label>
    {iconRight ? <IconRight>{iconRight}</IconRight> : null}
  </StyledButton>
);
