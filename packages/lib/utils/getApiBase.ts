export function getApiBase(): string {
  // NextJs
  if (typeof window !== "undefined") return "";

  // Expo
  if (process.env.EXPO_PUBLIC_API_BASE_URL)
    return process.env.EXPO_PUBLIC_API_BASE_URL;

  // NextJs (SSR)
  if (process.env.NEXT_PUBLIC_API_BASE_URL)
    return process.env.NEXT_PUBLIC_API_BASE_URL;

  // Fallback
  return "";
}
