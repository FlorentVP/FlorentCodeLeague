import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "./components/LoadingScreen";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Florent Code League 2026",
  description: "Find out if you're in the top 1% of programmers in the Nordics.",
  openGraph: {
    title: "Florent Code League 2026",
    description: "Find out if you're in the top 1% of programmers in the Nordics.",
    url: "https://league.florent.vc",
    images: [{ url: "https://league.florent.vc/og-image-v2.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Florent Code League 2026",
    description: "Find out if you're in the top 1% of programmers in the Nordics.",
    images: ["https://league.florent.vc/og-image-v2.png"],
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
