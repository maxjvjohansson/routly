import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";

const SplashContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.teal};
`;

const Logo = styled.Text`
  font-family: ${theme.typography.fontBold};
  font-size: ${theme.typography.xl}px;
  color: ${theme.colors.white};
`;

export default function RoutlySplashScreen() {
  return (
    <SplashContainer>
      <Logo>Routly</Logo>
    </SplashContainer>
  );
}
