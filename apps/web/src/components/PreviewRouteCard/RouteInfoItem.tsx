import styled, { css } from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

type Props = {
  label?: string;
  value: string | number;
  icon?: React.ReactNode;
  mode?: "default" | "compact";
};

const Item = styled.div<{ $compact?: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: ${theme.colors.grayDark};

  ${({ $compact }) =>
    $compact &&
    css`
      justify-content: flex-start;
      gap: ${theme.spacing.xs};
    `}

  ${theme.media.md} {
    font-size: ${theme.typography.sm};
  }
`;

const Left = styled.div<{ $compact?: boolean }>`
  display: flex;
  gap: ${theme.spacing.xxs};
  align-items: center;

  ${({ $compact }) =>
    $compact &&
    css`
      gap: ${theme.spacing.xxs};
    `}
`;

const Label = styled.span<{ $compact?: boolean }>`
  font-size: 0.875rem;
  font-weight: 500;

  ${({ $compact }) =>
    $compact &&
    css`
      display: none;
    `}

  ${theme.media.md} {
    font-size: ${theme.typography.sm};
  }
`;

const Value = styled.span`
  font-weight: 600;
  color: ${theme.colors.black};
`;

export default function RouteInfoItem({
  label,
  value,
  icon,
  mode = "default",
}: Props) {
  const compact = mode === "compact";

  return (
    <Item $compact={compact}>
      <Left $compact={compact}>
        {icon && <span>{icon}</span>}
        <Label $compact={compact}>{label}</Label>
      </Left>

      {!compact && <Value>{value}</Value>}

      {compact && <Value>{value}</Value>}
    </Item>
  );
}
