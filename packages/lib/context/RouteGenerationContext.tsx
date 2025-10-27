"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type RouteGenerationContextType = {
  startPoint?: [number, number];
  endPoint?: [number, number];
  distance?: number;
  activity?: string;
  routes?: GeoJSON.FeatureCollection[];
  setStartPoint: (coords: [number, number]) => void;
  setEndPoint: (coords: [number, number]) => void;
  setDistance: (val: number) => void;
  setActivity: (val: string) => void;
  setRoutes: (routes: GeoJSON.FeatureCollection[]) => void;
  reset: () => void;
};

const RouteGenerationContext = createContext<RouteGenerationContextType | null>(
  null
);

export function RouteGenerationProvider({ children }: { children: ReactNode }) {
  const [startPoint, setStartPoint] = useState<[number, number]>();
  const [endPoint, setEndPoint] = useState<[number, number]>();
  const [distance, setDistance] = useState<number>();
  const [activity, setActivity] = useState<string>();
  const [routes, setRoutes] = useState<GeoJSON.FeatureCollection[]>([]);

  const reset = () => {
    setStartPoint(undefined);
    setEndPoint(undefined);
    setDistance(undefined);
    setActivity(undefined);
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
  const contex = useContext(RouteGenerationContext);
  if (!contex)
    throw new Error(
      "useRouteGeneration must be used within RouteGenerationProvider"
    );
  return contex;
}
