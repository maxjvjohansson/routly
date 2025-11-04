import { useState } from "react";
import { useSaveRoute } from "./useSaveRoute";

export const useSaveRouteWithFeedback = () => {
  const { saveRoute, loading } = useSaveRoute();
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
      setStatusMessage(`${err.message || "Could not save route."}`);
    }
  };

  return { handleSaveRoute, loading, statusMessage, statusType };
};
