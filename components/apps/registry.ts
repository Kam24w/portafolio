import type { IconName } from "@/components/ui/Icon";
import type { Tone } from "@/data/portfolio";

export type WindowSize = "default" | "wide";

/** Ancho máximo de cada tamaño de ventana, en píxeles. */
export const WINDOW_WIDTH = {
  default: 430,
  wide: 560,
} as const satisfies Record<WindowSize, number>;

/**
 * Apps del escritorio, en el orden en que aparecen en el dock.
 * `tone` es el color de su ícono en el dock.
 * Los nombres visibles se traducen en `i18n/` (clave `apps`).
 */
export const APPS = [
  { id: "inicio", icon: "home", size: "wide", tone: "violet" },
  { id: "sobre-mi", icon: "user", size: "default", tone: "sunset" },
  { id: "proyectos", icon: "code", size: "default", tone: "ocean" },
  { id: "ias", icon: "spark", size: "default", tone: "mint" },
  { id: "plugins", icon: "puzzle", size: "default", tone: "figma" },
  { id: "testimonios", icon: "quote", size: "default", tone: "clay" },
  { id: "trayectoria", icon: "route", size: "default", tone: "teal" },
  { id: "contacto", icon: "mail", size: "default", tone: "indigo" },
] as const satisfies readonly { id: string; icon: IconName; size: WindowSize; tone: Tone }[];

export type AppDef = (typeof APPS)[number];
export type AppId = AppDef["id"];

export function isAppId(value: unknown): value is AppId {
  return APPS.some((app) => app.id === value);
}
