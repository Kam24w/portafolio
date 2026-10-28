# Portafolio de Frayder Camilo Lopez

Portafolio personal construido con **Next.js (App Router)**, **TypeScript** y **Tailwind CSS**.

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

## Estructura

```
app/
  layout.tsx        Layout raíz: fuentes, metadatos y Header
  page.tsx          Une las secciones
  globals.css       Tailwind y tokens de diseño (colores y fuentes)
components/
  Header.tsx        Header que se compacta con el scroll (componente cliente)
  Hero.tsx          Presentación inicial
  Projects.tsx      Lista de proyectos
  About.tsx         Sobre mí y habilidades
  Contact.tsx       Correo y redes
  Footer.tsx        Pie de página
lib/
  data.ts           Todo el contenido editable del portafolio
```

## Cómo personalizarlo

Casi todo se edita en **`lib/data.ts`**: nombre, rol, correo, redes, proyectos, texto "Sobre mí" y habilidades. Los textos que empiezan con "EJEMPLO" son de relleno y deben reemplazarse. Los colores se cambian en `app/globals.css`.

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
