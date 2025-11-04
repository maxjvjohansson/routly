import { useRef, useState } from "react";

export function useCarouselControls<T>(items: T[]) {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const handleNext = () => {
    if (visibleIndex < items.length - 1) setVisibleIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (visibleIndex > 0) setVisibleIndex((prev) => prev - 1);
  };

  const handleDotClick = (index: number) => setVisibleIndex(index);

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

  return {
    visibleIndex,
    offset,
    handleNext,
    handlePrev,
    handleDotClick,
    handleMouseDown,
    handleMouseUp,
  };
}
