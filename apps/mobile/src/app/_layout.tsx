import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { nativeTheme } from "@routly/ui/theme/native";

export default function RootLayout() {
  return (
    <ThemeProvider theme={nativeTheme as any}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}
