import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import GenerateRouteForm from "src/components/GenerateRouteForm/GenerateRouteForm";
import RoutlyMap from "src/components/RoutlyMap/RoutlyMap";
import PreviewRouteCarousel from "src/components/PreviewRouteCarousel/PreviewRouteCarousel";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";

const ScrollWrapper = styled.ScrollView`
  background-color: ${theme.colors.white};
`;

const Wrapper = styled.View`
  padding: ${theme.spacing.lg}px;
  background-color: ${theme.colors.white};
`;

const Title = styled.Text`
  text-align: center;
  font-family: ${theme.typography.fontBold};
  font-size: ${theme.typography.xl}px;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.xxs}px;
`;

const Subtitle = styled.Text`
  text-align: center;
  font-family: ${theme.typography.fontRegular};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.grayDark};
`;

export default function GenerateScreen() {
  const { routes } = useRouteGeneration();
  const hasRoutes = routes.length > 0;

  return (
    <ScrollWrapper>
      <Wrapper>
        <Title>Generate your route</Title>
        <Subtitle>
          Choose your activity and let Routly find the perfect path for you.
        </Subtitle>
      </Wrapper>
      {hasRoutes ? <PreviewRouteCarousel /> : <GenerateRouteForm />}
      <RoutlyMap />
    </ScrollWrapper>
  );
}
