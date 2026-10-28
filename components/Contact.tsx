import { profile } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contacto" className="scroll-mt-20 py-24">
      <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
        Contacto
      </h2>
      <p className="mt-8 max-w-xl text-lg">
        ¿Tienes un proyecto o una oferta? Escríbeme.
      </p>
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
