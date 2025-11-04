"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Modal } from "react-native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import { Button } from "../Button/Button";
import { InputField } from "../InputField/InputField";

type Props = {
  visible: boolean;
  defaultValue?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: (name: string) => void;
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
  margin-bottom: ${theme.spacing.md}px;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: ${theme.spacing.xxs};
`;

export default function NameRouteModal({
  visible,
  defaultValue = "",
  loading = false,
  onCancel,
  onConfirm,
}: Props) {
  const [name, setName] = useState(defaultValue);
  const [error, setError] = useState("");

  useEffect(() => {
    if (visible) {
      setName(defaultValue);
      setError("");
    }
  }, [visible, defaultValue]);

  const handleConfirm = () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    onConfirm(name.trim());
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay>
        <ModalBox>
          <Title>Name your route</Title>

          <InputField
            label="Route name"
            placeholder="e.g. Morning run"
            value={name}
            onChange={setName}
            error={error}
            fullWidth
          />

          <ButtonWrapper>
            <Button label="Cancel" color="grayDark" onPress={onCancel} />
            <Button
              label={loading ? "Saving..." : "Save"}
              color="teal"
              onPress={handleConfirm}
              disabled={loading}
            />
          </ButtonWrapper>
        </ModalBox>
      </Overlay>
    </Modal>
  );
}
