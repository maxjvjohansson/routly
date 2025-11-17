import { useState } from "react";
import { Modal, Pressable } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";

const Overlay = styled.Pressable`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.25);
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.md}px;
`;

const Container = styled.View`
  width: 100%;
  align-items: center;
`;

const TooltipBubble = styled.View`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.md}px;
  border-radius: ${theme.radius.lg}px;
  border: 1px solid ${theme.colors.grayDark};
  max-width: 90%;
`;

const TooltipText = styled.Text`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.black};
  font-family: ${theme.typography.fontRegular};
`;

export default function InfoTooltip({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Pressable onPress={() => setVisible(true)}>
        <Feather name="info" size={20} color={theme.colors.black} />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Overlay onPress={() => setVisible(false)}>
          <Container>
            <TooltipBubble>
              <TooltipText>{text}</TooltipText>
            </TooltipBubble>
          </Container>
        </Overlay>
      </Modal>
    </>
  );
}
