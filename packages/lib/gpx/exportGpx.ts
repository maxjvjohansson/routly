import { buildGpx } from "./buildGpx";
import { sanitizeFilename } from "../utils/sanitizeFilename";

export function exportRouteToGpx(
  featureCollection: GeoJSON.FeatureCollection,
  filename: string = "route.gpx"
) {
  try {
    // Make a safe file name
    const safeName: string = sanitizeFilename(filename);

    // Convert GeoJSON to GPX string
    const gpx: string = buildGpx(featureCollection);

    const blob = new Blob([gpx], { type: "application/gpx+xml" });
    const url: string = URL.createObjectURL(blob);

    const a: HTMLAnchorElement = document.createElement("a");
    a.href = url;
    a.download = safeName;
    a.click();

    URL.revokeObjectURL(url);
  } catch (err) {
    console.error("GPX export failed:", err);
  }
}
