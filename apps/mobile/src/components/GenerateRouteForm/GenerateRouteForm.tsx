import { Alert, View } from "react-native";
import styled from "styled-components/native";
import { Button } from "../Button/Button";
import ActivitySelect from "./ActivitySelect";
import DistanceSelector from "./DistanceSelector";
import LocationInputs from "./LocationInputs";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { roundTripSeeds } from "@routly/lib/data/roundTripSeeds";

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

    // During development, fetch from NextJs proxy (Localhost)
    const base: string = "http://localhost:3000";
    const profile = activity === "run" ? "foot-walking" : "cycling-regular";

    try {
      console.log("🚀 Generating routes (Expo)…");

      const routeResults: any[] = [];

      if (isRoundTrip) {
        // Pick 3 unique seeds for variation
        const startIndex = Math.floor(Math.random() * roundTripSeeds.length);
        const seeds = Array.from(
          { length: 3 },
          (_, i) => roundTripSeeds[(startIndex + i) % roundTripSeeds.length]
        );
        console.log("Using seeds:", seeds);

        // Sequential fetches
        for (const seed of seeds) {
          const res = await fetch(`${base}/api/openrouteservice`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              start: startPoint,
              distance,
              profile,
              seed,
            }),
          });
          if (!res.ok) throw new Error(`ORS failed (seed ${seed})`);
          const data = await res.json();
          routeResults.push({ seed, data });
        }
      } else {
        console.log("Generating direct route A → B");
        const res = await fetch(`${base}/api/openrouteservice`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            start: startPoint,
            end: endPoint,
            distance,
            profile,
          }),
        });
        if (!res.ok) throw new Error("ORS failed (direct)");
        const data = await res.json();
        routeResults.push({ seed: null, data });
      }

      // Fetch weather for each route midpoint
      const weatherByRoute = [];
      for (const r of routeResults) {
        const coords = r.data?.features?.[0]?.geometry?.coordinates;
        if (!coords?.length) continue;
        const midpoint = coords[Math.floor(coords.length / 2)];
        const [lon, lat] = midpoint;

        const weatherRes = await fetch(
          `${base}/api/weather?lat=${lat}&lon=${lon}`
        );
        if (!weatherRes.ok) throw new Error("Weather failed");
        const weather = await weatherRes.json();
        weatherByRoute.push({ seed: r.seed, weather });
      }

      console.log("Combined route + weather result:");
      weatherByRoute.forEach((w, i) =>
        console.log(`Weather for route ${i + 1}:`, w.weather)
      );
      routeResults.forEach((r, i) => {
        const props = r.data?.features?.[0]?.properties;
        console.log(`Route ${i + 1}:`, {
          seed: r.seed,
          distanceKm: props?.distanceKm,
          durationMin: props?.durationMin,
        });
      });

      setRoutes(routeResults.map((r) => r.data));
    } catch (err) {
      console.error("Route generation failed:", err);
      Alert.alert("Error", "Something went wrong while generating the routes.");
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
