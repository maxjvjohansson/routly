"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { BiRun, BiCycling } from "react-icons/bi";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxs};
`;

const LabelWrapper = styled.div`
  display: flex;
  gap: ${theme.spacing.xxs};
  white-space: nowrap;
`;

const Label = styled.span`
  text-align: left;
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
      <LabelWrapper>
        <Label>Activity Type</Label>
        <InfoTooltip text="Select the type of activity to tailor the route for running or cycling." />
      </LabelWrapper>
      <CapsuleGroup>
        <Button
          label="Running"
          onClick={() => setActivity("run")}
          variant="toggle"
          color="teal"
          active={activity === "run"}
          fullWidth
          iconLeft={<BiRun size={20} />}
        />
        <Button
          label="Cycling"
          onClick={() => setActivity("cycle")}
          variant="toggle"
          color="teal"
          active={activity === "cycle"}
          fullWidth
          iconLeft={<BiCycling size={20} />}
        />
      </CapsuleGroup>
    </Section>
  );
}
