"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import { MdDelete } from "react-icons/md";

type Props = {
  isOpen: boolean;
  title?: string;
  message?: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
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
  text-align: center;
`;

const Title = styled.h4`
  font-size: ${theme.typography.md};
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
`;

const Message = styled.p`
  font-size: ${theme.typography.sm};
  color: ${theme.colors.grayDark};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

export default function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  loading = false,
  onCancel,
  onConfirm,
}: Props) {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalBox>
        <Title>{title}</Title>
        <Message>{message}</Message>

        <ButtonRow>
          <Button
            label="Cancel"
            color="grayDark"
            onClick={onCancel}
            fullWidth
          />
          <Button
            label={loading ? "Deleting..." : "Delete"}
            color="red"
            onClick={onConfirm}
            disabled={loading}
            fullWidth
            iconRight={<MdDelete size={20} />}
          />
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
}
