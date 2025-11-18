"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import ActivitySelect from "./ActivitySelect";
import DistanceSelector from "./DistanceSelector";
import LocationInputs from "./LocationInputs";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";
import { fetchCombinedRouteData } from "@routly/lib/routeAlgorithms/fetchCombinedRouteData";
import { useEffect, useState } from "react";
import { TbWand } from "react-icons/tb";
import { useRouter } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";

type GenerateRouteFormProps = {
  mode?: "home" | "generate";
};

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

export default function GenerateRouteForm({
  mode = "generate",
}: GenerateRouteFormProps) {
  const router = useRouter();

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
  }, [startPoint, endPoint, error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // In on homepage, navigate to /generate
    if (mode === "home") {
      router.push("/generate");
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
          label={
            isLoading
              ? "Generating..."
              : mode === "home"
                ? "Generate a Route"
                : "Generate Route"
          }
          color="orange"
          fullWidth
          disabled={isLoading}
          iconRight={
            mode === "home" ? <FiArrowRight size={20} /> : <TbWand size={20} />
          }
        />
      </ButtonWrapper>
    </FormContainer>
  );
}
