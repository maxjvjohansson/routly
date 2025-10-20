import styled from "styled-components/native";
import { Text, View } from "react-native";
import { Button } from "../Button/Button";
import { nativeTheme as theme } from "@routly/ui/theme/native";

type Activity = "run" | "cycle";

type ActivitySelectProps = {
  value: Activity;
  onChange: (val: Activity) => void;
};

const Section = styled(View)`
  flex-direction: column;
  gap: ${theme.spacing.xxs}px;
`;

const Label = styled(Text)`
  font-size: ${theme.typography.sm}px;
  font-weight: 500;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.xxs}px;
`;

const CapsuleGroup = styled(View)`
  flex-direction: row;
  gap: ${theme.spacing.xxs}px;
  border-radius: ${theme.radius.xl}px;
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
          onPress={() => onChange("run")}
          variant="toggle"
          color="teal"
          active={value === "run"}
          fullWidth
        />
        <Button
          label="Cycling"
          onPress={() => onChange("cycle")}
          variant="toggle"
          color="teal"
          active={value === "cycle"}
          fullWidth
        />
      </CapsuleGroup>
    </Section>
  );
}
