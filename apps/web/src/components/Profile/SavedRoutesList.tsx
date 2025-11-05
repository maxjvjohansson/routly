import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import RouteCard from "./RouteCard";

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.md};
`;

const Empty = styled.p`
  color: ${theme.colors.grayDark};
  text-align: center;
  margin-top: ${theme.spacing.lg};
`;

export default function SavedRoutesList({
  routes,
  loading,
}: {
  routes: any[];
  loading: boolean;
}) {
  if (loading) return <Empty>Loading your routes...</Empty>;
  if (!routes.length) return <Empty>No routes saved yet.</Empty>;

  return (
    <List>
      {routes.map((r) => (
        <RouteCard key={r.id} route={r} />
      ))}
    </List>
  );
}
