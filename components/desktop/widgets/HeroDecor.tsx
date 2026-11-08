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
  { tech: "react", area: "web", position: "left-[calc(50%-330px)] top-[36%] -rotate-8", delay: "[animation-delay:0s]" },
  { tech: "unity", area: "games", position: "left-[calc(50%-310px)] top-[72%] rotate-6", delay: "[animation-delay:-2s]" },
  { tech: "kotlin", area: "mobile", position: "left-[calc(50%+170px)] top-[31%] rotate-7", delay: "[animation-delay:-1s]" },
  { tech: "python", area: "backend", position: "left-[calc(50%+200px)] top-[47%] -rotate-5", delay: "[animation-delay:-3s]" },
] as const satisfies readonly { tech: TechId; area: Area; position: string; delay: string }[];

const BADGE_SIZE = 128;
const BADGE_RADIUS = 50;

/**
 * Decoración en primer plano: la firma "camilo" en serif itálica cruzando
 * la foto, stickers de tecnologías que flotan y un sello circular con texto
 * girando que abre la ventana de contacto.
 */
export function HeroDecor() {
  const { t, locale } = useLocale();
  const { openWindow } = useDesktop();
  const secondName = PROFILE.name.split(" ")[1];

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
              "pointer-events-none absolute z-[5] flex items-center gap-2 rounded-2xl border border-white/70 bg-white/90 py-1.5 pr-3.5 pl-1.5 shadow-[0_14px_28px_-12px_rgba(0,0,0,.45)] max-lg:hidden dark:border-white/10 dark:bg-[#1b1b2a]/90",
              "motion-safe:animate-float",
              sticker.position,
              sticker.delay,
            )}
          >
            <span
              className="flex size-8 items-center justify-center rounded-xl font-display text-[11px] font-bold text-white"
              style={{ background: `linear-gradient(135deg, ${tech.colors[0]}, ${tech.colors[1]})` }}
            >
              {tech.mark}
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-semibold text-[#1c1c22] dark:text-white">{localize(tech.label, locale)}</span>
              <span className="block text-[10px] font-medium tracking-wider text-[#6b6b78] uppercase dark:text-white/55">
                {t.desktop.areas[sticker.area]}
              </span>
            </span>
          </div>
        );
      })}

      {/* sello circular: el texto gira alrededor de una flecha */}
      <button
        type="button"
        onClick={() => openWindow("contacto")}
        aria-label={t.desktop.badgeAction}
        title={t.desktop.badgeAction}
        className="group absolute top-[66%] left-[calc(50%+150px)] z-[5] size-32 rounded-full transition duration-300 hover:scale-110 max-lg:hidden"
      >
        <svg
          viewBox={`0 0 ${BADGE_SIZE} ${BADGE_SIZE}`}
          aria-hidden="true"
          className="absolute inset-0 size-full motion-safe:animate-spin motion-safe:[animation-duration:16s]"
        >
          <defs>
            <path
              id="badge-circle"
              d={`M ${BADGE_SIZE / 2}, ${BADGE_SIZE / 2} m -${BADGE_RADIUS}, 0 a ${BADGE_RADIUS},${BADGE_RADIUS} 0 1,1 ${BADGE_RADIUS * 2},0 a ${BADGE_RADIUS},${BADGE_RADIUS} 0 1,1 -${BADGE_RADIUS * 2},0`}
            />
          </defs>
          <circle cx={BADGE_SIZE / 2} cy={BADGE_SIZE / 2} r={BADGE_SIZE / 2 - 1} className="fill-[#111118]/85 dark:fill-white/90" />
          <text className="fill-white font-display text-[11.5px] font-semibold tracking-[.2em] uppercase dark:fill-[#111118]">
            <textPath href="#badge-circle" textLength={2 * Math.PI * BADGE_RADIUS - 4}>
              {t.desktop.badge}
            </textPath>
          </text>
        </svg>
        <span
          aria-hidden="true"
          className="absolute inset-0 m-auto flex size-12 items-center justify-center rounded-full bg-linear-135 from-accent to-[#c026d3] text-xl text-white transition duration-300 group-hover:rotate-45"
        >
          ↗
        </span>
      </button>
    </>
  );
}
