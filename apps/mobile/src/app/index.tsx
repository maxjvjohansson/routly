import { Button } from "src/components/Button/Button";
import styled from "styled-components/native";
import { InputField } from "src/components/InputField/InputField";
import { useState } from "react";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: 700;
`;

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container>
      <Title>Routly App</Title>
      <InputField
        label="Email"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={setEmail}
        fullWidth
      />
      <InputField
        label="Password"
        placeholder="Enter your password"
        type="password"
        value={password}
        onChange={setPassword}
        fullWidth
      />
      <Button label="Login" variant="solid" color="teal" />
      <Button label="Login" variant="outline" color="orange" />
      <Button label="Login" variant="outline" color="orange" disabled />
    </Container>
  );
}
