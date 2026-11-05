"use client";

import { useLanguage } from "./LanguageProvider";
import SectionHeading from "./SectionHeading";

export default function About() {
  const { content } = useLanguage();
  const { about, skills } = content;
  return (
    <section id="sobre-mi" aria-labelledby="about-title" className="scroll-mt-20 py-24">
      <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} />
      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <div className="space-y-4 text-lg leading-relaxed">
          {about.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <dl className="space-y-6" aria-label={about.skillsLabel}>
          {skills.groups.map(({ group, items }) => (
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
