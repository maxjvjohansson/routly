import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import GenerateRouteForm from "src/components/GenerateRouteForm/GenerateRouteForm";
import RoutlyMap from "src/components/RoutlyMap/RoutlyMap";
import { ScrollView } from "react-native";

const Wrapper = styled.View`
  padding: ${theme.spacing.lg}px ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
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
    <ScrollView>
      <Wrapper>
        <Title>Create your next route</Title>
        <Subtitle>
          Generate personalized running and cycling routes tailored to your
          preferences
        </Subtitle>
      </Wrapper>
      <GenerateRouteForm />
      <RoutlyMap />
    </ScrollView>
  );
}
