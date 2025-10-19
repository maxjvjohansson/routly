"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { InputField } from "../InputField/InputField";
import { Button } from "../Button/Button";

type LocationInputsProps = {
  start: string;
  end: string;
  onChangeStart: (val: string) => void;
  onChangeEnd: (val: string) => void;
  onUseCurrentLocation?: () => void;
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const Row = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  align-items: flex-end;
`;

export default function LocationInputs({
  start,
  end,
  onChangeStart,
  onChangeEnd,
  onUseCurrentLocation,
}: LocationInputsProps) {
  const handleUseLocation = async () => {
    if (!onUseCurrentLocation) return;
    await onUseCurrentLocation();
  };

  return (
    <Section>
      <Row>
        <InputField
          label="Start point"
          placeholder="Enter starting location"
          value={start}
          onChange={onChangeStart}
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
        value={end}
        onChange={onChangeEnd}
        fullWidth
      />
    </Section>
  );
}
