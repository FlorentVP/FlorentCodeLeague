import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Florent Code League 2026",
  description: "Find out if you're in the top 1% of programmers in the Nordics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
