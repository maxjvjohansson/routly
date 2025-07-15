import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Routly",
  description:
    "Generate optimized bike or running routes based on wind, elevation, and traffic data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
