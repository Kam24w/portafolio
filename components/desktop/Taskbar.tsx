"use client";

import Image from "next/image";
import { APPS } from "@/components/apps/registry";
import { Icon } from "@/components/ui/Icon";
import { PROJECTS } from "@/data/portfolio";
import { useNow } from "@/hooks/useNow";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import { LanguageToggle, ThemeToggle } from "./PreferenceToggles";
import type { WindowMap } from "./useWindowManager";
import { projectWindowId, type WindowId } from "./windows";

const appClass =
  "relative flex size-10 shrink-0 items-center justify-center rounded-xl text-fg-muted transition duration-150 hover:-translate-y-1 hover:bg-accent-soft hover:text-fg";

const visibleClass =
  "bg-accent-soft text-accent hover:text-accent after:absolute after:bottom-[3px] after:h-[3px] after:w-3.5 after:rounded-full after:bg-accent";

type TaskbarProps = {
  windows: WindowMap;
  onWindowClick: (id: WindowId) => void;
};

export function Taskbar({ windows, onWindowClick }: TaskbarProps) {
  const { t } = useLocale();

  const isVisible = (id: WindowId) => {
    const win = windows[id];
    return !!win && !win.minimized;
  };

  // las ventanas de detalle solo aparecen en la barra mientras están abiertas
  const openProjects = PROJECTS.filter((project) => windows[projectWindowId(project.id)]);

  return (
    <footer className="glass z-50 mx-3 mb-3 flex h-[58px] shrink-0 items-center gap-1.5 rounded-[18px] px-3 max-sm:mx-2 max-sm:mb-2 max-sm:scrollbar-none max-sm:overflow-x-auto">
      <div className="flex items-center gap-1.5">
        {APPS.map((app) => (
          <button
            key={app.id}
            type="button"
            title={t.apps[app.id]}
            aria-label={t.apps[app.id]}
            aria-pressed={isVisible(app.id)}
            onClick={() => onWindowClick(app.id)}
            className={cx(appClass, isVisible(app.id) && visibleClass)}
          >
            <Icon name={app.icon} />
          </button>
        ))}

        {openProjects.length > 0 && <div aria-hidden="true" className="mx-1 h-[26px] w-px shrink-0 bg-glass-border" />}

        {openProjects.map((project) => {
          const id = projectWindowId(project.id);
          return (
            <button
              key={id}
              type="button"
              title={project.name}
              aria-label={project.name}
              aria-pressed={isVisible(id)}
              onClick={() => onWindowClick(id)}
              className={cx(appClass, "starting:scale-50 starting:opacity-0", isVisible(id) && visibleClass)}
            >
              <Image src={project.image.src} alt="" width={26} height={26} className="size-[26px] rounded-lg object-cover" />
            </button>
          );
        })}
      </div>
      <div className="flex-1" />
      <LanguageToggle className={appClass} />
      <ThemeToggle className={appClass} />
      <div className="mx-1.5 h-[26px] w-px shrink-0 bg-glass-border" />
      <TaskbarClock />
    </footer>
  );
}

function TaskbarClock() {
  const { dateLocale } = useLocale();
  const now = useNow();

  return (
    <div className="flex shrink-0 flex-col items-end pl-2 leading-tight max-sm:hidden">
      <span className="text-[13px] font-semibold tabular-nums">
        {now ? now.toLocaleTimeString(dateLocale, { hour: "2-digit", minute: "2-digit" }) : "--:--"}
      </span>
      <span className="text-[10.5px] text-fg-subtle">
        {now?.toLocaleDateString(dateLocale, { day: "numeric", month: "short" })}
      </span>
    </div>
  );
}
