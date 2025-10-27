"use client";

import { useState } from "react";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import ActivitySelect from "./ActivitySelect";
import LocationInputs from "./LocationInputs";
import DistanceSelector from "./DistanceSelector";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  width: 100%;
  height: 100%;
  max-width: 800px;
  background-color: ${theme.colors.white};
`;

export default function GenerateRouteForm() {
  const [activity, setActivity] = useState<"run" | "cycle">("run");
  const [distance, setDistance] = useState(10);
  const [startLocation, setStartLocation] = useState("");
  const [endDestination, setEndDestination] = useState("");

  const handleUseLocation = async () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude.toFixed(5);
      const lon = pos.coords.longitude.toFixed(5);
      const coords = `${lat}, ${lon}`;
      setStartLocation(coords);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Generate route with:", {
      activity,
      distance,
      startLocation,
      endDestination,
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
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

      <Button type="submit" label="Generate Route" color="orange" fullWidth />
    </FormContainer>
  );
}
