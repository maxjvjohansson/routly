import type { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";
import StyledComponentsRegistry from "./registry";
import { Outfit } from "next/font/google";
import { AuthProvider } from "@routly/lib/context/AuthContext";
import { RouteGenerationProvider } from "@routly/lib/context/RouteGenerationContext";

export const metadata: Metadata = {
  title: "Routly",
  description: "Discover new running and cycling routes instantly",
};

const outfit = Outfit({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-outfit",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <AuthProvider>
            <RouteGenerationProvider>
              <ClientWrapper>
                <main>{children}</main>
              </ClientWrapper>
            </RouteGenerationProvider>
          </AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
