"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  const { content } = useLanguage();
  const { projects } = content;
  return (
    <section id="proyectos" className="scroll-mt-20 py-24">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <SectionHeading id="projects-title" eyebrow={projects.eyebrow} title={projects.title} tone="light" />
        </div>
        <p className="max-w-sm text-white/65">{projects.description}</p>
      </div>
      <div className="projects-gallery mt-12 overflow-hidden">
        <ul className="projects-track flex w-max gap-5 py-3">
        {projects.items.concat(projects.items).map((p, index) => (
          <li key={`${p.name}-${index}`} aria-hidden={index >= projects.items.length} className="project-card group w-[min(82vw,23rem)] shrink-0 overflow-hidden rounded-sm border border-white/15 bg-[#101b31] text-paper shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-signal/15 sm:w-[23rem]">
            <div className="relative h-44 overflow-hidden border-b border-white/10 bg-[#020817] sm:h-48">
              <Image src={p.image} alt={`${projects.imageAlt} ${p.name}`} fill sizes="(max-width: 640px) 82vw, 368px" className="object-contain object-center transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <span className="pixel-label absolute left-5 top-5 border border-mint/60 bg-[#07111f] px-3 py-2 text-[0.5rem] text-mint">{p.year}</span>
              <span className="absolute bottom-5 right-5 grid size-11 place-items-center rounded-full bg-signal text-xl text-white transition-transform duration-300 group-hover:rotate-45">↗</span>
            </div>
            <div className="p-6">
              <h3 className="font-display text-2xl font-bold">{p.name}</h3>
              <p className="mt-2 text-white/70">{p.description}</p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <span className="pixel-label text-[0.45rem] uppercase tracking-wider text-mint/80">{p.stack}</span>
                <span className="flex gap-4">
                  <a href={p.github} target="_blank" rel="noreferrer" className="text-sm font-semibold underline underline-offset-4">GitHub ↗</a>
                  <a href={p.demo} target={p.demo.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-sm font-semibold text-signal underline underline-offset-4">Demo ↗</a>
                </span>
              </div>
            </div>
          </li>
        ))}
        </ul>
      </div>
      <p className="pixel-label mt-4 text-center text-[0.5rem] uppercase tracking-[0.2em] text-white/45">
        {projects.slideHint}
      </p>
    </section>
  );
}
