import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import RouteCard from "./RouteCard";
import { useRouter } from "next/navigation";

type Props = {
  routes: any[];
  loading: boolean;
};

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

export default function SavedRoutesList({ routes, loading }: Props) {
  const router = useRouter();

  if (loading) return <Empty>Loading your routes...</Empty>;
  if (!routes.length) return <Empty>No routes saved yet.</Empty>;

  const handleViewOnMap = (route: any) => {
    router.push(`routes/${route.id}`);
  };

  return (
    <List>
      {routes.map((r) => (
        <RouteCard key={r.id} route={r} onViewOnMap={handleViewOnMap} />
      ))}
    </List>
  );
}
