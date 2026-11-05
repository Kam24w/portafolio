# Portafolio de Frayder Camilo Lopez

Portafolio personal construido con **Next.js (App Router)**, **TypeScript** y **Tailwind CSS**.

## Estructura del portafolio

La página sigue la estructura explicada en la guía del curso:

1. Navegación fija con menú responsive.
2. Hero de bienvenida con presentación y acceso a la experiencia/CV.
3. Acerca de mí.
4. Proyectos con enlaces a GitHub y demo.
5. Testimonios.
6. Experiencia académica y laboral.
7. Contacto.
8. Sección adicional de habilidades.
9. Pie de página.

## Concepto de diseño

El **header organiza toda la página**. Al abrirla, el nombre ocupa casi toda la pantalla como un título de afiche. Al hacer scroll, ese mismo nombre se compacta en una barra fija con la navegación, y el menú marca con una píldora la sección que se está viendo. Es la única animación del sitio; el resto es sobrio a propósito.

- **Colores:** gris azulado claro, azul marino (texto), azul eléctrico (acento) y menta suave (hover).
- **Tipografías:** Bricolage Grotesque (títulos) y Figtree (texto), cargadas con `next/font`.
- **Proyectos:** se muestran como filas con año, descripción y tecnologías, no como tarjetas.
- **Accesibilidad:** foco visible, navegación semántica (`nav`, `aria-current`) y respeto a `prefers-reduced-motion`.

## Cómo ejecutarlo

Requiere Node.js 20 o superior y conexión a internet (para descargar las fuentes de Google).

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

Otros comandos: `npm run build` (compilar), `npm start` (servir la compilación), `npm run lint` (revisar el código).

## Estructura técnica

```
app/
  layout.tsx        Layout raíz: fuentes, metadatos y Header
  page.tsx          Une las secciones
  globals.css       Tailwind y tokens de diseño (colores y fuentes)
components/
  Header.tsx        Navegación fija y menú móvil
  Hero.tsx          Bienvenida y llamadas a la acción
  About.tsx         Presentación personal
  Projects.tsx      Proyectos con GitHub y demo
  Testimonials.tsx  Testimonios
  Experience.tsx    Experiencia académica y laboral
  Contact.tsx       Correo y redes
  Skills.tsx        Sección adicional de habilidades
  Footer.tsx        Pie de página
lib/
  data.ts           Compatibilidad con el contenido en español
content/
  es.ts             Contenido editable en español
  en.ts             Contenido editable en inglés
  types.ts          Tipos compartidos del contenido
components/
  LanguageProvider.tsx  Estado global del idioma y persistencia local
```

## Cómo personalizarlo

El contenido se edita en **`content/es.ts`** y **`content/en.ts`**: nombre, rol, correo, redes, proyectos, texto "Sobre mí", habilidades y textos de interfaz. El selector `ES / EN` del encabezado guarda la preferencia del visitante en el navegador. Los colores se cambian en `app/globals.css`.

## Subirlo a GitHub

```bash
git remote add origin https://github.com/TU-USUARIO/portafolio.git
git push -u origin main
```

Después se puede publicar gratis importando el repositorio en [Vercel](https://vercel.com).

## Preguntas para la retroalimentación

1. ¿El header que se compacta comunica bien la estructura de la página?
2. ¿Qué proyectos o contenido debería destacar más?
3. ¿Qué mejorarías en el diseño o la accesibilidad?
