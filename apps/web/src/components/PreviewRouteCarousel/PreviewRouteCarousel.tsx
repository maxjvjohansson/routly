"use client";

import styled from "styled-components";
import { useState, useRef } from "react";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import PreviewRouteCard from "../PreviewRouteCard/PreviewRouteCard";
import { CarouselDots } from "./CarouselDots";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";

const CarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: ${theme.spacing.sm};
  position: relative;
`;

const BottomBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  margin-top: ${theme.spacing.md};
`;

const GoBackButton = styled.div`
  position: absolute;
  left: 0;
`;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 100%;
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
  font-weight: 600;
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

export default function PreviewRouteCarousel() {
  const {
    routes,
    weatherByRoute,
    activeRouteIndex,
    setActiveRouteIndex,
    reset,
  } = useRouteGeneration();

  const [visibleIndex, setVisibleIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  if (!routes?.length) return null;

  const handleNext = () => {
    if (visibleIndex < routes.length - 1) setVisibleIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (visibleIndex > 0) setVisibleIndex((prev) => prev - 1);
  };

  const handleDotClick = (i: number) => setVisibleIndex(i);

  const handleStartOver = () => {
    if (typeof reset === "function") reset();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const diff = e.clientX - startX.current;
    if (diff > 50) handlePrev();
    if (diff < -50) handleNext();
    isDragging.current = false;
  };

  const offset = -visibleIndex * 100;

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
        <GoBackButton>
          <Button label="Go Back" color="teal" onClick={handleStartOver} />
        </GoBackButton>

        <CarouselDots
          count={routes.length}
          activeIndex={visibleIndex}
          onDotClick={handleDotClick}
        />
      </BottomBar>
    </CarouselWrapper>
  );
}
