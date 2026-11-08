"use client";

import { PROFILE } from "@/data/portfolio";

/**
 * "FRAYDER" gigante detrás de la foto, en grotesk pesado con degradado.
 * La firma "camilo" va delante de la foto (ver HeroDecor). Decorativo.
 */
export function BackdropTitle() {
  const [firstName] = PROFILE.name.split(" ");

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] select-none">
      <div className="absolute inset-x-0 top-[8%] flex flex-col items-center max-sm:top-[22%]">
        <span className="bg-linear-to-b from-title-from to-title-to bg-clip-text font-display text-[clamp(84px,15.5vw,290px)] leading-[0.8] font-bold tracking-[-0.05em] text-transparent uppercase">
          {firstName}
        </span>
      </div>
    </div>
  );
}
