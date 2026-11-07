"use client";

import { createContext, useContext, useEffect, useMemo, type ReactNode } from "react";
import { localePreference, usePreference } from "@/lib/preferences";
import { DATE_LOCALE, DEFAULT_LOCALE, DICTIONARIES, type Dictionary, type Locale } from "./index";

type LocaleContextValue = {
  locale: Locale;
  /** Textos del idioma activo. */
  t: Dictionary;
  /** Locale de `Intl` para formatear fechas (ej. "es-CO"). */
  dateLocale: string;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const locale = usePreference(localePreference, DEFAULT_LOCALE);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      t: DICTIONARIES[locale],
      dateLocale: DATE_LOCALE[locale],
      setLocale: localePreference.set,
      toggleLocale: () => localePreference.set(locale === "es" ? "en" : "es"),
    }),
    [locale],
  );

  // el título de la pestaña sigue al idioma (la metadata del servidor queda en español)
  useEffect(() => {
    document.title = value.t.meta.title;
  }, [value.t]);

  return <LocaleContext value={value}>{children}</LocaleContext>;
}

export function useLocale(): LocaleContextValue {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale debe usarse dentro de <LocaleProvider>");
  return value;
}
