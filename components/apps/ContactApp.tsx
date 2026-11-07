"use client";

import { PROFILE } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { Icon, type IconName } from "@/components/ui/Icon";
import { AppHeading, Paragraph } from "@/components/ui/window-content";

type ContactLink = { icon: IconName; href: string; label: string; hint: string; external: boolean };

export function ContactApp() {
  const { t } = useLocale();

  const links: ContactLink[] = [
    { icon: "mail", href: `mailto:${PROFILE.email}`, label: PROFILE.email, hint: t.contact.emailHint, external: false },
    { icon: "github", href: PROFILE.github.href, label: PROFILE.github.label, hint: t.contact.githubHint, external: true },
    { icon: "linkedin", href: PROFILE.linkedin.href, label: PROFILE.linkedin.label, hint: t.contact.linkedinHint, external: true },
  ];

  return (
    <>
      <AppHeading>{t.contact.title}</AppHeading>
      <Paragraph>{t.contact.intro}</Paragraph>
      <div className="mt-1.5 flex flex-col gap-2">
        {links.map((link) => (
          <a
            key={link.icon}
            href={link.href}
            {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
            className="flex items-center gap-[11px] rounded-[13px] border border-glass-border bg-tint/5 px-3.5 py-[11px] text-[13.5px] font-medium text-fg transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft hover:shadow-[0_8px_20px_-6px_rgba(30,30,60,.28)]"
          >
            <Icon name={link.icon} size={17} className="shrink-0 text-accent" />
            {link.label}
            <small className="ml-auto text-[10.5px] text-fg-subtle">{link.hint}</small>
          </a>
        ))}
      </div>
      <p className="mt-[13px] flex items-center justify-center gap-2 text-xs text-fg-subtle">
        <Icon name="pin" size={13} />
        {PROFILE.location}
      </p>
    </>
  );
}
