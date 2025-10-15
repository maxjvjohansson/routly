import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { router } from "expo-router";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { useAuthActions } from "@routly/lib/hooks/useAuthActions";
import AuthForm from "../components/AuthForm/AuthForm";

const Container = styled(SafeAreaView)`
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.grayLight};
  padding: ${theme.spacing.md}px;
`;

const Hero = styled.View`
  align-items: center;
  margin-bottom: ${theme.spacing.md}px;
`;

const Logo = styled.View`
  width: 64px;
  height: 64px;
  background-color: ${theme.colors.teal};
  border-radius: ${theme.radius.lg}px;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: ${theme.typography.xl}px;
  font-weight: 700;
  color: ${theme.colors.black};
  margin-top: ${theme.spacing.sm}px;
`;

const Subtitle = styled.Text`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.grayDark};
  text-align: center;
  margin-top: ${theme.spacing.xs}px;
`;

export default function IndexScreen() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const { login, signup, loading, error } = useAuthActions();

  const handleSubmit = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    if (mode === "login") {
      await login(email, password);
    } else {
      await signup(email, password, fullName);
    }
    router.replace("/(tabs)");
  };

  return (
    <Container>
      <Hero>
        <Logo />
        <Title>Routly</Title>
        <Subtitle>Discover new running and cycling routes instantly</Subtitle>
      </Hero>

      <AuthForm
        mode={mode}
        onSubmit={handleSubmit}
        loading={loading}
        error={error || undefined}
        onSwitchMode={() => setMode(mode === "login" ? "signup" : "login")}
      />
    </Container>
  );
}
