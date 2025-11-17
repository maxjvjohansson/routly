export function formatActivityLabel(activity?: string | null): string {
  if (!activity) return "Unknown";

  const normalized = activity.toLowerCase();

  if (["run", "running"].includes(normalized)) return "Running";
  if (["cycle", "cycling", "bike"].includes(normalized)) return "Cycling";

  // Fallback
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}
