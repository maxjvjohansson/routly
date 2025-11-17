import styled, { css } from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import React from "react";

type Props = {
  label?: string;
  value: string | number;
  icon?: React.ReactNode;
  mode?: "default" | "compact";
};

const Item = styled.View<{ $compact?: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${({ $compact }: { $compact: any }) =>
    $compact &&
    css`
      justify-content: flex-start;
      gap: ${theme.spacing.xxs}px;
    `}
`;

const Left = styled.View<{ $compact?: boolean }>`
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing.xxs}px;

  ${({ $compact }: { $compact: any }) =>
    $compact &&
    css`
      gap: ${theme.spacing.xxs}px;
    `}
`;

const Label = styled.Text<{ $compact?: boolean }>`
  font-family: ${theme.typography.fontMedium};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.grayDark};

  ${({ $compact }: { $compact: any }) =>
    $compact &&
    css`
      display: none;
    `}
`;

const Value = styled.Text`
  font-family: ${theme.typography.fontSemiBold};
  font-size: ${theme.typography.sm}px;
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
        {icon && <>{icon}</>}
        <Label $compact={compact}>{label}</Label>
      </Left>

      <Value>{value}</Value>
    </Item>
  );
}
