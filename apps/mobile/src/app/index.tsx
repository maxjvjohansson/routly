import { Button } from "src/components/Button/Button";
import styled from "styled-components/native";

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
  return (
    <Container>
      <Title>Routly App</Title>
      <Button title="Login" color="#0598a8" variant="solid" />
    </Container>
  );
}
