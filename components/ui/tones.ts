import type { Tone } from "@/data/portfolio";

/*
 * Paleta profesional (azules, cian, verdes, ámbar y pizarra; sin morados).
 * Las clases deben estar escritas completas (sin armarlas con template
 * strings) para que Tailwind las detecte.
 */

/** Degradado sólido: íconos del dock, tarjetas y marcas. */
export const TONE_GRADIENT = {
  blue: "bg-linear-135 from-[#1d4ed8] to-[#3b82f6]",
  navy: "bg-linear-135 from-[#1e3a8a] to-[#2563eb]",
  sky: "bg-linear-135 from-[#0284c7] to-[#38bdf8]",
  cyan: "bg-linear-135 from-[#0e7490] to-[#06b6d4]",
  teal: "bg-linear-135 from-[#0f766e] to-[#14b8a6]",
  emerald: "bg-linear-135 from-[#047857] to-[#10b981]",
  forest: "bg-linear-135 from-[#3c873a] to-[#8cc84b]",
  amber: "bg-linear-135 from-[#b45309] to-[#f59e0b]",
  clay: "bg-linear-135 from-[#c2410c] to-[#fb923c]",
  slate: "bg-linear-135 from-[#334155] to-[#64748b]",
} as const satisfies Record<Tone, string>;

/** Brillo muy suave del color del tono, para la cabecera de las ventanas. */
export const TONE_GLOW = {
  blue: "from-[#3b82f6]/22",
  navy: "from-[#2563eb]/22",
  sky: "from-[#38bdf8]/22",
  cyan: "from-[#06b6d4]/22",
  teal: "from-[#14b8a6]/22",
  emerald: "from-[#10b981]/22",
  forest: "from-[#8cc84b]/22",
  amber: "from-[#f59e0b]/22",
  clay: "from-[#fb923c]/22",
  slate: "from-[#64748b]/22",
} as const satisfies Record<Tone, string>;
