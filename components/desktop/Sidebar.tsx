"use client";

import { APPS, type AppId } from "@/components/apps/registry";
import { Icon } from "@/components/ui/Icon";
import { PROFILE } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import { LanguageToggle, ThemeToggle } from "./PreferenceToggles";

const itemClass =
  "group relative flex size-11 items-center justify-center rounded-[13px] text-fg-muted transition duration-150 hover:translate-x-[3px] hover:bg-accent-soft hover:text-fg";

type SidebarProps = {
  open: boolean;
  /** App activa (abierta, visible y enfocada). */
  activeId: AppId | null;
  onLogoClick: () => void;
  onAppClick: (id: AppId) => void;
};

export function Sidebar({ open, activeId, onLogoClick, onAppClick }: SidebarProps) {
  const { t } = useLocale();

  return (
    <aside
      id="sidebar"
      aria-label={t.nav.label}
      className={cx(
        "glass z-40 my-3 ml-3 flex w-[66px] shrink-0 flex-col items-center gap-1.5 rounded-[18px] py-3.5",
        "max-sm:fixed max-sm:top-3 max-sm:bottom-[76px] max-sm:left-3 max-sm:z-90 max-sm:m-0",
        !open && "max-sm:-translate-x-[130%]",
      )}
    >
      <button
        type="button"
        title={t.nav.home}
        aria-label={t.nav.home}
        onClick={onLogoClick}
        className="mb-2.5 flex size-[38px] items-center justify-center rounded-xl bg-linear-135 from-accent to-[#9b5bf5] font-display text-[13px] font-bold text-white transition-transform duration-150 hover:scale-110 hover:-rotate-4"
      >
        {PROFILE.initials}
      </button>

      <nav className="flex flex-col items-center gap-1.5">
        {APPS.map((app) => {
          const active = activeId === app.id;
          return (
            <button
              key={app.id}
              type="button"
              aria-label={t.apps[app.id]}
              aria-current={active ? "true" : undefined}
              onClick={() => onAppClick(app.id)}
              className={cx(
                itemClass,
                active &&
                  "bg-accent-soft text-accent hover:text-accent before:absolute before:-left-[11px] before:h-5 before:w-1 before:rounded-full before:bg-accent",
              )}
            >
              <Icon name={app.icon} size={21} />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-14 z-60 -translate-x-1.5 -translate-y-1/2 rounded-[9px] border border-glass-border bg-glass-strong px-[11px] py-[5px] text-xs font-medium whitespace-nowrap text-fg opacity-0 shadow-glass backdrop-blur-[14px] transition duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
              >
                {t.apps[app.id]}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="flex-1" />
      <LanguageToggle className={itemClass} />
      <ThemeToggle className={itemClass} iconSize={21} />
    </aside>
  );
}
