import type { Metadata } from "next";
import { Figtree, Pixelify_Sans, Press_Start_2P } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import { content } from "@/content/es";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-press-start",
});

export const metadata: Metadata = {
  title: `${content.profile.name} | Portafolio`,
  description: `Portafolio de ${content.profile.name}: proyectos, perfil y contacto.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${pixelify.variable} ${figtree.variable} ${pressStart.variable}`}>
      <body className="antialiased">
        <LanguageProvider>
          <Header />
          <main id="main-content" tabIndex={-1} className="pt-28 md:pt-32">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
