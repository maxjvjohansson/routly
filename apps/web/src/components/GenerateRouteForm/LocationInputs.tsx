"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { InputField } from "../InputField/InputField";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { useState, useEffect } from "react";
import { FiMapPin } from "react-icons/fi";
import { BiCurrentLocation } from "react-icons/bi";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

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
  text-align: left;
`;

const LocationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 36.5px;
  box-sizing: border-box;
  background-color: ${theme.colors.teal};
  border: none;
  border-radius: ${theme.radius.lg};
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;
  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 1px solid ${theme.colors.teal};
    outline-offset: 2px;
  }

  svg {
    color: ${theme.colors.white};
  }
`;

export default function LocationInputs() {
  const { startPoint, endPoint, setStartPoint, setEndPoint } =
    useRouteGeneration();
  const [startText, setStartText] = useState("");
  const [endText, setEndText] = useState("");

  useEffect(() => {
    if (startPoint) {
      setStartText(`${startPoint[1].toFixed(5)}, ${startPoint[0].toFixed(5)}`);
    } else {
      setStartText("");
    }
  }, [startPoint]);

  useEffect(() => {
    if (endPoint) {
      setEndText(`${endPoint[1].toFixed(5)}, ${endPoint[0].toFixed(5)}`);
    } else {
      setEndText("");
    }
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
          labelRightSlot={
            <InfoTooltip text="Choose your starting location by picking a point on the map or using your current position." />
          }
          placeholder="Enter starting location"
          value={startText}
          onChange={(v) => {
            setStartText(v);
            const parsed = tryParseCoords(v);
            if (parsed) setStartPoint(parsed);
          }}
          fullWidth
          iconLeft={<FiMapPin size={18} color={theme.colors.black} />}
        />
        <LocationButton type="button" onClick={handleUseLocation}>
          <BiCurrentLocation size={24} />
        </LocationButton>
      </Row>

      <InputField
        label="End point (optional)"
        labelRightSlot={
          <InfoTooltip text="Leave this empty to generate a loop. Fill it in if you want a point-to-point route." />
        }
        placeholder="Enter destination (leave blank for loop)"
        value={endText}
        onChange={(v) => {
          setEndText(v);
          const parsed = tryParseCoords(v);
          if (parsed) setEndPoint(parsed);
        }}
        fullWidth
        iconLeft={<FiMapPin size={18} color={theme.colors.black} />}
      />
    </Section>
  );
}
