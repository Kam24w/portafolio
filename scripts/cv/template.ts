/**
 * Plantilla HTML del CV: 2 hojas A4.
 *   Hoja 1 → lateral: foto, contacto, habilidades, idiomas · principal: nombre, perfil, experiencia, educación.
 *   Hoja 2 → lateral: stack técnico, IA · principal: proyectos destacados.
 *
 * Paleta azul marino + azul/cian (sin morado). El texto va en colores sólidos
 * (no degradados recortados) para que se vea igual en cualquier visor de PDF.
 */
import { AI_TOOLS, PROFILE, PROJECTS, STACK, TECH, TIMELINE } from "../../data/portfolio.ts";
import { localize, type Locale } from "../../i18n/config.ts";
import { en } from "../../i18n/en.ts";
import { es } from "../../i18n/es.ts";
import { CV_CONTENT } from "./content.ts";

const DICTIONARIES = { es, en } as const;

/** En el sitio los nombres van en minúsculas por estilo; en el CV, con su ortografía oficial. */
const AI_DISPLAY_NAMES: Record<string, string> = {
  chatgpt: "ChatGPT",
  copilot: "GitHub Copilot",
  claude: "Claude",
  v0: "v0",
};

/** Tonos de azul para los íconos de IA (en lugar de los colores del sitio). */
const AI_COLORS = ["#1f6feb", "#0ea5c6", "#2b4c7e", "#38bdf8"] as const;

const ICONS = {
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
  linkedin:
    '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  github:
    '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/>',
} as const;

/* ---------- utilidades ---------- */

const esc = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Los textos del sitio van en minúsculas por estilo; en el CV empiezan con mayúscula. */
const sentence = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** "pasto, nariño, colombia" → "Pasto, Nariño, Colombia" */
const titleCase = (text: string) => text.split(" ").map(sentence).join(" ");

const icon = (name: keyof typeof ICONS) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;

/* ---------- estilos ---------- */

