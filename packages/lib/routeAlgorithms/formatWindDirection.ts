export function formatWindDirection(direction?: string): string {
  if (!direction) return "—";
  const parts: string[] = direction.toLowerCase().split("_");

  return parts
    .map((part: string, i: number): string => {
      if (parts.length === 2 && i === 0) {
        return (
          part.charAt(0).toUpperCase() +
          part.slice(1) +
          parts[1].charAt(0).toUpperCase() +
          parts[1].slice(1)
        );
      }
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(parts.length > 2 ? " " : "");
}
