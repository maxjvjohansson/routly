"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import cycleImage from "src/assets/images/routly_cycle_stock_photo.jpg";
import runImage from "src/assets/images/routly_run_stock_photo.jpg";

const Container = styled.section`
  width: 100%;
  height: 600px;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${theme.spacing.xxl} 0;
`;

const ImageWrapper = styled.div`
  position: absolute;
  inset: 0;
`;

const FadingImage = styled(Image)<{ $visible: boolean }>`
  object-fit: cover;
  transition: opacity 1.6s ease-in-out;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  filter: brightness(0.6);
`;

const TextOverlay = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: ${theme.colors.white};
  padding: 0 ${theme.spacing.md};
  max-width: 600px;
`;

const Quote = styled.h2`
  font-size: ${theme.typography["2xl"]};
  font-weight: 700;
  line-height: 1.2;

  ${theme.media.md} {
    font-size: ${theme.typography["3xl"]};
  }
`;

const Subtext = styled.p`
  margin-top: ${theme.spacing.sm};
  font-size: ${theme.typography.md};
  color: ${theme.colors.white};
  ${theme.media.md} {
    font-size: ${theme.typography.lg};
  }
`;

export default function LifestyleSection() {
  const [activeImage, setActiveImage] = useState<"cycle" | "run">("cycle");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === "cycle" ? "run" : "cycle"));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <ImageWrapper>
        <FadingImage
          src={cycleImage}
          alt="Cyclist exploring a scenic route"
          fill
          priority
          $visible={activeImage === "cycle"}
        />
        <FadingImage
          src={runImage}
          alt="Runner exploring a new path"
          fill
          priority
          $visible={activeImage === "run"}
        />
      </ImageWrapper>

      <TextOverlay>
        <Quote>Explore your surroundings with every stride.</Quote>
        <Subtext>
          Routly helps you turn any run or ride into an adventure, wherever you
          are.
        </Subtext>
      </TextOverlay>
    </Container>
  );
}
