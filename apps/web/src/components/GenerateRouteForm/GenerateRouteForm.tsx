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
      const res = await fetch("/api/openrouteservice", {
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
        alert("Failed to generate route. Please try again.");
        return;
      }

      const data = await res.json();

      // Control and log route data
      const coords = data?.features?.[0]?.geometry?.coordinates;
      if (coords && coords.length) {
        const hasElevation = coords.some((c: number[]) => c.length === 3);

        console.groupCollapsed("Generated route:");
        console.log("Total points:", coords.length);
        console.log("Elevation included:", hasElevation);
        console.log("Summary:", data?.features?.[0]?.properties);
        console.groupEnd();
      } else {
        console.warn("No coordinates found in route geometry");
      }

      if (data) setRoutes([data]);
      if (pathname !== "/generate") router.push("/generate");
    } catch (err) {
      console.error("Route generation failed:", err);
      alert("Something went wrong while generating the route.");
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
