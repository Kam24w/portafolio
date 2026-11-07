import type { IconName } from "@/components/ui/Icon";

export type WindowSize = "default" | "wide";

/** Ancho máximo de cada tamaño de ventana, en píxeles. */
export const WINDOW_WIDTH = {
  default: 430,
  wide: 560,
} as const satisfies Record<WindowSize, number>;

/**
 * Apps del escritorio, en el orden en que aparecen en el menú y la barra.
 * Los nombres visibles se traducen en `i18n/` (clave `apps`).
 */
export const APPS = [
  { id: "inicio", icon: "home", size: "wide" },
  { id: "sobre-mi", icon: "user", size: "default" },
  { id: "proyectos", icon: "code", size: "default" },
  { id: "ias", icon: "spark", size: "default" },
  { id: "plugins", icon: "puzzle", size: "default" },
  { id: "testimonios", icon: "quote", size: "default" },
  { id: "trayectoria", icon: "route", size: "default" },
  { id: "contacto", icon: "mail", size: "default" },
] as const satisfies readonly { id: string; icon: IconName; size: WindowSize }[];

export type AppDef = (typeof APPS)[number];
export type AppId = AppDef["id"];

export function isAppId(value: unknown): value is AppId {
  return APPS.some((app) => app.id === value);
}
