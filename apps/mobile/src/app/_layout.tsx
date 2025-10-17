import { Stack } from "expo-router";
import { ThemeProvider } from "styled-components/native";
import { theme } from "@routly/ui/theme";

export default function RootLayout() {
  return (
    <ThemeProvider theme={theme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </ThemeProvider>
  );
}
