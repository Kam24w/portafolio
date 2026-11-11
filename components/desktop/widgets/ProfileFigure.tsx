"use client";

import Image from "next/image";
import { PROFILE } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";

/**
 * Filtro de nitidez (unsharp mask ligero): realza bordes, tela y pelo sin
 * generar halos. Kernel 3×3 cuya suma es 1, así que no cambia el brillo.
 */
function SharpenFilter() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <filter id="photo-sharpen" colorInterpolationFilters="sRGB">
        <feConvolveMatrix order="3" kernelMatrix="0 -0.3 0  -0.3 2.2 -0.3  0 -0.3 0" preserveAlpha="true" />
      </filter>
    </svg>
  );
}

/**
 * Foto recortada anclada al borde inferior del marco. Es más alta que el
 * marco, así que la cabeza sobresale por arriba (efecto "pop-out").
 * El espacio que sobresale lo reserva el margen superior del marco en Desktop.
 *
 * Tratamiento de imagen, en capas:
 * 1. nitidez (SVG) → 2. color: contraste, saturación y brillo →
 * 3. luz: contorno fino, sombra de contacto y halo de acento.
 */
export function ProfileFigure() {
  const { t } = useLocale();

  return (
    <div className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[calc(100%+var(--pop-out))] -translate-x-1/2 max-sm:h-[78%]">
      <SharpenFilter />

      {/* halo de luz detrás de la figura: la separa del fondo */}
      <div
        aria-hidden="true"
        className="absolute top-[12%] left-1/2 h-[70%] w-[130%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)] opacity-90 blur-2xl dark:bg-[radial-gradient(closest-side,rgba(156,154,247,.28),transparent)]"
      />

      <Image
        src={PROFILE.photo}
        alt={t.profile.photoAlt}
        width={344}
        height={725}
        quality={100}
        priority
        sizes="(max-width: 640px) 60vw, 40vw"
        className="relative h-full w-auto max-w-none object-contain object-bottom will-change-transform [filter:url(#photo-sharpen)_contrast(1.07)_saturate(1.12)_brightness(1.03)_drop-shadow(0_0_1px_rgba(255,255,255,.55))_drop-shadow(0_24px_36px_rgba(8,8,30,.5))_drop-shadow(0_0_44px_rgba(124,120,240,.28))]"
      />
    </div>
  );
}
