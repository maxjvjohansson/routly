import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { TouchableOpacity } from "react-native";

type Props = {
  activity: "all" | "running" | "cycling";
  setActivity: (v: Props["activity"]) => void;
  roundtrip: "all" | "roundtrip" | "p2p";
  setRoundtrip: (v: Props["roundtrip"]) => void;
  sort: "newest" | "distance_asc" | "distance_desc";
  setSort: (v: Props["sort"]) => void;
  isLiked: boolean;
  setIsLiked: (val: boolean) => void;
};

const Wrapper = styled.View`
  padding: ${theme.spacing.md}px;
  gap: ${theme.spacing.md}px;
`;

const Row = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm}px;
`;

const FilterBtn = styled(TouchableOpacity)<{ active: boolean }>`
  padding: ${theme.spacing.xs}px ${theme.spacing.md}px;
  border-width: 1px;
  border-color: ${({ active }: { active: any }) =>
    active ? theme.colors.orange : theme.colors.black};
  background-color: ${({ active }: { active: any }) =>
    active ? theme.colors.orange : theme.colors.white};
`;

const BtnLabel = styled.Text<{ active: boolean }>`
  font-family: ${theme.typography.fontRegular};
  color: ${({ active }: { active: any }) =>
    active ? theme.colors.white : theme.colors.black};
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
      <Row>
        <FilterBtn
          active={activity === "all"}
          onPress={() => setActivity("all")}
        >
          <BtnLabel active={activity === "all"}>All</BtnLabel>
        </FilterBtn>

        <FilterBtn
          active={activity === "running"}
          onPress={() => setActivity("running")}
        >
          <BtnLabel active={activity === "running"}>Running</BtnLabel>
        </FilterBtn>

        <FilterBtn
          active={activity === "cycling"}
          onPress={() => setActivity("cycling")}
        >
          <BtnLabel active={activity === "cycling"}>Cycling</BtnLabel>
        </FilterBtn>

        <FilterBtn active={isLiked} onPress={() => setIsLiked(!isLiked)}>
          <BtnLabel active={isLiked}>Liked</BtnLabel>
        </FilterBtn>
      </Row>

      <Row>
        <FilterBtn
          active={roundtrip === "all"}
          onPress={() => setRoundtrip("all")}
        >
          <BtnLabel active={roundtrip === "all"}>All Types</BtnLabel>
        </FilterBtn>

        <FilterBtn
          active={roundtrip === "roundtrip"}
          onPress={() => setRoundtrip("roundtrip")}
        >
          <BtnLabel active={roundtrip === "roundtrip"}>Round Trips</BtnLabel>
        </FilterBtn>

        <FilterBtn
          active={roundtrip === "p2p"}
          onPress={() => setRoundtrip("p2p")}
        >
          <BtnLabel active={roundtrip === "p2p"}>Point-to-Point</BtnLabel>
        </FilterBtn>
      </Row>

      <Row>
        <FilterBtn active={sort === "newest"} onPress={() => setSort("newest")}>
          <BtnLabel active={sort === "newest"}>Newest</BtnLabel>
        </FilterBtn>

        <FilterBtn
          active={sort === "distance_asc"}
          onPress={() => setSort("distance_asc")}
        >
          <BtnLabel active={sort === "distance_asc"}>Shortest</BtnLabel>
        </FilterBtn>

        <FilterBtn
          active={sort === "distance_desc"}
          onPress={() => setSort("distance_desc")}
        >
          <BtnLabel active={sort === "distance_desc"}>Longest</BtnLabel>
        </FilterBtn>
      </Row>
    </Wrapper>
  );
}
