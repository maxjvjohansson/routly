// This function constructs/converts coordinates from Routes to gpx format (For react-native/Expo where togpx package is not supported)

export function buildGpx(featureCollection: GeoJSON.FeatureCollection): string {
  const feature = featureCollection.features[0];
  const coords =
    feature.geometry.type === "LineString" ? feature.geometry.coordinates : [];

  const trackPoints: string = coords
    .map(([lng, lat, ele]): string => {
      const elevation: number = ele ?? 0;
      return `<trkpt lon="${lng}" lat="${lat}">
  <ele>${elevation}</ele>
</trkpt>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Routly" xmlns="http://www.topografix.com/GPX/1/1">
  <trk>
    <name>Routly Route</name>
    <trkseg>
      ${trackPoints}
    </trkseg>
  </trk>
</gpx>`;
}
