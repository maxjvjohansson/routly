"use client";

import { useAuthActions } from "@routly/lib/hooks/useAuthActions";
import AuthForm from "src/components/AuthForm/AuthForm";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login, loading, error } = useAuthActions();
  const router = useRouter();

  const onSubmit = async (email: string, password: string) => {
    await login(email, password);

    router.push("/");
  };

  return (
    <AuthForm
      mode="login"
      onSubmit={onSubmit}
      loading={loading}
      error={error || undefined}
    />
  );
}
