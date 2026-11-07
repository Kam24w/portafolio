"use client";

import { useLocale } from "@/i18n/LocaleProvider";
import { useTheme } from "@/lib/preferences";
import { Icon } from "@/components/ui/Icon";

type ToggleProps = { className: string; iconSize?: number };

export function ThemeToggle({ className, iconSize }: ToggleProps) {
  const { t } = useLocale();
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" title={t.nav.toggleTheme} aria-label={t.nav.toggleTheme} onClick={toggleTheme} className={className}>
      <Icon name={theme === "dark" ? "sun" : "moon"} size={iconSize} />
    </button>
  );
}

export function LanguageToggle({ className }: ToggleProps) {
  const { t, toggleLocale } = useLocale();

  return (
    <button
      type="button"
      title={t.nav.switchLanguage}
      aria-label={t.nav.switchLanguage}
      onClick={toggleLocale}
      className={className}
    >
      <span className="font-display text-xs font-bold tracking-wide">{t.nav.switchLanguageShort}</span>
    </button>
  );
}
