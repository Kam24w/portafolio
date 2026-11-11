import type { AppId } from "@/components/apps/registry";
import type {
  AiToolId,
  ProjectId,
  StackCategoryId,
  TestimonialId,
  TimelineId,
  TimelineKind,
} from "@/data/portfolio";

/**
 * Forma de todos los textos de la interfaz. Usar `Record<...Id, ...>`
 * hace que TypeScript marque error si a un idioma le falta (o le sobra)
 * un proyecto, testimonio, app, etc.
 */
export type Dictionary = {
  meta: { title: string; description: string };
  boot: {
    skip: string;
    /** Saludo según la hora del día (pantalla de bienvenida). */
    greetings: { morning: string; afternoon: string; evening: string };
    /** Pantalla tipo BIOS. `{n}` se reemplaza por un número. */
    post: {
      vendor: string;
      labels: { cpu: string; memory: string; apps: string; stack: string; network: string; location: string };
      values: { cpu: string; memory: string; apps: string };
      booting: string;
      hint: string;
    };
    /** Pantalla de bienvenida: estado mientras "inicia sesión". */
    welcome: string;
  };
  nav: {
    label: string;
    home: string;
    toggleTheme: string;
    /** Etiqueta accesible del botón de idioma (describe el cambio). */
    switchLanguage: string;
    /** Texto visible del botón de idioma (idioma de destino). */
    switchLanguageShort: string;
  };
  desktop: {
    label: string;
    openToWork: string;
    greeting: string;
    /** Tarjeta "disponible" junto a la foto: estado, invitación y etiqueta accesible (abre contacto). */
    availability: { status: string; title: string; action: string };
    /** Área de cada sticker flotante. */
    areas: { web: string; mobile: string; games: string; backend: string };
  };
  window: { close: string; minimize: string; maximize: string; restore: string };
  profile: { role: string; photoAlt: string; open: string };
  /** Botón de descarga del CV. */
  cv: { download: string; short: string; soon: string };
  /** Menú lateral de redes. */
  social: { label: string; github: string; linkedin: string; email: string };
  gallery: { title: string; previewOf: string };
  /** Reproductor de proyectos (widget estilo "sonando ahora"). */
  player: { label: string; play: string; pause: string; previous: string; next: string; soundOn: string; soundOff: string };
  apps: Record<AppId, string>;
  home: {
    title: string;
    intro: string;
    stats: { projects: string; areas: string; portfolio: string };
    note: string;
  };
  about: { title: string; paragraphs: readonly string[] };
  projects: {
    title: string;
    repository: string;
    /** Botón para abrir la ventana de detalle. */
    openDetail: string;
    detail: {
      problem: string;
      role: string;
      learnings: string;
      stack: string;
      liveDemo: string;
      sourceCode: string;
      share: string;
      linkCopied: string;
      video: string;
    };
    items: Record<
      ProjectId,
      {
        /** Resumen de una línea (tarjeta y encabezado del detalle). */
        description: string;
        platform: string;
        problem: string;
        role: string;
        learnings: readonly string[];
      }
    >;
  };
  ai: {
    title: string;
    intro: string;
    projectLabel: string;
    items: Record<AiToolId, { description: string; project: string }>;
  };
  stack: {
    title: string;
    intro: string;
    categories: Record<StackCategoryId, string>;
    note: string;
  };
  testimonials: {
    title: string;
    rating: string;
    items: Record<TestimonialId, { author: string; relation: string; quote: string }>;
  };
  timeline: {
    title: string;
    kinds: Record<TimelineKind, string>;
    items: Record<TimelineId, { period: string; title: string; description: string }>;
  };
  contact: {
    title: string;
    intro: string;
    emailHint: string;
    githubHint: string;
    linkedinHint: string;
  };
};
