"use client";

import { useState } from "react";
import styled from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { Button } from "../Button/Button";
import ActivitySelect from "./ActivitySelect";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  width: 100%;
  max-width: 420px;
  background-color: ${theme.colors.white};
  border-radius: ${theme.radius.xl};
  box-shadow:
    0 8px 10px rgba(0, 0, 0, 0.08),
    0 20px 25px rgba(0, 0, 0, 0.08);
  padding: ${theme.spacing.lg};
`;

export default function GenerateRouteForm() {
  const [activity, setActivity] = useState<"run" | "cycle">("run");
  const [distance, setDistance] = useState(10);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Generate route with:", { activity, distance, start, end });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <ActivitySelect value={activity} onChange={setActivity} />

      <Button type="submit" label="Generate Route" color="teal" fullWidth />
    </FormContainer>
  );
}
