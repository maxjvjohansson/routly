import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import ExploreRouteCard from "./ExploreRouteCard";

type Props = {
  routes: any[];
  loading: boolean;
  onToggleLike?: (route: any) => void;
  likedRouteIds?: string[];
};

const Wrapper = styled.View`
  padding: ${theme.spacing.md}px;
`;

const LoadingText = styled.Text`
  text-align: center;
  margin: ${theme.spacing.lg}px;
  font-family: ${theme.typography.fontRegular};
`;

const EmptyText = styled.Text`
  text-align: center;
  margin: ${theme.spacing.lg}px;
  font-family: ${theme.typography.fontRegular};
  color: ${theme.colors.grayDark};
`;

export default function ExploreRoutesList({
  routes,
  loading,
  onToggleLike,
  likedRouteIds = [],
}: Props) {
  if (loading) return <LoadingText>Loading...</LoadingText>;
  if (!routes?.length) return <EmptyText>No routes found.</EmptyText>;

  return (
    <Wrapper>
      {routes.map((route) => (
        <ExploreRouteCard
          key={route.id}
          route={route}
          onView={() => {
            // TODO: koppla expo-router här sen
          }}
          onToggleLike={onToggleLike}
          isLiked={likedRouteIds.includes(route.id)}
        />
      ))}
    </Wrapper>
  );
}
