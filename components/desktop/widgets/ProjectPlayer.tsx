"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PROJECT_SONGS } from "@/data/music";
import { PROJECTS } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import { lofi } from "@/lib/lofi";
import { useDesktop } from "../DesktopContext";
import { projectWindowId } from "../windows";

const controlClass = "flex size-7 items-center justify-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white";

/** Duración de cada proyecto en el reproductor: corta en silencio, 8 compases con música. */
const TRACK_SECONDS = { silent: 6, withSound: 24 } as const;

/**
 * Widget estilo "sonando ahora": rota entre los proyectos como si fueran
 * canciones. Con el botón de sonido, suena de verdad: cada proyecto tiene
 * su propia progresión lofi generada en el navegador (lib/lofi.ts).
 * La barra de progreso es una animación CSS; al terminar pasa al siguiente.
 */
export function ProjectPlayer() {
  const { t } = useLocale();
  const { openWindow } = useDesktop();
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  /** `null` = el visitante no ha tocado play/pausa: rota solo, salvo con "reducir movimiento". */
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null);
  const [soundOn, setSoundOn] = useState(false);
  const playing = userPlaying ?? !reducedMotion;

  const project = PROJECTS[index] ?? PROJECTS[0];
  const text = t.projects.items[project.id];
  const step = (delta: number) => setIndex((current) => (current + delta + PROJECTS.length) % PROJECTS.length);
  const audible = soundOn && playing;

  /* sincroniza el motor de audio (sistema externo) con el estado del reproductor */
  useEffect(() => {
    if (audible) lofi.play(PROJECT_SONGS[project.id]);
    else lofi.stop();
  }, [audible, project.id]);

  useEffect(() => () => lofi.stop(), []); // al desmontar, silencio

  const toggleSound = () => {
    if (!soundOn) setUserPlaying(true); // encender el sonido también reanuda
    setSoundOn(!soundOn);
  };

  return (
    <div
      aria-label={t.player.label}
      role="group"
      className="flex items-center gap-3 rounded-[20px] bg-[#111118]/80 p-2.5 pr-2.5 text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,.6)] backdrop-blur-md"
    >
      {/* "disco" que gira mientras suena */}
      <button
        type="button"
        onClick={() => openWindow(projectWindowId(project.id))}
        aria-label={`${t.projects.openDetail}: ${project.name}`}
        className={cx(
          "relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white/25 motion-safe:animate-spin motion-safe:[animation-duration:8s]",
          !playing && "[animation-play-state:paused]",
        )}
      >
        <Image src={project.image.src} alt="" width={88} height={88} className="size-full object-cover" />
        <span aria-hidden="true" className="absolute top-1/2 left-1/2 size-2.5 -translate-1/2 rounded-full bg-[#111118] ring-2 ring-white/40" />
      </button>

      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-[9.5px] font-semibold tracking-[.12em] whitespace-nowrap text-white/45 uppercase">
          {t.player.label}
          {audible && (
            <span aria-hidden="true" className="flex h-2.5 items-end gap-[2px]">
              {["[animation-delay:0s]", "[animation-delay:-.3s]", "[animation-delay:-.6s]"].map((delay) => (
                <i key={delay} className={cx("block h-full w-[2px] origin-bottom rounded-full bg-accent motion-safe:animate-eq", delay)} />
              ))}
            </span>
          )}
        </p>
        <button
          type="button"
          onClick={() => openWindow(projectWindowId(project.id))}
          className="block max-w-full truncate text-left text-[13px] font-semibold hover:underline"
        >
          {project.name}
        </button>
        <p className="truncate text-[10.5px] text-white/55">{text.platform}</p>
        <div className="mt-1.5 h-[3px] overflow-hidden rounded-full bg-white/15">
          <div
            key={`${project.id}-${index}`}
            onAnimationEnd={() => step(1)}
            style={{ animationDuration: `${soundOn ? TRACK_SECONDS.withSound : TRACK_SECONDS.silent}s` }}
            className={cx("h-full w-0 rounded-full bg-white animate-progress", !playing && "[animation-play-state:paused]")}
          />
        </div>
      </div>

      <div className="flex items-center">
        <button type="button" aria-label={t.player.previous} title={t.player.previous} onClick={() => step(-1)} className={controlClass}>
          <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
            <path d="M6 5h2v14H6zM20 5v14L9 12z" />
          </svg>
        </button>
        <button
          type="button"
          aria-label={playing ? t.player.pause : t.player.play}
          title={playing ? t.player.pause : t.player.play}
          onClick={() => setUserPlaying(!playing)}
          className="mx-0.5 flex size-8 items-center justify-center rounded-full bg-white text-[#111118] transition hover:scale-105"
        >
          <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
            {playing ? <path d="M7 5h4v14H7zM13 5h4v14h-4z" /> : <path d="M8 5v14l11-7z" />}
          </svg>
        </button>
        <button type="button" aria-label={t.player.next} title={t.player.next} onClick={() => step(1)} className={controlClass}>
          <svg viewBox="0 0 24 24" className="size-3.5 fill-current" aria-hidden="true">
            <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
          </svg>
        </button>
        {/* sonido: mientras nunca se ha activado, late suavemente para invitar a probarlo */}
        <button
          type="button"
          aria-label={soundOn ? t.player.soundOff : t.player.soundOn}
          title={soundOn ? t.player.soundOff : t.player.soundOn}
          aria-pressed={soundOn}
          onClick={toggleSound}
          className={cx(
            controlClass,
            "ml-1 size-8",
            soundOn ? "bg-accent text-white hover:bg-accent" : "ring-1 ring-white/30 motion-safe:animate-pulse",
          )}
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none" />
            {soundOn ? <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" /> : <path d="m22 9-6 6M16 9l6 6" />}
          </svg>
        </button>
      </div>
    </div>
  );
}
