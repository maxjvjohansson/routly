import { useRef, useState } from "react";
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";

export function useCarouselControls<T>(items: T[]) {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const isSwiping = useRef(false);
  const startX = useRef(0);

  const handleTouchStart = (e: any) => {
    isSwiping.current = true;
    startX.current = e.nativeEvent.pageX;
  };

  const handleTouchEnd = (e: any) => {
    if (!isSwiping.current) return;
    const diff = e.nativeEvent.pageX - startX.current;
    if (diff > 50) handlePrev();
    if (diff < -50) handleNext();
    isSwiping.current = false;
  };

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    width: number
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    if (newIndex !== visibleIndex) setVisibleIndex(newIndex);
  };

  const handleNext = () => {
    if (visibleIndex < items.length - 1) setVisibleIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (visibleIndex > 0) setVisibleIndex((prev) => prev - 1);
  };

  return {
    visibleIndex,
    handleScroll,
    handleTouchStart,
    handleTouchEnd,
    handleNext,
    handlePrev,
  };
}
