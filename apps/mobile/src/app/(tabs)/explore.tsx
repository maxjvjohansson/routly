import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.grayLight};
`;

const Title = styled.Text`
  font-family: ${theme.typography.fontSemiBold};
  font-size: ${theme.typography.lg}px;
  color: ${theme.colors.black};
`;

export default function ExploreScreen() {
  return (
    <Container>
      <Title>Explore</Title>
    </Container>
  );
}
