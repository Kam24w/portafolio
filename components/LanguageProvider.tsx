"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { contents } from "@/content";
import type { Language, PortfolioContent } from "@/content";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  content: PortfolioContent;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "es";
    const stored = window.localStorage.getItem("portfolio-language");
    return stored === "en" ? "en" : "es";
  });
  const content = useMemo(() => contents[language], [language]);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language;
  }, [language]);

  return <LanguageContext.Provider value={{ language, setLanguage, content }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
