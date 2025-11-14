import styled from "styled-components/native";
import { Button } from "../Button/Button";
import ActivitySelect from "./ActivitySelect";
import DistanceSelector from "./DistanceSelector";
import LocationInputs from "./LocationInputs";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { roundTripSeeds } from "@routly/lib/data/roundTripSeeds";
import { useState, useEffect } from "react";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const FormContainer = styled.View`
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.radius.xl}px;
  gap: ${theme.spacing.md}px;
`;

const ErrorText = styled.Text`
  color: ${theme.colors.red};
  font-family: ${theme.typography.fontMedium};
  font-size: ${theme.typography.sm}px;
  text-align: center;
  margin-top: -${theme.spacing.xs}px;
  margin-bottom: ${theme.spacing.xs}px;
`;

export default function GenerateRouteForm() {
  const {
    startPoint,
    endPoint,
    distance,
    activity,
    setRoutes,
    isRoundTrip,
    setWeatherByRoute,
    setActiveRouteIndex,
  } = useRouteGeneration();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error && startPoint) setError(null);
  }, [startPoint, endPoint]);

  const handleSubmit = async () => {
    setError(null);

    if (!startPoint) {
      setError("Please select a start point on the map first.");
      return;
    }

    // Under development: fetch from Next.js proxy
    const base = "http://localhost:3000";
    const profile = activity === "run" ? "foot-walking" : "cycling-regular";

    try {
      setIsLoading(true);
      const routeResults: any[] = [];

      // Pick 3 unique seeds for variation
      if (isRoundTrip) {
        const startIndex = Math.floor(Math.random() * roundTripSeeds.length);
        const seeds = Array.from(
          { length: 3 },
          (_, i) => roundTripSeeds[(startIndex + i) % roundTripSeeds.length]
        );

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

      // Update global context
      setRoutes(routeResults.map((r) => r.data));
      setWeatherByRoute(weatherByRoute);
      setActiveRouteIndex(0);
    } catch (err) {
      console.error("Route generation failed (Expo):", err);
      setError("Something went wrong while generating the routes.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <ActivitySelect />
      <LocationInputs />
      {isRoundTrip && <DistanceSelector />}

      {error && <ErrorText>{error}</ErrorText>}

      <Button
        label={isLoading ? "Generating..." : "Generate Route"}
        color="orange"
        fullWidth
        onPress={handleSubmit}
        disabled={isLoading}
        iconRight={
          <FontAwesome5 name="magic" size={24} color={theme.colors.white} />
        }
      />
    </FormContainer>
  );
}
