import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

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
  required?: boolean;
};

export const InputWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: ${theme.spacing.xxs};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
`;

export const Label = styled.label`
  font-size: ${theme.typography.sm};
  font-weight: 500;
  color: ${theme.colors.black};
`;

export const InputContainer = styled.div<{ $hasError?: boolean }>`
  display: flex;
  align-items: center;
  background-color: ${theme.colors.white};
  border: 1px solid
    ${({ $hasError }) => ($hasError ? theme.colors.red : theme.colors.gray)};
  border-radius: ${theme.radius.md};
  padding: ${theme.spacing.xxs} ${theme.spacing.sm};
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${theme.colors.teal};
  }
`;

export const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${theme.typography.sm};
  color: ${theme.colors.black};

  &::placeholder {
    color: ${theme.colors.grayDark};
  }
`;

export const ErrorText = styled.span`
  color: ${theme.colors.red};
  font-size: ${theme.typography.sm};
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
  required,
}: InputFieldProps) => (
  <InputWrapper $fullWidth={fullWidth}>
    {label && <Label>{label}</Label>}
    <InputContainer $hasError={!!error}>
      {iconLeft && (
        <span style={{ marginRight: theme.spacing.xxs }}>{iconLeft}</span>
      )}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
      />
      {iconRight && (
        <span style={{ marginLeft: theme.spacing.xxs }}>{iconRight}</span>
      )}
    </InputContainer>
    {error && <ErrorText>{error}</ErrorText>}
  </InputWrapper>
);
