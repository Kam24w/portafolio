"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Tone } from "@/data/portfolio";
import { cx } from "@/lib/cx";
import { Icon, type IconName } from "./Icon";
import { TONE_GRADIENT } from "./tones";

/** Datos de la ventana actual (ícono, color y nombre); los pone DesktopWindow. */
export type WindowMeta = { icon: IconName; tone: Tone; label: string };
export const WindowMetaContext = createContext<WindowMeta | null>(null);

/** Superficie base de las tarjetas dentro de una ventana. */
export const cardClass =
  "rounded-2xl border border-glass-border bg-white/45 shadow-[0_1px_2px_rgba(15,23,42,.06)] dark:bg-white/[.04]";

/**
 * Cabecera de cada ventana: ícono grande con el color de la app, etiqueta
 * con el nombre de la app y el título. Fuera de una ventana, es un h3 simple.
 */
export function AppHeading({ children }: { children: ReactNode }) {
  const meta = useContext(WindowMetaContext);
  if (!meta) return <h3 className="mb-3 font-display text-[19px] font-semibold text-fg">{children}</h3>;

  return (
    <header className="mb-5 flex items-center gap-3.5">
      <span
        aria-hidden="true"
        className={cx(
          TONE_GRADIENT[meta.tone],
          "flex size-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-[0_10px_22px_-10px_rgba(15,23,42,.6),inset_0_1px_0_rgba(255,255,255,.35)]",
        )}
      >
        <Icon name={meta.icon} size={22} />
      </span>
      <div className="min-w-0">
        <p className="text-[10.5px] font-bold tracking-[.18em] text-accent uppercase">{meta.label}</p>
        <h3 className="font-display text-[21px] leading-tight font-bold text-fg">{children}</h3>
      </div>
    </header>
  );
}

export function Paragraph({ children }: { children: ReactNode }) {
  return <p className="mb-2.5 last:mb-0">{children}</p>;
}

type FeatureRowProps = {
  mark: ReactNode;
  tone: Tone;
  title: ReactNode;
  children: ReactNode;
  size?: "md" | "sm";
};

/** Fila con ícono de color, título y descripción, con un brillo que cruza al pasar el mouse. */
export function FeatureRow({ mark, tone, title, children, size = "md" }: FeatureRowProps) {
  return (
    <div
      className={cx(
        cardClass,
        "relative mb-3 flex gap-3 overflow-hidden p-3 transition duration-200 last:mb-0",
        "hover:translate-x-1 hover:shadow-[0_8px_20px_-6px_rgba(15,23,42,.25)]",
        "before:absolute before:inset-y-0 before:-left-[70%] before:w-1/2 before:-skew-x-20",
        "before:bg-linear-100 before:from-transparent before:via-white/35 before:to-transparent",
        "before:transition-[left] before:duration-500 hover:before:left-[130%]",
      )}
    >
      <div
        aria-hidden="true"
        className={cx(
          TONE_GRADIENT[tone],
          "flex shrink-0 items-center justify-center font-display font-bold text-white",
          size === "md" ? "size-[38px] rounded-xl text-sm" : "size-[34px] rounded-[10px] text-xs",
        )}
      >
        {mark}
      </div>
      <div>
        <div className="text-[13.5px] font-semibold text-fg">{title}</div>
        <div className="mt-0.5 text-xs text-fg-subtle">{children}</div>
      </div>
    </div>
  );
}
