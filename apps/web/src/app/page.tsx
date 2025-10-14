"use client";
import { InputField } from "src/components/InputField/InputField";
import { Button } from "../components/Button/Button";
import styled from "styled-components";
import { useState } from "react";

const Title = styled.h1`
  color: #0598a8;
`;

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <Title>Routly Web</Title>
      <InputField
        label="Email"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={setEmail}
      />
      <InputField
        label="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={setPassword}
      />
      <Button label="Login" variant="solid" color="teal" />
      <Button label="Login" variant="outline" color="orange" />
      <Button label="Login" variant="outline" color="orange" disabled />
    </div>
  );
}
