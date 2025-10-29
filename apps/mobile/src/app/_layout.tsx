import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { nativeTheme } from "@routly/ui/theme/native";
import { AuthProvider } from "@routly/lib/context/AuthContext";
import { RouteGenerationProvider } from "@routly/lib/context/RouteGenerationContext";

export default function RootLayout() {
  return (
    <ThemeProvider theme={nativeTheme as any}>
      <AuthProvider>
        <RouteGenerationProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </RouteGenerationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
