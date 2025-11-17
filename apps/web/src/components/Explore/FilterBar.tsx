"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

type Props = {
  activity: "all" | "running" | "cycling";
  setActivity: (value: "all" | "running" | "cycling") => void;
  roundtrip: "all" | "roundtrip" | "p2p";
  setRoundtrip: (value: "all" | "roundtrip" | "p2p") => void;
  setSort: (value: "newest" | "distance_asc" | "distance_desc") => void;
  sort: "newest" | "distance_asc" | "distance_desc";
  isLiked: boolean;
  setIsLiked: (value: boolean) => void;
};

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  align-items: center;

  ${theme.media.md} {
    flex-direction: row;
    justify-content: flex-start;
    gap: ${theme.spacing.lg};
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border: 1px solid
    ${({ $active }) => ($active ? theme.colors.orange : theme.colors.black)};
  background: ${({ $active }) =>
    $active ? theme.colors.orange : theme.colors.white};
  color: ${({ $active }) =>
    $active ? theme.colors.white : theme.colors.black};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  transition: background 0.25s ease;

  &:hover {
    opacity: 0.85;
  }
`;

const SortSelect = styled.select`
  padding: ${theme.spacing.xs} ${theme.spacing.xs};
  border: 1px solid ${theme.colors.black};
  background: ${theme.colors.white};
  font-size: ${theme.typography.sm};
`;

export default function FilterBar({
  activity,
  setActivity,
  roundtrip,
  setRoundtrip,
  sort,
  setSort,
  isLiked,
  setIsLiked,
}: Props) {
  return (
    <Wrapper>
      <FilterGroup>
        <FilterButton
          $active={activity === "all"}
          onClick={() => setActivity("all")}
        >
          All
        </FilterButton>

        <FilterButton
          $active={activity === "running"}
          onClick={() => setActivity("running")}
        >
          Running
        </FilterButton>

        <FilterButton
          $active={activity === "cycling"}
          onClick={() => setActivity("cycling")}
        >
          Cycling
        </FilterButton>

        <FilterButton $active={isLiked} onClick={() => setIsLiked(!isLiked)}>
          Liked
        </FilterButton>
      </FilterGroup>

      <FilterGroup>
        <FilterButton
          $active={roundtrip === "all"}
          onClick={() => setRoundtrip("all")}
        >
          All Types
        </FilterButton>

        <FilterButton
          $active={roundtrip === "roundtrip"}
          onClick={() => setRoundtrip("roundtrip")}
        >
          Round Trips
        </FilterButton>

        <FilterButton
          $active={roundtrip === "p2p"}
          onClick={() => setRoundtrip("p2p")}
        >
          Point-to-Point
        </FilterButton>
      </FilterGroup>

      <SortSelect
        id="sort-select"
        name="sort"
        value={sort}
        onChange={(e) =>
          setSort(e.target.value as "newest" | "distance_asc" | "distance_desc")
        }
      >
        <option value="newest">Most recent</option>
        <option value="distance_asc">Shortest first</option>
        <option value="distance_desc">Longest first</option>
      </SortSelect>
    </Wrapper>
  );
}
