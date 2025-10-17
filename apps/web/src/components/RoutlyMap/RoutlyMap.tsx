"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

type RoutlyMapProps = {
  route?: GeoJSON.FeatureCollection;
  height?: string;
};

const MapContainer = styled.div<{ $height: string }>`
  width: 100%;
  height: ${({ $height }) => $height};
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  position: relative;

  .maplibregl-canvas {
    border-radius: ${theme.radius.lg};
  }
`;

export default function RoutlyMap({ route, height = "400px" }: RoutlyMapProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!container.current) return;

    const styleUrl = `https://api.maptiler.com/maps/streets-v4/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`;

    const mapInstance = new maplibregl.Map({
      container: container.current,
      style: styleUrl,
      center: [18.0686, 59.3293],
      zoom: 11,
    });

    mapInstance.addControl(new maplibregl.NavigationControl(), "top-right");
    map.current = mapInstance;

    return () => mapInstance.remove();
  }, []);

  useEffect(() => {
    if (!map.current || !route) return;
    const id = "route";
    if (map.current.getSource(id)) {
      map.current.removeLayer("route-line");
      map.current.removeSource(id);
    }
    map.current.addSource(id, { type: "geojson", data: route });
    map.current.addLayer({
      id: "route-line",
      type: "line",
      source: id,
      paint: {
        "line-color": theme.colors.teal,
        "line-width": 4,
      },
    });
  }, [route]);

  return <MapContainer ref={container} $height={height} />;
}
