"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import { InputField } from "../InputField/InputField";
import { MdOutlineCancel, MdOutlineSaveAlt } from "react-icons/md";

type Props = {
  isOpen: boolean;
  defaultValue?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: (name: string) => void;
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${theme.radius.lg};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  backdrop-filter: blur(1px);
`;

const ModalBox = styled.div`
  background: ${theme.colors.white};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  width: 90%;
  max-width: 380px;
`;

const Title = styled.h4`
  font-size: ${theme.typography.md};
  font-weight: 600;
  text-align: center;
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.black};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

export default function NameRouteModal({
  isOpen,
  defaultValue = "",
  loading = false,
  onCancel,
  onConfirm,
}: Props) {
  const [name, setName] = useState(defaultValue);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName(defaultValue);
      setError("");
    }
  }, [isOpen, defaultValue]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    onConfirm(name.trim());
  };

  return (
    <Overlay>
      <ModalBox>
        <Title>Name your route</Title>

        <InputField
          label="Route name"
          placeholder="e.g. Sunday ride, Morning jog..."
          value={name}
          onChange={(val) => setName(val)}
          error={error}
          fullWidth
          required
        />

        <ButtonRow>
          <Button
            label="Cancel"
            color="grayDark"
            onClick={onCancel}
            fullWidth
            iconRight={<MdOutlineCancel size={20} />}
          />
          <Button
            label={loading ? "Saving..." : "Save"}
            color="teal"
            onClick={handleConfirm}
            fullWidth
            disabled={loading}
            iconRight={<MdOutlineSaveAlt size={20} />}
          />
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
}
