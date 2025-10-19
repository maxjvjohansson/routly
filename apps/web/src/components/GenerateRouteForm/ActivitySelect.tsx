"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";

type Activity = "run" | "cycle";

type ActivitySelectProps = {
  value: Activity;
  onChange: (val: Activity) => void;
};

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${theme.typography.sm};
  font-weight: 600;
  color: ${theme.colors.black};
`;

const OptionsRow = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  background-color: ${theme.colors.grayLight};
  padding: ${theme.spacing.xxs};
  border-radius: ${theme.radius.lg};
`;

export default function ActivitySelect({
  value,
  onChange,
}: ActivitySelectProps) {
  return (
    <Section>
      <Label>Activity Type</Label>
      <OptionsRow>
        <Button
          label="Running"
          onClick={() => onChange("run")}
          color={value === "run" ? "teal" : "grayLight"}
          variant={value === "run" ? "solid" : "outline"}
          fullWidth
          type="button"
        />
        <Button
          label="Cycling"
          onClick={() => onChange("cycle")}
          color={value === "cycle" ? "teal" : "grayLight"}
          variant={value === "cycle" ? "solid" : "outline"}
          fullWidth
          type="button"
        />
      </OptionsRow>
    </Section>
  );
}
