"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import ActivitySelect from "./ActivitySelect";
import DistanceSelector from "./DistanceSelector";
import LocationInputs from "./LocationInputs";
import { useAuth } from "@routly/lib/context/AuthContext";
import { useRouter } from "next/navigation";
import { useRouteGeneration } from "@routly/lib/context/RouteGenerationContext";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${theme.spacing.sm};
  width: 100%;
  min-height: 438.5px;
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

export default function GenerateRouteForm() {
  const { user } = useAuth();
  const router = useRouter();
  const { isRoundTrip } = useRouteGeneration();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) router.push("/login?next=/generate");
    else router.push("/generate");
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormFields>
        <ActivitySelect />
        <LocationInputs />
        {isRoundTrip && <DistanceSelector />}
      </FormFields>
      <ButtonWrapper>
        <Button type="submit" label="Generate Route" color="orange" fullWidth />
      </ButtonWrapper>
    </FormContainer>
  );
}
