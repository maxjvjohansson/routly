import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components/native";
import { InputField } from "../InputField/InputField";
import { Button } from "../Button/Button";
import { nativeTheme as theme } from "@routly/ui/theme/native";

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

const AuthFormContainer = styled(ScrollView)`
  width: 100%;
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.lg}px;
  align-self: center;
`;

const FormWrapper = styled(View)`
  width: 100%;
  background-color: ${theme.colors.white};
`;

const FormHeader = styled(Text)`
  font-size: ${theme.typography.xl}px;
  font-weight: 600;
  color: ${theme.colors.black};
  text-align: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const SwitchWrapper = styled(View)`
  margin-top: ${theme.spacing.md}px;
  align-items: center;
`;

const SwitchText = styled(Text)`
  text-align: center;
  font-size: ${theme.typography.xs}px;
  color: ${theme.colors.grayDark};
`;

const LinkText = styled(Text)`
  color: ${theme.colors.teal};
  font-weight: 600;
  font-size: ${theme.typography.xs}px;
  text-decoration: underline;
  text-decoration-color: ${theme.colors.teal};
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
    const newErrors: typeof fieldErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!email.includes("@")) {
      newErrors.email = "Invalid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (mode === "signup") {
      if (!fullName.trim()) newErrors.fullName = "Full name is required";
      if (!confirm.trim()) newErrors.confirm = "Please confirm your password";
      if (password && confirm && password !== confirm) {
        newErrors.confirm = "Passwords do not match";
      }
    }

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
          />
        )}

        {error && !Object.keys(fieldErrors).length && (
          <Text
            style={{
              color: theme.colors.red,
              textAlign: "center",
              marginBottom: theme.spacing.xs,
            }}
          >
            {error}
          </Text>
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
