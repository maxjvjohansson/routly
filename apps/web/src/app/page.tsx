"use client";
import { Button } from "@routly/ui/components/Button/Button.web";
import styled from "styled-components";

const Title = styled.h1`
  color: #0598a8;
`;

export default function Home() {
  return (
    <div>
      <Title>Routly Web</Title>
      <Button title="Login" color="#0598a8" variant="solid" />
    </div>
  );
}
