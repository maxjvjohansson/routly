import styled from "styled-components";
import { TextInput, View, Text } from "react-native";
import { nativeTheme as theme } from "@routly/ui/theme/native";

type InputFieldProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  type?: "text" | "password" | "email";
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
};

const Wrapper = styled(View)<{ $fullWidth?: boolean }>`
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
  margin-bottom: ${theme.spacing.sm}px;
`;

const Label = styled(Text)`
  font-size: ${theme.typography.sm}px;
  font-weight: 500;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.xxs}px;
`;

const InputContainer = styled(View)<{ $hasError?: boolean }>`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.colors.white};
  border-width: 1px;
  border-color: ${({ $hasError }) =>
    $hasError ? theme.colors.red : theme.colors.gray};
  border-radius: ${theme.radius.md}px;
  padding: ${theme.spacing.xxs}px ${theme.spacing.sm}px;
`;

const StyledInput = styled(TextInput)`
  flex: 1;
  color: ${theme.colors.black};
  font-size: ${theme.typography.sm}px;
  padding: 0;
`;

const ErrorText = styled(Text)`
  color: ${theme.colors.red};
  font-size: ${theme.typography.sm}px;
  margin-top: ${theme.spacing.xxs}px;
`;

export const InputField = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  iconLeft,
  iconRight,
  error,
  disabled,
  fullWidth,
}: InputFieldProps) => (
  <Wrapper $fullWidth={fullWidth}>
    {label && <Label>{label}</Label>}

    <InputContainer $hasError={!!error}>
      {iconLeft && (
        <View style={{ marginRight: theme.spacing.xxs }}>{iconLeft}</View>
      )}

      <StyledInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={type === "password"}
        editable={!disabled}
        keyboardType={type === "email" ? "email-address" : "default"}
        placeholderTextColor={theme.colors.grayDark}
      />

      {iconRight && (
        <View style={{ marginLeft: theme.spacing.xxs }}>{iconRight}</View>
      )}
    </InputContainer>

    {error && <ErrorText>{error}</ErrorText>}
  </Wrapper>
);
