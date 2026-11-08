# Portafolio de Frayder Camilo Lopez

Portafolio interactivo con forma de **sistema operativo**. En lugar de hacer scroll, el visitante explora un escritorio: abre "apps" desde el dock, y cada sección (inicio, sobre mí, proyectos, IAs, stack, testimonios, trayectoria, contacto) aparece como una ventana que se puede arrastrar, minimizar y maximizar.

Construido con **Next.js 16 (App Router)**, **React 19**, **TypeScript** y **Tailwind CSS 4**. Disponible en **español e inglés**.

## Concepto de diseño

- **Arranque:** pantalla de carga breve ("sistema portafolio") que se puede omitir con clic o Enter.
- **Escritorio de vidrio:** un marco grande de vidrio lechoso sobre el fondo de pantalla, con un menú lateral de redes (GitHub, LinkedIn, correo) y un dock de apps montados sobre sus bordes.
- **Widgets:** reloj en fuente de puntos (Doto), calendario, galería 2×2 de proyectos y un reproductor "sonando ahora" que rota entre los proyectos.
- **Personaje central:** mi foto recortada, anclada abajo y más alta que el marco, así que la cabeza sobresale por arriba.
- **Ventanas:** se arrastran por la barra de título, doble clic para maximizar, `Esc` para cerrar.
- **Detalle de proyecto:** cada proyecto (desde la ventana de proyectos o la galería) se abre en su propia ventana con captura grande, problema, rol, aprendizajes, stack y enlaces.
- **Enlaces compartibles:** la URL refleja la ventana enfocada (`?app=contacto`, `?app=proyectos&id=nexora`) y al abrir ese enlace se abre esa ventana. El detalle tiene un botón "copiar enlace".
- **Open Graph:** `app/opengraph-image.tsx` genera la imagen de previsualización (1200×630) a partir del banner. En producción define `NEXT_PUBLIC_SITE_URL` con tu dominio (en Vercel se detecta solo).
- **Tema claro/oscuro e idioma ES/EN:** se guardan en el navegador y se aplican antes de cargar la página (sin parpadeo). La primera vez, el idioma se elige según el navegador.
- **Colores:** acento índigo `#5451d6`, tokens en `app/globals.css`.
- **Tipografías:** Space Grotesk (títulos) e Inter (texto), con `next/font`.
- **Accesibilidad:** foco visible, etiquetas `aria` traducidas y respeto a `prefers-reduced-motion`.

## Cómo ejecutarlo

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Abre http://localhost:3000. Otros comandos: `npm run build`, `npm start`, `npm run lint`.

## Estructura

```
app/
  layout.tsx            Fuentes, metadatos, script de preferencias y LocaleProvider
  page.tsx              Renderiza el escritorio
  globals.css           Tailwind: tokens del tema, animaciones y utilidades (glass, scrollbar-glass)
components/
  desktop/              El "sistema operativo"
    Desktop.tsx         Coordina el marco, menú, ventanas, widgets y dock
    useWindowManager.ts Estado de las ventanas (useReducer tipado)
    DesktopWindow.tsx   Ventana arrastrable
    Sidebar.tsx / Dock.tsx / BootScreen.tsx / PreferenceToggles.tsx
    widgets/            Reloj, calendario, foto, barra superior, galería y reproductor
  apps/                 Contenido de cada ventana (HomeApp, ProjectsApp, …)
    registry.ts         Lista de apps: id, ícono y tamaño
  ui/                   Piezas reutilizables (Icon, TechChips, Stat, tonos de color)
data/
  portfolio.ts          Datos que no dependen del idioma: enlaces, imágenes, años, tecnologías
i18n/
  es.ts / en.ts         Todos los textos traducidos
  types.ts              Tipo Dictionary: obliga a que ambos idiomas tengan las mismas claves
  LocaleProvider.tsx    Contexto del idioma (useLocale)
lib/                    Preferencias (tema/idioma) y utilidades
hooks/                  useNow (reloj)
```

## Cómo personalizarlo

- **Agregar un proyecto:** añádelo a `PROJECT_LIST` en `data/portfolio.ts` (con las dimensiones reales de su imagen y `demo` si tiene) y escribe sus textos en `i18n/es.ts` e `i18n/en.ts`. Si falta en algún idioma, TypeScript marca error. Su ventana de detalle y su enlace `?app=proyectos&id=…` se crean solos.
- **Cambiar textos:** `i18n/es.ts` y `i18n/en.ts`.
- **Agregar una tecnología:** añádela a `TECH` en `data/portfolio.ts`; los ids de tecnología están tipados, así que un error de tipeo no compila.
- **Agregar una app/ventana:** regístrala en `components/apps/registry.ts`, crea su componente y agrégalo a `APP_CONTENT` en `components/apps/index.ts`, y ponle nombre en `apps` de cada idioma.
- **Colores:** variables de `:root` y `[data-theme="dark"]` en `app/globals.css`.
