import { buildGpx } from "./buildGpx";
import { File, Paths } from "expo-file-system";
import * as Sharing from "expo-sharing";
import { sanitizeFilename } from "../utils/sanitizeFilename";

export async function exportRouteToGpxNative(
  featureCollection: GeoJSON.FeatureCollection,
  routeName: string
): Promise<void> {
  try {
    // Make a safe file name
    const filename: string = sanitizeFilename(routeName);

    // Convert GeoJSON to GPX string
    const gpx: string = buildGpx(featureCollection);

    // Create a File instance in the document directory
    // Paths.document is a Directory; the constructor joins segments into a URI
    const file = new File(Paths.document, filename);

    // Ensure the file exists and overwrite if already there
    file.create({ overwrite: true });

    // Write GPX content into the file
    file.write(gpx);

    // Share the file using the native share sheet
    await Sharing.shareAsync(file.uri, {
      mimeType: "application/gpx+xml",
      dialogTitle: "Export GPX",
      UTI: "application/gpx+xml", // iOS metadata
    });
  } catch (err) {
    console.error("GPX export failed:", err);
  }
}
