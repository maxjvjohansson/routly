"use client";

import { useState } from "react";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import RouteCard from "./RouteCard";
import NameRouteModal from "../Modal/NameRouteModal";
import ConfirmModal from "../Modal/ConfirmModal";
import { useRouteActionsWithFeedback } from "@routly/lib/hooks/useRouteActionsWithFeedback";
import { useRouter } from "next/navigation";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};

  ${theme.media.md} {
    grid-template-columns: 1fr 1fr;
  }
`;

type Props = {
  routes: any[];
  loading: boolean;
  refetch?: () => void;
};

export default function SavedRoutesList({ routes, loading, refetch }: Props) {
  const router = useRouter();
  const {
    handleRenameRoute,
    handleDeleteRoute,
    loading: actionLoading,
  } = useRouteActionsWithFeedback();

  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);

  if (loading) return <p>Loading...</p>;
  if (!routes?.length) return <p>No saved routes yet.</p>;

  const handleViewOnMap = (route: any) => {
    router.push(`routes/${route.id}`);
  };

  const openRename = (route: any) => {
    setSelectedRoute(route);
    setRenameOpen(true);
  };

  const openDelete = (route: any) => {
    setSelectedRoute(route);
    setDeleteOpen(true);
  };

  const handleRenameConfirm = async (newName: string) => {
    if (!selectedRoute) return;
    await handleRenameRoute(selectedRoute.id, newName);
    setRenameOpen(false);
    refetch?.();
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRoute) return;
    await handleDeleteRoute(selectedRoute.id);
    setDeleteOpen(false);
    refetch?.();
  };

  return (
    <>
      <Grid>
        {routes.map((route: any) => (
          <RouteCard
            key={route.id}
            route={route}
            onViewOnMap={handleViewOnMap}
            onRename={openRename}
            onDelete={openDelete}
          />
        ))}
      </Grid>

      <NameRouteModal
        isOpen={renameOpen}
        defaultValue={selectedRoute?.name}
        loading={actionLoading}
        onCancel={() => setRenameOpen(false)}
        onConfirm={handleRenameConfirm}
      />

      <ConfirmModal
        isOpen={deleteOpen}
        title="Delete route?"
        message={`Are you sure you want to delete "${selectedRoute?.name}"?`}
        loading={actionLoading}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
