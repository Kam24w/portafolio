/**
 * Textos propios del CV (lo que no está en el sitio). Proyectos, stack,
 * experiencia e IAs se leen de data/portfolio.ts e i18n/, así que el CV
 * siempre coincide con el portafolio.
 *
 * REVISAR: educación e idiomas se dedujeron de tu CV de referencia
 * ("ING: SOFTWARE", correo @campusucc.edu.co). Ajústalos si algo no es exacto.
 */
import type { Locale } from "../../i18n/config.ts";

export type CvContent = {
  role: string;
  summary: string;
  sections: {
    contact: string;
    profile: string;
    projects: string;
    experience: string;
    education: string;
    stack: string;
    ai: string;
    softSkills: string;
    languages: string;
  };
  repository: string;
  education: readonly { title: string; place: string; period: string }[];
  softSkills: readonly string[];
  languages: readonly { name: string; level: string }[];
  footer: string;
};

export const CV_CONTENT = {
  es: {
    role: "Full Stack Developer · Ingeniería de Software",
    summary:
      "Desarrollador full stack en formación y estudiante de Ingeniería de Software. Construyo productos completos en web, móvil y videojuegos: interfaces con React y Next.js, apps Android y Wear OS con Kotlin, backends en Python y experiencias en Unity. Me importa tanto el detalle visual como la lógica: una interfaz debe funcionar bien y sentirse bien.",
    sections: {
      contact: "Contacto",
      profile: "Perfil",
      projects: "Proyectos destacados",
      experience: "Experiencia",
      education: "Educación",
      stack: "Stack técnico",
      ai: "IA en mi flujo",
      softSkills: "Habilidades",
      languages: "Idiomas",
    },
    repository: "Ver repositorio",
    education: [
      { title: "Ingeniería de Software", place: "Universidad Cooperativa de Colombia", period: "En curso" },
    ],
    softSkills: [
      "Comunicación asertiva",
      "Trabajo en equipo",
      "Resolución de problemas",
      "Atención al detalle",
      "Aprendizaje autónomo",
    ],
    languages: [{ name: "Español", level: "Nativo" }],
    footer: "Proyectos, código y más en mi portafolio interactivo",
  },
  en: {
    role: "Full Stack Developer · Software Engineering",
    summary:
      "Full stack developer in training and Software Engineering student. I build complete products across web, mobile and games: interfaces with React and Next.js, Android and Wear OS apps with Kotlin, Python backends and Unity experiences. I care about visual detail as much as logic: an interface should work well and feel good.",
    sections: {
      contact: "Contact",
      profile: "Profile",
      projects: "Featured projects",
      experience: "Experience",
      education: "Education",
      stack: "Tech stack",
      ai: "AI in my workflow",
      softSkills: "Skills",
      languages: "Languages",
    },
    repository: "View repository",
    education: [
      { title: "Software Engineering", place: "Universidad Cooperativa de Colombia", period: "In progress" },
    ],
    softSkills: [
      "Assertive communication",
      "Teamwork",
      "Problem solving",
      "Attention to detail",
      "Self-directed learning",
    ],
    languages: [{ name: "Spanish", level: "Native" }],
    footer: "Projects, code and more in my interactive portfolio",
  },
} as const satisfies Record<Locale, CvContent>;
