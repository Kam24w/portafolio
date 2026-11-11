"use client";

import { TECH, type TechId } from "@/data/portfolio";
import type { Dictionary } from "@/i18n";
import { localize } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import { useDesktop } from "../DesktopContext";

type Area = keyof Dictionary["desktop"]["areas"];

/** Stickers alrededor de la foto: una tecnología por área, cada uno con su posición, giro y ritmo. */
const STICKERS = [
  { tech: "react", area: "web", position: "left-[calc(50%-410px)] top-[34%] -rotate-6", delay: "[animation-delay:0s]" },
  { tech: "unity", area: "games", position: "left-[calc(50%-390px)] top-[66%] rotate-4", delay: "[animation-delay:-2s]" },
  { tech: "kotlin", area: "mobile", position: "left-[calc(50%+175px)] top-[28%] rotate-5", delay: "[animation-delay:-1s]" },
  { tech: "python", area: "backend", position: "left-[calc(50%+215px)] top-[45%] -rotate-4", delay: "[animation-delay:-3s]" },
] as const satisfies readonly { tech: TechId; area: Area; position: string; delay: string }[];

/** Superficie común de stickers y tarjeta: vidrio claro / oscuro. */
const surfaceClass =
  "rounded-[20px] border border-white/70 bg-white/92 shadow-[0_18px_34px_-14px_rgba(0,0,0,.45)] backdrop-blur-md dark:border-white/12 dark:bg-[#141a26]/90";

/**
 * Decoración en primer plano: stickers de tecnologías que flotan y una
 * tarjeta "disponible" que abre la ventana de contacto.
 */
export function HeroDecor() {
  const { t, locale } = useLocale();
  const { openWindow } = useDesktop();

  return (
    <>
      {STICKERS.map((sticker) => {
        const tech = TECH[sticker.tech];
        return (
          <div
            key={sticker.tech}
            aria-hidden="true"
            className={cx(
              surfaceClass,
              "pointer-events-none absolute z-[5] flex items-center gap-3 py-2 pr-5 pl-2 max-lg:hidden",
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
              <span className="block text-base font-semibold text-[#0f172a] dark:text-white">{localize(tech.label, locale)}</span>
              <span className="block text-[11px] font-semibold tracking-[.14em] text-[#64748b] uppercase dark:text-white/55">
                {t.desktop.areas[sticker.area]}
              </span>
            </span>
          </div>
        );
      })}

      {/* tarjeta "disponible": estado en verde + invitación + flecha */}
      <button
        type="button"
        onClick={() => openWindow("contacto")}
        aria-label={`${t.desktop.availability.title} · ${t.desktop.availability.action}`}
        title={t.desktop.availability.action}
        className={cx(
          surfaceClass,
          "group absolute top-[66%] left-[calc(50%+150px)] z-[5] flex items-center gap-3.5 py-3 pr-3 pl-4 text-left transition duration-200 hover:-translate-y-1 hover:shadow-[0_22px_40px_-14px_rgba(0,0,0,.5)] max-lg:hidden",
        )}
      >
        <span aria-hidden="true" className="relative flex size-3 shrink-0">
          <span className="absolute inset-0 rounded-full bg-emerald-400/70 motion-safe:animate-ping motion-safe:[animation-duration:2.2s]" />
          <span className="relative size-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#141a26]" />
        </span>
        <span className="leading-tight">
          <span className="block text-[10.5px] font-bold tracking-[.16em] text-emerald-600 uppercase dark:text-emerald-400">
            {t.desktop.availability.status}
          </span>
          <span className="mt-0.5 block font-display text-[17px] font-bold text-[#0f172a] dark:text-white">
            {t.desktop.availability.title}
          </span>
        </span>
        <span
          aria-hidden="true"
          className="ml-1 flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-white transition duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </span>
      </button>
    </>
  );
}
