"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type Props = {
  route: any;
  onView: (route: any) => void;
  onToggleLike?: (route: any) => void;
  isLiked?: boolean;
};

const Card = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const Title = styled.h4`
  font-size: ${theme.typography.md};
  font-weight: 600;
  color: ${theme.colors.black};
`;

const InfoRow = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  font-size: ${theme.typography.sm};
  color: ${theme.colors.grayDark};
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LikeButton = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${theme.spacing.xs};
  display: flex;
  align-items: center;

  color: ${({ $active }) =>
    $active ? theme.colors.orange : theme.colors.grayDark};

  transition:
    color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    color: ${theme.colors.orange};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.9);
  }
`;

export default function ExploreRouteCard({
  route,
  onView,
  onToggleLike,
  isLiked = false,
}: Props) {
  return (
    <Card>
      <Title>{route.name}</Title>

      <InfoRow>
        <span>{route.distance_km?.toFixed(1)} km</span>
        <span>{route.elevation_gain} m</span>
        <span>{route.duration_estimate?.toFixed(0)} min</span>
      </InfoRow>

      <Actions>
        <Button label="View route" color="teal" onClick={() => onView(route)} />

        {onToggleLike && (
          <LikeButton
            onClick={() => onToggleLike(route)}
            $active={isLiked}
            aria-label="Toggle like"
            title={isLiked ? "Unlike" : "Like"}
          >
            {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </LikeButton>
        )}
      </Actions>
    </Card>
  );
}
