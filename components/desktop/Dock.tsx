"use client";

import Image from "next/image";
import { APPS, type AppId } from "@/components/apps/registry";
import { Icon } from "@/components/ui/Icon";
import { TONE_GRADIENT } from "@/components/ui/tones";
import { PROJECTS } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import type { WindowMap } from "./useWindowManager";
import { projectWindowId, type WindowId } from "./windows";

const tileClass =
  "group relative flex size-11 shrink-0 items-center justify-center rounded-[14px] text-white shadow-[0_6px_14px_-6px_rgba(0,0,0,.5)] transition duration-200 ease-out hover:-translate-y-2 hover:scale-115 focus-visible:-translate-y-2 max-sm:size-10";

/** Punto bajo el ícono cuando su ventana está visible. */
const visibleDot =
  "after:absolute after:-bottom-[7px] after:size-1 after:rounded-full after:bg-fg after:content-['']";

const tooltipClass =
  "pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 translate-y-1 rounded-[9px] border border-glass-border bg-glass-strong px-2.5 py-1 text-xs font-medium whitespace-nowrap text-fg opacity-0 shadow-glass backdrop-blur-[14px] transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100";

type DockProps = {
  windows: WindowMap;
  /** App resaltada (la enfocada; un detalle de proyecto cuenta como "proyectos"). */
  activeAppId: AppId | null;
  onWindowClick: (id: WindowId) => void;
};

/** Dock flotante centrado sobre el borde inferior del marco. */
export function Dock({ windows, activeAppId, onWindowClick }: DockProps) {
  const { t } = useLocale();

  const isVisible = (id: WindowId) => {
    const win = windows[id];
    return !!win && !win.minimized;
  };

  // los detalles de proyecto solo aparecen en el dock mientras están abiertos
  const openProjects = PROJECTS.filter((project) => windows[projectWindowId(project.id)]);

  return (
    <nav
      aria-label={t.nav.label}
      className="glass absolute bottom-3 left-1/2 z-50 flex max-w-[calc(100%-24px)] -translate-x-1/2 items-center gap-2.5 rounded-[22px] px-3 py-2.5 max-sm:scrollbar-none max-sm:bottom-2 max-sm:overflow-x-auto max-sm:pt-4"
    >
      {APPS.map((app) => (
        <button
          key={app.id}
          type="button"
          aria-label={t.apps[app.id]}
          aria-pressed={isVisible(app.id)}
          aria-current={activeAppId === app.id ? "true" : undefined}
          onClick={() => onWindowClick(app.id)}
          className={cx(
            tileClass,
            TONE_GRADIENT[app.tone],
            isVisible(app.id) && visibleDot,
            activeAppId === app.id && "ring-2 ring-white/80",
          )}
        >
          <Icon name={app.icon} size={20} />
          <span aria-hidden="true" className={tooltipClass}>
            {t.apps[app.id]}
          </span>
        </button>
      ))}

      {openProjects.length > 0 && <div aria-hidden="true" className="h-8 w-px shrink-0 bg-glass-border" />}

      {openProjects.map((project) => {
        const id = projectWindowId(project.id);
        return (
          <button
            key={id}
            type="button"
            aria-label={project.name}
            aria-pressed={isVisible(id)}
            onClick={() => onWindowClick(id)}
            className={cx(tileClass, "overflow-visible bg-white/70 p-0.5 starting:scale-50 starting:opacity-0", isVisible(id) && visibleDot)}
          >
            <Image src={project.image.src} alt="" width={44} height={44} className="size-full rounded-[12px] object-cover" />
            <span aria-hidden="true" className={tooltipClass}>
              {project.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
