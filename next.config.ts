import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // Permite abrir el servidor de desarrollo desde otro dispositivo de la red local
  // (ej. http://192.168.x.x:3000). Sin esto el JS no carga y la pantalla de arranque se congela.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
  images: {
    // 95 lo usa la foto central; 75 es el valor por defecto
    qualities: [75, 95],
  },
  // Tailwind se procesa con PostCSS (postcss.config.mjs), la integración oficial.
  // La regla anterior de Turbopack (@tailwindcss/turbopack) no recargaba globals.css en desarrollo.
};

export default nextConfig;
