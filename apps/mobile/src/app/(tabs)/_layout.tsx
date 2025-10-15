import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { nativeTheme as theme } from "@routly/ui/theme/native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.teal,
        tabBarInactiveTintColor: theme.colors.grayDark,
        tabBarStyle: {
          backgroundColor: theme.colors.white,
          borderTopWidth: 0.5,
          borderTopColor: theme.colors.gray,
        },
      }}
    >
      <Tabs.Screen
        name="generate"
        options={{
          title: "Generate",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="compass-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
