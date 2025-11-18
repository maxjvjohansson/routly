"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import Image from "next/image";

type AuthLayoutProps = {
  children: React.ReactNode;
  image: any;
  title?: string;
  subtitle?: string;
};

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    180deg,
    ${theme.colors.tealLight}10 0%,
    ${theme.colors.white} 70%
  );

  ${theme.media.md} {
    padding: ${theme.spacing.xl};
  }
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  border-radius: ${theme.radius.xl};
  overflow: hidden;
  background-color: ${theme.colors.white};
  box-shadow: 0 8px 8px rgba(0, 0, 0, 0.08);

  ${theme.media.md} {
    flex-direction: row;
  }
`;

const FormSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.md};

  ${theme.media.md} {
    padding: ${theme.spacing.xl};
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  max-width: 380px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${theme.typography["2xl"]};
  font-weight: 700;
  color: ${theme.colors.black};
`;

const Subtitle = styled.p`
  margin-top: ${theme.spacing.xs};
  font-size: ${theme.typography.md};
  color: ${theme.colors.grayDark};
`;

const ImageSide = styled.div`
  display: none;
  position: relative;
  flex: 1;
  min-height: 480px;

  ${theme.media.md} {
    display: block;
  }
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

export default function AuthLayout({
  children,
  image,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <Container>
      <Content>
        <FormSide>
          <FormWrapper>
            {(title || subtitle) && (
              <Header>
                {title && <Title>{title}</Title>}
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
              </Header>
            )}
            {children}
          </FormWrapper>
        </FormSide>

        <ImageSide>
          <StyledImage
            src={image}
            alt="Image of runner/cyclist"
            fill
            priority
            placeholder="blur"
            sizes="(max-width: 768px) 0px, 50vw"
          />
        </ImageSide>
      </Content>
    </Container>
  );
}
