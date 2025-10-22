export const PROTECTED_PATHS = ["/generate", "/profile", "/settings"] as const;

export const PUBLIC_PATHS = ["/", "/login", "/signup", "/explore"] as const;

export const isProtectedPath = (path: string) =>
  PROTECTED_PATHS.some((p) => path.startsWith(p));
