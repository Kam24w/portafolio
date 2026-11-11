import type { Dictionary } from "./types";

export const es = {
  meta: {
    title: "frayder camilo lopez · escritorio",
    description:
      "portafolio interactivo estilo escritorio de frayder camilo lopez, desarrollador full stack en formación.",
  },
  boot: {
    skip: "omitir arranque",
    greetings: { morning: "buenos días", afternoon: "buenas tardes", evening: "buenas noches" },
    post: {
      vendor: "FC-BIOS v2.0 · Frayder Camilo Systems",
      labels: {
        cpu: "procesador",
        memory: "memoria",
        apps: "aplicaciones",
        stack: "stack",
        network: "red",
        location: "ubicación",
      },
      values: {
        cpu: "ingeniería de software · full stack",
        memory: "{n} proyectos verificados",
        apps: "{n} instaladas",
      },
      booting: "iniciando FRAYDER OS",
      hint: "pulsa cualquier tecla o haz clic para omitir",
    },
    welcome: "bienvenido",
  },
  nav: {
    label: "navegación principal",
    home: "inicio",
    toggleTheme: "cambiar tema",
    switchLanguage: "cambiar idioma a inglés",
    switchLanguageShort: "EN",
  },
  desktop: {
    label: "escritorio del portafolio",
    openToWork: "abierto a oportunidades",
    greeting: "¡hola, visitante!!",
    availability: {
      status: "disponible · 2026",
      title: "¿trabajamos juntos?",
      action: "abrir contacto",
    },
    areas: { web: "web", mobile: "móvil", games: "juegos", backend: "backend" },
  },
  window: { close: "cerrar", minimize: "minimizar", maximize: "maximizar", restore: "restaurar" },
  profile: { role: "full stack developer en formación", photoAlt: "Frayder Camilo Lopez", open: "abrir sobre mí" },
  cv: { download: "descargar cv", short: "cv", soon: "cv disponible pronto" },
  social: {
    label: "redes y contacto",
    github: "ver mi github",
    linkedin: "ver mi linkedin",
    email: "escribirme un correo",
  },
  gallery: { title: "mis proyectos", previewOf: "vista previa de" },
  player: {
    label: "sonando ahora",
    play: "reproducir",
    pause: "pausar",
    previous: "proyecto anterior",
    next: "siguiente proyecto",
    soundOn: "activar música lofi",
    soundOff: "silenciar música",
  },
  apps: {
    inicio: "inicio",
    "sobre-mi": "sobre mí",
    proyectos: "proyectos",
    ias: "ias que uso",
    plugins: "plugins",
    testimonios: "testimonios",
    trayectoria: "trayectoria",
    contacto: "contacto",
  },
  home: {
    title: "hola, soy frayder.",
    intro:
      "desarrollador full stack en formación. convierto ideas en experiencias digitales claras, funcionales y con carácter propio. este portafolio no se baja: se explora como un escritorio.",
    stats: { projects: "proyectos", areas: "áreas", portfolio: "portafolio" },
    note: "abre las apps desde el dock de abajo. arrastra las ventanas, minimízalas y maximízalas con doble clic.",
  },
  about: {
    title: "la persona detrás del código",
    paragraphs: [
      "soy frayder camilo lopez, estudiante y desarrollador web en formación. me interesa el detalle visual tanto como la lógica: una interfaz debe funcionar bien y sentirse bien.",
      "disfruto aprender nuevas herramientas, resolver problemas con código y construir proyectos que me hagan crecer en lo técnico y en lo visual.",
    ],
  },
  projects: {
    title: "cosas que he construido",
    repository: "ver repositorio",
    openDetail: "ver detalle",
    detail: {
      problem: "el problema",
      role: "mi rol",
      learnings: "lo que aprendí",
      stack: "stack",
      liveDemo: "demo en vivo",
      sourceCode: "código en github",
      share: "copiar enlace",
      linkCopied: "¡enlace copiado!",
    },
    // BORRADOR: problema, rol y aprendizajes se redactaron a partir del código de cada
    // repositorio. Revísalos y ajústalos a tu experiencia real.
    items: {
      aura: {
        description: "videojuego de tres niveles desarrollado en unity con c#.",
        platform: "videojuego · unity",
        problem:
          "crear una experiencia de juego con progresión: tres niveles que suben en dificultad y mantienen al jugador explorando.",
        role: "desarrollo completo: diseño de los niveles, lógica de juego en c# y configuración visual con universal render pipeline.",
        learnings: [
          "organizar la lógica de un juego en scripts de c# sobre el ciclo de vida de unity",
          "manejar los controles del jugador con el input system",
          "ajustar iluminación y materiales con urp",
        ],
      },
      wanderai: {
        description: "asistente de viajes con inteligencia artificial para android.",
        platform: "app android",
        problem:
          "planear un viaje obliga a saltar entre muchas apps; wanderai reúne la inspiración y las recomendaciones en un solo asistente.",
        role: "desarrollo de la app en kotlin con jetpack compose: pantallas, navegación, cámara y preferencias del usuario.",
        learnings: [
          "construir interfaces declarativas con jetpack compose y material 3",
          "integrar la cámara del teléfono con camerax",
          "guardar preferencias de forma persistente con datastore",
        ],
      },
      vibra: {
        description: "app para smartwatch que guía la navegación mediante vibraciones.",
        platform: "smartwatch · wear os",
        problem:
          "mirar el celular mientras caminas distrae; vibra indica el camino con patrones de vibración en la muñeca, sin mirar la pantalla.",
        role: "desarrollo de la app para wear os en kotlin y compose, incluidos los patrones hápticos.",
        learnings: [
          "diseñar para pantallas pequeñas y redondas",
          "usar la háptica como canal de información",
          "comunicar el reloj con el teléfono mediante la wearable api",
        ],
      },
      nexora: {
        description: "diagnóstico automático del pc que responde «¿por qué está lento?».",
        platform: "web + agente local",
        problem:
          "cuando el computador va lento, las métricas técnicas no le dicen nada a la mayoría; nexora las recoge y las traduce en causas probables y soluciones.",
        role: "desarrollo full stack: recolector de métricas en python, api con flask, panel en react + typescript + tailwind y autenticación con supabase.",
        learnings: [
          "leer métricas del sistema (cpu, ram, disco) con psutil",
          "usar un modelo de lenguaje vía groq para explicar el diagnóstico en lenguaje natural",
          "conectar un frontend en vite con una api propia y supabase",
        ],
      },
    },
  },
  ai: {
    title: "ias en mi flujo de trabajo",
    intro: "no las uso para reemplazar el proceso, sino para acelerarlo y aprender de él.",
    projectLabel: "proyecto",
    items: {
      chatgpt: {
        description: "ideación de contenido, redacción y depuración de errores",
        project: "proyectos personales",
      },
      copilot: {
        description: "autocompletado inteligente y sugerencias en el editor",
        project: "proyectos personales",
      },
      claude: {
        description: "revisión de arquitectura, documentación y mejora de prompts",
        project: "portafolio",
      },
      v0: { description: "prototipos de interfaz a partir de descripciones", project: "exploraciones visuales" },
    },
  },
  stack: {
    title: "stack organizado",
    intro: "las herramientas que uso, agrupadas por lo que hacen en el proyecto.",
    categories: { frontend: "frontend", backend: "backend", mobile: "móvil y juegos", design: "diseño y flujo" },
    note: "html y css vienen de fábrica en este sistema.",
  },
  testimonials: {
    title: "lo que dicen de mi trabajo",
    rating: "5 de 5 estrellas",
    items: {
      peer: {
        author: "compañero de proyecto",
        relation: "colaboración académica",
        quote: "escucha la idea, la organiza y la convierte en una interfaz fácil de entender.",
      },
      teacher: {
        author: "docente",
        relation: "diseño de interfaces",
        quote: "se destaca por su disposición para aprender y por cuidar los detalles del resultado final.",
      },
      client: {
        author: "cliente de proyecto",
        relation: "desarrollo de producto digital",
        quote: "entendió la idea y la convirtió en una experiencia atractiva, clara y fácil de recorrer.",
      },
    },
  },
  timeline: {
    title: "experiencia que sigue creciendo",
    kinds: { academic: "académica", work: "laboral" },
    items: {
      training: {
        period: "2025 — actualidad",
        title: "formación en desarrollo web",
        description: "construcción de interfaces responsive con react, next.js, typescript y tailwind.",
      },
      "ui-project": {
        period: "2025",
        title: "proyecto de diseño de interfaces",
        description: "diseño y desarrollo de una experiencia web completa, de la estructura a su publicación.",
      },
      freelance: {
        period: "2024 — 2025",
        title: "práctica de proyectos freelance",
        description: "creación de sitios informativos y prototipos digitales adaptados a distintas necesidades.",
      },
    },
  },
  contact: {
    title: "¿tienes una idea?",
    intro: "cuéntame qué tienes en mente y construyamos algo que funcione.",
    emailHint: "escríbeme",
    githubHint: "código",
    linkedinHint: "red",
  },
} as const satisfies Dictionary;
