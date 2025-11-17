import { useState } from "react";
import styled from "styled-components/native";
import { InputField } from "../InputField/InputField";
import { Button } from "../Button/Button";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { validateAuthFields } from "@routly/lib/validation/auth";
import { Feather } from "@expo/vector-icons";

type AuthFormProps = {
  mode: "login" | "signup";
  onSubmit: (
    email: string,
    password: string,
    fullName: string
  ) => Promise<void>;
  loading?: boolean;
  error?: string;
  onSwitchMode: () => void;
};

const AuthFormContainer = styled.ScrollView`
  width: 100%;
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.lg}px;
  align-self: center;
`;

const FormWrapper = styled.View`
  width: 100%;
  background-color: ${theme.colors.white};
`;

const FormHeader = styled.Text`
  font-family: ${theme.typography.fontSemiBold};
  font-size: ${theme.typography.xl}px;
  color: ${theme.colors.black};
  text-align: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const SwitchWrapper = styled.View`
  margin-top: ${theme.spacing.md}px;
  align-items: center;
`;

const SwitchText = styled.Text`
  text-align: center;
  font-family: ${theme.typography.fontMedium};
  font-size: ${theme.typography.xs}px;
  color: ${theme.colors.grayDark};
`;

const LinkText = styled.Text`
  color: ${theme.colors.teal};
  font-family: ${theme.typography.fontSemiBold};
  font-size: ${theme.typography.xs}px;
  text-decoration: underline;
  text-decoration-color: ${theme.colors.teal};
`;

const ErrorText = styled.Text`
  font-family: ${theme.typography.fontMedium};
  color: ${theme.colors.red};
  text-align: center;
  margin-bottom: ${theme.spacing.xs}px;
`;

export default function AuthForm({
  mode,
  onSubmit,
  loading,
  error,
  onSwitchMode,
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fullName, setFullName] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
    confirm?: string;
    fullName?: string;
  }>({});

  const handleSubmit = async () => {
    const newErrors = validateAuthFields(
      { email, password, confirm, fullName },
      mode
    );

    setFieldErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    await onSubmit(email, password, fullName);
  };

  return (
    <AuthFormContainer keyboardShouldPersistTaps="handled">
      <FormWrapper>
        <FormHeader>
          {mode === "login" ? "Sign in to your account" : "Create your account"}
        </FormHeader>

        {mode === "signup" && (
          <InputField
            label="Full name"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(val) => {
              setFullName(val);
              setFieldErrors((prev) => ({ ...prev, fullName: undefined }));
            }}
            fullWidth
            error={fieldErrors.fullName}
            iconLeft={
              <Feather name="user" size={18} color={theme.colors.black} />
            }
          />
        )}

        <InputField
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(val) => {
            setEmail(val);
            setFieldErrors((prev) => ({ ...prev, email: undefined }));
          }}
          fullWidth
          error={fieldErrors.email}
          iconLeft={
            <Feather name="mail" size={18} color={theme.colors.black} />
          }
        />

        <InputField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(val) => {
            setPassword(val);
            setFieldErrors((prev) => ({ ...prev, password: undefined }));
          }}
          fullWidth
          error={fieldErrors.password}
          iconLeft={
            <Feather name="lock" size={18} color={theme.colors.black} />
          }
        />

        {mode === "signup" && (
          <InputField
            label="Confirm password"
            type="password"
            placeholder="Confirm your password"
            value={confirm}
            onChange={(val) => {
              setConfirm(val);
              setFieldErrors((prev) => ({ ...prev, confirm: undefined }));
            }}
            fullWidth
            error={fieldErrors.confirm}
            iconLeft={
              <Feather name="lock" size={18} color={theme.colors.black} />
            }
          />
        )}

        {error && !Object.keys(fieldErrors).length && (
          <ErrorText>{error}</ErrorText>
        )}

        <Button
          label={
            loading ? "Loading..." : mode === "login" ? "Sign in" : "Sign up"
          }
          disabled={loading}
          fullWidth
          onPress={handleSubmit}
          color="teal"
        />

        <SwitchWrapper>
          <SwitchText>
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <LinkText onPress={onSwitchMode}>Sign up</LinkText>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <LinkText onPress={onSwitchMode}>Sign in</LinkText>
              </>
            )}
          </SwitchText>
        </SwitchWrapper>
      </FormWrapper>
    </AuthFormContainer>
  );
}
