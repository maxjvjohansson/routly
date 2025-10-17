import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import RoutlyMap from "src/components/RoutlyMap/RoutlyMap";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.grayLight};
`;

const Title = styled.Text`
  font-size: ${theme.typography.lg}px;
  font-weight: 600;
  color: ${theme.colors.black};
`;

export default function GenerateScreen() {
  return (
    <Container>
      <Title>Generate</Title>
      <RoutlyMap />
    </Container>
  );
}
