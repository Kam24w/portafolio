"use client";

import { useEffect, useState } from "react";

const DURATION_MS = 700;

/** Número que cuenta de 0 a `to` al montarse (o aparece directo si se reduce el movimiento). */
export function Stat({ to, label }: { to: number; label: string }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let start: number | null = null;

    const step = (timestamp: number) => {
      start ??= timestamp;
      const progress = reduceMotion ? 1 : Math.min((timestamp - start) / DURATION_MS, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [to]);

  return (
    <div className="rounded-[13px] border border-glass-border bg-tint/6 px-2 py-3 text-center transition-transform duration-200 hover:-translate-y-[3px]">
      <b className="block font-display text-[22px] font-semibold text-fg">{value}</b>
      <span className="text-[11px] text-fg-subtle">{label}</span>
    </div>
  );
}
