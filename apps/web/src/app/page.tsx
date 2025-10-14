"use client";

import styled from "styled-components";
import AuthForm from "src/components/AuthForm/AuthForm";

const Title = styled.h1`
  color: #0598a8;
`;

export default function HomePage() {
  const handleSubmit = async (
    email: string,
    password: string,
    fullName?: string
  ) => {
    console.log("Submitted:", { email, password, fullName });
    alert(`Success! Mode: signup, Email: ${email}`);
  };
  return (
    <div>
      <Title>Routly Web</Title>
      <AuthForm mode="signup" onSubmit={handleSubmit} />
    </div>
  );
}
