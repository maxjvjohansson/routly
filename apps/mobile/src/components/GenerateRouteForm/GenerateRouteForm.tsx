import { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import styled from "styled-components/native";
import { Button } from "../Button/Button";
import ActivitySelect from "./ActivitySelect";
import DistanceSelector from "./DistanceSelector";
import LocationInputs from "./LocationInputs";
import { webTheme as theme } from "@routly/ui/theme/web";

const FormContainer = styled(ScrollView)`
  flex: 1;
  padding: ${theme.spacing.lg};
  background-color: ${theme.colors.white};
`;

export default function GenerateRouteForm() {
  const [activity, setActivity] = useState<"run" | "cycle">("run");
  const [distance, setDistance] = useState(10);
  const [startLocation, setStartLocation] = useState("");
  const [endDestination, setEndDestination] = useState("");

  const handleUseLocation = async () => {
    try {
      const { status } = await navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(5);
          const lon = pos.coords.longitude.toFixed(5);
          setStartLocation(`${lat}, ${lon}`);
        },
        (err) => {
          Alert.alert("Location error", err.message);
        }
      );
    } catch {
      Alert.alert("Error", "Could not get current location");
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
    <FormContainer contentContainerStyle={{ gap: 16 }}>
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
