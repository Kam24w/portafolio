"use client";

import Image from "next/image";
import { PROFILE } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";

/**
 * Foto recortada anclada al borde inferior del marco. Es más alta que el
 * marco, así que la cabeza sobresale por arriba (efecto "pop-out").
 * El espacio que sobresale lo reserva el margen superior del marco en Desktop.
 */
export function ProfileFigure() {
  const { t } = useLocale();

  return (
    <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[calc(100%+var(--pop-out))] -translate-x-1/2 max-sm:h-[78%]">
      <Image
        src={PROFILE.photo}
        alt={t.profile.photoAlt}
        width={427}
        height={900}
        quality={95}
        priority
        sizes="(max-width: 640px) 60vw, 40vw"
        className="h-full w-auto max-w-none object-contain object-bottom drop-shadow-[0_24px_40px_rgba(12,12,45,.45)]"
      />
    </div>
  );
}
