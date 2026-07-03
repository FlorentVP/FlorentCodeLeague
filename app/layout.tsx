import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "./components/LoadingScreen";
import { Analytics } from "@vercel/analytics/next";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const title = "Florent Code League 2026";
const description =
  "Find out if you're in the top 1% of programmers in the Nordics.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: title,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Florent Code League 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <LoadingScreen />
        <Analytics />
      </body>
    </html>
  );
}
