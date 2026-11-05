"use client";

import { useLanguage } from "./LanguageProvider";

export default function Contact() {
  const { content } = useLanguage();
  const { profile, contact } = content;
  return (
    <section id="contacto" className="scroll-mt-20 py-24">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-signal">{contact.eyebrow}</p>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">{contact.title}</h2>
      <p className="mt-8 max-w-xl text-lg">{contact.description}</p>
      <a
        href={`mailto:${profile.email}`}
        className="mt-4 inline-block break-all font-display text-2xl underline decoration-signal decoration-2 underline-offset-8 md:text-4xl"
      >
        {profile.email}
      </a>
      <ul className="mt-8 flex gap-6">
        {profile.socials.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-signal"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
