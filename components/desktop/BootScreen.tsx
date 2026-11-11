"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { APPS } from "@/components/apps/registry";
import { PROFILE, PROJECTS, TECH, type TechId } from "@/data/portfolio";
import { useNow } from "@/hooks/useNow";
import type { Dictionary } from "@/i18n";
import { localize } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import { splitTime } from "./widgets/ClockWidget";

/*
 * Arranque estilo PC, en tres fases:
 *   1. "post"   → pantalla tipo BIOS que revisa el sistema línea por línea
 *   2. "splash" → logo de FRAYDER OS con indicador de carga
 *   3. "login"  → bienvenida con la hora, el avatar y el nombre; luego se desvanece
 * Cualquier tecla o clic lo omite. Si ya se vio en esta sesión (o el sistema
 * pide reducir el movimiento), va directo a una bienvenida corta.
 */

type Phase = "post" | "splash" | "login" | "done";

const SEEN_KEY = "fc-boot-seen";
const POST_START_MS = 250;
const POST_LINE_MS = 170;
const POST_HOLD_MS = 900; // con "iniciando FRAYDER OS" en pantalla
const SPLASH_MS = 1400;
const LOGIN_MS = 1500;
const QUICK_LOGIN_MS = 900;
const FADE_MS = 600;

/** Tecnologías que se listan en la línea "stack" de la BIOS. */
const POST_STACK: readonly TechId[] = ["react", "nextjs", "kotlin", "unity", "python"];

const fill = (template: string, n: number) => template.replace("{n}", String(n));
const capitalizeWords = (text: string) => text.replace(/(^|\s)(\S)/g, (_, space: string, letter: string) => space + letter.toUpperCase());

function postLines(t: Dictionary, locale: Parameters<typeof localize>[1]) {
  const { labels, values } = t.boot.post;
  return [
    { label: labels.cpu, value: values.cpu },
    { label: labels.memory, value: fill(values.memory, PROJECTS.length) },
    { label: labels.apps, value: fill(values.apps, APPS.length) },
    { label: labels.stack, value: POST_STACK.map((id) => localize(TECH[id].label, locale)).join(" · ") },
    { label: labels.network, value: PROFILE.github.label },
    { label: labels.location, value: PROFILE.location.split("·")[0].trim() },
  ];
}
const POST_LINE_COUNT = 6;

function greetingFor(date: Date, t: Dictionary): string {
  const hour = date.getHours();
  if (hour < 12) return t.boot.greetings.morning;
  if (hour < 19) return t.boot.greetings.afternoon;
  return t.boot.greetings.evening;
}

const Spinner = ({ className }: { className?: string }) => (
  <span aria-hidden="true" className={cx("inline-block rounded-full border-white/20 border-t-white motion-safe:animate-spin", className)} />
);

const LogoMark = ({ className }: { className?: string }) => (
  <span className={cx("flex items-center justify-center bg-linear-135 from-[#1d4ed8] to-[#0ea5c6] font-display font-bold text-white", className)}>
    {PROFILE.initials}
  </span>
);

