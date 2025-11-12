import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.Text`
  font-family: ${theme.typography.fontMedium};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.grayDark};
`;

const Value = styled.Text`
  font-family: ${theme.typography.fontSemiBold};
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.black};
`;

export default function RouteInfoItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <Row>
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Row>
  );
}
