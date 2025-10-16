"use client";

import { useState } from "react";
import { handleLogin, handleSignUp } from "../supabase/auth";

export function useAuthActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await handleLogin(email, password);
      return data.user;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await handleSignUp(email, password, fullName);
      return data.user;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, signup, loading, error };
}
