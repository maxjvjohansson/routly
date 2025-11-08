"use client";

import { useState } from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import { nativeTheme as theme } from "@routly/ui/theme/native";
import RouteCard from "./RouteCard";
import NameRouteModal from "../Modal/NameRouteModal";
import ConfirmModal from "../Modal/ConfirmModal";
import { useRouteActionsWithFeedback } from "@routly/lib/hooks/useRouteActionsWithFeedback";
import { useRouter } from "expo-router";

const ListContainer = styled.View`
  flex: 1;
`;

const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.grayDark};
  font-size: ${theme.typography.sm}px;
  margin-top: ${theme.spacing.lg}px;
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

  const handleViewOnMap = (route: any) => {
    router.push(`/route/${route.id}`);
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

  if (loading) return <EmptyText>Loading…</EmptyText>;

  if (!routes?.length) return <EmptyText>No saved routes yet.</EmptyText>;

  return (
    <ListContainer>
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <RouteCard
            route={item}
            onViewOnMap={handleViewOnMap}
            onRename={openRename}
            onDelete={openDelete}
          />
        )}
        contentContainerStyle={{ paddingBottom: theme.spacing.xxl }}
      />

      <NameRouteModal
        visible={renameOpen}
        defaultValue={selectedRoute?.name}
        loading={actionLoading}
        onCancel={() => setRenameOpen(false)}
        onConfirm={handleRenameConfirm}
      />

      <ConfirmModal
        visible={deleteOpen}
        title="Delete route?"
        message={`Are you sure you want to delete "${selectedRoute?.name}"?`}
        loading={actionLoading}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </ListContainer>
  );
}
