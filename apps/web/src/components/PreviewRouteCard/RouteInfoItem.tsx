import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.xs} 0;
  font-size: ${theme.typography.sm};
  color: ${theme.colors.grayDark};
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const Label = styled.span`
  font-weight: 500;
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
