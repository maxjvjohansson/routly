import { router } from "expo-router";
import styled from "styled-components/native";
import { Button } from "../../components/Button/Button";
import { handleLogout } from "@routly/lib/supabase/auth";
import { nativeTheme as theme } from "@routly/ui/theme/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.grayLight};
  padding: ${theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.xl}px;
  font-weight: 700;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.lg}px;
`;

export default function ProfileScreen() {
  const handleSignOut = async () => {
    await handleLogout();
    router.replace("/");
  };

  return (
    <Container>
      <Title>Routly</Title>
      <Button label="Sign out" color="teal" fullWidth onPress={handleSignOut} />
    </Container>
  );
}
