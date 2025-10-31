import styled from "styled-components/native";
import { Text, View } from "react-native";
import { nativeTheme as theme } from "@routly/ui/theme/native";

const Row = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.grayDark};
  font-weight: 500;
`;

const Value = styled(Text)`
  font-size: ${theme.typography.sm}px;
  color: ${theme.colors.black};
  font-weight: 600;
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