const STYLES = `
  @page { size: A4; margin: 0; }
  :root {
    --navy: #0e2440; --ink: #10213a; --muted: #5a6478; --line: #e1e8f2; --soft: #eef4fd;
    --accent: #1f6feb; --accent-2: #0ea5c6;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: Inter, system-ui, sans-serif; color: var(--ink); font-size: 9.4pt; line-height: 1.6;
         -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  a { color: inherit; text-decoration: none; }

  .page { display: grid; grid-template-columns: 68mm 1fr; width: 210mm; height: 297mm; overflow: hidden; break-after: page; }
  .page:last-child { break-after: auto; }

  /* ---------- lateral ---------- */
  .side { background: var(--navy); color: #e6edf7; padding: 14mm 8mm 12mm; position: relative; overflow: hidden; }
  .side::before { content: ""; position: absolute; width: 100mm; height: 100mm; top: -40mm; left: -35mm; border-radius: 50%;
                  background: radial-gradient(closest-side, rgba(31,111,235,.45), transparent); }
  .side::after { content: ""; position: absolute; width: 90mm; height: 90mm; bottom: -40mm; right: -40mm; border-radius: 50%;
                 background: radial-gradient(closest-side, rgba(14,165,198,.3), transparent); }
  .side > * { position: relative; z-index: 1; }
  .photo { width: 44mm; height: 44mm; margin: 0 auto 10mm; border-radius: 50%; padding: 1.3mm;
           background: conic-gradient(from 210deg, #1f6feb, #38bdf8, #0ea5c6, #1f6feb); }
  .photo div { width: 100%; height: 100%; border-radius: 50%; overflow: hidden; position: relative;
               background: linear-gradient(165deg, #dbeafe, #3b82f6); }
  .photo img { position: absolute; width: 112%; left: 50%; top: 4%; transform: translateX(-50%); }

  .side section + section { margin-top: 9mm; }
  .side h3 { font: 700 8.4pt "Space Grotesk", sans-serif; letter-spacing: .22em; text-transform: uppercase;
             color: #7dd3fc; margin-bottom: 4mm; display: flex; align-items: center; gap: 2.5mm; }
  .side h3::after { content: ""; flex: 1; height: 1px; background: linear-gradient(90deg, rgba(125,211,252,.45), transparent); }

  .contact { list-style: none; display: grid; gap: 3.2mm; }
  .contact li { display: flex; align-items: center; gap: 3mm; font-size: 8.6pt; line-height: 1.3; overflow-wrap: anywhere; }
  .contact .ico { flex: none; width: 7.4mm; height: 7.4mm; border-radius: 50%; display: grid; place-items: center;
                  background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.14); color: #7dd3fc; }
  .contact svg { width: 3.8mm; height: 3.8mm; }

  .bullets { list-style: none; display: grid; gap: 2.4mm; }
  .bullets li { display: flex; align-items: center; gap: 2.6mm; font-size: 9pt; }
  .bullets li::before { content: ""; flex: none; width: 1.6mm; height: 1.6mm; border-radius: 50%; background: #38bdf8; }

  .lang { display: flex; justify-content: space-between; font-size: 9pt; }
  .lang span:last-child { color: #7dd3fc; }

  .stack-group + .stack-group { margin-top: 5mm; }
  .stack-group h5 { font: 600 9pt Inter, sans-serif; color: #fff; margin-bottom: 2.4mm; }
  .chips { display: flex; flex-wrap: wrap; gap: 1.8mm; }
  .chip { display: inline-flex; align-items: center; gap: 1.5mm; font-size: 7.8pt; font-weight: 500; line-height: 1.4;
          padding: .8mm 2.6mm; border-radius: 99px; background: var(--soft); border: 1px solid var(--line); color: #2c3b52; white-space: nowrap; }
  .chip i { width: 1.8mm; height: 1.8mm; border-radius: .6mm; }
  .chip-dark { background: rgba(255,255,255,.07); border-color: rgba(255,255,255,.14); color: #e6edf7; }

  .ai { list-style: none; display: grid; gap: 4mm; }
  .ai li { display: flex; gap: 3mm; align-items: flex-start; }
  .ai-mark { flex: none; width: 7.6mm; height: 7.6mm; border-radius: 2mm; display: grid; place-items: center;
             font: 700 7.2pt "Space Grotesk", sans-serif; color: #fff; }
  .ai b { display: block; font-size: 9pt; color: #fff; line-height: 1.3; }
  .ai small { display: block; font-size: 8pt; color: #a9b8cc; line-height: 1.45; margin-top: .6mm; }

  /* ---------- principal ---------- */
  .main { padding: 16mm 14mm 11mm 13mm; display: flex; flex-direction: column; }
  .name { line-height: .9; }
  .name .first { display: block; font: 700 40pt "Space Grotesk", sans-serif; letter-spacing: -.04em; text-transform: uppercase; color: var(--navy); }
  .name .last { display: block; font: italic 30pt "Instrument Serif", serif; color: var(--accent); margin: 1.5mm 0 0 1.5mm; }
  .role { margin-top: 5mm; font: 600 8.8pt "Space Grotesk", sans-serif; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); }
  .rule { height: 1.2mm; width: 28mm; margin-top: 5mm; border-radius: 99px; background: linear-gradient(90deg, var(--accent), var(--accent-2)); }

  .main section { margin-top: 10mm; }
  .main h3 { font: 700 9.6pt "Space Grotesk", sans-serif; letter-spacing: .2em; text-transform: uppercase; color: var(--accent);
             margin-bottom: 4.5mm; display: flex; align-items: center; gap: 3mm; }
  .main h3::after { content: ""; flex: 1; height: 1px; background: var(--line); }
  .summary { color: #2c3b52; font-size: 9.8pt; line-height: 1.7; }

  .timeline { list-style: none; position: relative; padding-left: 7mm; }
  .timeline::before { content: ""; position: absolute; left: 1.5mm; top: 2mm; bottom: 2mm; width: .6mm; border-radius: 99px;
                      background: linear-gradient(180deg, var(--accent), var(--accent-2) 75%, transparent); }
  .timeline li { position: relative; }
  .timeline li + li { margin-top: 7mm; }
  .timeline li::before { content: ""; position: absolute; left: -7mm; top: 1.2mm; width: 3.4mm; height: 3.4mm; border-radius: 50%;
                         background: #fff; border: .8mm solid var(--accent); }
  .tl-head { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; }
  .tl-head h4 { font: 700 10.6pt "Space Grotesk", sans-serif; color: var(--navy); }
  .period { font-size: 8.4pt; font-weight: 500; color: var(--muted); white-space: nowrap; }
  .badge { display: inline-block; font-size: 7.4pt; font-weight: 600; padding: .4mm 2.4mm; border-radius: 99px; margin: 1.6mm 0 1.8mm; }
  .badge-academic { background: #e3eefe; color: #1659c7; }
  .badge-work { background: #ddf5ea; color: #137a4b; }
  .timeline p { font-size: 9.2pt; color: #2c3b52; }

  .edu { display: flex; justify-content: space-between; align-items: baseline; gap: 4mm; }
  .edu h4 { font: 700 10.6pt "Space Grotesk", sans-serif; color: var(--navy); }
  .edu small { display: block; font-size: 9pt; color: var(--muted); margin-top: .8mm; }

  .page-2 .main { padding-top: 12mm; }
  .page-2 .main section { margin-top: 6mm; }
  .page-head { display: flex; justify-content: space-between; align-items: baseline; padding-bottom: 4mm; border-bottom: 1px solid var(--line); }
  .page-head b { font: 700 13pt "Space Grotesk", sans-serif; color: var(--navy); }
  .page-head span { font-size: 8.4pt; color: var(--muted); }

  .projects { display: grid; gap: 4mm; }
  .project { border: 1px solid var(--line); border-left: 1.4mm solid var(--accent); border-radius: 3mm; padding: 3.6mm 4.6mm; background: #fbfdff; }
  .project:nth-child(even) { border-left-color: var(--accent-2); }
  .project-head { display: flex; align-items: center; gap: 3mm; }
  .project h4 { font: 700 12pt "Space Grotesk", sans-serif; color: var(--navy); }
  .platform { font-size: 7.6pt; font-weight: 600; color: #1659c7; background: #e3eefe; padding: .5mm 2.6mm; border-radius: 99px; white-space: nowrap; }
  .repo { margin-left: auto; display: inline-flex; align-items: center; gap: 1.4mm; font-size: 8pt; font-weight: 600; color: var(--accent); white-space: nowrap; }
  .repo svg { width: 3.4mm; height: 3.4mm; }
  .project .lead { margin-top: 1.4mm; font-size: 9.2pt; line-height: 1.5; color: #2c3b52; }
  .project-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 5mm; margin: 2.6mm 0 2.4mm; }
  .project-cols h5 { font: 700 7.6pt "Space Grotesk", sans-serif; letter-spacing: .16em; text-transform: uppercase; color: var(--muted); margin-bottom: 1mm; }
  .project-cols p { font-size: 8.4pt; color: #2c3b52; line-height: 1.45; }

  .footer { margin-top: auto; padding-top: 4mm; display: flex; align-items: center; justify-content: space-between;
            font-size: 8pt; color: var(--muted); border-top: 1px solid var(--line); }
  .footer b { color: var(--accent); font-weight: 600; }
`;

