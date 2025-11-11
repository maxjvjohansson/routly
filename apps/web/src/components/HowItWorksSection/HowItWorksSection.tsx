"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  background: ${theme.colors.white};
  padding: ${theme.spacing.xxl} ${theme.spacing.md};
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

const IconPlaceholder = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.radius.full};
  background-color: ${theme.colors.tealLight};
  margin-bottom: ${theme.spacing.md};
  font-weight: 600;
  color: ${theme.colors.teal};
  font-size: ${theme.typography.lg};
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
      icon: "1",
      title: "Select activity & distance",
      text: "Choose whether you want to run or cycle, and how far you’d like to go.",
    },
    {
      icon: "2",
      title: "Set your start or use your location",
      text: "Set your start point, add an endpoint or let Routly create a round trip.",
    },
    {
      icon: "3",
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
              <IconPlaceholder>{step.icon}</IconPlaceholder>
              <StepTitle>{step.title}</StepTitle>
              <StepText>{step.text}</StepText>
            </Step>
          ))}
        </Steps>
      </Content>
    </Container>
  );
}
