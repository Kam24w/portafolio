"use client";

import Image from "next/image";
import { PROFILE, PROJECTS } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import { TONE_GRADIENT } from "@/components/ui/tones";
import { useDesktop } from "../DesktopContext";
import { projectWindowId } from "../windows";

/** Saludo + nombre en vertical + galería 2×2 de proyectos (cada tarjeta abre su detalle). */
export function ProjectShowcase() {
  const { t } = useLocale();
  const { openWindow } = useDesktop();

  return (
    <section aria-label={t.gallery.title}>
      <p className="mb-3 text-right font-display text-[26px] leading-none font-bold text-fg">{t.desktop.greeting}</p>
      <div className="flex justify-end gap-2.5">
        <span
          aria-hidden="true"
          className="font-display text-[11px] font-bold tracking-[.3em] text-fg uppercase [writing-mode:vertical-rl]"
        >
          {PROFILE.name}
        </span>
        <div className="grid w-[200px] grid-cols-2 gap-2">
          {PROJECTS.map((project, index) => (
            <button
              key={project.id}
              type="button"
              title={project.name}
              aria-label={`${t.projects.openDetail}: ${project.name}`}
              onClick={() => openWindow(projectWindowId(project.id))}
              className={cx(
                TONE_GRADIENT[project.tone],
                "group relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-white/80 shadow-[0_10px_24px_-12px_rgba(0,0,0,.5)] transition duration-200 hover:z-10 hover:-translate-y-1 hover:scale-105",
                index % 2 === 1 ? "hover:rotate-2" : "hover:-rotate-2",
              )}
            >
              <Image src={project.image.src} alt="" width={200} height={260} className="size-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/75 to-transparent px-2 pt-5 pb-1.5 text-left text-[11px] font-semibold text-white">
                {project.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
