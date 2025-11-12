import { useRouter } from "expo-router";
import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import ProfileSettingsForm from "src/components/Settings/ProfileSettingsForm";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.md}px;
`;

const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-family: ${theme.typography.fontBold};
  font-size: ${theme.typography.lg}px;
  color: ${theme.colors.black};
`;

const BackButton = styled.TouchableOpacity`
  width: ${theme.spacing.xl}px;
  height: ${theme.spacing.xl}px;
  border-radius: ${theme.radius.full}px;
  background-color: ${theme.colors.teal};
  align-items: center;
  justify-content: center;
`;

const BackButtonLabel = styled.Text`
  color: ${theme.colors.white};
  font-family: ${theme.typography.fontSemiBold};
  font-size: ${theme.typography.md}px;
`;

export default function SettingsScreen() {
  const router = useRouter();

  const handleBack = () => {
    router.replace("/profile");
  };

  return (
    <Container>
      <HeaderRow>
        <Title>Profile Settings</Title>
        <BackButton onPress={handleBack}>
          <BackButtonLabel>←</BackButtonLabel>
        </BackButton>
      </HeaderRow>
      <ProfileSettingsForm />
    </Container>
  );
}
