"use client";

import styled from "styled-components";
import { useState } from "react";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import PreviewRouteCard from "../PreviewRouteCard/PreviewRouteCard";
import { CarouselDots } from "./CarouselDots";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import NameRouteModal from "../Modal/NameRouteModal";
import { useRouteActionsWithFeedback } from "@routly/lib/hooks/useRouteActionsWithFeedback";
import { useCarouselControls } from "@routly/lib/hooks/useCarouselControls";

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: ${theme.spacing.sm};
  position: relative;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CardTrack = styled.div<{ $offset: number }>`
  display: flex;
  transition: transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1);
  transform: translateX(${({ $offset }) => $offset}%);
  width: 100%;
`;

const ArrowButton = styled.button`
  background-color: ${theme.colors.teal};
  border: none;
  width: ${theme.spacing.lg};
  height: ${theme.spacing.lg};
  border-radius: ${theme.radius.full};
  color: ${theme.colors.white};
  font-size: ${theme.typography.sm};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 5;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: -${theme.spacing.sm};
`;

const RightArrow = styled(ArrowButton)`
  right: -${theme.spacing.sm};
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  margin-top: ${theme.spacing.md};
`;

const BackButton = styled.div`
  position: absolute;
  left: 0;
  margin-bottom: ${theme.spacing.md};
`;

const StatusText = styled.p<{ $type: "success" | "error" }>`
  color: ${({ $type }) =>
    $type === "success" ? theme.colors.green : theme.colors.red};
  font-size: ${theme.typography.sm};
  margin-top: ${theme.spacing.xs};
  text-align: center;
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
    useRouteActionsWithFeedback();

  const {
    visibleIndex,
    offset,
    handleNext,
    handlePrev,
    handleDotClick,
    handleMouseDown,
    handleMouseUp,
  } = useCarouselControls(routes);

  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const [selectedRoute, setSelectedRoute] =
    useState<GeoJSON.FeatureCollection | null>(null);

  if (!routes?.length) return null;

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
    <CarouselWrapper>
      {routes.length > 1 && (
        <LeftArrow onClick={handlePrev} disabled={visibleIndex === 0}>
          ‹
        </LeftArrow>
      )}
      <CardContainer onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
        <CardTrack $offset={offset}>
          {routes.map((route, i) => (
            <div
              key={i}
              style={{
                minWidth: "100%",
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PreviewRouteCard
                index={i}
                route={route}
                weather={weatherByRoute?.[i]?.weather}
                isActive={i === activeRouteIndex}
                onSelect={() => setActiveRouteIndex(i)}
                onSaveRequest={handleSaveRequest}
              />
            </div>
          ))}
        </CardTrack>
      </CardContainer>
      {routes.length > 1 && (
        <RightArrow
          onClick={handleNext}
          disabled={visibleIndex === routes.length - 1}
        >
          ›
        </RightArrow>
      )}
      <BottomBar>
        <BackButton>
          <Button label="Go Back" color="teal" onClick={() => reset?.()} />
        </BackButton>
        <CarouselDots
          count={routes.length}
          activeIndex={visibleIndex}
          onDotClick={handleDotClick}
        />
      </BottomBar>

      {statusMessage && (
        <StatusText $type={statusType ?? "success"}>{statusMessage}</StatusText>
      )}

      <NameRouteModal
        isOpen={activeModalIndex !== null}
        defaultValue={
          activeModalIndex !== null ? `Route ${activeModalIndex + 1}` : ""
        }
        loading={loading}
        onCancel={handleCancelModal}
        onConfirm={handleConfirmSave}
      />
    </CarouselWrapper>
  );
}
