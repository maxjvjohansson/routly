import { useState } from "react";
import { useRouteActions } from "./useRouteActions";

export const useRouteActionsWithFeedback = () => {
  const { saveRoute, renameRoute, deleteRoute, loading } = useRouteActions();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<"success" | "error" | null>(
    null
  );

  const handleSaveRoute = async (payload: any) => {
    setStatusMessage(null);
    setStatusType(null);
    try {
      await saveRoute(payload);
      setStatusType("success");
      setStatusMessage("Route saved successfully!");
    } catch (err: any) {
      setStatusType("error");
      setStatusMessage(err.message || "Could not save route.");
    }
  };

  const handleRenameRoute = async (id: string, newName: string) => {
    setStatusMessage(null);
    setStatusType(null);
    try {
      await renameRoute(id, newName);
      setStatusType("success");
      setStatusMessage("Route renamed successfully!");
    } catch (err: any) {
      setStatusType("error");
      setStatusMessage(err.message || "Could not rename route.");
    }
  };

  const handleDeleteRoute = async (id: string) => {
    setStatusMessage(null);
    setStatusType(null);
    try {
      await deleteRoute(id);
      setStatusType("success");
      setStatusMessage("Route deleted successfully!");
    } catch (err: any) {
      setStatusType("error");
      setStatusMessage(err.message || "Could not delete route.");
    }
  };

  return {
    handleSaveRoute,
    handleRenameRoute,
    handleDeleteRoute,
    loading,
    statusMessage,
    statusType,
  };
};
