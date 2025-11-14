import styled from "styled-components/native";
import { View, Alert, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { useEffect, useState } from "react";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import { InputField } from "../InputField/InputField";
import FontAwesome6 from "@expo/vector-icons/build/FontAwesome6";

const Section = styled.View`
  flex-direction: column;
  gap: ${theme.spacing.sm}px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${theme.spacing.xs}px;
`;

const Label = styled.Text`
  font-family: ${theme.typography.fontMedium};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.xxs}px;
`;

const LocationButton = styled(TouchableOpacity)`
  width: 44px;
  height: 44px;
  border-radius: ${theme.radius.md}px;
  background-color: ${theme.colors.teal};
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${theme.colors.teal};
`;

export default function LocationInputs() {
  const { startPoint, endPoint, setStartPoint, setEndPoint } =
    useRouteGeneration();

  const [startText, setStartText] = useState("");
  const [endText, setEndText] = useState("");

  // Sync context to text fields
  useEffect(() => {
    if (startPoint) {
      setStartText(`${startPoint[1].toFixed(5)}, ${startPoint[0].toFixed(5)}`);
    } else setStartText("");
  }, [startPoint]);

  useEffect(() => {
    if (endPoint) {
      setEndText(`${endPoint[1].toFixed(5)}, ${endPoint[0].toFixed(5)}`);
    } else setEndText("");
  }, [endPoint]);

  // Convert `lat, lon`
  const tryParseCoords = (val: string): [number, number] | null => {
    const [lat, lon] = val.split(",").map(Number);
    return !isNaN(lat) && !isNaN(lon) ? [lon, lat] : null;
  };

  // Device location
  const handleUseLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required.");
        return;
      }
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setStartPoint([pos.coords.longitude, pos.coords.latitude]);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not get current location.");
    }
  };

  return (
    <Section>
      <View>
        <Label>Start point</Label>

        <Row>
          <View style={{ flex: 1 }}>
            <InputField
              placeholder="Enter starting location"
              value={startText}
              onChange={(v: string): void => {
                setStartText(v);
                const parsed: [number, number] | null = tryParseCoords(v);
                if (parsed) setStartPoint(parsed);
              }}
              fullWidth
              iconLeft={
                <Ionicons
                  name="location-outline"
                  size={24}
                  color={theme.colors.black}
                />
              }
            />
          </View>

          <LocationButton onPress={handleUseLocation}>
            <FontAwesome6
              name="location-crosshairs"
              size={24}
              color={theme.colors.white}
            />
          </LocationButton>
        </Row>
      </View>

      <View>
        <Label>End point (optional)</Label>
        <InputField
          placeholder="Enter destination (leave blank for loop)"
          value={endText}
          onChange={(v: string): void => {
            setEndText(v);
            const parsed: [number, number] | null = tryParseCoords(v);
            if (parsed) setEndPoint(parsed);
          }}
          fullWidth
          iconLeft={
            <Ionicons
              name="location-outline"
              size={24}
              color={theme.colors.black}
            />
          }
        />
      </View>
    </Section>
  );
}
