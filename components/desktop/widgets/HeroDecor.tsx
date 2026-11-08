"use client";

import { PROFILE, TECH, type TechId } from "@/data/portfolio";
import type { Dictionary } from "@/i18n";
import { localize } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import { useDesktop } from "../DesktopContext";

type Area = keyof Dictionary["desktop"]["areas"];

/** Stickers alrededor de la foto: una tecnología por área, cada uno con su posición, giro y ritmo. */
const STICKERS = [
  { tech: "react", area: "web", position: "left-[calc(50%-410px)] top-[34%] -rotate-8", delay: "[animation-delay:0s]" },
  { tech: "unity", area: "games", position: "left-[calc(50%-390px)] top-[70%] rotate-6", delay: "[animation-delay:-2s]" },
  { tech: "kotlin", area: "mobile", position: "left-[calc(50%+175px)] top-[28%] rotate-7", delay: "[animation-delay:-1s]" },
  { tech: "python", area: "backend", position: "left-[calc(50%+215px)] top-[45%] -rotate-5", delay: "[animation-delay:-3s]" },
] as const satisfies readonly { tech: TechId; area: Area; position: string; delay: string }[];

/** Geometría del sello (en unidades del viewBox). */
const BADGE = { size: 160, radius: 62 } as const;
const GRADIENT_RING = "bg-conic from-accent via-[#22d3ee] to-[#c026d3]";

/**
 * Decoración en primer plano: la firma "camilo" en serif itálica cruzando
 * la foto, stickers de tecnologías que flotan y un sello circular que abre
 * la ventana de contacto.
 */
export function HeroDecor() {
  const { t, locale } = useLocale();
  const { openWindow } = useDesktop();
  const secondName = PROFILE.name.split(" ")[1];
  // "full stack developer • disponible • 2026 • " → frases separadas por estrellas de color
  const badgePhrases = t.desktop.badge.split("•").map((phrase) => phrase.trim()).filter(Boolean);
  const { size, radius } = BADGE;
  const center = size / 2;

  return (
    <>
      {/* firma en itálica, delante de la foto (decorativa) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[45%] left-1/2 z-[4] -translate-x-[58%] -rotate-[8deg] bg-linear-to-r from-title-accent-from to-title-accent-to bg-clip-text pr-[0.15em] font-serif text-[clamp(64px,9.5vw,180px)] leading-none text-transparent italic drop-shadow-[0_6px_18px_rgba(0,0,0,.35)] select-none max-sm:top-[52%] max-sm:text-[72px]"
      >
        {secondName}
      </span>

      {STICKERS.map((sticker) => {
        const tech = TECH[sticker.tech];
        return (
          <div
            key={sticker.tech}
            aria-hidden="true"
            className={cx(
              "pointer-events-none absolute z-[5] flex items-center gap-3 rounded-[20px] border border-white/70 bg-white/92 py-2 pr-5 pl-2 shadow-[0_18px_34px_-14px_rgba(0,0,0,.5)] backdrop-blur-md max-lg:hidden dark:border-white/12 dark:bg-[#1b1b2a]/90",
              "motion-safe:animate-float",
              sticker.position,
              sticker.delay,
            )}
          >
            <span
              className="flex size-11 items-center justify-center rounded-[14px] font-display text-sm font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.35)]"
              style={{ background: `linear-gradient(135deg, ${tech.colors[0]}, ${tech.colors[1]})` }}
            >
              {tech.mark}
            </span>
            <span className="leading-tight">
              <span className="block text-base font-semibold text-[#1c1c22] dark:text-white">{localize(tech.label, locale)}</span>
              <span className="block text-[11px] font-semibold tracking-[.14em] text-[#6b6b78] uppercase dark:text-white/55">
                {t.desktop.areas[sticker.area]}
              </span>
            </span>
          </div>
        );
      })}

      {/* sello circular: anillo degradado, texto girando y botón central que abre contacto */}
      <button
        type="button"
        onClick={() => openWindow("contacto")}
        aria-label={t.desktop.badgeAction}
        title={t.desktop.badgeAction}
        className="group absolute top-[62%] left-[calc(50%+150px)] z-[5] size-40 rounded-full transition duration-300 hover:scale-105 max-lg:hidden"
      >
        {/* resplandor */}
        <span aria-hidden="true" className={cx(GRADIENT_RING, "absolute -inset-2 rounded-full opacity-40 blur-xl motion-safe:animate-spin motion-safe:[animation-duration:12s]")} />
        {/* anillo de color + disco de vidrio oscuro */}
        <span aria-hidden="true" className={cx(GRADIENT_RING, "absolute inset-0 rounded-full p-[2px]")}>
          <span className="block size-full rounded-full bg-[#0f0f1a]/92 backdrop-blur-md" />
        </span>
        {/* anillo interior punteado */}
        <span aria-hidden="true" className="absolute inset-[30px] rounded-full border border-dashed border-white/25" />

        {/* texto girando */}
        <svg
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden="true"
          className="absolute inset-0 size-full motion-safe:animate-spin motion-safe:[animation-duration:18s]"
        >
          <defs>
            <path
              id="badge-circle"
              d={`M ${center},${center} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
            />
          </defs>
          <text className="fill-white font-display text-[11px] font-semibold tracking-[.18em] uppercase">
            <textPath href="#badge-circle" textLength={2 * Math.PI * radius - 2} lengthAdjust="spacing">
              {badgePhrases.map((phrase) => (
                <tspan key={phrase}>
                  {phrase}
                  <tspan className="fill-[#c4b5fd]"> ✦ </tspan>
                </tspan>
              ))}
            </textPath>
          </text>
        </svg>

        {/* botón central */}
        <span aria-hidden="true" className="absolute inset-0 m-auto size-[62px]">
          <span className="absolute inset-0 rounded-full border-2 border-accent/60 motion-safe:animate-ping motion-safe:[animation-duration:2.6s]" />
          <span className="relative flex size-full items-center justify-center rounded-full bg-linear-135 from-accent to-[#c026d3] text-white shadow-[0_0_28px_rgba(156,120,247,.6),inset_0_1px_0_rgba(255,255,255,.35)]">
            <svg viewBox="0 0 24 24" className="size-6 transition duration-300 group-hover:rotate-45" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </span>
        </span>
      </button>
    </>
  );
}
