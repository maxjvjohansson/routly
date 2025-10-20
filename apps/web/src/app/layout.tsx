import type { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";
import StyledComponentsRegistry from "./registry";
import { Outfit } from "next/font/google";
import Navbar from "src/components/Navbar/Navbar";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <StyledComponentsRegistry>
          <ClientWrapper>
            <Navbar />
            <main>{children}</main>
          </ClientWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
