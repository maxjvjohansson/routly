import { Alert, View } from "react-native";
import styled from "styled-components/native";
import { Button } from "../Button/Button";
import ActivitySelect from "./ActivitySelect";
import DistanceSelector from "./DistanceSelector";
import LocationInputs from "./LocationInputs";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";

const FormContainer = styled(View)`
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.radius.xl}px;
  gap: ${theme.spacing.md}px;
`;

export default function GenerateRouteForm() {
  const { startPoint, endPoint, distance, activity, setRoutes, isRoundTrip } =
    useRouteGeneration();

  const handleSubmit = async () => {
    if (!startPoint) {
      Alert.alert("Missing start point", "Please select a start point first.");
      return;
    }

    try {
      // NextJs proxy endpoint during development
      const res = await fetch("http://localhost:3000/api/openrouteservice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start: startPoint,
          end: endPoint,
          distance,
          profile: activity === "run" ? "foot-walking" : "cycling-regular",
        }),
      });

      if (!res.ok) {
        Alert.alert("Error", "Failed to generate route. Please try again.");
        return;
      }

      const data = await res.json();

      // Control and save to context
      const coords = data?.features?.[0]?.geometry?.coordinates;
      if (!coords?.length) {
        Alert.alert("No route found", "The route could not be generated.");
        return;
      }

      console.log("Generated route:", {
        points: coords.length,
        summary: data?.features?.[0]?.properties,
      });

      setRoutes([data]);
      Alert.alert("Success", "Route generated successfully!");
    } catch (err) {
      console.error("Route generation failed:", err);
      Alert.alert("Error", "Something went wrong while generating the route.");
    }
  };

  return (
    <FormContainer>
      <ActivitySelect />
      <LocationInputs />
      {isRoundTrip && <DistanceSelector />}

      <Button
        label="Generate Route"
        color="orange"
        fullWidth
        onPress={handleSubmit}
      />
    </FormContainer>
  );
}
