"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import ProfileSettingsForm from "src/components/Settings/ProfileSettingsForm";
import { useRouter } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { Button } from "src/components/Button/Button";

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

export default function SettingsPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Container>
      <HeaderRow>
        <Title>Profile Settings</Title>
        <Button
          label="Go Back"
          color="teal"
          onClick={handleGoBack}
          iconLeft={<FiArrowLeft size={20} />}
        />
      </HeaderRow>
      <ProfileSettingsForm />
    </Container>
  );
}
