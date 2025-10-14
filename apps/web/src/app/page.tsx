"use client";
import { Button } from "../components/Button/Button";
import styled from "styled-components";

const Title = styled.h1`
  color: #0598a8;
`;

export default function Home() {
  return (
    <div>
      <Title>Routly Web</Title>
      <Button label="Login" variant="solid" color="teal" />
      <Button label="Login" variant="outline" color="orange" />
      <Button label="Login" variant="outline" color="orange" disabled />
    </div>
  );
}
