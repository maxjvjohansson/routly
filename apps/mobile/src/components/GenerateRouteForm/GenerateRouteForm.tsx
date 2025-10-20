import { useState } from "react";
import { ScrollView, Alert } from "react-native";
import styled from "styled-components/native";
import * as Location from "expo-location";

import { Button } from "../Button/Button";
import ActivitySelect from "./ActivitySelect";
import DistanceSelector from "./DistanceSelector";
import LocationInputs from "./LocationInputs";
import { nativeTheme as theme } from "@routly/ui/theme/native";

const FormContainer = styled(ScrollView)`
  flex: 1;
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
`;

export default function GenerateRouteForm() {
  const [activity, setActivity] = useState<"run" | "cycle">("run");
  const [distance, setDistance] = useState(10);
  const [startLocation, setStartLocation] = useState("");
  const [endDestination, setEndDestination] = useState("");

  const handleUseLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is required to use your current position."
        );
        return;
      }

      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const lat = pos.coords.latitude.toFixed(5);
      const lon = pos.coords.longitude.toFixed(5);
      setStartLocation(`${lat}, ${lon}`);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not get current location.");
    }
  };

  const handleSubmit = () => {
    console.log("Generate route with:", {
      activity,
      distance,
      startLocation,
      endDestination,
    });
  };

  return (
    <FormContainer contentContainerStyle={{ gap: theme.spacing.md }}>
      <ActivitySelect value={activity} onChange={setActivity} />

      <DistanceSelector
        value={distance}
        onChange={setDistance}
        activity={activity}
      />

      <LocationInputs
        start={startLocation}
        end={endDestination}
        onChangeStart={setStartLocation}
        onChangeEnd={setEndDestination}
        onUseCurrentLocation={handleUseLocation}
      />

      <Button
        label="Generate Route"
        color="orange"
        fullWidth
        onPress={handleSubmit}
      />
    </FormContainer>
  );
}
