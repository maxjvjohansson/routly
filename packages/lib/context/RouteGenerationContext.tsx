"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type ActivityType = "run" | "cycle";

type RouteGenerationContextType = {
  startPoint?: [number, number];
  endPoint?: [number, number];
  distance: number;
  activity: ActivityType;
  routes: GeoJSON.FeatureCollection[];
  weatherByRoute: any[];
  activeRouteIndex: number;

  setStartPoint: (coords?: [number, number]) => void;
  setEndPoint: (coords?: [number, number]) => void;
  setDistance: (val: number) => void;
  setActivity: (val: ActivityType) => void;
  setRoutes: (routes: GeoJSON.FeatureCollection[]) => void;
  setWeatherByRoute: (weather: any[]) => void;
  setActiveRouteIndex: (i: number) => void;

  clearPoints: () => void;
  reset: () => void;

  isRoundTrip: boolean;
};

const RouteGenerationContext = createContext<RouteGenerationContextType | null>(
  null
);

export function RouteGenerationProvider({ children }: { children: ReactNode }) {
  const [startPoint, setStartPoint] = useState<[number, number] | undefined>();
  const [endPoint, setEndPoint] = useState<[number, number] | undefined>();
  const [activity, setActivity] = useState<ActivityType>("run");
  const [distance, setDistance] = useState<number>(10);
  const [routes, setRoutes] = useState<GeoJSON.FeatureCollection[]>([]);

  const [weatherByRoute, setWeatherByRoute] = useState<any[]>([]);
  const [activeRouteIndex, setActiveRouteIndex] = useState<number>(0);

  // Always show first route as active when routes get updated
  useEffect(() => {
    if (routes.length > 0) setActiveRouteIndex(0);
  }, [routes]);

  const isRoundTrip = !!startPoint && !endPoint;

  const clearPoints = () => {
    setStartPoint(undefined);
    setEndPoint(undefined);
    setRoutes([]);
    setWeatherByRoute([]);
  };

  const reset = () => {
    setStartPoint(undefined);
    setEndPoint(undefined);
    setDistance(10);
    setActivity("run");
    setRoutes([]);
    setWeatherByRoute([]);
    setActiveRouteIndex(0);
  };

  return (
    <RouteGenerationContext.Provider
      value={{
        startPoint,
        endPoint,
        distance,
        activity,
        routes,
        weatherByRoute,
        activeRouteIndex,
        setStartPoint,
        setEndPoint,
        setDistance,
        setActivity,
        setRoutes,
        setWeatherByRoute,
        setActiveRouteIndex,
        reset,
        clearPoints,
        isRoundTrip,
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
