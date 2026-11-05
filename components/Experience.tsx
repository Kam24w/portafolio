"use client";

import { useLanguage } from "./LanguageProvider";

export default function Experience() {
  const { content } = useLanguage();
  const { experience } = content;
  return (
    <section id="experiencia" className="scroll-mt-24 border-t border-ink/15 py-24">
      <div className="grid gap-12 md:grid-cols-[0.7fr_1.3fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-signal">{experience.eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">{experience.title}</h2>
        </div>
        <ol>
          {experience.items.map((item) => (
            <li key={`${item.period}-${item.title}`} className="grid gap-3 border-t border-ink/20 py-6 md:grid-cols-[9rem_1fr_auto] md:gap-8">
              <span className="text-sm font-semibold text-signal">{item.period}</span>
              <div>
                <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                <p className="mt-1 text-ink/60">{item.place}</p>
                <p className="mt-4 max-w-xl leading-relaxed text-ink/80">{item.description}</p>
              </div>
              <span className="h-fit w-fit rounded-full border border-ink/20 px-3 py-1 text-xs">{item.type}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
