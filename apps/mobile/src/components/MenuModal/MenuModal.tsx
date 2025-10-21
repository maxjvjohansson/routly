import React, { useEffect, useRef } from "react";
import { Modal, Animated, Dimensions } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { handleLogout } from "@routly/lib/supabase/auth";
import { nativeTheme as theme } from "@routly/ui/theme/native";

type MenuModalProps = {
  visible: boolean;
  onClose: () => void;
};

const { width } = Dimensions.get("window");

const Overlay = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.35);
`;

const MenuContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  right: 0;
  width: 75%;
  height: 100%;
  background-color: ${theme.colors.white};
  padding: 0 ${theme.spacing.md}px;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
`;

const MenuButton = styled.TouchableOpacity`
  padding: ${theme.spacing.sm}px ${theme.spacing.lg}px;
  border-bottom-width: 2px;
  border-bottom-color: ${theme.colors.grayLight};
`;

const MenuText = styled.Text`
  font-size: ${theme.typography.sm}px;
  font-weight: 500;
  color: ${theme.colors.black};
`;

const LogoutText = styled(MenuText)`
  color: ${theme.colors.red};
`;

export default function MenuModal({ visible, onClose }: MenuModalProps) {
  const router = useRouter();
  const slideAnim = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 0 : width,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const goTo = (path: string) => {
    onClose();
    router.push(path);
  };

  const logout = async () => {
    await handleLogout();
    router.replace("/index");
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <Overlay activeOpacity={1} onPress={onClose} />
      <MenuContainer style={{ transform: [{ translateX: slideAnim }] }}>
        <MenuButton onPress={() => goTo("/generate")}>
          <MenuText>Generate</MenuText>
        </MenuButton>
        <MenuButton onPress={() => goTo("/explore")}>
          <MenuText>Explore</MenuText>
        </MenuButton>
        <MenuButton onPress={() => goTo("/profile")}>
          <MenuText>Profile</MenuText>
        </MenuButton>
        <MenuButton onPress={() => goTo("/settings")}>
          <MenuText>Profile Settings</MenuText>
        </MenuButton>
        <MenuButton onPress={logout}>
          <LogoutText>Logout</LogoutText>
        </MenuButton>
      </MenuContainer>
    </Modal>
  );
}
