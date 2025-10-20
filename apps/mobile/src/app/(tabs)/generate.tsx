import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import RoutlyMap from "src/components/RoutlyMap/RoutlyMap";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.grayLight};
`;

export default function GenerateScreen() {
  return (
    <Container>
      <RoutlyMap />
    </Container>
  );
}
