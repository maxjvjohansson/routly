import { useState } from "react";
import { Tabs } from "expo-router";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import MenuModal from "src/components/Modal/MenuModal";
import { useAuth } from "@routly/lib/context/AuthContext";
import { getUserInitial } from "@routly/lib/utils/user";
import routlyLogo from "../../../assets/routly_logo_vector_teal.png";

const HeaderLogoWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderLogoImage = styled.Image`
  width: ${theme.spacing.md}px;
  height: ${theme.spacing.md}px;
  margin-right: ${theme.spacing.xxs}px;
`;

const LogoText = styled.Text`
  font-family: ${theme.typography.fontBold};
  font-size: ${theme.typography.xl}px;
  color: ${theme.colors.teal};
`;

const Avatar = styled.TouchableOpacity`
  width: ${theme.spacing.xl}px;
  height: ${theme.spacing.xl}px;
  border-radius: ${theme.radius.full}px;
  background-color: ${theme.colors.teal};
  align-items: center;
  justify-content: center;
  margin-right: ${theme.spacing.md}px;
`;

const AvatarText = styled.Text`
  font-family: ${theme.typography.fontSemiBold};
  color: ${theme.colors.white};
  font-size: ${theme.typography.sm}px;
`;

export default function TabsLayout() {
  const [menuVisible, setMenuVisible] = useState(false);
  const { user } = useAuth();
  const userInitial = getUserInitial(user);

  return (
    <>
      <Tabs
        screenOptions={{
          headerTitle: () => (
            <HeaderLogoWrapper>
              <HeaderLogoImage source={routlyLogo} />
              <LogoText>Routly</LogoText>
            </HeaderLogoWrapper>
          ),
          headerTitleAlign: "left",
          headerRight: () => (
            <Avatar onPress={() => setMenuVisible(true)}>
              {userInitial ? <AvatarText>{userInitial}</AvatarText> : null}
            </Avatar>
          ),
          headerStyle: {
            height: 128,
            backgroundColor: theme.colors.white,
          },
          headerShadowVisible: true,

          tabBarActiveTintColor: theme.colors.teal,
          tabBarInactiveTintColor: theme.colors.grayDark,
          tabBarStyle: {
            backgroundColor: theme.colors.white,
            borderTopWidth: 0.5,
            borderTopColor: theme.colors.gray,
          },
          tabBarLabelStyle: {
            fontFamily: theme.typography.fontMedium,
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
        <Tabs.Screen
          name="settings"
          options={{
            href: null,
          }}
        />
      </Tabs>

      <MenuModal visible={menuVisible} onClose={() => setMenuVisible(false)} />
    </>
  );
}
