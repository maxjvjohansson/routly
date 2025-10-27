"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { InputField } from "../InputField/InputField";
import { Button } from "../Button/Button";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.sm};
`;

const Row = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  align-items: flex-end;
`;

export default function LocationInputs() {
  const { startPoint, endPoint, setStartPoint, setEndPoint } =
    useRouteGeneration();

  const formatCoords = (coords?: [number, number]) =>
    coords ? `${coords[1].toFixed(5)}, ${coords[0].toFixed(5)}` : "";

  const parseCoords = (val: string): [number, number] | undefined => {
    const [lat, lon] = val.split(",").map(Number);
    return !isNaN(lat) && !isNaN(lon) ? [lon, lat] : undefined;
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setStartPoint([pos.coords.longitude, pos.coords.latitude]);
    });
  };

  return (
    <Section>
      <Row>
        <InputField
          label="Start point"
          placeholder="Enter starting location"
          value={formatCoords(startPoint)}
          onChange={(v) => setStartPoint(parseCoords(v)!)}
          fullWidth
        />
        <Button
          label="Loc"
          onClick={handleUseLocation}
          color="teal"
          variant="solid"
          type="button"
        />
      </Row>

      <InputField
        label="End point (optional)"
        placeholder="Enter destination (leave blank for loop)"
        value={formatCoords(endPoint)}
        onChange={(v) => setEndPoint(parseCoords(v)!)}
        fullWidth
      />
    </Section>
  );
}
