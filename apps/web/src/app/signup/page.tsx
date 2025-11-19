"use client";

import AuthLayout from "src/components/AuthLayout/AuthLayout";
import signupImage from "src/assets/images/routly_cycle_3_stock_photo.webp";
import { useAuthActions } from "@routly/lib/hooks/useAuthActions";
import AuthForm from "src/components/AuthForm/AuthForm";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@routly/lib/context/AuthContext";
import { useEffect } from "react";

export default function SignupPage() {
  const { signup, loading, error } = useAuthActions();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const nextUrl: string = searchParams.get("next") || "/";

  useEffect(() => {
    if (user) {
      // Force hard refresh to ensure cookies are synced
      window.location.href = nextUrl;
    }
  }, [user, nextUrl]);

  const onSubmit = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    const user = await signup(email, password, fullName);
    if (user) {
      // Force hard refresh after signup
      window.location.href = nextUrl;
    }
  };

  return (
    <AuthLayout
      image={signupImage}
      title="Join Routly"
      subtitle="Start discovering new routes tailored to you."
    >
      <AuthForm
        mode="signup"
        onSubmit={onSubmit}
        loading={loading}
        error={error || undefined}
      />
    </AuthLayout>
  );
}
