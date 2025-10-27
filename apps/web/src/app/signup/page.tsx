"use client";

import { useAuthActions } from "@routly/lib/hooks/useAuthActions";
import AuthForm from "src/components/AuthForm/AuthForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@routly/lib/context/AuthContext";
import { useEffect } from "react";

export default function SignupPage() {
  const { signup, loading, error } = useAuthActions();
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/";

  useEffect(() => {
    if (user) {
      router.replace(nextUrl);
    }
  }, [user, nextUrl, router]);

  const onSubmit = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    const user = await signup(email, password, fullName);
    if (user) {
      router.replace(nextUrl);
    }
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
