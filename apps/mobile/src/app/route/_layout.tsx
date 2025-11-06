import { Stack } from "expo-router";
import { nativeTheme as theme } from "@routly/ui/theme/native";

export default function RouteLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="[id]"
        options={{
          title: "Route Details",
          headerTintColor: theme.colors.teal,
          headerStyle: { backgroundColor: theme.colors.white },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
