"use client";

import { useLanguage } from "./LanguageProvider";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  const { content } = useLanguage();
  const { skills } = content;
  return (
    <section id="habilidades" aria-labelledby="skills-title" className="scroll-mt-24 border-t border-ink/15 py-24">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <SectionHeading id="skills-title" eyebrow={skills.eyebrow} title={skills.title} tone="light" />
        </div>
        <p className="max-w-sm text-white/65">{skills.description}</p>
      </div>
      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {skills.groups.map(({ group, items }) => (
          <div key={group} className="skills-panel rounded-sm border border-white/20 bg-[#101b31] p-6 text-paper">
            <h3 className="font-display text-xl font-bold">{group}</h3>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {items.map((item) => (
                <li key={item.name} className="group flex items-center gap-3 rounded-sm p-2 transition hover:bg-signal/20">
                  <span className={`grid size-10 shrink-0 place-items-center rounded-sm bg-[#020817] font-display text-sm font-black shadow-sm ${item.tone}`}>{item.mark}</span>
                  <span className="text-sm font-medium">{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
