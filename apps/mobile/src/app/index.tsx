import { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { router } from "expo-router";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { useAuth } from "@routly/lib/context/AuthContext";
import { useAuthActions } from "@routly/lib/hooks/useAuthActions";
import AuthForm from "../components/AuthForm/AuthForm";
import RoutlySplashScreen from "src/components/SplashScreen/SplashScreen";

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
  const { supabase } = useAuth();

  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const MIN_SPLASH_TIME = 1000;

  useEffect(() => {
    const start = Date.now();
    const checkSession = async () => {
      if (!supabase) return;

      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      const elapsed = Date.now() - start;

      const wait = Math.max(0, MIN_SPLASH_TIME - elapsed);
      setTimeout(() => {
        if (user) {
          router.replace("/generate");
        }
        fadeOutSplash();
      }, wait);
    };

    checkSession();
  }, [supabase]);

  const fadeOutSplash = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 600,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => setShowSplash(false));
  };

  if (showSplash || !supabase) {
    return (
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          backgroundColor: theme.colors.grayLight,
        }}
      >
        <RoutlySplashScreen />
      </Animated.View>
    );
  }

  const handleSubmit = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    let user = null;
    if (mode === "login") user = await login(email, password);
    else user = await signup(email, password, fullName);
    if (user) router.replace("/generate");
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
