import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { InputField } from "../InputField/InputField";
import { Button } from "../Button/Button";
import { webTheme as theme } from "@routly/ui/theme/web";

type AuthFormProps = {
  mode: "login" | "signup";
  onSubmit: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<void>;
  loading?: boolean;
  error?: string;
};

const AuthFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  width: 100%;
  max-width: 400px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.xl};
  box-shadow:
    0 8px 10px 0 rgba(0, 0, 0, 0.1),
    0 20px 25px 0 rgba(0, 0, 0, 0.1);
  padding: ${theme.spacing.lg};
`;

const FormHeader = styled.h2`
  font-size: ${theme.typography.lg};
  font-weight: 600;
  line-height: 2rem;
  color: ${theme.colors.black};
  text-align: center;
  margin-bottom: ${theme.spacing.sm};

  ${({ theme }) => theme.media.md} {
    font-size: ${({ theme }) => theme.typography.xl};
    font-weight: 700;
  }
`;

const ErrorText = styled.p`
  color: ${theme.colors.red};
  font-size: ${theme.typography.sm};
  text-align: center;
  margin-top: -${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xs};
`;

const SwitchText = styled.p`
  text-align: center;
  font-size: ${theme.typography.sm};
  color: ${theme.colors.grayDark};
  margin-top: ${theme.spacing.sm};
  font-weight: 500;

  a {
    color: ${theme.colors.teal};
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      text-decoration-color: ${theme.colors.teal};
    }
  }
`;

export default function AuthForm({
  mode,
  onSubmit,
  loading,
  error,
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup" && password !== confirm) {
      alert("Passwords do not match");
      return;
    }
    await onSubmit(email, password, fullName);
  };

  return (
    <AuthFormContainer onSubmit={handleSubmit}>
      <FormHeader>
        {mode === "login" ? "Sign in to your account" : "Create your account"}
      </FormHeader>

      {mode === "signup" && (
        <InputField
          label="Full name"
          placeholder="Enter your full name"
          value={fullName}
          onChange={setFullName}
          fullWidth
        />
      )}

      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
        fullWidth
      />

      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
        fullWidth
      />

      {mode === "signup" && (
        <InputField
          label="Confirm password"
          type="password"
          placeholder="Confirm your password"
          value={confirm}
          onChange={setConfirm}
          fullWidth
        />
      )}

      {error && <ErrorText>{error}</ErrorText>}

      <Button
        label={
          loading ? "Loading..." : mode === "login" ? "Sign in" : "Sign up"
        }
        disabled={loading}
        fullWidth
      />

      <SwitchText>
        {mode === "login" ? (
          <>
            Don’t have an account? <Link href="/signup">Sign up</Link>
          </>
        ) : (
          <>
            Already have an account? <Link href="/login">Sign in</Link>
          </>
        )}
      </SwitchText>
    </AuthFormContainer>
  );
}
