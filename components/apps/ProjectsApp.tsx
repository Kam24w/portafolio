"use client";

import Image from "next/image";
import { useDesktop } from "@/components/desktop/DesktopContext";
import { projectWindowId } from "@/components/desktop/windows";
import { TechChips } from "@/components/ui/TechChips";
import { TONE_GRADIENT } from "@/components/ui/tones";
import { AppHeading } from "@/components/ui/window-content";
import { PROJECTS } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";

export function ProjectsApp() {
  const { t } = useLocale();
  const { openWindow } = useDesktop();

  return (
    <>
      <AppHeading>{t.projects.title}</AppHeading>
      {PROJECTS.map((project) => {
        const text = t.projects.items[project.id];
        const openDetail = () => openWindow(projectWindowId(project.id));
        return (
          <article
            key={project.id}
            className="group/card mb-3 overflow-hidden rounded-[15px] border border-glass-border bg-tint/5 transition duration-200 last:mb-0 hover:-translate-y-[3px] hover:scale-[1.01] hover:shadow-[0_12px_28px_-8px_rgba(30,30,60,.3)]"
          >
            <button
              type="button"
              onClick={openDetail}
              aria-label={`${t.projects.openDetail}: ${project.name}`}
              className={cx(
                TONE_GRADIENT[project.tone],
                "relative flex h-24 w-full items-end overflow-hidden px-[13px] py-2.5 text-left",
                "after:absolute after:inset-0 after:bg-linear-to-b after:from-transparent after:from-30% after:to-[rgba(15,15,35,.6)]",
              )}
            >
              <Image
                src={project.image.src}
                alt=""
                width={420}
                height={180}
                className="absolute inset-0 size-full object-cover opacity-80 transition-transform duration-500 group-hover/card:scale-105"
              />
              <span className="relative z-1 font-display text-[15px] font-bold text-white [text-shadow:0_2px_8px_rgba(0,0,0,.4)]">
                {project.name}
              </span>
              <span className="relative z-1 ml-auto rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 backdrop-blur-sm transition group-hover/card:opacity-100 group-focus-within/card:opacity-100">
                {t.projects.openDetail} →
              </span>
            </button>
            <div className="px-[13px] py-3">
              <h4 className="flex items-center justify-between gap-2 text-sm font-semibold text-fg">
                {project.name}
                <span className="ml-auto text-[11px] font-normal text-fg-subtle">{text.platform}</span>
                <span className="rounded-full bg-tint/10 px-2 py-0.5 text-[11px] font-normal text-fg-subtle">{project.year}</span>
              </h4>
              <p className="mt-[5px] text-[12.5px]">{text.description}</p>
              <div className="mt-[9px] flex items-center gap-[7px] border-t border-dashed border-glass-border pt-[9px] text-[11.5px] text-fg-subtle">
                <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-[7px] hover:underline">
                  <span className="inline-flex items-center gap-[5px] rounded-full bg-accent-soft px-[9px] py-0.5 text-[11px] font-semibold text-accent">
                    ↗ github
                  </span>
                  {t.projects.repository}
                </a>
                <button type="button" onClick={openDetail} className="ml-auto font-semibold text-accent hover:underline">
                  {t.projects.openDetail} →
                </button>
              </div>
              <TechChips ids={project.tech} />
            </div>
          </article>
        );
      })}
    </>
  );
}
