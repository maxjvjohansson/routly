import type { Metadata } from "next";
import ClientWrapper from "./ClientWrapper";
import StyledComponentsRegistry from "./registry";
import { Outfit } from "next/font/google";
import { createClient } from "@routly/lib/supabase/server";
import { AuthProvider } from "@routly/lib/context/AuthContext";
import { RouteGenerationProvider } from "@routly/lib/context/RouteGenerationContext";

export const metadata: Metadata = {
  title: {
    default: "Routly | Discover Your Perfect Running & Cycling Routes",
    template: "%s | Routly",
  },
  description:
    "Generate personalized running and cycling routes instantly. Optimized for distance, terrain, and weather. Save, share, and explore routes created by the community.",
  keywords: [
    "running routes",
    "cycling routes",
    "route generator",
    "running app",
    "cycling app",
    "GPX export",
    "outdoor fitness",
  ],
  authors: [{ name: "Routly" }],
  creator: "Routly",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://routlyweb.vercel.app",
    siteName: "Routly",
    title: "Routly | Discover Your Perfect Running & Cycling Routes",
    description:
      "Generate personalized running and cycling routes instantly. Optimized for distance, terrain, and weather.",
    images: [
      {
        url: "https://routlyweb.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Routly - Route Generation App",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" className={outfit.variable}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <AuthProvider initialUser={user}>
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
