import MapView, { Polyline, Marker, MapPressEvent } from "react-native-maps";
import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { StyleSheet } from "react-native";
import { mapStyle } from "./MapStyle";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { useMemo, useCallback, useRef, useEffect } from "react";

const MapContainer = styled.View<{ $height: number }>`
  width: 100%;
  height: ${({ $height }: { $height: number }) => `${$height}px`};
  border-radius: ${theme.radius.lg}px;
  overflow: hidden;
  position: relative;
`;

export default function RoutlyMap({ height = 400 }: { height?: number }) {
  const mapRef = useRef<MapView>(null);
  const {
    startPoint,
    endPoint,
    setStartPoint,
    setEndPoint,
    clearPoints,
    routes,
  } = useRouteGeneration();

  const initialOverview = { latitude: 57.7072, longitude: 11.9671 };

  // Convert GeoJSON to polyline coordinates for react-native-maps
  const routeCoords = useMemo(() => {
    const feature = routes?.[0]?.features?.[0];
    const geometry = feature?.geometry;
    if (!geometry || !("coordinates" in geometry)) return undefined;

    const coords = geometry.coordinates as [number, number][];
    if (!coords?.length) return undefined;

    return coords.map(([lng, lat]) => ({
      latitude: lat,
      longitude: lng,
    }));
  }, [routes]);

  // Fit map to route bounds when route is generated
  useEffect(() => {
    if (!routeCoords || routeCoords.length === 0 || !mapRef.current) return;

    // Calculate bounds from route coordinates
    const lats = routeCoords.map((c) => c.latitude);
    const lngs = routeCoords.map((c) => c.longitude);

    mapRef.current.fitToCoordinates(routeCoords, {
      edgePadding: {
        top: 60,
        right: 40,
        bottom: 60,
        left: 40,
      },
      animated: true,
    });
  }, [routeCoords]);

  // Handle tap to place start/end markers
  const handleMapPress = useCallback(
    (e: MapPressEvent) => {
      const { latitude, longitude } = e.nativeEvent.coordinate;

      if (routeCoords) {
        clearPoints();
        return;
      }

      if (!startPoint) {
        setStartPoint([longitude, latitude]);
      } else if (!endPoint) {
        setEndPoint([longitude, latitude]);
      } else {
        clearPoints();
      }
    },
    [startPoint, endPoint, routeCoords, setStartPoint, setEndPoint, clearPoints]
  );

  // Handle dragging start marker
  const handleStartDragEnd = useCallback(
    (e: any) => {
      const { latitude, longitude } = e.nativeEvent.coordinate;
      setStartPoint([longitude, latitude]);
    },
    [setStartPoint]
  );

  // Handle dragging end marker
  const handleEndDragEnd = useCallback(
    (e: any) => {
      const { latitude, longitude } = e.nativeEvent.coordinate;
      setEndPoint([longitude, latitude]);
    },
    [setEndPoint]
  );

  return (
    <MapContainer $height={height}>
      <MapView
        ref={mapRef}
        provider="google"
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          ...initialOverview,
          latitudeDelta: 0.065,
          longitudeDelta: 0.065,
        }}
        onPress={handleMapPress}
        customMapStyle={mapStyle}
      >
        {routeCoords && (
          <>
            <Polyline
              coordinates={routeCoords}
              strokeWidth={6}
              fillColor={theme.colors.teal}
            />
            <Marker
              coordinate={routeCoords[0]}
              title="Start"
              pinColor={theme.colors.teal}
              draggable
              onDragEnd={handleStartDragEnd}
            />
            {/* Only show finish marker if it's not a roundtrip */}
            {routeCoords.length > 1 && startPoint && endPoint && (
              <Marker
                coordinate={routeCoords[routeCoords.length - 1]}
                title="Finish"
                pinColor={theme.colors.orange}
                draggable
                onDragEnd={handleEndDragEnd}
              />
            )}
          </>
        )}

        {/* Show manual markers only before route is generated */}
        {!routeCoords && startPoint && (
          <Marker
            coordinate={{
              latitude: startPoint[1],
              longitude: startPoint[0],
            }}
            title="Start"
            pinColor={theme.colors.teal}
            draggable
            onDragEnd={handleStartDragEnd}
          />
        )}
        {!routeCoords && endPoint && (
          <Marker
            coordinate={{
              latitude: endPoint[1],
              longitude: endPoint[0],
            }}
            title="Finish"
            pinColor={theme.colors.orange}
            draggable
            onDragEnd={handleEndDragEnd}
          />
        )}
      </MapView>
    </MapContainer>
  );
}
