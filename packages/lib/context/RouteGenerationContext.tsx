"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type ActivityType = "run" | "cycle";

type RouteGenerationContextType = {
  startPoint?: [number, number];
  endPoint?: [number, number];
  distance: number;
  activity: ActivityType;
  routes: GeoJSON.FeatureCollection[];
  setStartPoint: (coords: [number, number]) => void;
  setEndPoint: (coords: [number, number]) => void;
  setDistance: (val: number) => void;
  setActivity: (val: ActivityType) => void;
  setRoutes: (routes: GeoJSON.FeatureCollection[]) => void;
  reset: () => void;
};

const RouteGenerationContext = createContext<RouteGenerationContextType | null>(
  null
);

export function RouteGenerationProvider({ children }: { children: ReactNode }) {
  const [startPoint, setStartPoint] = useState<[number, number]>();
  const [endPoint, setEndPoint] = useState<[number, number]>();
  const [activity, setActivity] = useState<ActivityType>("run");
  const [distance, setDistance] = useState<number>(10);
  const [routes, setRoutes] = useState<GeoJSON.FeatureCollection[]>([]);

  const reset = () => {
    setStartPoint(undefined);
    setEndPoint(undefined);
    setDistance(10);
    setActivity("run");
    setRoutes([]);
  };

  return (
    <RouteGenerationContext.Provider
      value={{
        startPoint,
        endPoint,
        distance,
        activity,
        routes,
        setStartPoint,
        setEndPoint,
        setDistance,
        setActivity,
        setRoutes,
        reset,
      }}
    >
      {children}
    </RouteGenerationContext.Provider>
  );
}

export function useRouteGeneration() {
  const context = useContext(RouteGenerationContext);
  if (!context) {
    throw new Error(
      "useRouteGeneration must be used within RouteGenerationProvider"
    );
  }
  return context;
}
