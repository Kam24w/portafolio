// Toda la información del portafolio vive aquí.
// Edita este archivo para cambiar textos, proyectos y enlaces sin tocar los componentes.

export const profile = {
  name: "Frayder Camilo Lopez",
  role: "Desarrollador web",
  intro:
    "Construyo sitios y aplicaciones rápidas, claras y fáciles de usar.",
  email: "tucorreo@ejemplo.com",
  socials: [
    { label: "GitHub", href: "https://github.com/tu-usuario" },
    { label: "LinkedIn", href: "https://linkedin.com/in/tu-usuario" },
  ],
};

export const projects = [
  {
    year: "2026",
    name: "Nombre del proyecto 1",
    description:
      "EJEMPLO: describe en una frase qué problema resuelve y qué hiciste tú.",
    stack: "Next.js, TypeScript, Tailwind",
    href: "#",
  },
  {
    year: "2025",
    name: "Nombre del proyecto 2",
    description:
      "EJEMPLO: aplicación web con autenticación, panel de control y API propia.",
    stack: "React, Node.js, PostgreSQL",
    href: "#",
  },
  {
    year: "2025",
    name: "Nombre del proyecto 3",
    description:
      "EJEMPLO: sitio para un cliente real, con diseño responsive y buen rendimiento.",
    stack: "Next.js, Tailwind",
    href: "#",
  },
];

export const about = [
  "EJEMPLO: Soy Frayder Camilo Lopez. Me interesa crear productos web que se sientan sencillos de usar.",
  "EJEMPLO: Cuenta aquí qué estudias o estudiaste, qué te gusta aprender y qué tipo de proyectos buscas.",
];

export const skills = [
  { group: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "APIs REST", "SQL"] },
  { group: "Herramientas", items: ["Git", "GitHub", "VS Code", "Figma"] },
];

export const navLinks = [
  { id: "proyectos", label: "Proyectos" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "contacto", label: "Contacto" },
];
