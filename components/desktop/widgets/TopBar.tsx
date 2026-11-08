"use client";

import Image from "next/image";
import { PROFILE } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { useDesktop } from "../DesktopContext";
import { LanguageToggle, ThemeToggle } from "../PreferenceToggles";

const circleClass =
  "glass flex size-10 shrink-0 items-center justify-center rounded-full text-fg transition duration-150 hover:scale-105 hover:text-accent";

/** Esquina superior derecha: idioma, tema y la píldora de perfil (abre "sobre mí"). */
export function TopBar() {
  const { t } = useLocale();
  const { openWindow } = useDesktop();
  const firstName = PROFILE.name.split(" ")[0];

  return (
    <div className="flex items-center justify-end gap-2">
      <LanguageToggle className={circleClass} />
      <ThemeToggle className={circleClass} iconSize={18} />
      <button
        type="button"
        onClick={() => openWindow("sobre-mi")}
        aria-label={t.profile.open}
        title={t.profile.open}
        className="glass flex items-center gap-2.5 rounded-full py-1 pr-1 pl-4 text-sm font-semibold text-fg transition duration-150 hover:scale-[1.03] max-sm:hidden"
      >
        {firstName}
        <span className="relative size-8 overflow-hidden rounded-full bg-linear-160 from-[#c7d2fe] to-accent">
          <Image src={PROFILE.photo} alt="" width={64} height={135} className="absolute top-0.5 left-1/2 w-[90%] max-w-none -translate-x-1/2" />
        </span>
      </button>
    </div>
  );
}
