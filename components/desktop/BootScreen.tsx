"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { APPS } from "@/components/apps/registry";
import { PROFILE, PROJECTS } from "@/data/portfolio";
import { useNow } from "@/hooks/useNow";
import { useLocale } from "@/i18n/LocaleProvider";
import type { Dictionary } from "@/i18n";
import { cx } from "@/lib/cx";

const STEP_MS = 300;
const HOLD_AFTER_LAST_STEP_MS = 400;
const FADE_DURATION_MS = 600;

const fill = (template: string, n: number) => template.replace("{n}", String(n));

function bootSteps(t: Dictionary): string[] {
  return [
    t.boot.steps.system,
    fill(t.boot.steps.projects, PROJECTS.length),
    fill(t.boot.steps.apps, APPS.length),
    t.boot.steps.widgets,
    t.boot.steps.ready,
  ];
}

function greetingFor(date: Date, t: Dictionary): string {
  const hour = date.getHours();
  if (hour < 12) return t.boot.greetings.morning;
  if (hour < 19) return t.boot.greetings.afternoon;
  return t.boot.greetings.evening;
}

export function BootScreen() {
  const { t } = useLocale();
  const now = useNow(60_000);
  const steps = bootSteps(t);
  const [completed, setCompleted] = useState(0);
  const [fading, setFading] = useState(false);
  const [gone, setGone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* avanza el registro de arranque línea por línea y luego se desvanece */
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const stepMs = reduceMotion ? 0 : STEP_MS;

    for (let i = 1; i <= steps.length; i++) {
      timers.push(setTimeout(() => setCompleted(i), i * stepMs));
    }
    const fadeAt = steps.length * stepMs + HOLD_AFTER_LAST_STEP_MS;
    timers.push(setTimeout(() => setFading(true), fadeAt));
    timers.push(setTimeout(() => setGone(true), fadeAt + FADE_DURATION_MS));

    overlayRef.current?.focus({ preventScroll: true }); // así Enter funciona sin hacer clic antes
    return () => timers.forEach(clearTimeout);
  }, [steps.length]);

  if (gone) return null;

  const skip = () => {
    setFading(true);
    setTimeout(() => setGone(true), FADE_DURATION_MS);
  };

  const progress = Math.round((completed / steps.length) * 100);

  return (
    <div
      ref={overlayRef}
      role="button"
      tabIndex={0}
      aria-label={t.boot.skip}
      onClick={skip}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " " || event.key === "Escape") skip();
      }}
      className={cx(
        "fixed inset-0 z-200 flex items-center justify-center overflow-hidden outline-none",
        "bg-[rgba(240,239,250,.55)] backdrop-blur-[26px] dark:bg-[rgba(8,8,22,.6)]",
        "transition-[opacity,visibility] duration-600",
        fading && "invisible opacity-0",
      )}
    >
      {/* luces de ambiente */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-32 -left-24 size-[420px] rounded-full bg-accent/30 blur-[110px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-32 size-[420px] rounded-full bg-[#22d3ee]/25 blur-[110px]" />

      <div
        className={cx(
          "glass relative w-[min(370px,calc(100%-40px))] rounded-[28px] px-7 pt-8 pb-6 text-center",
          "transition-[scale,opacity,filter] duration-600 ease-[cubic-bezier(.4,0,.2,1)] starting:translate-y-3 starting:scale-95 starting:opacity-0",
          fading && "scale-110 opacity-0 blur-sm",
        )}
      >
        {/* avatar con anillo giratorio */}
        <div className="relative mx-auto mb-4 size-24">
          <div aria-hidden="true" className="absolute -inset-3 rounded-full bg-conic from-accent via-[#22d3ee] to-[#9b5bf5] opacity-50 blur-xl motion-safe:animate-spin motion-safe:[animation-duration:6s]" />
          <div aria-hidden="true" className="absolute -inset-[3px] rounded-full bg-conic from-accent via-[#22d3ee] to-[#9b5bf5] motion-safe:animate-spin motion-safe:[animation-duration:4s]" />
          <div className="relative size-full overflow-hidden rounded-full bg-linear-160 from-[#c7d2fe] to-[#5451d6]">
            <Image src={PROFILE.photo} alt="" width={192} height={405} priority className="absolute top-1 left-1/2 w-[86%] max-w-none -translate-x-1/2" />
          </div>
        </div>

        <p className="min-h-4 text-[11px] font-semibold tracking-[.18em] text-accent uppercase">{now ? greetingFor(now, t) : " "}</p>
        <h1 className="mt-1 font-display text-2xl leading-tight font-semibold text-fg">{PROFILE.name}</h1>
        <p className="mt-0.5 text-[13px] text-fg-muted">
          {t.boot.title} <span className="text-fg-subtle">· v2</span>
        </p>

        {/* registro de arranque */}
        <ol aria-live="polite" className="mt-5 rounded-2xl border border-glass-border bg-tint/8 px-3.5 py-2.5 text-left font-mono text-[11.5px] leading-6 text-fg-muted">
          {steps.map((step, index) => {
            const done = index < completed;
            return (
              <li
                key={step}
                className={cx("flex items-center gap-2 transition duration-300", done ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0")}
              >
                <span className={cx("text-ok", index === steps.length - 1 && "text-accent")}>{index === steps.length - 1 ? "●" : "✓"}</span>
                {step}
              </li>
            );
          })}
        </ol>

        {/* progreso */}
        <div className="mt-4 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-tint/15">
            <div
              className="h-full rounded-full bg-linear-to-r from-accent to-[#22d3ee] transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="w-9 text-right font-mono text-[11px] text-fg-subtle tabular-nums">{progress}%</span>
        </div>

        <p className="mt-4 text-[11px] text-fg-subtle">{t.boot.hint}</p>
      </div>
    </div>
  );
}
