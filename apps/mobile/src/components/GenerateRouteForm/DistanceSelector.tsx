import styled from "styled-components/native";
import Slider from "@react-native-community/slider";
import { View, Text, TextInput } from "react-native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";

const Container = styled(View)`
  flex-direction: column;
  margin-bottom: ${theme.spacing.sm}px;
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

export default function DistanceSelector() {
  const { activity, distance, setDistance } = useRouteGeneration();
  const max = activity === "run" ? 40 : 200;

  return (
    <Container>
      <LabelRow>
        <LabelText>Distance (km)</LabelText>
        <ManualInput
          keyboardType="numeric"
          value={String(distance)}
          onChangeText={(text: string) => {
            const num = Number(text);
            if (!isNaN(num)) setDistance(num);
          }}
        />
      </LabelRow>

      <RangeWrapper>
        <Slider
          minimumValue={1}
          maximumValue={max}
          step={1}
          value={distance}
          onValueChange={(v) => setDistance(v)}
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
