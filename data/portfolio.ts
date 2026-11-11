/**
 * Datos del portafolio que NO dependen del idioma: enlaces, imágenes,
 * años, tecnologías y colores. Los textos traducibles viven en `i18n/`
 * y se enlazan con estos datos por su `id`.
 */
import type { Locale, Localized } from "@/i18n/config";

export type ExternalUrl = `https://${string}`;

/** Degradados disponibles; cada uno se traduce a clases de Tailwind en `components/ui/tones.ts`. */
export type Tone =
  | "indigo"
  | "sky"
  | "sunset"
  | "teal"
  | "mint"
  | "violet"
  | "clay"
  | "ocean"
  | "forest"
  | "figma";

/* ---------- perfil ---------- */

export const PROFILE = {
  name: "frayder camilo lopez",
  initials: "fc",
  photo: "/assets/Foto_perfil_sin_fondo.png",
  location: "pasto, nariño, colombia · gmt-5",
  email: "freydercl2004@gmail.com",
  github: { href: "https://github.com/Kam24w", label: "github.com/Kam24w" },
  linkedin: {
    href: "https://www.linkedin.com/in/camilolopezdev/",
    label: "linkedin.com/in/camilolopezdev",
  },
} as const satisfies {
  name: string;
  initials: string;
  photo: string;
  location: string;
  email: string;
  github: { href: ExternalUrl; label: string };
  linkedin: { href: ExternalUrl; label: string };
};

/**
 * CV en PDF por idioma, dentro de `public/`. Los genera `npm run cv`
 * (scripts/cv/build-cv.mts) a partir de estos mismos datos.
 * Si fuera `null`, el botón se muestra desactivado con "disponible pronto".
 */
export const CV_URL: Readonly<Record<Locale, string>> | null = {
  es: "/cv/frayder-camilo-lopez-cv-es.pdf",
  en: "/cv/frayder-camilo-lopez-cv-en.pdf",
};

/* ---------- tecnologías ---------- */

type TechDef = {
  label: Localized;
  /** Abreviatura que se muestra dentro del ícono. */
  mark: string;
  /** Colores del degradado: el primero también se usa como punto del chip. */
  colors: readonly [string, string];
};

export const TECH = {
  react: { label: "react", mark: "Re", colors: ["#61dafb", "#0ea5e9"] },
  nextjs: { label: "next.js", mark: "Nx", colors: ["#8888ff", "#6366f1"] },
  tailwind: { label: "tailwind css", mark: "Tw", colors: ["#38bdf8", "#0ea5e9"] },
  typescript: { label: "typescript", mark: "Ts", colors: ["#3178c6", "#38bdf8"] },
  vite: { label: "vite", mark: "Vi", colors: ["#646cff", "#ffbd2e"] },
  nodejs: { label: "node.js", mark: "No", colors: ["#3c873a", "#8cc84b"] },
  python: { label: "python", mark: "Py", colors: ["#3776ab", "#ffd43b"] },
  flask: { label: "flask", mark: "Fl", colors: ["#334155", "#64748b"] },
  rest: { label: { es: "apis rest", en: "rest apis" }, mark: "API", colors: ["#22d3ee", "#0ea5e9"] },
  postgresql: { label: "postgresql", mark: "Pg", colors: ["#336791", "#60a5fa"] },
  sql: { label: "sql", mark: "SQL", colors: ["#e38c00", "#fbbf24"] },
  supabase: { label: "supabase", mark: "Sb", colors: ["#3ecf8e", "#1f9d6b"] },
  groq: { label: { es: "groq (ia)", en: "groq (ai)" }, mark: "Gq", colors: ["#f55036", "#ff8a65"] },
  kotlin: { label: "kotlin", mark: "Kt", colors: ["#7f52ff", "#e44857"] },
  compose: { label: "jetpack compose", mark: "Jc", colors: ["#4285f4", "#3ddc84"] },
  wearos: { label: "wear os", mark: "Wr", colors: ["#3ddc84", "#4285f4"] },
  unity: { label: "unity", mark: "U", colors: ["#4b5563", "#9ca3af"] },
  csharp: { label: "c#", mark: "C#", colors: ["#68217a", "#9b4f96"] },
  figma: { label: "figma", mark: "Fg", colors: ["#a259ff", "#f24e1e"] },
  git: { label: "git + github", mark: "Gt", colors: ["#f05033", "#6e5494"] },
  vscode: { label: "vscode", mark: "Vs", colors: ["#71717a", "#a1a1aa"] },
} as const satisfies Record<string, TechDef>;

export type TechId = keyof typeof TECH;

