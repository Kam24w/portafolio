import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Doto, Instrument_Serif, Inter, Space_Grotesk } from "next/font/google";
import { es } from "@/i18n/es";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { PREFERENCES_INIT_SCRIPT } from "@/lib/preferences-script";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });
/** Fuente de matriz de puntos para el reloj del escritorio. */
const doto = Doto({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-doto" });
/** Serif itálica editorial para el apellido gigante detrás de la foto. */
const instrument = Instrument_Serif({ subsets: ["latin"], weight: "400", style: "italic", variable: "--font-instrument" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: es.meta.title,
  description: es.meta.description,
  // la imagen la genera app/opengraph-image.tsx y Next la agrega sola a openGraph
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Frayder Camilo Lopez",
    title: es.meta.title,
    description: es.meta.description,
    locale: "es_CO",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: es.meta.title,
    description: es.meta.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // `lang` y `data-theme` los ajusta el script antes de hidratar; por eso se suprime la advertencia
    <html lang="es" data-theme="light" className={`${inter.variable} ${grotesk.variable} ${doto.variable} ${instrument.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: PREFERENCES_INIT_SCRIPT }} />
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
