import type { PortfolioContent } from "./types";

export const content: PortfolioContent = {
  profile: {
    name: "Frayder Camilo Lopez",
    initials: "FC",
    role: "Desarrollador web en formación",
    intro: "Creo experiencias digitales claras, funcionales y pensadas para las personas que las usan.",
    email: "freydercl2004@gmail.com",
    socials: [
      { label: "GitHub", href: "https://github.com/" },
      { label: "LinkedIn", href: "https://linkedin.com/" },
    ],
  },
  navLinks: [
    { id: "inicio", label: "Inicio" },
    { id: "sobre-mi", label: "Sobre mí" },
    { id: "proyectos", label: "Proyectos" },
    { id: "testimonios", label: "Testimonios" },
    { id: "experiencia", label: "Experiencia" },
    { id: "contacto", label: "Contacto" },
  ],
  hero: {
    player: "JUGADOR 01",
    status: "LISTO PARA CREAR",
    titleBefore: "Diseño y código",
    titleAccent: "con intención.",
    explore: "EXPLORAR PROYECTOS",
    profile: "VER PERFIL",
    imageAlt: "Camilo Lopez, desarrollador web",
    imageCaption: "Ideas que se vuelven experiencias.",
  },
  about: {
    eyebrow: "03 · La persona detrás del código",
    title: "Sobre mí",
    skillsLabel: "Tecnologías y herramientas",
    paragraphs: [
      "Soy Frayder Camilo Lopez, estudiante y desarrollador web en formación. Me interesa transformar ideas en interfaces sencillas, ordenadas y agradables de usar.",
      "Disfruto aprender nuevas herramientas, resolver problemas con código y construir proyectos que me permitan crecer tanto en lo técnico como en lo visual.",
    ],
  },
  projects: {
    eyebrow: "04 · Proyectos seleccionados",
    title: "Cosas que he construido.",
    description: "Una galería de ideas convertidas en experiencias digitales.",
    imageAlt: "Vista previa de",
    slideHint: "← desliza para explorar →",
    items: [
      {
        year: "2026",
        name: "Portafolio personal",
        description: "Sitio responsive para presentar mi perfil, proyectos y proceso de aprendizaje.",
        stack: "Next.js, TypeScript, Tailwind",
        image: "/perfil.jpe",
        github: "https://github.com/",
        demo: "https://structure-portfolio.vercel.app/",
      },
      {
        year: "2025",
        name: "Panel de tareas",
        description: "Aplicación para organizar pendientes, prioridades y avances de un equipo.",
        stack: "React, Node.js, PostgreSQL",
        image: "/hero-camilo.png",
        github: "https://github.com/",
        demo: "#contacto",
      },
      {
        year: "2025",
        name: "GALERO",
        description: "Landing page enfocada en comunicar una propuesta de valor y generar contactos.",
        stack: "Next.js, Tailwind",
        image: "/galero.png",
        github: "https://github.com/",
        demo: "#contacto",
      },
    ],
  },
  testimonials: {
    eyebrow: "05 · Confianza",
    title: "Lo que dicen de mi trabajo.",
    imageAlt: "Foto de",
    items: [
      { quote: "Frayder escucha la idea, la organiza y la convierte en una interfaz fácil de entender.", name: "Compañero de proyecto", role: "Colaborador académico", image: "/perfil.jpe" },
      { quote: "Se destaca por su disposición para aprender y por cuidar los detalles del resultado final.", name: "Docente", role: "Diseño de interfaces", image: "/hero-camilo.png" },
      { quote: "Frayder entendió la esencia de Galero y la convirtió en una tienda online de ropa atractiva, clara y fácil de recorrer. El resultado representa muy bien la marca.", name: "Galero", role: "E-commerce de ropa · Cliente", image: "/galero.png" },
    ],
  },
  experience: {
    eyebrow: "06 · Trayectoria",
    title: "Experiencia que sigue creciendo.",
    items: [
      { period: "2025 — Actualidad", title: "Formación en desarrollo web", place: "Aprendizaje académico y proyectos personales", description: "Construcción de interfaces responsive con React, Next.js, TypeScript y Tailwind CSS.", type: "Académica" },
      { period: "2025", title: "Proyecto de diseño de interfaces", place: "Proyecto académico", description: "Diseño y desarrollo de una experiencia web completa, desde la estructura hasta su publicación.", type: "Académica" },
      { period: "2024 — 2025", title: "Práctica de proyectos freelance", place: "Proyectos independientes", description: "Creación de sitios informativos y prototipos digitales adaptados a distintas necesidades.", type: "Laboral" },
    ],
  },
  contact: {
    eyebrow: "08 · Hablemos",
    title: "¿Tienes una idea?",
    description: "Cuéntame qué tienes en mente y construyamos algo que funcione.",
  },
  skills: {
    eyebrow: "07 · Sección adicional",
    title: "Mi caja de herramientas.",
    description: "Tecnologías y herramientas que uso para convertir conceptos en productos digitales.",
    groups: [
      { group: "Frontend", items: [{ name: "HTML", mark: "5", tone: "text-orange-500" }, { name: "CSS", mark: "#", tone: "text-blue-500" }, { name: "JavaScript", mark: "JS", tone: "text-yellow-500" }, { name: "TypeScript", mark: "TS", tone: "text-blue-600" }, { name: "React", mark: "⚛", tone: "text-cyan-500" }, { name: "Next.js", mark: "N", tone: "text-ink" }, { name: "Tailwind", mark: "≋", tone: "text-cyan-500" }] },
      { group: "Backend", items: [{ name: "Node.js", mark: "JS", tone: "text-green-600" }, { name: "APIs REST", mark: "↔", tone: "text-signal" }, { name: "SQL", mark: "DB", tone: "text-violet-500" }] },
      { group: "Herramientas", items: [{ name: "Git", mark: "●", tone: "text-orange-600" }, { name: "GitHub", mark: "◉", tone: "text-ink" }, { name: "VS Code", mark: "⌘", tone: "text-blue-500" }, { name: "Figma", mark: "◆", tone: "text-pink-500" }] },
    ],
  },
  footer: "Hecho con Next.js · TypeScript · Tailwind CSS",
  header: { online: "SISTEMA EN LÍNEA", profileLabel: "PERFIL DEL JUGADOR", language: "Idioma", skipToContent: "Saltar al contenido", menu: "Menú", close: "Cerrar", navigation: "Principal", contact: "Hablemos ↗" },
};
