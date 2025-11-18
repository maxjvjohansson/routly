"use client";

import Image from "next/image";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import splashMockup from "src/assets/images/routly_splash_screen.webp";
import generateMockup from "src/assets/images/routly_generate_screen.webp";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background: linear-gradient(
    180deg,
    ${theme.colors.tealLight}10 0%,
    ${theme.colors.white} 70%
  );
  padding: ${theme.spacing.xxl} ${theme.spacing.md};
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 1200px;
  width: 100%;
  gap: ${theme.spacing.xl};

  ${theme.media.md} {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    gap: ${theme.spacing.xxl};
  }
`;

const TextBlock = styled.div`
  max-width: 500px;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: ${theme.typography["2xl"]};
  font-weight: 700;
  color: ${theme.colors.black};
  line-height: 1.2;

  ${theme.media.md} {
    font-size: ${theme.typography["3xl"]};
  }
`;

const Subtitle = styled.p`
  margin-top: ${theme.spacing.sm};
  font-size: ${theme.typography.md};
  color: ${theme.colors.grayDark};
  line-height: 1.6;

  ${theme.media.md} {
    font-size: ${theme.typography.lg};
  }
`;

const CTAGroup = styled.div`
  margin-top: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;

  ${theme.media.md} {
    align-items: flex-start;
  }
`;

const MockupCluster = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: ${theme.spacing.sm};

  ${theme.media.md} {
    gap: ${theme.spacing.md};
  }
`;

const PhoneLeft = styled.div`
  transform: rotate(-10deg) translateX(6%);
  z-index: 1;
  ${theme.media.md} {
    transform: rotate(-12deg) translateX(12%);
  }
`;

const PhoneRight = styled.div`
  transform: rotate(8deg) translateX(-6%) translateY(8%);
  ${theme.media.md} {
    transform: rotate(10deg) translateX(-10%) translateY(5%);
  }
`;

const MockupImage = styled(Image)`
  width: 240px;
  height: auto;
`;

export default function Hero() {
  const router = useRouter();

  return (
    <Container>
      <Content>
        <TextBlock>
          <Title>Find your perfect running or cycling route, instantly.</Title>
          <Subtitle>
            Routly helps you generate personalized routes based on distance,
            terrain, weather and more.
          </Subtitle>

          <CTAGroup>
            <Button
              label="Generate a Route"
              color="orange"
              iconRight={<FiArrowRight size={20} />}
              onClick={() => router.push("/generate")}
            />
          </CTAGroup>
        </TextBlock>

        <MockupCluster>
          <PhoneLeft>
            <MockupImage
              src={splashMockup}
              alt="Routly splash screen"
              priority
            />
          </PhoneLeft>
          <PhoneRight>
            <MockupImage
              src={generateMockup}
              alt="Routly route generate screen"
              priority
            />
          </PhoneRight>
        </MockupCluster>
      </Content>
    </Container>
  );
}
