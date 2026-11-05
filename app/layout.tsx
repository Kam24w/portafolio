import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-grotesk" });

export const metadata: Metadata = {
  title: "frayder camilo lopez · escritorio",
  description:
    "portafolio interactivo estilo escritorio de frayder camilo lopez, desarrollador full stack en formación.",
};

export default function RootLayout({
  children,
}: { children: ReactNode }) {
  return (
    <html lang="es" data-theme="light" suppressHydrationWarning>
      <body className={`${inter.variable} ${grotesk.variable}`}>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('fc-theme')==='dark'){document.documentElement.setAttribute('data-theme','dark')}}catch(e){}",
          }}
        />
        {children}
      </body>
    </html>
  );
}
