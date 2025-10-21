import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { Button } from "../Button/Button";

type Activity = "run" | "cycle";

type ActivitySelectProps = {
  value: Activity;
  onChange: (val: Activity) => void;
};

const Section = styled.View`
  width: 100%;
  flex-direction: column;
  margin-bottom: ${theme.spacing.sm}px;
`;

const Label = styled.Text`
  font-size: ${theme.typography.sm}px;
  font-weight: 500;
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

export default function ActivitySelect({
  value,
  onChange,
}: ActivitySelectProps) {
  return (
    <Section>
      <Label>Activity Type</Label>
      <CapsuleGroup>
        <HalfWidth>
          <Button
            label="Running"
            onPress={() => onChange("run")}
            variant="toggle"
            color="teal"
            active={value === "run"}
            fullWidth
          />
        </HalfWidth>

        <Spacer />

        <HalfWidth>
          <Button
            label="Cycling"
            onPress={() => onChange("cycle")}
            variant="toggle"
            color="teal"
            active={value === "cycle"}
            fullWidth
          />
        </HalfWidth>
      </CapsuleGroup>
    </Section>
  );
}
