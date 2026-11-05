import type { ReactNode } from 'react';
import { Icon, type IconName } from '@/components/Icon';
import { Chips, Stat } from '@/components/Tech';

export type AppId =
  | 'inicio'
  | 'sobre-mi'
  | 'proyectos'
  | 'ias'
  | 'plugins'
  | 'testimonios'
  | 'trayectoria'
  | 'contacto';

export interface AppDef {
  id: AppId;
  name: string;
  icon: IconName;
  content: ReactNode;
}

/* ---------- contenido de cada ventana ---------- */

const Inicio = (
  <>
    <h3>hola, soy frayder.</h3>
    <p>
      desarrollador full stack en formación. convierto ideas en experiencias digitales claras,
      funcionales y con carácter propio. este portafolio no se baja: se explora como un escritorio.
    </p>
    <div className="stats">
      <Stat to={3} label="proyectos" />
      <Stat to={4} label="ias integradas" />
      <Stat to={8} label="plugins" />
    </div>
    <Chips items={['typescript', 'react', 'next.js', 'tailwind', 'node.js']} />
    <p className="note">
      abre las apps desde el menú lateral o la barra de tareas. arrastra las ventanas, minimízalas
      y maximízalas con doble clic.
    </p>
  </>
);

const SobreMi = (
  <>
    <h3>la persona detrás del código</h3>
    <p>
      soy frayder camilo lopez, estudiante y desarrollador web en formación. me interesa el detalle
      visual tanto como la lógica: una interfaz debe funcionar bien y sentirse bien.
    </p>
    <p>
      disfruto aprender nuevas herramientas, resolver problemas con código y construir proyectos que
      me hagan crecer en lo técnico y en lo visual.
    </p>
    <div className="ai">
      <div className="ai-ico ai2 sm">&lt;/&gt;</div>
      <div>
        <div className="ain">frontend</div>
        <div className="aip">react · next.js · tailwind · typescript</div>
      </div>
    </div>
    <div className="ai">
      <div className="ai-ico ai3 sm">{'{ }'}</div>
      <div>
        <div className="ain">backend</div>
        <div className="aip">node.js · apis rest · sql</div>
      </div>
    </div>
    <div className="ai">
      <div className="ai-ico ai4 sm">✦</div>
      <div>
        <div className="ain">diseño y flujo</div>
        <div className="aip">figma · git · github</div>
      </div>
    </div>
  </>
);

const PROJECTS = [
  {
    cover: 'cov1',
    name: 'portafolio personal',
    year: '2026',
    desc: 'sitio responsive que presenta mi perfil y proceso, con temas claro/oscuro y este escritorio interactivo.',
    ai: 'claude',
    aiUse: 'arquitectura y textos',
    tech: ['next.js', 'tailwind', 'framer motion'],
  },
  {
    cover: 'cov2',
    name: 'panel de tareas',
    year: '2025',
    desc: 'aplicación para organizar pendientes, prioridades y avances de un equipo.',
    ai: 'copilot',
    aiUse: 'autocompletado y pruebas',
    tech: ['react', 'node.js', 'postgresql'],
  },
  {
    cover: 'cov3',
    name: 'galero',
    year: '2025',
    desc: 'landing e-commerce de ropa atractiva, clara y fácil de recorrer.',
    ai: 'chatgpt',
    aiUse: 'ideación de textos y seo',
    tech: ['next.js', 'tailwind'],
  },
];

const Proyectos = (
  <>
    <h3>cosas que he construido</h3>
    {PROJECTS.map((p) => (
      <div className="pj" key={p.name}>
        <div className={`pj-cover ${p.cover}`}>
          <span className="pjemoji">{p.name}</span>
        </div>
        <div className="pj-body">
          <div className="pjn">
            {p.name} <span className="yr">{p.year}</span>
          </div>
          <div className="pjd">{p.desc}</div>
          <div className="pja">
            <span className="aichip">✦ {p.ai}</span> {p.aiUse}
          </div>
          <Chips items={p.tech} />
        </div>
      </div>
    ))}
  </>
);

const Ias = (
  <>
    <h3>ias en mi flujo de trabajo</h3>
    <p>no las uso para reemplazar el proceso, sino para acelerarlo y aprender de él.</p>
    {[
      ['ai1', 'G', 'chatgpt', 'ideación de contenido, redacción y depuración de errores', 'galero'],
      ['ai2', 'C', 'github copilot', 'autocompletado inteligente y sugerencias en el editor', 'panel de tareas'],
      ['ai3', 'Cl', 'claude', 'revisión de arquitectura, documentación y mejora de prompts', 'portafolio'],
      ['ai4', 'v0', 'v0', 'prototipos de interfaz a partir de descripciones', 'exploraciones'],
    ].map(([cls, ico, name, desc, proj]) => (
      <div className="ai" key={name}>
        <div className={`ai-ico ${cls}`}>{ico}</div>
        <div>
          <div className="ain">{name}</div>
          <div className="aip">
            {desc} · proyecto: <b>{proj}</b>
          </div>
        </div>
      </div>
    ))}
  </>
);

