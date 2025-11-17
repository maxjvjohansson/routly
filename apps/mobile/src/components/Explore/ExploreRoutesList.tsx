import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import ExploreRouteCard from "./ExploreRouteCard";
import { useRouter } from "expo-router";

type Props = {
  routes: any[];
  loading: boolean;
  onToggleLike?: (route: any) => void;
  likedRouteIds?: string[];
};

const Wrapper = styled.View`
  display: flex;
  gap: ${theme.spacing.lg}px;
  margin-top: ${theme.spacing.md}px;
  padding: 0 ${theme.spacing.md}px;
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
  const router = useRouter();

  const handleViewOnMap = (route: any) => {
    router.push(`/route/${route.id}`);
  };

  if (loading) return <LoadingText>Loading...</LoadingText>;
  if (!routes?.length) return <EmptyText>No routes found.</EmptyText>;

  return (
    <Wrapper>
      {routes.map((route) => (
        <ExploreRouteCard
          key={route.id}
          route={route}
          onView={handleViewOnMap}
          onToggleLike={onToggleLike}
          isLiked={likedRouteIds.includes(route.id)}
        />
      ))}
    </Wrapper>
  );
}
