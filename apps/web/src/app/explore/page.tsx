"use client";

import styled from "styled-components";
import { useAuth } from "@routly/lib/context/AuthContext";
import { webTheme as theme } from "@routly/ui/theme/web";
import ExploreRoutesList from "src/components/Explore/ExploreRoutesList";
import FilterBar from "src/components/Explore/FilterBar";
import { Button } from "src/components/Button/Button";
import { useRouter } from "next/navigation";
import { useExploreRoutes } from "@routly/lib/hooks/useExploreRoutes";
import { SlLocationPin } from "react-icons/sl";
import { FaUserPlus } from "react-icons/fa6";
import { FiLogIn } from "react-icons/fi";

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  background-color: ${theme.colors.white};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Heading = styled.h1`
  font-size: ${theme.typography["2xl"]};
  font-weight: 700;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.black};

  ${theme.media.md} {
    font-size: ${theme.typography["3xl"]};
  }
`;

const Intro = styled.p`
  color: ${theme.colors.grayDark};
  font-size: ${theme.typography.md};
`;

const NearMeButtonWrapper = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const ButtonWrapper = styled.div`
  margin-top: ${theme.spacing.xl};
`;

const LoggedOutBox = styled.div`
  margin-top: ${theme.spacing.lg};
  text-align: center;
`;

const LoggedOutText = styled.p`
  color: ${theme.colors.grayDark};
  font-size: ${theme.typography.md};
  margin-bottom: ${theme.spacing.lg};
`;

const AuthButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
`;

export default function ExplorePage() {
  const { user } = useAuth();
  const router = useRouter();
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
    <Container>
      <Header>
        <Heading>Discover community routes</Heading>

        {!user ? (
          <LoggedOutBox>
            <LoggedOutText>
              Log in or create an account to explore routes created by Routly
              users.
            </LoggedOutText>

            <AuthButtons>
              <Button
                label="Log in"
                color="orange"
                onClick={() => router.push("/login")}
                iconLeft={<FiLogIn size={22} />}
              />
              <Button
                label="Sign up"
                color="teal"
                onClick={() => router.push("/signup")}
                iconLeft={<FaUserPlus size={22} />}
              />
            </AuthButtons>
          </LoggedOutBox>
        ) : (
          <Intro>
            Explore running and cycling routes created by other Routly users
            near you.
          </Intro>
        )}
      </Header>

      {user && (
        <>
          <NearMeButtonWrapper>
            <Button
              label={nearMe ? "Showing routes near you" : "Show routes near me"}
              color="orange"
              onClick={() => {
                if (!nearMe) {
                  getLocation();
                } else {
                  setNearMe(false);
                  setUserPos(null);
                  setPage(1);
                }
              }}
              iconLeft={<SlLocationPin size={22} />}
            />
          </NearMeButtonWrapper>

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
            <ButtonWrapper>
              <Button
                label="Load more"
                color="orange"
                onClick={() => setPage((prev) => prev + 1)}
              />
            </ButtonWrapper>
          )}
        </>
      )}
    </Container>
  );
}
