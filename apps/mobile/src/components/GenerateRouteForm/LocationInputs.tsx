import styled from "styled-components/native";
import { View, TextInput, Text, Alert } from "react-native";
import * as Location from "expo-location";
import { Button } from "../Button/Button";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { useEffect, useState } from "react";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";

const Section = styled.View`
  flex-direction: column;
  gap: ${theme.spacing.sm}px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: flex-end;
  gap: ${theme.spacing.xs}px;
`;

const Label = styled.Text`
  font-family: ${theme.typography.fontMedium};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.xxs}px;
`;

const InputContainer = styled.View`
  flex: 1;
`;

const StyledInput = styled(TextInput)`
  width: 100%;
  border-width: 1px;
  border-color: ${theme.colors.gray};
  border-radius: ${theme.radius.md}px;
  padding: ${theme.spacing.xs}px ${theme.spacing.sm}px;
  font-family: ${theme.typography.fontRegular};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.black};
`;

export default function LocationInputs() {
  const { startPoint, endPoint, setStartPoint, setEndPoint } =
    useRouteGeneration();

  const [startText, setStartText] = useState("");
  const [endText, setEndText] = useState("");

  // Sync context to textfields
  useEffect(() => {
    if (startPoint) {
      setStartText(`${startPoint[1].toFixed(5)}, ${startPoint[0].toFixed(5)}`);
    } else {
      setStartText("");
    }
  }, [startPoint]);

  useEffect(() => {
    if (endPoint) {
      setEndText(`${endPoint[1].toFixed(5)}, ${endPoint[0].toFixed(5)}`);
    } else {
      setEndText("");
    }
  }, [endPoint]);

  // Convert text input to coordinates if valid
  const tryParseCoords = (val: string): [number, number] | null => {
    const [lat, lon] = val.split(",").map(Number);
    return !isNaN(lat) && !isNaN(lon) ? [lon, lat] : null;
  };

  // User Location
  const handleUseLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required.");
        return;
      }
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setStartPoint([pos.coords.longitude, pos.coords.latitude]);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Could not get current location.");
    }
  };

  return (
    <Section>
      <View>
        <Label>Start point</Label>
        <Row>
          <InputContainer>
            <StyledInput
              placeholder="Enter starting location"
              value={startText}
              onChangeText={(v: string) => {
                setStartText(v);
                const parsed = tryParseCoords(v);
                if (parsed) setStartPoint(parsed);
              }}
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
          value={endText}
          onChangeText={(v: string) => {
            setEndText(v);
            const parsed = tryParseCoords(v);
            if (parsed) setEndPoint(parsed);
          }}
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
    </Section>
  );
}
