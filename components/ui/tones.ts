import type { Tone } from "@/data/portfolio";

/**
 * Clases de degradado por tono. Deben estar escritas completas (sin
 * construirlas con template strings) para que Tailwind las detecte.
 */
export const TONE_GRADIENT = {
  indigo: "bg-linear-135 from-[#6366f1] to-[#a855f7]",
  sky: "bg-linear-135 from-[#0ea5e9] to-[#22d3ee]",
  sunset: "bg-linear-135 from-[#f59e0b] to-[#f472b6]",
  teal: "bg-linear-135 from-[#10b981] to-[#0ea5e9]",
  mint: "bg-linear-135 from-[#10a37f] to-[#34d399]",
  violet: "bg-linear-135 from-[#5451d6] to-[#8b5cf6]",
  clay: "bg-linear-135 from-[#d97757] to-[#f59e0b]",
  ocean: "bg-linear-135 from-[#0ea5e9] to-[#6366f1]",
  forest: "bg-linear-135 from-[#3c873a] to-[#8cc84b]",
  figma: "bg-linear-135 from-[#a259ff] to-[#f24e1e]",
} as const satisfies Record<Tone, string>;