export function BootScreen() {
  const { t, locale, dateLocale } = useLocale();
  const now = useNow();
  const [phase, setPhase] = useState<Phase>("post");
  const [linesShown, setLinesShown] = useState(0);
  const [gone, setGone] = useState(false);

  /** Avanza de fase, salvo que ya se haya terminado (por ejemplo, tras omitir). */
  const advance = useCallback((next: Phase) => setPhase((current) => (current === "done" ? current : next)), []);

  const finish = useCallback(() => {
    setPhase("done");
    setTimeout(() => setGone(true), FADE_MS);
  }, []);

  /* programa la secuencia completa (o la corta) */
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const at = (ms: number, run: () => void) => timers.push(setTimeout(run, ms));

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* sin almacenamiento: secuencia completa */
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (seen || reduceMotion) {
      at(0, () => advance("login"));
      at(QUICK_LOGIN_MS, finish);
    } else {
      for (let i = 1; i <= POST_LINE_COUNT; i++) at(POST_START_MS + i * POST_LINE_MS, () => setLinesShown(i));
      const splashAt = POST_START_MS + POST_LINE_COUNT * POST_LINE_MS + POST_HOLD_MS;
      at(splashAt, () => advance("splash"));
      at(splashAt + SPLASH_MS, () => advance("login"));
      at(splashAt + SPLASH_MS + LOGIN_MS, finish);
    }
    return () => timers.forEach(clearTimeout);
  }, [advance, finish]);

  /* cualquier tecla lo omite */
  useEffect(() => {
    if (gone) return;
    window.addEventListener("keydown", finish);
    return () => window.removeEventListener("keydown", finish);
  }, [gone, finish]);

  if (gone) return null;

  const lines = postLines(t, locale);
  const time = now ? splitTime(now, dateLocale) : null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={t.boot.skip}
      onClick={finish}
      className={cx(
        "fixed inset-0 z-200 cursor-pointer overflow-hidden bg-black outline-none select-none",
        "transition-opacity duration-600",
        phase === "done" && "pointer-events-none opacity-0",
      )}
    >
      {/* ---------- 1. BIOS ---------- */}
      {phase === "post" && (
        <div className="absolute inset-0 flex flex-col p-[clamp(20px,4vw,56px)] font-mono text-[clamp(11px,1.05vw,14px)] leading-relaxed text-[#b9c4d6]">
          <header className="flex items-start justify-between gap-6">
            <div>
              <p className="text-white">{t.boot.post.vendor}</p>
              <p className="text-[#6b7a90]">© 2026 · {PROFILE.github.label}</p>
            </div>
            <div className="flex items-center gap-3">
              <LogoMark className="size-12 rounded-xl text-lg" />
              <span className="font-display text-xs leading-tight font-bold tracking-[.3em] text-white uppercase">
                frayder
                <br />
                <span className="text-[#38bdf8]">os</span>
              </span>
            </div>
          </header>

          <ul className="mt-[6vh] max-w-3xl space-y-1.5">
            {lines.slice(0, linesShown).map((line) => (
              <li key={line.label} className="flex gap-3 whitespace-pre">
                <span className="text-[#7d8aa0] uppercase">{line.label.padEnd(14, ".")}</span>
                <span className="truncate text-white">{line.value}</span>
                <span className="ml-auto pl-4 text-[#22c55e]">[ OK ]</span>
              </li>
            ))}
          </ul>

          {linesShown === POST_LINE_COUNT && (
            <p className="mt-6 text-white">
              {t.boot.post.booting}
              <span aria-hidden="true" className="ml-1.5 inline-block h-[1.1em] w-[.6em] translate-y-[.2em] bg-white motion-safe:animate-blink" />
            </p>
          )}

          <footer className="mt-auto flex justify-between gap-6 text-[#6b7a90]">
            <span>{t.boot.post.hint}</span>
            <span>v2.0.26</span>
          </footer>
        </div>
      )}

      {/* ---------- 2. logo + carga ---------- */}
      {phase === "splash" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 transition-opacity duration-500 starting:opacity-0">
          <LogoMark className="size-24 rounded-[28px] text-4xl shadow-[0_0_90px_-10px_rgba(14,165,198,.65)]" />
          <p className="font-display text-sm font-semibold tracking-[.5em] text-white/85 uppercase">frayder os</p>
          <Spinner className="mt-8 size-8 border-[3px]" />
        </div>
      )}

      {/* ---------- 3. bienvenida ---------- */}
      {(phase === "login" || phase === "done") && (
        <div className="absolute inset-0 transition-opacity duration-700 starting:opacity-0">
          <div aria-hidden="true" className="absolute -inset-12 bg-[url('/assets/imagen_fondo_2.jpg')] bg-cover bg-center blur-2xl" />
          <div aria-hidden="true" className="absolute inset-0 bg-[#060b16]/55" />

          <div className={cx("relative flex h-full flex-col items-center justify-center text-white transition duration-600", phase === "done" && "scale-105")}>
            <p className="flex items-baseline gap-2 font-dot leading-none font-black">
              <span className="text-[clamp(64px,9vw,120px)] tabular-nums">{time?.time ?? "--:--"}</span>
              {time?.period && <span className="text-2xl">{time.period}</span>}
            </p>
            <p className="mt-3 text-lg font-medium text-white/80 first-letter:uppercase">
              {now?.toLocaleDateString(dateLocale, { weekday: "long", day: "numeric", month: "long" })}
            </p>

            <div className="mt-[8vh] flex flex-col items-center">
              <span className="relative size-28 overflow-hidden rounded-full bg-linear-160 from-[#dbeafe] to-[#2563eb] ring-4 ring-white/25">
                <Image src={PROFILE.photo} alt="" width={224} height={472} priority className="absolute top-1 left-1/2 w-[88%] max-w-none -translate-x-1/2" />
              </span>
              <p className="mt-4 font-display text-2xl font-semibold">{capitalizeWords(PROFILE.name)}</p>
              <p className="mt-1 text-sm text-white/70">{now ? greetingFor(now, t) : " "}</p>
              <p className="mt-7 flex items-center gap-3 text-sm text-white/85">
                <Spinner className="size-4 border-2" />
                {t.boot.welcome}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
