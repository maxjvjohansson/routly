import GenerateRouteForm from "../GenerateRouteForm/GenerateRouteForm";
import RoutlyMap from "../RoutlyMap/RoutlyMap";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";

const RouteGenerationWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
  width: 100%;
  height: 100%;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.radius.xl};
  box-shadow:
    0 4px 6px 0 rgba(0, 0, 0, 0.1),
    0 10px 15px 0 rgba(0, 0, 0, 0.1);

  ${theme.media.md} {
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.lg};
  }
`;

export default function GenerateRouteSection() {
  return (
    <RouteGenerationWrapper>
      <GenerateRouteForm />
      <RoutlyMap />
    </RouteGenerationWrapper>
  );
}
