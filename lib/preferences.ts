import { useSyncExternalStore } from "react";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/i18n/config";
import { STORAGE_KEYS } from "./preferences-script";

export type Theme = "light" | "dark";

type Preference<T extends string> = {
  subscribe: (listener: () => void) => () => void;
  get: () => T;
  set: (value: T) => void;
};

/**
 * Preferencia guardada en un atributo de <html> y en localStorage.
 * El atributo es la fuente de verdad: lo escribe primero el script de
 * `preferences-script.ts` y luego `set`.
 */
function createPreference<T extends string>(
  storageKey: string,
  read: () => T,
  apply: (value: T) => void,
): Preference<T> {
  const listeners = new Set<() => void>();
  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    get: read,
    set(value) {
      apply(value);
      try {
        localStorage.setItem(storageKey, value);
      } catch {
        /* sin almacenamiento disponible: la preferencia dura hasta recargar */
      }
      listeners.forEach((listener) => listener());
    },
  };
}

export const themePreference = createPreference<Theme>(
  STORAGE_KEYS.theme,
  () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light"),
  (value) => {
    document.documentElement.dataset.theme = value;
  },
);

export const localePreference = createPreference<Locale>(
  STORAGE_KEYS.locale,
  () => {
    const lang = document.documentElement.lang;
    return isLocale(lang) ? lang : DEFAULT_LOCALE;
  },
  (value) => {
    document.documentElement.lang = value;
  },
);

/** Lee una preferencia y se re-renderiza cuando cambia. En el servidor devuelve `serverValue`. */
export function usePreference<T extends string>(preference: Preference<T>, serverValue: T): T {
  return useSyncExternalStore(preference.subscribe, preference.get, () => serverValue);
}

export function useTheme() {
  const theme = usePreference(themePreference, "light");
  const toggleTheme = () => themePreference.set(theme === "dark" ? "light" : "dark");
  return { theme, toggleTheme };
}
