import type { ReactNode } from "react";
import type { Tone } from "@/data/portfolio";
import { cx } from "@/lib/cx";
import { TONE_GRADIENT } from "./tones";

/** Superficie base de las tarjetas dentro de una ventana. */
export const cardClass = "rounded-[14px] border border-glass-border bg-tint/5";

export function AppHeading({ children }: { children: ReactNode }) {
  return <h3 className="mb-3 font-display text-[19px] font-semibold text-fg">{children}</h3>;
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
        "hover:translate-x-1 hover:shadow-[0_8px_20px_-6px_rgba(30,30,60,.25)]",
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
