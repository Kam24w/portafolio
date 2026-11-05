import type { PortfolioContent } from "./types";
import { content as spanish } from "./es";

export const content: PortfolioContent = {
  ...spanish,
  profile: { ...spanish.profile, role: "Web developer in training", intro: "I create clear, functional digital experiences designed for the people who use them." },
  navLinks: [
    { id: "inicio", label: "Home" },
    { id: "sobre-mi", label: "About me" },
    { id: "proyectos", label: "Projects" },
    { id: "testimonios", label: "Testimonials" },
    { id: "experiencia", label: "Experience" },
    { id: "contacto", label: "Contact" },
  ],
  hero: { player: "PLAYER 01", status: "READY TO CREATE", titleBefore: "Design and code", titleAccent: "with intention.", explore: "START EXPLORING", profile: "VIEW PROFILE", imageAlt: "Camilo Lopez, web developer", imageCaption: "Ideas becoming experiences." },
  about: { eyebrow: "03 · The person behind the code", title: "About me", skillsLabel: "Technologies and tools", paragraphs: ["I am Frayder Camilo Lopez, a student and web developer in training. I enjoy turning ideas into simple, organized, and pleasant interfaces.", "I enjoy learning new tools, solving problems with code, and building projects that help me grow both technically and visually."] },
  projects: { ...spanish.projects, eyebrow: "04 · Selected projects", title: "Things I have built.", description: "A gallery of ideas turned into digital experiences.", imageAlt: "Preview of", slideHint: "← slide to explore →", items: [{ ...spanish.projects.items[0], name: "Personal portfolio", description: "Responsive site to present my profile, projects, and learning process." }, { ...spanish.projects.items[1], name: "Task dashboard", description: "Application to organize a team's tasks, priorities, and progress." }, { ...spanish.projects.items[2], description: "Landing page focused on communicating a value proposition and generating contacts." }] },
  testimonials: { ...spanish.testimonials, eyebrow: "05 · Trust", title: "What people say about my work.", imageAlt: "Photo of", items: [{ ...spanish.testimonials.items[0], quote: "Frayder listens to the idea, organizes it, and turns it into an easy-to-understand interface.", name: "Project teammate", role: "Academic collaborator" }, { ...spanish.testimonials.items[1], quote: "He stands out for his willingness to learn and his attention to the details of the final result.", name: "Teacher", role: "Interface design" }, { ...spanish.testimonials.items[2], quote: "Frayder understood the essence of Galero and turned it into an attractive, clear, and easy-to-browse online clothing store.", role: "Clothing e-commerce · Client" }] },
  experience: { ...spanish.experience, eyebrow: "06 · Journey", title: "Experience that keeps growing.", items: [{ ...spanish.experience.items[0], title: "Web development training", place: "Academic learning and personal projects", description: "Building responsive interfaces with React, Next.js, TypeScript, and Tailwind CSS.", type: "Academic" }, { ...spanish.experience.items[1], title: "Interface design project", place: "Academic project", description: "Design and development of a complete web experience, from structure to publication.", type: "Academic" }, { ...spanish.experience.items[2], title: "Freelance project practice", place: "Independent projects", description: "Creating informative sites and digital prototypes adapted to different needs.", type: "Professional" }] },
  contact: { eyebrow: "08 · Let's talk", title: "Do you have an idea?", description: "Tell me what you have in mind and let's build something that works." },
  skills: { ...spanish.skills, eyebrow: "07 · Additional section", title: "My toolbox.", description: "Technologies and tools I use to turn concepts into digital products.", groups: [{ ...spanish.skills.groups[0] }, { ...spanish.skills.groups[1] }, { ...spanish.skills.groups[2], group: "Tools" }] },
  footer: "Built with Next.js · TypeScript · Tailwind CSS",
  header: { online: "SYSTEM ONLINE", profileLabel: "PLAYER PROFILE", language: "Language", menu: "Menu", close: "Close", navigation: "Main", contact: "Let's talk ↗" },
};
