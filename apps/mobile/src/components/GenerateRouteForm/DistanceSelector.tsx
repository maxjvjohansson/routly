import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import { View, Text, TextInput } from "react-native";
import { nativeTheme as theme } from "@routly/ui/theme/native";

type DistanceSelectorProps = {
  value: number;
  onChange: (val: number) => void;
  activity: "run" | "cycle";
};

const Container = styled(View)`
  flex-direction: column;
  gap: ${theme.spacing.xs}px;
`;

const LabelRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LabelText = styled(Text)`
  font-size: ${theme.typography.sm}px;
  font-weight: 500;
  color: ${theme.colors.black};
`;

const ManualInput = styled(TextInput)`
  width: 80px;
  border-width: 1px;
  border-color: ${theme.colors.gray};
  border-radius: ${theme.radius.md}px;
  padding: ${theme.spacing.xxs}px ${theme.spacing.xs}px;
  font-size: ${theme.typography.sm}px;
  text-align: right;
  color: ${theme.colors.black};
`;

const RangeWrapper = styled(View)`
  width: 100%;
`;

export default function DistanceSelector({
  value,
  onChange,
  activity,
}: DistanceSelectorProps) {
  const max = activity === "run" ? 40 : 200;

  return (
    <Container>
      <LabelRow>
        <LabelText>Distance (km)</LabelText>
        <ManualInput
          keyboardType="numeric"
          value={String(value)}
          onChangeText={(text: string) => {
            const num = Number(text);
            if (!isNaN(num)) onChange(num);
          }}
        />
      </LabelRow>

      <RangeWrapper>
        <Slider
          minimumValue={1}
          maximumValue={max}
          step={1}
          value={value}
          onValueChange={(v) => onChange(v)}
          minimumTrackTintColor={theme.colors.teal}
          maximumTrackTintColor={theme.colors.grayLight}
          thumbTintColor={theme.colors.teal}
        />
      </RangeWrapper>

      <LabelRow>
        <LabelText>1 km</LabelText>
        <LabelText>{max} km</LabelText>
      </LabelRow>
    </Container>
  );
}
