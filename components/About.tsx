"use client";

import { useLanguage } from "./LanguageProvider";

export default function About() {
  const { content } = useLanguage();
  const { about, skills } = { about: content.about, skills: content.skills.groups };
  return (
    <section id="sobre-mi" className="scroll-mt-20 py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-signal">{content.about.eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">{content.about.title}</h2>
      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <div className="space-y-4 text-lg leading-relaxed">
          {about.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <dl className="space-y-6">
          {skills.map(({ group, items }) => (
            <div key={group} className="border-t border-ink/20 pt-4">
              <dt className="font-display text-xl font-semibold">{group}</dt>
              <dd className="mt-1 text-ink/80">{items.map((item) => item.name).join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
