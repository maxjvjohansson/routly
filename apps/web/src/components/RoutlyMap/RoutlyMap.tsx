"use client";

import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

type RoutlyMapProps = {
  route?: GeoJSON.FeatureCollection;
};

const MapContainer = styled.div`
  width: 100%;
  min-height: 400px;
  max-width: 800px;
  flex: 1;
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  position: relative;

  .maplibregl-canvas {
    border-radius: ${theme.radius.lg};
  }
`;

export default function RoutlyMap({ route }: RoutlyMapProps) {
  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const startMarker = useRef<maplibregl.Marker | null>(null);
  const endMarker = useRef<maplibregl.Marker | null>(null);

  const { startPoint, endPoint, setStartPoint, setEndPoint, clearPoints } =
    useRouteGeneration();

  // Keep track of last click-interaction without triggering re-init of map
  const clickHandlerRef = useRef<
    ((e: maplibregl.MapMouseEvent) => void) | null
  >(null);

  clickHandlerRef.current = (e: maplibregl.MapMouseEvent) => {
    const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
    const m = map.current;
    if (!m) return;

    m.easeTo({ center: coords, duration: 300 });

    if (!startPoint) {
      setStartPoint(coords);
    } else if (!endPoint) {
      setEndPoint(coords);
    } else {
      clearPoints();
    }
  };

  // Initiate only one map instance on mount
  useEffect(() => {
    if (!container.current) return;

    const styleUrl = `https://api.maptiler.com/maps/streets-v4/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`;
    const mapInstance = new maplibregl.Map({
      container: container.current,
      style: styleUrl,
      center: [11.9671, 57.7072],
      zoom: 12,
    });

    mapInstance.addControl(new maplibregl.NavigationControl(), "top-right");
    mapInstance.getCanvas().style.cursor = "default";

    mapInstance.on("dragstart", () => {
      mapInstance.getCanvas().style.cursor = "move";
    });
    mapInstance.on("dragend", () => {
      mapInstance.getCanvas().style.cursor = "default";
    });

    mapInstance.on("click", (e) => {
      clickHandlerRef.current?.(e);
    });

    map.current = mapInstance;
    return () => mapInstance.remove();
  }, []);

  // Draggable pin markers
  useEffect(() => {
    const m = map.current;
    if (!m) return;

    requestAnimationFrame(() => {
      if (startMarker.current) startMarker.current.remove();
      if (startPoint) {
        const marker = new maplibregl.Marker({
          color: theme.colors.teal,
          draggable: true,
        })
          .setLngLat(startPoint)
          .addTo(m);

        marker.on("dragstart", () => {
          m.getCanvas().style.cursor = "grabbing";
        });
        marker.on("dragend", () => {
          const pos = marker.getLngLat();
          setStartPoint([pos.lng, pos.lat]);
          m.getCanvas().style.cursor = "default";
        });

        startMarker.current = marker;
      }

      if (endMarker.current) endMarker.current.remove();
      if (endPoint) {
        const marker = new maplibregl.Marker({
          color: theme.colors.orange,
          draggable: true,
        })
          .setLngLat(endPoint)
          .addTo(m);

        marker.on("dragstart", () => {
          m.getCanvas().style.cursor = "grabbing";
        });
        marker.on("dragend", () => {
          const pos = marker.getLngLat();
          setEndPoint([pos.lng, pos.lat]);
          m.getCanvas().style.cursor = "default";
        });

        endMarker.current = marker;
      }
    });
  }, [startPoint, endPoint, setStartPoint, setEndPoint]);

  // Draw route on map
  useEffect(() => {
    const m = map.current;
    if (!m || !route) return;

    const id = "route-line";
    if (m.getLayer(id)) m.removeLayer(id);
    if (m.getSource(id)) m.removeSource(id);

    m.addSource(id, { type: "geojson", data: route });
    m.addLayer({
      id,
      type: "line",
      source: id,
      paint: {
        "line-color": theme.colors.teal,
        "line-width": 4,
      },
    });

    const bounds = new maplibregl.LngLatBounds();
    route.features.forEach((feature) => {
      const coords = (feature.geometry as any).coordinates;
      coords.forEach(([lng, lat]: [number, number]) =>
        bounds.extend([lng, lat])
      );
    });
    m.fitBounds(bounds, { padding: 60, animate: true });
  }, [route]);

  return <MapContainer ref={container} />;
}
