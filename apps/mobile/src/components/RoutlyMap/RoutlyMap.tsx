import MapView, { Polyline, Marker } from "react-native-maps";
import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { StyleSheet } from "react-native";

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
  const stockholm = { latitude: 59.3293, longitude: 18.0686 };

  return (
    <MapContainer $height={height}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          ...stockholm,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
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

const mapStyle = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#ffffff" }],
  },
  {
    featureType: "water",
    stylers: [{ color: "#d5ed85" }],
  },
];
