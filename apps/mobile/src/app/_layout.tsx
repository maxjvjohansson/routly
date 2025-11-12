import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { nativeTheme } from "@routly/ui/theme/native";
import { AuthProvider } from "@routly/lib/context/AuthContext";
import { RouteGenerationProvider } from "@routly/lib/context/RouteGenerationContext";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from "@expo-google-fonts/outfit";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider theme={nativeTheme}>
      <AuthProvider>
        <RouteGenerationProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </RouteGenerationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
