import type { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";
import StyledComponentsRegistry from "./registry";

export const metadata: Metadata = {
  title: "Routly",
  description: "Discover new running and cycling routes instantly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <ClientWrapper>{children}</ClientWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
