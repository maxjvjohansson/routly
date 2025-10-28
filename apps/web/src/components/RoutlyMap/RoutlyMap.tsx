"use client";

import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

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

export default function RoutlyMap() {
  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const startMarker = useRef<maplibregl.Marker | null>(null);
  const endMarker = useRef<maplibregl.Marker | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const {
    startPoint,
    endPoint,
    setStartPoint,
    setEndPoint,
    clearPoints,
    routes,
  } = useRouteGeneration();

  // Keep track of last click-interaction without triggering re-init of map
  const clickHandlerRef = useRef<
    ((e: maplibregl.MapMouseEvent) => void) | null
  >(null);
  clickHandlerRef.current = (e: maplibregl.MapMouseEvent) => {
    const coords: [number, number] = [e.lngLat.lng, e.lngLat.lat];
    const m = map.current;
    if (!m) return;

    m.easeTo({ center: coords, duration: 300 });

    if (!startPoint) setStartPoint(coords);
    else if (!endPoint) setEndPoint(coords);
    else clearPoints();
  };

  // Initiate map
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

    mapInstance.on("click", (e) => clickHandlerRef.current?.(e));

    // Wait for mapstyle to be ready
    mapInstance.on("load", () => {
      setIsMapReady(true);
    });

    map.current = mapInstance;
    return () => mapInstance.remove();
  }, []);

  // Handle start and end markers
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

        marker.on("dragend", () => {
          const pos = marker.getLngLat();
          setStartPoint([pos.lng, pos.lat]);
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

        marker.on("dragend", () => {
          const pos = marker.getLngLat();
          setEndPoint([pos.lng, pos.lat]);
        });

        endMarker.current = marker;
      }
    });
  }, [startPoint, endPoint, setStartPoint, setEndPoint]);

  // Draw route on map (on change)
  useEffect(() => {
    const m = map.current;
    const route = routes?.[0];
    if (!m || !route || !isMapReady) return;

    const id = "route-line";

    // Remove old route (if old route exists)
    if (m.getLayer(id)) m.removeLayer(id);
    if (m.getSource(id)) m.removeSource(id);

    // Draw new route
    m.addSource(id, { type: "geojson", data: route });
    m.addLayer({
      id,
      type: "line",
      source: id,
      paint: {
        "line-color": theme.colors.teal,
        "line-width": 6,
      },
    });

    // Adjust view to route boundaries
    const bounds = new maplibregl.LngLatBounds();
    route.features.forEach((feature) => {
      const coords = (feature.geometry as any).coordinates;
      coords.forEach(([lng, lat]: [number, number]) =>
        bounds.extend([lng, lat])
      );
    });

    if (!bounds.isEmpty()) {
      m.fitBounds(bounds, { padding: 60, animate: true });
    }
  }, [routes, isMapReady]);

  // Cleanup route when points are cleared or switched
  useEffect(() => {
    const m = map.current;
    if (!m) return;

    const id = "route-line";

    // Helper to safely remove existing route
    const removeRoute = () => {
      if (m.getLayer(id)) m.removeLayer(id);
      if (m.getSource(id)) m.removeSource(id);
    };

    // If no points exist, remove any visible route from map
    if (!startPoint && !endPoint && m.getSource(id)) {
      removeRoute();
    }

    // If user switches from a roundtrip (only start) to a new end point, clear old route
    if (startPoint && endPoint && routes.length === 0 && m.getSource(id)) {
      removeRoute();
    }

    // If the user previously had a route drawn (roundtrip) and places a new end marker — remove route
    if (startPoint && endPoint && routes.length > 0) {
      removeRoute();
    }
  }, [startPoint, endPoint]);

  return <MapContainer ref={container} />;
}
