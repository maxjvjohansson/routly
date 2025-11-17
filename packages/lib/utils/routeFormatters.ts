export const formatDistance = (km?: number, decimals = 1): string =>
  km != null ? km.toFixed(decimals) : "-";

export const formatAscent = (m?: number): number =>
  m != null ? Math.round(m) : 0;

export const formatDuration = (minutes?: number): string =>
  minutes != null ? minutes.toFixed(0) : "—";

export const formatActivity = (activity?: string): string =>
  activity ? activity.charAt(0).toUpperCase() + activity.slice(1) : "";
