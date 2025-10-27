"use client";

import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import ActivitySelect from "./ActivitySelect";
import DistanceSelector from "./DistanceSelector";
import LocationInputs from "./LocationInputs";
import { useAuth } from "@routly/lib/context/AuthContext";
import { useRouter } from "next/navigation";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  width: 100%;
  height: 100%;
  max-width: 800px;
  background-color: ${theme.colors.white};
`;

export default function GenerateRouteForm() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) router.push("/login?next=/generate");
    else router.push("/generate");
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <ActivitySelect />
      <DistanceSelector />
      <LocationInputs />
      <Button type="submit" label="Generate Route" color="orange" fullWidth />
    </FormContainer>
  );
}