/* ---------- HTML ---------- */

export function buildHtml(locale: Locale, photoDataUrl: string): string {
  const t = DICTIONARIES[locale];
  const cv = CV_CONTENT[locale];
  const [firstName, ...lastNames] = PROFILE.name.split(" ");
  const fullName = titleCase(PROFILE.name);
  const portfolioUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const pageLabel = (n: number) => `${n} / 2`;

  const contact = [
    { icon: icon("mail"), label: PROFILE.email, href: `mailto:${PROFILE.email}` },
    { icon: icon("linkedin"), label: PROFILE.linkedin.label.replace("linkedin.com", ""), href: PROFILE.linkedin.href }, // el ícono ya dice "LinkedIn": así cabe en una línea
    { icon: icon("github"), label: PROFILE.github.label, href: PROFILE.github.href },
    ...(portfolioUrl ? [{ icon: icon("globe"), label: portfolioUrl.replace(/^https?:\/\//, ""), href: portfolioUrl }] : []),
    { icon: icon("pin"), label: titleCase(PROFILE.location.split("·")[0].trim()), href: null },
  ]
    .map((item) => {
      const body = `<span class="ico">${item.icon}</span><span>${esc(item.label)}</span>`;
      return `<li>${item.href ? `<a href="${item.href}" style="display:contents">${body}</a>` : body}</li>`;
    })
    .join("");

  const techChip = (id: keyof typeof TECH, dark = false) => {
    const tech = TECH[id];
    return `<span class="chip ${dark ? "chip-dark" : ""}"><i style="background:${tech.colors[0]}"></i>${esc(localize(tech.label, locale))}</span>`;
  };

  const experience = TIMELINE.map((entry) => {
    const text = t.timeline.items[entry.id];
    return `
      <li>
        <div class="tl-head"><h4>${esc(sentence(text.title))}</h4><span class="period">${esc(sentence(text.period))}</span></div>
        <span class="badge badge-${entry.kind}">${esc(sentence(t.timeline.kinds[entry.kind]))}</span>
        <p>${esc(sentence(text.description))}</p>
      </li>`;
  }).join("");

  const education = cv.education
    .map((item) => `<div class="edu"><div><h4>${esc(item.title)}</h4><small>${esc(item.place)}</small></div><span class="period">${esc(item.period)}</span></div>`)
    .join("");

  const stack = STACK.map(
    (category) => `
      <div class="stack-group">
        <h5>${esc(sentence(t.stack.categories[category.id]))}</h5>
        <div class="chips">${category.items.map((id) => techChip(id, true)).join("")}</div>
      </div>`,
  ).join("");

  const ai = AI_TOOLS.map(
    (tool, index) => `
      <li>
        <span class="ai-mark" style="background:${AI_COLORS[index % AI_COLORS.length]}">${esc(tool.mark)}</span>
        <span><b>${esc(AI_DISPLAY_NAMES[tool.id] ?? tool.name)}</b><small>${esc(sentence(t.ai.items[tool.id].description))}</small></span>
      </li>`,
  ).join("");

  const projects = PROJECTS.map((project) => {
    const text = t.projects.items[project.id];
    return `
      <article class="project">
        <div class="project-head">
          <h4>${esc(project.name)}</h4>
          <span class="platform">${esc(text.platform)}</span>
          <a class="repo" href="${project.repo}">${icon("github")} ${esc(cv.repository)} ↗</a>
        </div>
        <p class="lead">${esc(sentence(text.description))}</p>
        <div class="project-cols">
          <div><h5>${esc(sentence(t.projects.detail.problem))}</h5><p>${esc(sentence(text.problem))}</p></div>
          <div><h5>${esc(sentence(t.projects.detail.role))}</h5><p>${esc(sentence(text.role))}</p></div>
        </div>
        <div class="chips">${project.tech.map((id) => techChip(id)).join("")}</div>
      </article>`;
  }).join("");

  const footer = (page: number) => `
    <footer class="footer">
      <span>${esc(cv.footer)} · <b>${esc(PROFILE.github.label)}</b></span>
      <span>${pageLabel(page)}</span>
    </footer>`;

  return `<!doctype html>
<html lang="${locale}">
<head>
<meta charset="utf-8" />
<title>${esc(fullName)} · CV</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=Instrument+Serif:ital@1&display=block" rel="stylesheet" />
<style>${STYLES}</style>
</head>
<body>
  <!-- ===== hoja 1 ===== -->
  <div class="page">
    <aside class="side">
      <div class="photo"><div><img src="${photoDataUrl}" alt="${esc(t.profile.photoAlt)}" /></div></div>
      <section><h3>${esc(cv.sections.contact)}</h3><ul class="contact">${contact}</ul></section>
      <section><h3>${esc(cv.sections.softSkills)}</h3><ul class="bullets">${cv.softSkills.map((skill) => `<li>${esc(skill)}</li>`).join("")}</ul></section>
      <section><h3>${esc(cv.sections.languages)}</h3>${cv.languages.map((lang) => `<div class="lang"><span>${esc(lang.name)}</span><span>${esc(lang.level)}</span></div>`).join("")}</section>
    </aside>

    <main class="main">
      <h1 class="name"><span class="first">${esc(firstName)}</span><span class="last">${esc(lastNames.join(" "))}</span></h1>
      <p class="role">${esc(cv.role)}</p>
      <div class="rule"></div>

      <section><h3>${esc(cv.sections.profile)}</h3><p class="summary">${esc(cv.summary)}</p></section>
      <section><h3>${esc(cv.sections.experience)}</h3><ul class="timeline">${experience}</ul></section>
      <section><h3>${esc(cv.sections.education)}</h3>${education}</section>
      ${footer(1)}
    </main>
  </div>

  <!-- ===== hoja 2 ===== -->
  <div class="page page-2">
    <aside class="side">
      <section><h3>${esc(cv.sections.stack)}</h3>${stack}</section>
      <section><h3>${esc(cv.sections.ai)}</h3><ul class="ai">${ai}</ul></section>
    </aside>

    <main class="main">
      <div class="page-head"><b>${esc(fullName)}</b><span>${esc(cv.role)}</span></div>
      <section><h3>${esc(cv.sections.projects)}</h3><div class="projects">${projects}</div></section>
      ${footer(2)}
    </main>
  </div>
</body>
</html>`;
}
