"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import {
  FaClock,
  FaHeart,
  FaMountain,
  FaRegHeart,
  FaRoute,
} from "react-icons/fa";
import RouteInfoItem from "../PreviewRouteCard/RouteInfoItem";
import {
  formatDuration,
  formatAscent,
  formatDistance,
} from "@routly/lib/utils/routeFormatters";

type Props = {
  route: any;
  onView: (route: any) => void;
  onToggleLike?: (route: any) => void;
  isLiked?: boolean;
};

const Card = styled.div`
  width: 100%;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  const distance: string = formatDistance(route.distance_km);
  const ascent: number = formatAscent(route.elevation_gain);
  const duration: string = formatDuration(route.duration_estimate);

  return (
    <Card>
      <Title>{route.name}</Title>

      <InfoRow>
        <RouteInfoItem
          mode="compact"
          value={`${distance} km`}
          icon={<FaRoute size={18} />}
        />
        <RouteInfoItem
          mode="compact"
          value={`${ascent} m`}
          icon={<FaMountain size={18} />}
        />
        <RouteInfoItem
          mode="compact"
          value={`${duration} min`}
          icon={<FaClock size={18} />}
        />
      </InfoRow>

      <Actions>
        <Button
          label="View Details"
          color="teal"
          onClick={() => onView(route)}
        />

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
