"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import Image from "next/image";
import cycleImage from "src/assets/images/routly_cycle_2_stock_photo.jpg";
import runImage from "src/assets/images/routly_run_2_stock_photo.jpg";

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${theme.spacing.xxl} ${theme.spacing.md};
  background: ${theme.colors.white};
`;

const Content = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxl};
  text-align: center;
`;

const Heading = styled.h1`
  font-size: ${theme.typography["2xl"]};
  font-weight: 700;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.sm};

  ${theme.media.md} {
    font-size: ${theme.typography["3xl"]};
  }
`;

const Intro = styled.p`
  font-size: ${theme.typography.lg};
  color: ${theme.colors.grayDark};
  line-height: 1.7;
  max-width: 700px;
  margin: 0 auto;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};

  ${theme.media.md} {
    flex-direction: row;
    align-items: center;
    gap: ${theme.spacing.xxl};
  }
`;

const TextBlock = styled.div`
  flex: 1;
  text-align: left;

  h2 {
    font-size: ${theme.typography["2xl"]};
    font-weight: 600;
    margin-bottom: ${theme.spacing.sm};
  }

  p {
    font-size: ${theme.typography.md};
    color: ${theme.colors.grayDark};
    line-height: 1.7;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
`;

const FadingImage = styled(Image)<{ $visible: boolean }>`
  object-fit: cover;
  transition: opacity 1.6s ease-in-out;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

const HighlightList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  list-style: none;

  ${theme.media.md} {
    grid-template-columns: 1fr 1fr;
  }

  li {
    background: ${theme.colors.grayLight};
    padding: ${theme.spacing.md};
    border-radius: ${theme.radius.lg};
    color: ${theme.colors.black};
    line-height: 1.6;
  }
`;

export default function AboutPage() {
  const [activeImage, setActiveImage] = useState<"cycle" | "run">("cycle");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === "cycle" ? "run" : "cycle"));
    }, 7000);
    return () => clearInterval(interval);
  }, [isDesktop]);

  return (
    <Container>
      <Content>
        <header>
          <Heading>About Routly</Heading>
          <Intro>
            Routly was built out of a love for movement and exploration. We
            wanted to make it easier to find the perfect route, not just the
            shortest one.
          </Intro>
        </header>

        <Section>
          <TextBlock>
            <h2>The idea behind Routly</h2>
            <p>
              We’ve all been there, wanting to head out for a run or a ride, but
              spending more time scrolling maps than actually moving. Routly
              changes that. It helps you instantly generate routes based on
              distance, terrain, and even weather, so you can just go.
            </p>

            <HighlightList>
              <li>Smart route generation for running and cycling</li>
              <li>Optimized for distance, terrain, and wind</li>
              <li>Round-trip or destination-based routes</li>
              <li>Works on both mobile and web</li>
            </HighlightList>
          </TextBlock>

          {isDesktop && (
            <ImageWrapper>
              <FadingImage
                src={cycleImage}
                alt="Cyclist exploring a new route"
                fill
                priority
                $visible={activeImage === "cycle"}
              />
              <FadingImage
                src={runImage}
                alt="Runner exploring a new route"
                fill
                priority
                $visible={activeImage === "run"}
              />
            </ImageWrapper>
          )}
        </Section>

        <Section>
          <TextBlock>
            <h2>Our mission</h2>
            <p>
              Our goal is simple, to make discovering new routes effortless and
              exciting. Whether you’re training for a marathon, cycling to
              explore new paths, or just want a scenic jog after work, Routly
              helps you find your way.
            </p>
          </TextBlock>
        </Section>
      </Content>
    </Container>
  );
}
