export function calculateTotalAscent(route: GeoJSON.FeatureCollection): number {
  const feature = route?.features?.[0];
  if (!feature || feature.geometry.type !== "LineString") return 0;

  const coords = feature.geometry.coordinates as [number, number, number?][];
  if (!coords || coords.length < 2) return 0;

  let total: number = 0;
  for (let i: number = 1; i < coords.length; i++) {
    const prev: number = coords[i - 1][2] ?? 0;
    const curr: number = coords[i][2] ?? 0;
    const diff: number = curr - prev;
    if (diff > 0) total += diff;
  }

  return Math.round(total);
}
