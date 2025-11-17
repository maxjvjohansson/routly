import togpx from "togpx";

export function exportRouteToGpx(
  featureCollection: GeoJSON.FeatureCollection,
  filename: string = "route.gpx"
) {
  try {
    // Convert GeoJSON to GPX string
    const gpx: string = togpx(featureCollection);

    const blob = new Blob([gpx], { type: "application/gpx+xml" });
    const url: string = URL.createObjectURL(blob);

    const a: HTMLAnchorElement = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("GPX export failed:", err);
  }
}
