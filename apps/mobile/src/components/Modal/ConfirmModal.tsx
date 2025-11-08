"use client";

import React from "react";
import styled from "styled-components/native";
import { Modal } from "react-native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { Button } from "../Button/Button";

type Props = {
  visible: boolean;
  title?: string;
  message?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const Overlay = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.45);
`;

const ModalBox = styled.View`
  width: 90%;
  max-width: 360px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.lg}px;
  padding: ${theme.spacing.lg}px;
`;

const Title = styled.Text`
  font-size: ${theme.typography.md}px;
  font-weight: 600;
  text-align: center;
  color: ${theme.colors.black};
  margin-bottom: ${theme.spacing.sm}px;
`;

const Message = styled.Text`
  font-size: ${theme.typography.sm}px;
  text-align: center;
  color: ${theme.colors.grayDark};
  margin-bottom: ${theme.spacing.md}px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: ${theme.spacing.sm}px;
`;

export default function ConfirmModal({
  visible,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  loading = false,
  onCancel,
  onConfirm,
}: Props) {
  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay>
        <ModalBox>
          <Title>{title}</Title>
          <Message>{message}</Message>

          <ButtonRow>
            <Button
              label="Cancel"
              color="grayDark"
              onPress={onCancel}
              disabled={loading}
            />
            <Button
              label={loading ? "Deleting..." : "Delete"}
              color="red"
              onPress={onConfirm}
              disabled={loading}
            />
          </ButtonRow>
        </ModalBox>
      </Overlay>
    </Modal>
  );
}