/** Tecnologías destacadas en la ventana de inicio. */
export const HOME_TECH = ["typescript", "react", "nextjs", "tailwind", "python", "kotlin"] as const satisfies readonly TechId[];

/* ---------- proyectos ---------- */

type ProjectDef = {
  id: string;
  name: string;
  year: number;
  /** Captura con sus dimensiones reales, para mostrarla sin recortes en la vista de detalle. */
  image: { src: string; width: number; height: number };
  repo: ExternalUrl;
  /** Demo en vivo. Si no existe, el botón no se muestra. */
  demo?: ExternalUrl;
  tech: readonly TechId[];
  tone: Tone;
};

const PROJECT_LIST = [
  {
    id: "aura",
    name: "AURA",
    year: 2026,
    image: { src: "/assets/Juego.png", width: 1019, height: 576 },
    repo: "https://github.com/Kam24w/AURA",
    tech: ["unity", "csharp"],
    tone: "indigo",
  },
  {
    id: "wanderai",
    name: "WanderAI",
    year: 2026,
    image: { src: "/assets/WanderAI_app_mobile.png", width: 355, height: 492 },
    repo: "https://github.com/Kam24w/WanderAI",
    tech: ["kotlin", "compose"],
    tone: "sky",
  },
  {
    id: "vibra",
    name: "Vibra",
    year: 2026,
    image: { src: "/assets/Vibra_app_smartwach.png", width: 873, height: 488 },
    repo: "https://github.com/Kam24w/Vibra",
    tech: ["kotlin", "compose", "wearos"],
    tone: "sunset",
  },
  {
    id: "nexora",
    name: "Nexora",
    year: 2026,
    image: { src: "/assets/Nexora_app_pc.png", width: 855, height: 430 },
    repo: "https://github.com/Kam24w/Nexora",
    tech: ["python", "flask", "groq", "react", "typescript", "tailwind", "supabase"],
    tone: "teal",
  },
] as const satisfies readonly ProjectDef[];

export type ProjectId = (typeof PROJECT_LIST)[number]["id"];
export type Project = ProjectDef & { id: ProjectId };

/** Se expone con el tipo `Project` para que los campos opcionales (como `demo`) sean accesibles. */
export const PROJECTS: readonly Project[] = PROJECT_LIST;

export function isProjectId(value: unknown): value is ProjectId {
  return PROJECTS.some((project) => project.id === value);
}

/* ---------- ias ---------- */

type AiToolDef = { id: string; name: string; mark: string; tone: Tone };

export const AI_TOOLS = [
  { id: "chatgpt", name: "chatgpt", mark: "G", tone: "mint" },
  { id: "copilot", name: "github copilot", mark: "C", tone: "violet" },
  { id: "claude", name: "claude", mark: "Cl", tone: "clay" },
  { id: "v0", name: "v0", mark: "v0", tone: "ocean" },
] as const satisfies readonly AiToolDef[];

export type AiToolId = (typeof AI_TOOLS)[number]["id"];

/* ---------- stack ---------- */

type StackCategoryDef = { id: string; glyph: string; tone: Tone; items: readonly TechId[] };

export const STACK = [
  { id: "frontend", glyph: "</>", tone: "indigo", items: ["react", "nextjs", "tailwind", "typescript", "vite"] },
  { id: "backend", glyph: "{ }", tone: "forest", items: ["nodejs", "python", "flask", "rest", "postgresql", "supabase"] },
  { id: "mobile", glyph: "◎", tone: "ocean", items: ["kotlin", "compose", "wearos", "unity"] },
  { id: "design", glyph: "✦", tone: "figma", items: ["figma", "git", "vscode"] },
] as const satisfies readonly StackCategoryDef[];

export type StackCategoryId = (typeof STACK)[number]["id"];

/* ---------- testimonios ---------- */

type TestimonialDef = { id: string; image: string; tone: Tone };

export const TESTIMONIALS = [
  { id: "peer", image: "/assets/testimonio_1.png", tone: "indigo" },
  { id: "teacher", image: "/assets/testimonio_2.png", tone: "sky" },
  { id: "client", image: "/assets/testimonio_3.png", tone: "sunset" },
] as const satisfies readonly TestimonialDef[];

export type TestimonialId = (typeof TESTIMONIALS)[number]["id"];

/* ---------- trayectoria ---------- */

export type TimelineKind = "academic" | "work";

type TimelineDef = { id: string; kind: TimelineKind };

export const TIMELINE = [
  { id: "training", kind: "academic" },
  { id: "ui-project", kind: "academic" },
  { id: "freelance", kind: "work" },
] as const satisfies readonly TimelineDef[];

export type TimelineId = (typeof TIMELINE)[number]["id"];
