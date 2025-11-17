import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { FiInfo } from "react-icons/fi";
import { useState } from "react";

const Wrapper = styled.span`
  display: inline-flex;
  align-items: center;
  position: relative;
`;

const IconButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  line-height: 0;
  display: flex;
  align-items: center;

  &:focus-visible {
    outline: 2px solid ${theme.colors.teal};
    border-radius: ${theme.radius.full};
  }

  svg {
    color: ${theme.colors.black};
  }

  &:hover svg {
    color: ${theme.colors.orange};
  }
`;

const Tooltip = styled.div`
  position: fixed;
  width: 280px;
  max-width: calc(100vw - 32px);
  background: ${theme.colors.white};
  color: ${theme.colors.black};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border: 1px solid ${theme.colors.grayDark};
  border-radius: ${theme.radius.md};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: ${theme.typography.sm};
  font-weight: 400;
  white-space: normal;
  z-index: 1000;

  ${theme.media.md} {
    width: 400px;
  }
`;

export default function InfoTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const handleShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    // Calculate tooltip width
    const tooltipWidth = window.innerWidth >= 768 ? 400 : 280;
    const maxWidth: number = Math.min(tooltipWidth, window.innerWidth - 32);

    // Center under button but keep within viewport
    let left: number = rect.left + rect.width / 2 - maxWidth / 2;
    if (left < 16) {
      left = 16;
    }
    if (left + maxWidth > window.innerWidth - 16) {
      left = window.innerWidth - maxWidth - 16;
    }

    setPosition({
      top: rect.bottom + 8,
      left: left,
    });
    setShow(true);
  };

  return (
    <Wrapper>
      <IconButton
        type="button"
        aria-label={text}
        onMouseEnter={handleShow}
        onMouseLeave={() => setShow(false)}
        onFocus={() => handleShow}
        onBlur={() => setShow(false)}
      >
        <FiInfo size={18} />
      </IconButton>

      {show && (
        <Tooltip
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
        >
          {text}
        </Tooltip>
      )}
    </Wrapper>
  );
}
