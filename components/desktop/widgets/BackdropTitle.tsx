"use client";

import { PROFILE } from "@/data/portfolio";

/**
 * Nombre gigante detrás de la foto: "FRAYDER" y "CAMILO" con el mismo
 * estilo (grotesk pesado, mayúsculas, degradado azul). La foto tapa el
 * centro y deja ver los extremos, como en una portada. Decorativo.
 */
export function BackdropTitle() {
  const [firstName, secondName] = PROFILE.name.split(" ");

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] select-none">
      <div className="absolute inset-x-0 top-[7%] flex flex-col items-center font-display leading-[0.82] font-bold tracking-[-0.05em] uppercase max-sm:top-[20%]">
        {[firstName, secondName].map((word) => (
          <span
            key={word}
            className="bg-linear-to-b from-title-from to-title-to bg-clip-text text-[clamp(80px,14.5vw,270px)] text-transparent"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
