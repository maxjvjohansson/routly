"use client";

import styled from "styled-components/native";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { useCarouselControls } from "@routly/lib/hooks/useCarouselControls.native";
import { useSaveRouteWithFeedback } from "@routly/lib/hooks/useSaveRouteWithFeedback";
import PreviewRouteCard from "../PreviewRouteCard/PreviewRouteCard";
import { CarouselDots } from "./CarouselDots";
import NameRouteModal from "../Modal/NameRouteModal";

const Wrapper = styled(View)`
  flex: 1;
  background-color: ${theme.colors.white};
`;

const BackButtonWrapper = styled.View`
  padding: 0 ${theme.spacing.lg}px;
  margin-bottom: ${theme.spacing.sm}px;
  align-items: flex-end;
`;

const BackButton = styled.TouchableOpacity`
  background-color: ${theme.colors.teal};
  border-radius: ${theme.radius.full}px;
  width: ${theme.spacing.lg}px;
  height: ${theme.spacing.lg}px;
  justify-content: center;
  align-items: center;
`;

const CarouselScroll = styled(ScrollView).attrs({
  horizontal: true,
  pagingEnabled: true,
  showsHorizontalScrollIndicator: false,
})`
  width: 100%;
`;

const CardWrapper = styled(View)<{ $width: number }>`
  width: ${({ $width }: { $width: any }) => $width}px;
  justify-content: center;
  align-items: center;
`;

const BottomBar = styled(View)`
  justify-content: center;
  align-items: center;
  margin-top: ${theme.spacing.md}px;
`;

const StatusText = styled.Text<{ $type: "success" | "error" }>`
  color: ${({ $type }: { $type: any }) =>
    $type === "success" ? theme.colors.green : theme.colors.red};
  font-size: ${theme.typography.sm}px;
  font-weight: 600;
  text-align: center;
  margin-bottom: ${theme.spacing.sm}px;
`;

export default function PreviewRouteCarousel() {
  const {
    routes,
    weatherByRoute,
    activeRouteIndex,
    setActiveRouteIndex,
    reset,
    activity,
    isRoundTrip,
    startPoint,
    endPoint,
  } = useRouteGeneration();

  const { handleSaveRoute, loading, statusMessage, statusType } =
    useSaveRouteWithFeedback();

  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [selectedRoute, setSelectedRoute] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const { width } = Dimensions.get("window");
  const cardWidth = width - theme.spacing.lg * 2;
  const { visibleIndex, handleScroll } = useCarouselControls(routes);

  if (!routes.length) return null;

  const handleGoBack = () => {
    if (typeof reset === "function") reset();
  };

  const handleSaveRequest = (
    index: number,
    route: GeoJSON.FeatureCollection
  ) => {
    setActiveModalIndex(index);
    setSelectedRoute(route);
  };

  const handleCancelModal = () => {
    setActiveModalIndex(null);
    setSelectedRoute(null);
  };

  const handleConfirmSave = async (name: string) => {
    if (!selectedRoute) return;

    const normalizedActivity =
      activity === "run"
        ? "running"
        : activity === "cycle"
          ? "cycling"
          : activity;

    await handleSaveRoute({
      name,
      activity: normalizedActivity,
      isRoundTrip,
      routeData: selectedRoute,
      startName: startPoint ? "Start point" : null,
      endName: endPoint ? "End point" : null,
    });

    setActiveModalIndex(null);
    setSelectedRoute(null);
  };

  return (
    <Wrapper>
      <BackButtonWrapper>
        <BackButton onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={18} color={theme.colors.white} />
        </BackButton>
      </BackButtonWrapper>

      <CarouselScroll
        onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) =>
          handleScroll(e, width)
        }
        scrollEventThrottle={16}
      >
        {routes.map((route, index) => (
          <CardWrapper key={index} $width={width}>
            <PreviewRouteCard
              index={index}
              route={route}
              weather={weatherByRoute?.[index]?.weather}
              isActive={index === activeRouteIndex}
              onSelect={() => setActiveRouteIndex(index)}
              onSaveRequest={handleSaveRequest}
              width={cardWidth}
            />
          </CardWrapper>
        ))}
      </CarouselScroll>

      <BottomBar>
        <CarouselDots count={routes.length} activeIndex={visibleIndex} />
      </BottomBar>

      {statusMessage && (
        <StatusText $type={statusType ?? "success"}>{statusMessage}</StatusText>
      )}

      <NameRouteModal
        visible={activeModalIndex !== null}
        defaultValue={
          activeModalIndex !== null ? `Route ${activeModalIndex + 1}` : ""
        }
        loading={loading}
        onCancel={handleCancelModal}
        onConfirm={handleConfirmSave}
      />
    </Wrapper>
  );
}
