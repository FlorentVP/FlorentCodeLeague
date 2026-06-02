import type { Metadata } from "next";
import "./globals.css";
import LoadingScreen from "./components/LoadingScreen";

export const metadata: Metadata = {
  title: "Florent Code League 2026",
  description: "Find out if you're in the top 1% of programmers in the Nordics.",
  icons: {
    icon: '/bot-king.png',
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
      </body>
    </html>
  );
}
