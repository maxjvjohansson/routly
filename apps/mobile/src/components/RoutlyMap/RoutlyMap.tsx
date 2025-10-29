import MapView, { Polyline, Marker } from "react-native-maps";
import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { StyleSheet } from "react-native";
import { mapStyle } from "./MapStyle";

type RoutlyMapProps = {
  route?: { latitude: number; longitude: number }[];
  height?: number;
};

const MapContainer = styled.View<{ $height: number }>`
  width: 100%;
  height: ${({ $height }: { $height: number }) => `${$height}px`};
  border-radius: ${theme.radius.lg}px;
  overflow: hidden;
  position: relative;
`;

export default function RoutlyMap({ route, height = 400 }: RoutlyMapProps) {
  const initialOverview = { latitude: 57.7072, longitude: 11.9671 };

  return (
    <MapContainer $height={height}>
      <MapView
        provider="google"
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          ...initialOverview,
          latitudeDelta: 0.065,
          longitudeDelta: 0.065,
        }}
        customMapStyle={mapStyle}
      >
        {route && (
          <>
            <Polyline
              coordinates={route}
              strokeWidth={4}
              strokeColor={theme.colors.teal}
            />
            <Marker coordinate={route[0]} title="Start" />
            <Marker coordinate={route[route.length - 1]} title="Finish" />
          </>
        )}
      </MapView>
    </MapContainer>
  );
}
