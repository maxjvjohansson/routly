import { supabase } from "./client";
import type { AuthResponse } from "@supabase/supabase-js";

export async function handleSignUp(
  email: string,
  password: string,
  fullName: string
): Promise<AuthResponse["data"]> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
    },
  });
  if (error) throw error;

  const user = data.user;
  if (user) {
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
      full_name: fullName,
    });
    if (profileError) throw profileError;
  }
  return data;
}

export async function handleLogin(
  email: string,
  password: string
): Promise<AuthResponse["data"]> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function handleLogout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
