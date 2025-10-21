import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { SafeAreaView } from "react-native-safe-area-context";
import GenerateRouteForm from "src/components/GenerateRouteForm/GenerateRouteForm";

const Screen = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.white};
`;

const Wrapper = styled.View`
  padding: 0 ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.xl}px;
  font-weight: 700;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.xxs}px;
`;

const Subtitle = styled.Text`
  font-size: ${theme.typography.sm}px;
  font-weight: 400;
  color: ${theme.colors.grayDark};
`;

export default function GenerateScreen() {
  return (
    <Screen>
      <Wrapper>
        <Title>Create your next route</Title>
        <Subtitle>
          Generate personalized running and cycling routes tailored to your
          preferences
        </Subtitle>
      </Wrapper>
      <GenerateRouteForm />
    </Screen>
  );
}
