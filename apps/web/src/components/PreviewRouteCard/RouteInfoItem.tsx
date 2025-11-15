import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: ${theme.colors.grayDark};

  ${theme.media.md} {
    font-size: ${theme.typography.sm};
  }
`;

const Left = styled.div`
  display: flex;
  gap: ${theme.spacing.xxs};
`;

const Label = styled.span`
  font-size: 0.875rem;
  font-weight: 500;

  ${theme.media.md} {
    font-size: ${theme.typography.sm};
  }
`;

const Value = styled.span`
  font-weight: 600;
  color: ${theme.colors.black};
`;

type Props = {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
};

export default function RouteInfoItem({ label, value, icon }: Props) {
  return (
    <Item>
      <Left>
        {icon && <span>{icon}</span>}
        <Label>{label}</Label>
      </Left>
      <Value>{value}</Value>
    </Item>
  );
}
