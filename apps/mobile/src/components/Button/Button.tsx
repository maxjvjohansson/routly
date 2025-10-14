import styled, { DefaultTheme } from "styled-components/native";
import { TouchableOpacity, Text, View } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
  color?: string;
  variant?: "solid" | "outline";
  icon?: React.ReactNode;
  disabled?: boolean;
};

const StyledButton = styled(TouchableOpacity)<{
  $color?: string;
  $variant?: "solid" | "outline";
}>`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 8px;
  background-color: ${({
    theme,
    $variant,
    $color,
  }: {
    theme: DefaultTheme;
    $variant?: "solid" | "outline";
    $color?: string;
  }) =>
    $variant === "outline" ? "transparent" : $color || theme.colors.black};
  border-width: ${({ $variant }: { $variant?: "solid" | "outline" }) =>
    $variant === "outline" ? 2 : 0}px;
  border-color: ${({
    theme,
    $color,
    $variant,
  }: {
    theme: DefaultTheme;
    $color?: string;
    $variant?: "solid" | "outline";
  }) =>
    $variant === "outline" ? $color || theme.colors.black : "transparent"};
`;

const Label = styled(Text)<{ $color?: string; $variant?: "solid" | "outline" }>`
  color: ${({
    theme,
    $variant,
    $color,
  }: {
    theme: DefaultTheme;
    $variant?: "solid" | "outline";
    $color?: string;
  }) =>
    $variant === "outline" ? $color || theme.colors.black : theme.colors.white};
  font-weight: 600;
`;

export const Button = ({
  title,
  onPress,
  color,
  variant = "solid",
  icon,
  disabled,
}: ButtonProps) => {
  return (
    <StyledButton
      onPress={onPress}
      activeOpacity={0.8}
      $color={color}
      $variant={variant}
      disabled={disabled}
    >
      {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
      <Label $variant={variant} $color={color}>
        {title}
      </Label>
    </StyledButton>
  );
};
