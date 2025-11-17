"use client";

import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { useExploreRoutes } from "@routly/lib/hooks/useExploreRoutes.native";
import ExploreRoutesList from "src/components/Explore/ExploreRoutesList";
import FilterBar from "src/components/Explore/FilterBar";
import { Button } from "src/components/Button/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.white};
`;

const Wrapper = styled.View`
  padding: ${theme.spacing.lg}px;
`;

const Title = styled.Text`
  margin-bottom: ${theme.spacing.xxs}px;
  text-align: center;
  font-family: ${theme.typography.fontBold};
  font-size: ${theme.typography.xl}px;
  color: ${theme.colors.black};
`;

const Subtitle = styled.Text`
  text-align: center;
  font-family: ${theme.typography.fontRegular};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.grayDark};
`;

const NearMeWrapper = styled.View`
  margin: ${theme.spacing.lg}px 0;
  align-items: center;
`;

export default function ExploreScreen() {
  const {
    filteredRoutes,
    loading,
    toggleLike,
    getLocation,
    activity,
    setActivity,
    roundtrip,
    setRoundtrip,
    sort,
    setSort,
    isLiked,
    setIsLiked,
    nearMe,
    setNearMe,
    setUserPos,
    likedRouteIds,
    setPage,
  } = useExploreRoutes();

  return (
    <ScrollWrapper>
      <Wrapper>
        <Title>Discover community routes</Title>

        <Subtitle>
          Explore running and cycling routes created by other Routly users near
          you.
        </Subtitle>
      </Wrapper>

      <NearMeWrapper>
        <Button
          label={nearMe ? "Showing routes near you" : "Show routes near me"}
          color="orange"
          onPress={() => {
            if (!nearMe) {
              getLocation();
            } else {
              setNearMe(false);
              setUserPos(null);
              setPage(1);
            }
          }}
          iconLeft={
            <Ionicons
              name="location-outline"
              size={24}
              color={theme.colors.white}
            />
          }
        />
      </NearMeWrapper>

      {!nearMe && (
        <FilterBar
          activity={activity}
          setActivity={setActivity}
          roundtrip={roundtrip}
          setRoundtrip={setRoundtrip}
          sort={sort}
          setSort={setSort}
          isLiked={isLiked}
          setIsLiked={setIsLiked}
        />
      )}

      <ExploreRoutesList
        routes={filteredRoutes}
        loading={loading}
        onToggleLike={toggleLike}
        likedRouteIds={likedRouteIds}
      />

      {!nearMe && (
        <Wrapper>
          <Button
            label="Load More"
            color="orange"
            onPress={() => setPage((prev) => prev + 1)}
          />
        </Wrapper>
      )}
    </ScrollWrapper>
  );
}
