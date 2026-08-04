import type { Metadata } from "next";
import { Montserrat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const menu = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-menu",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anthony Nagul — Étudiant en Cybersécurité & Développeur Web",
  description:
    "Portfolio d'Anthony Nagul, étudiant en Bachelor Cybersécurité à Ynov Campus Lyon. Développement web (Next.js, TypeScript), sécurité offensive et relation client. À la recherche d'un stage en cybersécurité.",
  keywords: [
    "Anthony Nagul",
    "Cybersécurité",
    "Développeur Web",
    "Next.js",
    "Lyon",
    "Ynov",
    "Portfolio",
  ],
  authors: [{ name: "Anthony Nagul" }],
  openGraph: {
    title: "Anthony Nagul — Cybersécurité & Développement Web",
    description:
      "Étudiant en cybersécurité à Lyon, développeur web. Découvrez mes projets : Brasserie Le Ste Foy, KLT et plus.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable} ${mono.variable} ${menu.variable}`}>
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
