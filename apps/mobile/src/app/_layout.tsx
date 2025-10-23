import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { nativeTheme } from "@routly/ui/theme/native";
import { AuthProvider } from "@routly/lib/context/AuthContext";

export default function RootLayout() {
  return (
    <ThemeProvider theme={nativeTheme as any}>
      <AuthProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}
