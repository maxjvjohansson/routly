"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import Image from "next/image";
import cycleImage from "src/assets/images/routly_cycle_2_stock_photo.webp";
import runImage from "src/assets/images/routly_run_2_stock_photo.webp";
import { useEffect, useState } from "react";

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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
`;

const SubHeading = styled.h2`
  font-size: ${theme.typography["2xl"]};
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.sm};
`;

const Paragraph = styled.p`
  font-size: ${theme.typography.md};
  color: ${theme.colors.grayDark};
  line-height: 1.7;
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
`;

const HighlightItem = styled.li`
  background: ${theme.colors.grayLight};
  padding: ${theme.spacing.md};
  border-radius: ${theme.radius.lg};
  color: ${theme.colors.black};
  line-height: 1.6;
`;

const ImageWrapper = styled.div`
  flex: 1;
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  display: none;

  ${theme.media.md} {
    display: block;
  }
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

export default function AboutPage() {
  const [activeImage, setActiveImage] = useState<"cycle" | "run">("cycle");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev === "cycle" ? "run" : "cycle"));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Content>
        <Header>
          <Heading>About Routly</Heading>
          <Intro>
            Routly was built out of a love for movement and exploration. We
            wanted to make it easier to find the perfect route, not just the
            shortest one.
          </Intro>
        </Header>

        <Section>
          <TextBlock>
            <SubHeading>The idea behind Routly</SubHeading>
            <Paragraph>
              We’ve all been there, wanting to head out for a run or a ride, but
              spending more time scrolling maps than actually moving. Routly
              changes that. It helps you instantly generate routes based on
              distance, terrain, and even weather, so you can just go.
            </Paragraph>

            <HighlightList>
              <HighlightItem>
                Smart route generation for running and cycling
              </HighlightItem>
              <HighlightItem>
                Optimized for distance, terrain, and wind
              </HighlightItem>
              <HighlightItem>
                Round-trip or destination-based routes
              </HighlightItem>
              <HighlightItem>Works on both mobile and web</HighlightItem>
            </HighlightList>
          </TextBlock>

          <ImageWrapper>
            <FadingImage
              src={cycleImage}
              alt="Cyclist exploring a new route"
              fill
              priority
              placeholder="blur"
              $visible={activeImage === "cycle"}
              sizes="(min-width: 768px) 50vw, 0vw"
            />
            <FadingImage
              src={runImage}
              alt="Runner exploring a new route"
              fill
              priority
              placeholder="blur"
              $visible={activeImage === "run"}
              sizes="(min-width: 768px) 50vw, 0vw"
            />
          </ImageWrapper>
        </Section>

        <Section>
          <TextBlock>
            <SubHeading>Our mission</SubHeading>
            <Paragraph>
              Our goal is simple, to make discovering new routes effortless and
              exciting. Whether you’re training for a marathon, cycling to
              explore new paths, or just want a scenic jog after work, Routly
              helps you find your way.
            </Paragraph>
          </TextBlock>
        </Section>
      </Content>
    </Container>
  );
}
