import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { Button } from "../Button/Button";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

const Section = styled.View`
  width: 100%;
  flex-direction: column;
`;

const LabelRow = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  gap: ${theme.spacing.xxs}px;
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
      <LabelRow>
        <Label>Activity Type</Label>
        <InfoTooltip text="Select the type of activity to tailor the route for running or cycling." />
      </LabelRow>
      <CapsuleGroup>
        <HalfWidth>
          <Button
            label="Running"
            onPress={() => setActivity("run")}
            variant="toggle"
            color="teal"
            active={activity === "run"}
            fullWidth
            iconLeft={
              <MaterialIcons
                name="directions-run"
                size={22}
                color={
                  activity === "run" ? theme.colors.white : theme.colors.black
                }
              />
            }
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
            iconLeft={
              <Ionicons
                name="bicycle"
                size={22}
                color={
                  activity === "cycle" ? theme.colors.white : theme.colors.black
                }
              />
            }
          />
        </HalfWidth>
      </CapsuleGroup>
    </Section>
  );
}
