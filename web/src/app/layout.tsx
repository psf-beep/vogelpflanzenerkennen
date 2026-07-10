import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

// Runde, moderne, gut lesbare Schrift (Design-Vorgabe in CLAUDE.md).
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vogel & Pflanzen – Lernplattform",
  description:
    "Vögel und Pflanzen spielerisch kennenlernen: Lernkarten-Ratespiel und Nachschlagewerk.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${nunito.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
