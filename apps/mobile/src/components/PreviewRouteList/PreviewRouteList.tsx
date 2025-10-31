import styled from "styled-components/native";
import { ScrollView } from "react-native";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import PreviewRouteCard from "../PreviewRouteCard/PreviewRouteCard";
import { nativeTheme as theme } from "@routly/ui/theme/native";

const ListContainer = styled(ScrollView)`
  width: 100%;
  padding: ${theme.spacing.lg}px 0;
  background-color: ${theme.colors.white};
`;

export default function RoutePreviewList() {
  const { routes, weatherByRoute, activeRouteIndex, setActiveRouteIndex } =
    useRouteGeneration();

  if (!routes.length) return null;

  return (
    <ListContainer>
      {routes.map((route, index) => (
        <PreviewRouteCard
          key={index}
          index={index}
          route={route}
          weather={weatherByRoute?.[index]?.weather}
          isActive={index === activeRouteIndex}
          onSelect={() => setActiveRouteIndex(index)}
        />
      ))}
    </ListContainer>
  );
}
