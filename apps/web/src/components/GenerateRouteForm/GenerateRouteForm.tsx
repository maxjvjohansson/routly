"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import ActivitySelect from "./ActivitySelect";
import DistanceSelector from "./DistanceSelector";
import LocationInputs from "./LocationInputs";
import { useAuth } from "@routly/lib/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { fetchCombinedRouteData } from "@routly/lib/routeAlgorithms/fetchCombinedRouteData";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
  width: 100%;
  min-height: 438.5px;
  max-width: 800px;
  background-color: ${theme.colors.white};
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const ButtonWrapper = styled.div`
  margin-top: ${theme.spacing.md};
`;

export default function GenerateRouteForm() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const { startPoint, endPoint, distance, activity, setRoutes, isRoundTrip } =
    useRouteGeneration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      router.push("/login?next=/generate");
      return;
    }

    if (!startPoint) {
      alert("Please select a start point on the map");
      return;
    }

    try {
      console.log("Generating 3 routes + weather...");

      const { routes, weather } = await fetchCombinedRouteData(
        startPoint,
        endPoint ?? null,
        distance,
        activity
      );

      console.group("Combined route result");
      console.log("Weather data:", weather);
      routes.forEach((r, i) => {
        const summary = r?.data?.features?.[0]?.properties;
        console.log(`Route ${i + 1}:`);
        console.log("Seed:", r.seed);
        console.log("Profile:", r.profile);
        console.log("Distance (km):", summary?.distanceKm);
        console.log("Duration (min):", summary?.durationMin);
        console.log("Used profile (after fallback):", summary?.usedProfile);
        console.log(
          "Elevation points:",
          r?.data?.features?.[0]?.geometry?.coordinates?.length
        );
        console.log("───");
      });
      console.groupEnd();
      setRoutes(routes.map((r) => r.data));

      if (pathname !== "/generate") router.push("/generate");
    } catch (err) {
      console.error("Route generation failed:", err);
      alert("Something went wrong while generating the routes.");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormFields>
        <ActivitySelect />
        <LocationInputs />
        {isRoundTrip && <DistanceSelector />}
      </FormFields>

      <ButtonWrapper>
        <Button type="submit" label="Generate Route" color="orange" fullWidth />
      </ButtonWrapper>
    </FormContainer>
  );
}
