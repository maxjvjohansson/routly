import styled from "styled-components/native";
import { View } from "react-native";
import { nativeTheme as theme } from "@routly/ui/theme/native";

const DotsContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.xs}px;
  background-color: ${theme.colors.white};
  margin-bottom: ${theme.spacing.md}px;
`;

const Dot = styled(View)<{ $active?: boolean }>`
  width: ${theme.spacing.xs}px;
  height: ${theme.spacing.xs}px;
  border-radius: ${theme.radius.full}%;
  background-color: ${({ $active }: { $active: any }) =>
    $active ? theme.colors.orange : theme.colors.gray};
`;

export function CarouselDots({
  count,
  activeIndex,
}: {
  count: number;
  activeIndex: number;
}) {
  if (count <= 1) return null;

  return (
    <DotsContainer>
      {Array.from({ length: count }).map((_, i) => (
        <Dot key={i} $active={i === activeIndex} />
      ))}
    </DotsContainer>
  );
}
