"use client";

import { ThemeProvider } from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { GlobalStyle } from "./global-styles";
import Navbar from "src/components/Navbar/Navbar";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      {children}
    </ThemeProvider>
  );
}
