import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { useId } from "react";

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
  name?: string;
  autocomplete?: string;
  labelRightSlot?: React.ReactNode;
};

export const InputWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: ${theme.spacing.xxs};
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
`;

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xxs};
  white-space: nowrap;
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
  name,
  autocomplete,
  labelRightSlot,
}: InputFieldProps) => {
  // Generate a unique ID per instance
  const id: string = useId();
  const inputId: string =
    name || label?.toLowerCase().replace(/\s+/g, "-") || id;

  return (
    <InputWrapper $fullWidth={fullWidth}>
      {label && (
        <LabelRow>
          <Label htmlFor={inputId}>{label}</Label>
          {labelRightSlot}
        </LabelRow>
      )}

      <InputContainer $hasError={!!error}>
        {iconLeft && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: theme.spacing.xxs,
            }}
          >
            {iconLeft}
          </span>
        )}

        <StyledInput
          id={inputId}
          name={inputId}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required={required}
          autoComplete={autocomplete}
        />

        {iconRight && (
          <span
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: theme.spacing.xxs,
            }}
          >
            {iconRight}
          </span>
        )}
      </InputContainer>

      {error && <ErrorText>{error}</ErrorText>}
    </InputWrapper>
  );
};
