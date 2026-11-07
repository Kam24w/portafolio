export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

/** Locale de `Intl` usado para fechas y horas en cada idioma. */
export const DATE_LOCALE = {
  es: "es-CO",
  en: "en-US",
} as const satisfies Record<Locale, string>;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Texto que cambia según el idioma, o que es igual en ambos. */
export type Localized = string | Readonly<Record<Locale, string>>;

export function localize(value: Localized, locale: Locale): string {
  return typeof value === "string" ? value : value[locale];
}
