"use client";

import { useAuthActions } from "@routly/lib/hooks/useAuthActions";
import AuthForm from "src/components/AuthForm/AuthForm";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const { signup, loading, error } = useAuthActions();
  const router = useRouter();

  const onSubmit = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    await signup(email, password, fullName);

    router.push("/");
  };

  return (
    <AuthForm
      mode="signup"
      onSubmit={onSubmit}
      loading={loading}
      error={error || undefined}
    />
  );
}
