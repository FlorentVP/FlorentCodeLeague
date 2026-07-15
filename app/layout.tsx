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
  },
  twitter: {
    card: "summary_large_image",
    title: "Florent Code League 2026",
    description: "Find out if you're in the top 1% of programmers in the Nordics.",
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