const STACK = [
  {
    title: 'frontend',
    ic: 'Fe',
    grad: 'linear-gradient(135deg,#6366f1,#a855f7)',
    items: [
      ['Re', 'react', '#61dafb,#0ea5e9'],
      ['Nx', 'next.js', '#8888ff,#6366f1'],
      ['Tw', 'tailwind css', '#38bdf8,#0ea5e9'],
      ['Ts', 'typescript', '#3178c6,#38bdf8'],
    ],
  },
  {
    title: 'backend',
    ic: 'Be',
    grad: 'linear-gradient(135deg,#3c873a,#8cc84b)',
    items: [
      ['No', 'node.js', '#3c873a,#8cc84b'],
      ['API', 'apis rest', '#22d3ee,#0ea5e9'],
      ['Pg', 'postgresql', '#336791,#60a5fa'],
      ['SQL', 'sql', '#e38c00,#fbbf24'],
    ],
  },
  {
    title: 'diseño y flujo',
    ic: 'De',
    grad: 'linear-gradient(135deg,#a259ff,#f24e1e)',
    items: [
      ['Fg', 'figma', '#a259ff,#f24e1e'],
      ['Gt', 'git + github', '#f05033,#6e5494'],
      ['Vs', 'vscode', '#71717a,#a1a1aa'],
    ],
  },
];

const Plugins = (
  <>
    <h3>stack organizado</h3>
    <p>las herramientas que uso, agrupadas por lo que hacen en el proyecto.</p>
    {STACK.map((cat) => (
      <div className="skcat" key={cat.title}>
        <div className="skcat-t">
          <span className="skcat-ic" style={{ background: cat.grad }}>
            {cat.ic}
          </span>
          {cat.title}
          <span className="skcat-n">{cat.items.length}</span>
        </div>
        <div className="skchips">
          {cat.items.map(([ico, label, grad]) => (
            <div className="skchip" key={label}>
              <span className="skic" style={{ background: `linear-gradient(135deg,${grad})` }}>
                {ico}
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
    ))}
    <div className="sk-note">html y css vienen de fábrica en este sistema.</div>
  </>
);

const Testimonios = (
  <>
    <h3>lo que dicen de mi trabajo</h3>
    {[
      ['qa1', 'CP', 'compañero de proyecto', 'colaboración académica', 'escucha la idea, la organiza y la convierte en una interfaz fácil de entender.'],
      ['qa2', 'DC', 'docente', 'diseño de interfaces', 'se destaca por su disposición para aprender y por cuidar los detalles del resultado final.'],
      ['qa3', 'GA', 'cliente galero', 'e-commerce de ropa', 'entendió la esencia de galero y la convirtió en una tienda online atractiva, clara y fácil de recorrer.'],
    ].map(([cls, ini, who, rel, txt]) => (
      <div className="qt" key={who}>
        <div className="qt-head">
          <div className={`qt-av ${cls}`}>{ini}</div>
          <div>
            <div className="qt-who">{who}</div>
            <div className="qt-rel">{rel}</div>
          </div>
          <span className="stars">★★★★★</span>
        </div>
        <div className="qt-txt">“{txt}”</div>
      </div>
    ))}
  </>
);

const Trayectoria = (
  <>
    <h3>experiencia que sigue creciendo</h3>
    <div className="tline">
      {[
        ['2025 — actualidad · formación en desarrollo web', 'académica', 'b-acad', 'construcción de interfaces responsive con react, next.js, typescript y tailwind.'],
        ['2025 · proyecto de diseño de interfaces', 'académica', 'b-acad', 'diseño y desarrollo de una experiencia web completa, de la estructura a su publicación.'],
        ['2024 — 2025 · práctica de proyectos freelance', 'laboral', 'b-lab', 'creación de sitios informativos y prototipos digitales adaptados a distintas necesidades.'],
      ].map(([title, badge, cls, desc]) => (
        <div className="tl" key={title}>
          <div className="tly">
            {title}
            <span className={`tlbadge ${cls}`}>{badge}</span>
          </div>
          <div className="tld">{desc}</div>
        </div>
      ))}
    </div>
  </>
);

const Contacto = (
  <>
    <h3>¿tienes una idea?</h3>
    <p>cuéntame qué tienes en mente y construyamos algo que funcione.</p>
    <div className="cbtns">
      <a className="cbtn" href="mailto:freydercl2004@gmail.com">
        <Icon name="mail" />
        freydercl2004@gmail.com<small>escríbeme</small>
      </a>
      <a className="cbtn" href="https://github.com/Kam24w" target="_blank" rel="noopener noreferrer">
        <Icon name="github" />
        github.com/Kam24w<small>código</small>
      </a>
      <a className="cbtn" href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
        <Icon name="linkedin" />
        linkedin.com/in/tu-usuario<small>red</small>
      </a>
    </div>
    <div className="c-loc">
      <Icon name="pin" size={13} />
      cali, colombia · gmt-5
    </div>
  </>
);

export const APPS: AppDef[] = [
  { id: 'inicio', name: 'inicio', icon: 'home', content: Inicio },
  { id: 'sobre-mi', name: 'sobre mí', icon: 'user', content: SobreMi },
  { id: 'proyectos', name: 'proyectos', icon: 'code', content: Proyectos },
  { id: 'ias', name: 'ias que uso', icon: 'spark', content: Ias },
  { id: 'plugins', name: 'plugins', icon: 'puzzle', content: Plugins },
  { id: 'testimonios', name: 'testimonios', icon: 'quote', content: Testimonios },
  { id: 'trayectoria', name: 'trayectoria', icon: 'route', content: Trayectoria },
  { id: 'contacto', name: 'contacto', icon: 'mail', content: Contacto },
];
