"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";

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

export default function ActivitySelect() {
  const { activity, setActivity } = useRouteGeneration();

  return (
    <Section>
      <Label>Activity Type</Label>
      <CapsuleGroup>
        <Button
          label="Running"
          onClick={() => setActivity("run")}
          variant="toggle"
          color="teal"
          active={activity === "run"}
          fullWidth
        />
        <Button
          label="Cycling"
          onClick={() => setActivity("cycle")}
          variant="toggle"
          color="teal"
          active={activity === "cycle"}
          fullWidth
        />
      </CapsuleGroup>
    </Section>
  );
}
