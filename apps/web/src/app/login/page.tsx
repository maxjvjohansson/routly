export const dynamic = "force-dynamic";
("use client");

import AuthLayout from "src/components/AuthLayout/AuthLayout";
import loginImage from "src/assets/images/routly_run_3_stock_photo.webp";
import { useAuthActions } from "@routly/lib/hooks/useAuthActions";
import AuthForm from "src/components/AuthForm/AuthForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@routly/lib/context/AuthContext";
import { useEffect } from "react";

export default function LoginPage() {
  const { login, loading, error } = useAuthActions();
  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const nextUrl = searchParams.get("next") || "/";

  useEffect(() => {
    if (user) router.replace(nextUrl);
  }, [user, nextUrl, router]);

  const onSubmit = async (email: string, password: string) => {
    const user = await login(email, password);
    if (user) router.replace(nextUrl);
  };

  return (
    <AuthLayout
      image={loginImage}
      title="Welcome back!"
      subtitle="Sign in to explore your personalized running and cycling routes."
    >
      <AuthForm
        mode="login"
        onSubmit={onSubmit}
        loading={loading}
        error={error || undefined}
      />
    </AuthLayout>
  );
}
