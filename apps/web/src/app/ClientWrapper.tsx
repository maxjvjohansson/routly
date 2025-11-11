"use client";

import { ThemeProvider } from "styled-components";
import { webTheme as theme } from "@routly/ui/theme/web";
import { GlobalStyle } from "./global-styles";
import Navbar from "src/components/Navbar/Navbar";
import Footer from "src/components/Footer/Footer";
import { usePathname } from "next/navigation";

export default function ClientWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const hideFooter =
    pathname?.startsWith("/login") || pathname?.startsWith("/signup");

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      {children}
      {!hideFooter && <Footer />}
    </ThemeProvider>
  );
}
