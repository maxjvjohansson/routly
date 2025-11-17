"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import ExploreRouteCard from "./ExploreRouteCard";
import { useRouter } from "next/navigation";

type Props = {
  routes: any[];
  loading: boolean;
  onToggleLike?: (route: any) => void;
  likedRouteIds?: string[];
};

const Grid = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: ${theme.spacing.lg};

  ${theme.media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function ExploreRoutesList({
  routes,
  loading,
  onToggleLike,
  likedRouteIds = [],
}: Props) {
  const router = useRouter();

  if (loading) return <p>Loading...</p>;
  if (!routes?.length) return <p>No routes found near you.</p>;

  return (
    <Grid>
      {routes.map((route) => (
        <ExploreRouteCard
          key={route.id}
          route={route}
          onView={() => router.push(`/routes/${route.id}`)}
          onToggleLike={onToggleLike}
          isLiked={likedRouteIds.includes(route.id)}
        />
      ))}
    </Grid>
  );
}
