import type { Locale } from "./config";
import { en } from "./en";
import { es } from "./es";
import type { Dictionary } from "./types";

export const DICTIONARIES: Record<Locale, Dictionary> = { es, en };

export type { Dictionary } from "./types";
export * from "./config";
