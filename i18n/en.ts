import type { Dictionary } from "./types";

export const en = {
  meta: {
    title: "frayder camilo lopez · desktop",
    description:
      "interactive desktop-style portfolio of frayder camilo lopez, full stack developer in training.",
  },
  boot: {
    skip: "skip startup",
    greetings: { morning: "good morning", afternoon: "good afternoon", evening: "good evening" },
    post: {
      vendor: "FC-BIOS v2.0 · Frayder Camilo Systems",
      labels: {
        cpu: "processor",
        memory: "memory",
        apps: "applications",
        stack: "stack",
        network: "network",
        location: "location",
      },
      values: {
        cpu: "software engineering · full stack",
        memory: "{n} projects verified",
        apps: "{n} installed",
      },
      booting: "starting FRAYDER OS",
      hint: "press any key or click to skip",
    },
    welcome: "welcome",
  },
  nav: {
    label: "main navigation",
    home: "home",
    toggleTheme: "toggle theme",
    switchLanguage: "switch language to spanish",
    switchLanguageShort: "ES",
  },
  desktop: {
    label: "portfolio desktop",
    openToWork: "open to opportunities",
    greeting: "hi there, visitor!!",
    availability: {
      status: "available · 2026",
      title: "let's work together?",
      action: "open contact",
    },
    areas: { web: "web", mobile: "mobile", games: "games", backend: "backend" },
  },
  window: { close: "close", minimize: "minimize", maximize: "maximize", restore: "restore" },
  profile: { role: "full stack developer in training", photoAlt: "Frayder Camilo Lopez", open: "open about me" },
  cv: { download: "download resume", short: "cv", soon: "resume coming soon" },
  social: {
    label: "social & contact",
    github: "see my github",
    linkedin: "see my linkedin",
    email: "send me an email",
  },
  gallery: { title: "my projects", previewOf: "preview of" },
  player: {
    label: "now playing",
    play: "play",
    pause: "pause",
    previous: "previous project",
    next: "next project",
    soundOn: "turn on lofi music",
    soundOff: "mute music",
  },
  apps: {
    inicio: "home",
    "sobre-mi": "about me",
    proyectos: "projects",
    ias: "ai i use",
    plugins: "plugins",
    testimonios: "testimonials",
    trayectoria: "journey",
    contacto: "contact",
  },
  home: {
    title: "hi, i'm frayder.",
    intro:
      "full stack developer in training. i turn ideas into clear, functional digital experiences with a character of their own. this portfolio isn't scrolled: it's explored like a desktop.",
    stats: { projects: "projects", areas: "areas", portfolio: "portfolio" },
    note: "open apps from the dock below. drag the windows, minimize them and maximize them with a double click.",
  },
  about: {
    title: "the person behind the code",
    paragraphs: [
      "i'm frayder camilo lopez, a student and web developer in training. i care about visual detail as much as logic: an interface should work well and feel good.",
      "i enjoy learning new tools, solving problems with code and building projects that help me grow both technically and visually.",
    ],
  },
  projects: {
    title: "things i've built",
    repository: "view repository",
    openDetail: "view details",
    detail: {
      problem: "the problem",
      role: "my role",
      learnings: "what i learned",
      stack: "stack",
      liveDemo: "live demo",
      sourceCode: "code on github",
      share: "copy link",
      linkCopied: "link copied!",
      video: "promo video",
    },
    // DRAFT: keep in sync with the spanish version once reviewed.
    items: {
      aura: {
        description: "three-level video game built in unity with c#.",
        platform: "video game · unity",
        problem:
          "create a game experience with progression: three levels that ramp up in difficulty and keep the player exploring.",
        role: "end-to-end development: level design, gameplay logic in c# and visual setup with the universal render pipeline.",
        learnings: [
          "structuring game logic in c# scripts around unity's lifecycle",
          "handling player controls with the input system",
          "tuning lighting and materials with urp",
        ],
      },
      wanderai: {
        description: "ai-powered travel assistant for android.",
        platform: "android app",
        problem:
          "planning a trip means jumping between many apps; wanderai brings inspiration and recommendations together in one assistant.",
        role: "built the app in kotlin with jetpack compose: screens, navigation, camera and user preferences.",
        learnings: [
          "building declarative interfaces with jetpack compose and material 3",
          "integrating the phone camera with camerax",
          "persisting preferences with datastore",
        ],
      },
      vibra: {
        description: "smartwatch app that guides navigation through vibrations.",
        platform: "smartwatch · wear os",
        problem:
          "looking at your phone while walking is distracting; vibra points the way with vibration patterns on your wrist, no screen needed.",
        role: "built the wear os app in kotlin and compose, including the haptic patterns.",
        learnings: [
          "designing for small, round screens",
          "using haptics as an information channel",
          "connecting the watch and the phone through the wearable api",
        ],
      },
      nexora: {
        description: "automatic pc diagnosis that answers “why is it slow?”.",
        platform: "web + local agent",
        problem:
          "when a computer is slow, technical metrics mean nothing to most people; nexora collects them and turns them into likely causes and fixes.",
        role: "full stack development: python metrics collector, flask api, react + typescript + tailwind dashboard and supabase auth.",
        learnings: [
          "reading system metrics (cpu, ram, disk) with psutil",
          "using a language model through groq to explain the diagnosis in plain language",
          "connecting a vite frontend to a custom api and supabase",
        ],
      },
    },
  },
  ai: {
    title: "ai in my workflow",
    intro: "i don't use it to replace the process, but to speed it up and learn from it.",
    projectLabel: "project",
    items: {
      chatgpt: { description: "content ideation, writing and debugging", project: "personal projects" },
      copilot: { description: "smart autocomplete and in-editor suggestions", project: "personal projects" },
      claude: { description: "architecture review, documentation and prompt refinement", project: "portfolio" },
      v0: { description: "interface prototypes from text descriptions", project: "visual explorations" },
    },
  },
  stack: {
    title: "organized stack",
    intro: "the tools i use, grouped by what they do in a project.",
    categories: { frontend: "frontend", backend: "backend", mobile: "mobile & games", design: "design & workflow" },
    note: "html and css come preinstalled on this system.",
  },
  testimonials: {
    title: "what people say about my work",
    rating: "5 out of 5 stars",
    items: {
      peer: {
        author: "project teammate",
        relation: "academic collaboration",
        quote: "listens to the idea, organizes it and turns it into an interface that's easy to understand.",
      },
      teacher: {
        author: "teacher",
        relation: "interface design",
        quote: "stands out for a willingness to learn and for caring about the details of the final result.",
      },
      client: {
        author: "project client",
        relation: "digital product development",
        quote: "understood the idea and turned it into an attractive, clear experience that's easy to explore.",
      },
    },
  },
  timeline: {
    title: "experience that keeps growing",
    kinds: { academic: "academic", work: "work" },
    items: {
      training: {
        period: "2025 — present",
        title: "web development training",
        description: "building responsive interfaces with react, next.js, typescript and tailwind.",
      },
      "ui-project": {
        period: "2025",
        title: "interface design project",
        description: "design and development of a complete web experience, from structure to launch.",
      },
      freelance: {
        period: "2024 — 2025",
        title: "freelance project practice",
        description: "building informational sites and digital prototypes tailored to different needs.",
      },
    },
  },
  contact: {
    title: "got an idea?",
    intro: "tell me what you have in mind and let's build something that works.",
    emailHint: "write me",
    githubHint: "code",
    linkedinHint: "network",
  },
} as const satisfies Dictionary;
