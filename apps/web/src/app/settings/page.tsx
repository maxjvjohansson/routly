"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import ProfileSettingsForm from "src/components/Settings/ProfileSettingsForm";
import { useRouter } from "next/navigation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: ${theme.typography.xl};
  font-weight: 700;
  color: ${theme.colors.black};
`;

const BackButton = styled.button`
  background: ${theme.colors.teal};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.radius.full};
  width: ${theme.spacing.xl};
  height: ${theme.spacing.xl};
  font-size: ${theme.typography.sm};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export default function SettingsPage() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <Container>
      <HeaderRow>
        <Title>Profile Settings</Title>
        <BackButton onClick={handleBack}>←</BackButton>
      </HeaderRow>
      <ProfileSettingsForm />
    </Container>
  );
}
