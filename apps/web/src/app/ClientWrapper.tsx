"use client";

import { ThemeProvider } from "styled-components";
import { theme } from "@routly/ui/theme";
import { GlobalStyle } from "./global-styles";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
}
