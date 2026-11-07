/* eslint-disable @next/next/no-img-element -- ImageResponse (Satori) solo entiende <img> */
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { APPS } from "@/components/apps/registry";
import { PROFILE, PROJECTS } from "@/data/portfolio";

/**
 * Imagen que se ve al compartir el enlace (WhatsApp, LinkedIn, X, Discord…).
 * El banner es 4:1 y las previsualizaciones son ~1.9:1, así que se coloca
 * completo arriba y debajo va una franja con la identidad del escritorio.
 */
export const alt = "Frayder Camilo Lopez · portafolio interactivo estilo escritorio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BANNER_PATH = join(process.cwd(), "public/assets/Banner para Linkedin programador con fotografia azul y blanco.png");

/** Con Cache Components, leer del disco cuenta como dato dinámico: "use cache" lo resuelve en el build. */
async function loadBannerDataUrl() {
  "use cache";
  const banner = await readFile(BANNER_PATH);
  return `data:image/png;base64,${banner.toString("base64")}`;
}

export default async function OpengraphImage() {
  const bannerSrc = await loadBannerDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(160deg, #0d1026 0%, #171a45 55%, #2a1f5c 100%)",
        }}
      >
        <img src={bannerSrc} width={1200} height={300} alt="" style={{ objectFit: "cover" }} />

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 64px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 20, letterSpacing: 5, color: "#9c9af7", textTransform: "uppercase" }}>
              portafolio · escritorio interactivo
            </div>
            <div style={{ fontSize: 56, fontWeight: 700, color: "#ffffff", marginTop: 10 }}>{PROFILE.name}</div>
            <div style={{ fontSize: 24, color: "#b3b2c4", marginTop: 8 }}>
              full stack developer · web, móvil y videojuegos
            </div>
          </div>

          {/* mini ventana del "sistema" */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 270,
              padding: 20,
              borderRadius: 22,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ width: 14, height: 14, borderRadius: 99, background: "#ff5f57" }} />
              <div style={{ width: 14, height: 14, borderRadius: 99, background: "#febc2e" }} />
              <div style={{ width: 14, height: 14, borderRadius: 99, background: "#28c840" }} />
            </div>
            <div style={{ fontSize: 24, color: "#ffffff", marginTop: 16 }}>{`${PROJECTS.length} proyectos`}</div>
            <div style={{ fontSize: 18, color: "#b3b2c4", marginTop: 4 }}>{`${APPS.length} apps · ES / EN`}</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
