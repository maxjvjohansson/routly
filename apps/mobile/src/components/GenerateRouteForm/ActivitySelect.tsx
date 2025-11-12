import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { Button } from "../Button/Button";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";

const Section = styled.View`
  width: 100%;
  flex-direction: column;
`;

const Label = styled.Text`
  font-family: ${theme.typography.fontMedium};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.xs}px;
`;

const CapsuleGroup = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const HalfWidth = styled.View`
  flex: 1;
`;

const Spacer = styled.View`
  width: ${theme.spacing.xs}px;
`;

export default function ActivitySelect() {
  const { activity, setActivity } = useRouteGeneration();

  return (
    <Section>
      <Label>Activity Type</Label>
      <CapsuleGroup>
        <HalfWidth>
          <Button
            label="Running"
            onPress={() => setActivity("run")}
            variant="toggle"
            color="teal"
            active={activity === "run"}
            fullWidth
          />
        </HalfWidth>

        <Spacer />

        <HalfWidth>
          <Button
            label="Cycling"
            onPress={() => setActivity("cycle")}
            variant="toggle"
            color="teal"
            active={activity === "cycle"}
            fullWidth
          />
        </HalfWidth>
      </CapsuleGroup>
    </Section>
  );
}
