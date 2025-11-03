import styled from "styled-components/native";
import {
  ScrollView,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import PreviewRouteCard from "../PreviewRouteCard/PreviewRouteCard";
import { CarouselDots } from "./CarouselDots";
import { nativeTheme as theme } from "@routly/ui/theme/native";

const CarouselContainer = styled(ScrollView).attrs({
  horizontal: true,
  pagingEnabled: true,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.sm}px 0;
`;

const CardWrapper = styled(View)<{ $width: number }>`
  width: ${({ $width }: { $width: any }) => $width}px;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.View`
  padding: 0 ${theme.spacing.lg}px;
`;

const BackButton = styled(TouchableOpacity)`
  align-self: flex-end;
  background-color: ${theme.colors.teal};
  border-radius: ${theme.radius.full}px;
  width: ${theme.spacing.lg}px;
  height: ${theme.spacing.lg}px;
  justify-content: center;
  align-items: center;
`;

export default function PreviewRouteCarousel() {
  const {
    routes,
    weatherByRoute,
    activeRouteIndex,
    setActiveRouteIndex,
    reset,
  } = useRouteGeneration();

  const [visibleIndex, setVisibleIndex] = useState(0);
  const { width } = Dimensions.get("window");

  if (!routes.length) return null;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    if (newIndex !== visibleIndex) setVisibleIndex(newIndex);
  };

  const handleGoBack = () => {
    if (typeof reset === "function") reset();
  };

  const cardWidth = width - theme.spacing.lg * 2;

  return (
    <>
      <ButtonWrapper>
        <BackButton onPress={handleGoBack} accessibilityLabel="Go back">
          <Ionicons name="arrow-back" size={18} color={theme.colors.white} />
        </BackButton>
      </ButtonWrapper>

      <CarouselContainer onScroll={handleScroll} scrollEventThrottle={16}>
        {routes.map((route, index) => (
          <CardWrapper key={index} $width={width}>
            <PreviewRouteCard
              index={index}
              route={route}
              weather={weatherByRoute?.[index]?.weather}
              isActive={index === activeRouteIndex}
              onSelect={() => setActiveRouteIndex(index)}
              width={cardWidth}
            />
          </CardWrapper>
        ))}
      </CarouselContainer>

      <CarouselDots count={routes.length} activeIndex={visibleIndex} />
    </>
  );
}
