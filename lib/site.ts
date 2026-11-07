/**
 * URL pública del sitio, necesaria para que las imágenes Open Graph tengan
 * dirección absoluta. Defínela en producción con NEXT_PUBLIC_SITE_URL
 * (ej. https://camilolopez.dev). En Vercel se detecta sola.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
