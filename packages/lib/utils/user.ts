type SupabaseUser = {
  user_metadata?: Record<string, any>;
  email?: string | null;
  full_name?: string | null;
};

export function getUserInitial(user?: SupabaseUser | null): string {
  if (!user) return "R";

  const fullName =
    user.user_metadata?.full_name || user.full_name || user.user_metadata?.name;

  if (fullName && typeof fullName === "string" && fullName.trim().length > 0) {
    return fullName.trim()[0].toUpperCase();
  }

  if (user.email && user.email.length > 0) {
    return user.email[0].toUpperCase();
  }

  return "R";
}

export function getUserFullName(user?: SupabaseUser | null): string {
  if (!user) return "User";

  return (
    user.user_metadata?.full_name ||
    user.full_name ||
    user.user_metadata?.name ||
    "User"
  );
}

export function getUserEmail(user?: SupabaseUser | null): string {
  if (!user) return "—";

  return (
    user.user_metadata?.email ||
    user.email ||
    user.user_metadata?.contact ||
    "—"
  );
}
