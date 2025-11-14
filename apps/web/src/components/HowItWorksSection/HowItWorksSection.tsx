"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { FiSliders, FiMapPin } from "react-icons/fi";
import { TbWand } from "react-icons/tb";

const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${theme.colors.white};
  padding: 0 ${theme.spacing.md};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 1200px;
  width: 100%;
  gap: ${theme.spacing.xxl};
`;

const Heading = styled.h2`
  font-size: ${theme.typography["2xl"]};
  font-weight: 700;
  color: ${theme.colors.black};
  ${theme.media.md} {
    font-size: ${theme.typography["3xl"]};
  }
`;

const Steps = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.xxl};
  width: 100%;
  margin-top: ${theme.spacing.lg};

  ${theme.media.md} {
    grid-template-columns: repeat(3, 1fr);
    gap: ${theme.spacing.xl};
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${theme.spacing.lg};
  border: 1px solid ${theme.colors.gray};
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.white};
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
  }
`;

const IconBox = styled.div`
  width: ${theme.spacing.xxl};
  height: ${theme.spacing.xxl};
  border-radius: ${theme.radius.xl};
  background: ${theme.colors.teal};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${theme.spacing.md};

  svg {
    color: ${theme.colors.white};
    width: ${theme.spacing.lg};
    height: ${theme.spacing.lg};
  }
`;

const StepTitle = styled.h3`
  font-size: ${theme.typography.lg};
  font-weight: 600;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.xs};
`;

const StepText = styled.p`
  font-size: ${theme.typography.md};
  color: ${theme.colors.grayDark};
  line-height: 1.6;
  max-width: 300px;
`;

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <FiSliders />,
      title: "Select activity & distance",
      text: "Choose whether you want to run or cycle, and how far you’d like to go.",
    },
    {
      icon: <FiMapPin />,
      title: "Set your start or use your location",
      text: "Set your start point, add an endpoint or let Routly create a round trip.",
    },
    {
      icon: <TbWand />,
      title: "Routly generates your route",
      text: "Get a personalized route optimized for distance, terrain and weather.",
    },
  ];

  return (
    <Container>
      <Content>
        <Heading>How it works</Heading>
        <Steps>
          {steps.map((step, index) => (
            <Step key={index}>
              <IconBox>{step.icon}</IconBox>
              <StepTitle>{step.title}</StepTitle>
              <StepText>{step.text}</StepText>
            </Step>
          ))}
        </Steps>
      </Content>
    </Container>
  );
}
