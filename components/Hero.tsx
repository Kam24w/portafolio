"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

export default function Hero() {
  const { content } = useLanguage();
  const { profile, hero } = content;
  return (
    <section
      id="inicio"
      className="relative grid min-h-[calc(100svh-73px)] items-center gap-12 overflow-hidden py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28"
    >
      <div className="hero-orbit absolute -right-36 -top-20 size-96 rounded-full border border-signal/20" aria-hidden="true" />
      <div className="hero-orbit hero-orbit-delay absolute -bottom-40 left-1/3 size-96 rounded-full border border-signal/15" aria-hidden="true" />
      <div>
        <div className="hero-kicker mb-6 flex w-fit items-center gap-3 border border-mint/40 bg-[#020817]/70 px-3 py-2">
          <span className="pixel-label text-[0.5rem] text-mint">{hero.player}</span>
          <span className="h-1 w-12 bg-signal" aria-hidden="true" />
          <span className="pixel-label text-[0.5rem] text-white/60">{hero.status}</span>
        </div>
        <h1 className="max-w-4xl font-display text-[clamp(3.5rem,9vw,8.5rem)] font-extrabold leading-[0.86] tracking-[-0.06em]">
          {hero.titleBefore} <span className="text-signal">{hero.titleAccent}</span>
        </h1>
        <p className="mt-8 max-w-xl text-xl leading-relaxed text-ink/75 md:text-2xl">{profile.intro}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#proyectos" className="game-button rounded-sm bg-signal px-6 py-4 font-medium text-white transition-transform hover:-translate-y-0.5">{hero.explore} <span aria-hidden="true">▶</span></a>
          <a href="#experiencia" className="game-button game-button--ghost rounded-sm border border-mint/50 px-6 py-4 font-medium text-mint hover:bg-mint/10">{hero.profile} <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div className="hero-card group relative min-h-80 overflow-hidden rounded-[2rem] bg-ink shadow-2xl shadow-signal/20 md:min-h-[30rem]">
        <Image src="/perfil.jpe" alt={hero.imageAlt} fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover object-left transition-transform duration-700 group-hover:scale-105" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-paper">
          <span className="font-display text-xl font-bold">{hero.imageCaption}</span>
          <span aria-hidden="true" className="grid size-12 place-items-center rounded-full bg-signal text-2xl transition-transform duration-300 group-hover:rotate-45">↗</span>
        </div>
      </div>
    </section>
  );
}
