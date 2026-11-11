"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { CV_URL, PROFILE } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import { useDesktop } from "../DesktopContext";
import { LanguageToggle, ThemeToggle } from "../PreferenceToggles";

const circleClass =
  "glass flex size-10 shrink-0 items-center justify-center rounded-full text-fg transition duration-150 hover:scale-105 hover:text-accent";

const cvClass =
  "flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-linear-135 from-accent to-[#0ea5c6] px-3.5 text-sm font-bold text-white uppercase shadow-[0_8px_20px_-8px_var(--accent)] transition duration-150";

/** Botón de CV: descarga el PDF del idioma activo; si no hay, queda visible pero inactivo ("disponible pronto"). */
function CvButton() {
  const { t, locale } = useLocale();
  const href = CV_URL?.[locale];
  const content = (
    <>
      <Icon name="download" size={17} />
      {t.cv.short}
    </>
  );

  if (!href) {
    return (
      <button type="button" aria-disabled="true" title={t.cv.soon} aria-label={t.cv.soon} className={cx(cvClass, "cursor-not-allowed opacity-75")}>
        {content}
      </button>
    );
  }

  return (
    <a href={href} download title={t.cv.download} aria-label={t.cv.download} className={cx(cvClass, "hover:scale-105 hover:brightness-110")}>
      {content}
    </a>
  );
}

/** Esquina superior derecha: idioma, tema, CV y la píldora de perfil (abre "sobre mí"). */
export function TopBar() {
  const { t } = useLocale();
  const { openWindow } = useDesktop();
  const firstName = PROFILE.name.split(" ")[0];

  return (
    <div className="flex items-center justify-end gap-2">
      <LanguageToggle className={circleClass} />
      <ThemeToggle className={circleClass} iconSize={18} />
      <CvButton />
      <button
        type="button"
        onClick={() => openWindow("sobre-mi")}
        aria-label={t.profile.open}
        title={t.profile.open}
        className="glass flex items-center gap-2.5 rounded-full py-1 pr-1 pl-4 text-sm font-semibold text-fg transition duration-150 hover:scale-[1.03] max-sm:hidden"
      >
        {firstName}
        <span className="relative size-8 overflow-hidden rounded-full bg-linear-160 from-[#dbeafe] to-accent">
          <Image src={PROFILE.photo} alt="" width={64} height={135} className="absolute top-0.5 left-1/2 w-[90%] max-w-none -translate-x-1/2" />
        </span>
      </button>
    </div>
  );
}
