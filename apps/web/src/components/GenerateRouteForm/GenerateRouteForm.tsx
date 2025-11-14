"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import ActivitySelect from "./ActivitySelect";
import DistanceSelector from "./DistanceSelector";
import LocationInputs from "./LocationInputs";
import { useAuth } from "@routly/lib/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { fetchCombinedRouteData } from "@routly/lib/routeAlgorithms/fetchCombinedRouteData";
import { useEffect, useState } from "react";
import { TbWand } from "react-icons/tb";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
  width: 100%;
  max-width: 800px;
  background-color: ${theme.colors.white};
`;

const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const ButtonWrapper = styled.div`
  margin-top: ${theme.spacing.md};
`;

const ErrorText = styled.p`
  color: ${theme.colors.red};
  font-size: ${theme.typography.sm};
  text-align: center;
  margin-top: -${theme.spacing.xs};
  margin-bottom: ${theme.spacing.xs};
`;

export default function GenerateRouteForm() {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const {
    startPoint,
    endPoint,
    distance,
    activity,
    setRoutes,
    isRoundTrip,
    setWeatherByRoute,
    setActiveRouteIndex,
  } = useRouteGeneration();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (error && (startPoint || endPoint)) setError(null);
  }, [startPoint, endPoint]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!user) {
      router.push("/login?next=/generate");
      return;
    }

    if (!startPoint) {
      setError(
        "Please select a start point on the map before generating a route."
      );
      return;
    }

    try {
      setIsLoading(true);

      const { routes, weatherByRoute } = await fetchCombinedRouteData(
        startPoint,
        endPoint ?? null,
        distance,
        activity
      );

      setRoutes(routes.map((r) => r.data));
      setWeatherByRoute(weatherByRoute);
      setActiveRouteIndex(0);

      if (pathname !== "/generate") router.push("/generate");
    } catch (err) {
      console.error("Route generation failed:", err);
      setError(
        "Something went wrong while generating your routes. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormFields>
        <ActivitySelect />
        <LocationInputs />
        {isRoundTrip && <DistanceSelector />}
        {error && <ErrorText>{error}</ErrorText>}
      </FormFields>

      <ButtonWrapper>
        <Button
          type="submit"
          label={isLoading ? "Generating..." : "Generate Route"}
          color="orange"
          fullWidth
          disabled={isLoading}
          iconRight={<TbWand size={20} />}
        />
      </ButtonWrapper>
    </FormContainer>
  );
}
