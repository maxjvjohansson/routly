import { createClient } from "./client";
import type { AuthResponse } from "@supabase/supabase-js";

export async function handleSignUp(
  email: string,
  password: string
): Promise<AuthResponse["data"]> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data;
}

export async function handleLogin(
  email: string,
  password: string
): Promise<AuthResponse["data"]> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw error;
  }
  return data;
}

export async function handleLogout(): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw error;
  }
}
