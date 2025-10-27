"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { InputField } from "../InputField/InputField";
import { Button } from "../Button/Button";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { useState, useEffect } from "react";

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
  const [startText, setStartText] = useState("");
  const [endText, setEndText] = useState("");

  useEffect(() => {
    if (startPoint)
      setStartText(`${startPoint[1].toFixed(5)}, ${startPoint[0].toFixed(5)}`);
  }, [startPoint]);
  useEffect(() => {
    if (endPoint)
      setEndText(`${endPoint[1].toFixed(5)}, ${endPoint[0].toFixed(5)}`);
  }, [endPoint]);

  const handleUseLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((pos) => {
      setStartPoint([pos.coords.longitude, pos.coords.latitude]);
    });
  };

  const tryParseCoords = (val: string): [number, number] | null => {
    const [lat, lon] = val.split(",").map(Number);
    return !isNaN(lat) && !isNaN(lon) ? [lon, lat] : null;
  };

  return (
    <Section>
      <Row>
        <InputField
          label="Start point"
          placeholder="Enter starting location"
          value={startText}
          onChange={(v) => {
            setStartText(v);
            const parsed = tryParseCoords(v);
            if (parsed) setStartPoint(parsed);
          }}
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
        value={endText}
        onChange={(v) => {
          setEndText(v);
          const parsed = tryParseCoords(v);
          if (parsed) setEndPoint(parsed);
        }}
        fullWidth
      />
    </Section>
  );
}
