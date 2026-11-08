"use client";

import { Icon, type IconName } from "@/components/ui/Icon";
import { PROFILE } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { useDesktop } from "./DesktopContext";

const tooltipClass =
  "pointer-events-none absolute top-1/2 left-14 z-60 -translate-x-1.5 -translate-y-1/2 rounded-[9px] border border-glass-border bg-glass-strong px-[11px] py-[5px] text-xs font-medium whitespace-nowrap text-fg opacity-0 shadow-glass backdrop-blur-[14px] transition duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100";

const circleClass =
  "group relative flex size-10 items-center justify-center rounded-full bg-white/85 text-[#1c1c22] shadow-[0_4px_12px_-4px_rgba(0,0,0,.35)] transition duration-150 hover:scale-110 dark:bg-white/12 dark:text-white";

type SocialLink = { icon: IconName; href: string; label: string; external: boolean };

/** Píldora lateral con accesos a redes y contacto (las apps viven en el dock). */
export function Sidebar() {
  const { t } = useLocale();
  const { openWindow } = useDesktop();

  const links: SocialLink[] = [
    { icon: "github", href: PROFILE.github.href, label: t.social.github, external: true },
    { icon: "linkedin", href: PROFILE.linkedin.href, label: t.social.linkedin, external: true },
    { icon: "mail", href: `mailto:${PROFILE.email}`, label: t.social.email, external: false },
  ];

  return (
    <aside
      aria-label={t.social.label}
      className="glass absolute top-1/2 left-3 z-50 flex w-14 -translate-y-1/2 flex-col items-center gap-3 rounded-full py-3 max-sm:hidden"
    >
      <button
        type="button"
        aria-label={t.nav.home}
        onClick={() => openWindow("inicio")}
        className="group relative flex size-10 items-center justify-center rounded-full bg-linear-135 from-accent to-[#9b5bf5] font-display text-[13px] font-bold text-white transition duration-150 hover:scale-110 hover:-rotate-6"
      >
        {PROFILE.initials}
        <span aria-hidden="true" className={tooltipClass}>
          {t.nav.home}
        </span>
      </button>

      <div aria-hidden="true" className="h-px w-6 bg-glass-border" />

      {links.map((link) => (
        <a
          key={link.icon}
          href={link.href}
          aria-label={link.label}
          {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
          className={circleClass}
        >
          <Icon name={link.icon} size={18} />
          <span aria-hidden="true" className={tooltipClass}>
            {link.label}
          </span>
        </a>
      ))}
    </aside>
  );
}
