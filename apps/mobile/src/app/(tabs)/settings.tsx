import { useRouter } from "expo-router";
import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import ProfileSettingsForm from "src/components/Settings/ProfileSettingsForm";
import { Button } from "src/components/Button/Button";
import Ionicons from "@expo/vector-icons/Ionicons";

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

export default function SettingsScreen() {
  const router = useRouter();

  const handleGoBack = () => {
    router.replace("/profile");
  };

  return (
    <Container>
      <HeaderRow>
        <Title>Profile Settings</Title>
        <Button
          label="Go Back"
          color="teal"
          onPress={handleGoBack}
          iconLeft={
            <Ionicons name="arrow-back" size={18} color={theme.colors.white} />
          }
        />
      </HeaderRow>
      <ProfileSettingsForm />
    </Container>
  );
}
