export function formatWindDirection(direction?: string): string {
  if (!direction) return "—";

  const parts = direction.toLowerCase().split("_");

  // Capitalize each part
  const formatted = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1));

  // Join with "-" for two parts, or space for longer ones
  return formatted.join(parts.length === 2 ? "-" : " ");
}
