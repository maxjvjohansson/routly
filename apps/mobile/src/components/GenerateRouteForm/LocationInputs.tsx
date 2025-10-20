import styled from "styled-components/native";
import { View, TextInput, Text } from "react-native";
import { Button } from "../Button/Button";
import { nativeTheme as theme } from "@routly/ui/theme/native";

type LocationInputsProps = {
  start: string;
  end: string;
  onChangeStart: (val: string) => void;
  onChangeEnd: (val: string) => void;
  onUseCurrentLocation?: () => void;
};

const Section = styled(View)`
  flex-direction: column;
  gap: ${theme.spacing.sm}px;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: flex-end;
  gap: ${theme.spacing.xs}px;
`;

const Label = styled(Text)`
  font-size: ${theme.typography.sm}px;
  font-weight: 500;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.xxs}px;
`;

const InputContainer = styled(View)`
  flex: 1;
`;

const StyledInput = styled(TextInput)`
  width: 100%;
  border-width: 1px;
  border-color: ${theme.colors.gray};
  border-radius: ${theme.radius.md}px;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.black};
`;

export default function LocationInputs({
  start,
  end,
  onChangeStart,
  onChangeEnd,
  onUseCurrentLocation,
}: LocationInputsProps) {
  const handleUseLocation = async () => {
    if (!onUseCurrentLocation) return;
    await onUseCurrentLocation();
  };

  return (
    <Section>
      <View>
        <Label>Start point</Label>
        <Row>
          <InputContainer>
            <StyledInput
              placeholder="Enter starting location"
              value={start}
              onChangeText={onChangeStart}
              autoCorrect={false}
              autoCapitalize="none"
            />
          </InputContainer>

          <Button
            label="Loc"
            onPress={handleUseLocation}
            color="teal"
            variant="solid"
          />
        </Row>
      </View>

      <View>
        <Label>End point (optional)</Label>
        <StyledInput
          placeholder="Enter destination (leave blank for loop)"
          value={end}
          onChangeText={onChangeEnd}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
    </Section>
  );
}
