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
  gap: ${theme.spacing.xxs};
`;

const Label = styled.label`
  font-size: ${theme.typography.sm};
  font-weight: 500;
  color: ${theme.colors.black};
`;

const CapsuleGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.xxs};
  border-radius: ${theme.radius.xl};
`;

export default function ActivitySelect({
  value,
  onChange,
}: ActivitySelectProps) {
  return (
    <Section>
      <Label>Activity Type</Label>
      <CapsuleGroup>
        <Button
          label="Running"
          onClick={() => onChange("run")}
          variant="toggle"
          color="teal"
          active={value === "run"}
          fullWidth
        />
        <Button
          label="Cycling"
          onClick={() => onChange("cycle")}
          variant="toggle"
          color="teal"
          active={value === "cycle"}
          fullWidth
        />
      </CapsuleGroup>
    </Section>
  );
}
