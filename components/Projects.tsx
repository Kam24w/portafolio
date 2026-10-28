import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="proyectos" className="scroll-mt-20 py-24">
      <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
        Proyectos
      </h2>
      <ul className="mt-12">
        {projects.map((p) => (
          <li key={p.name} className="border-t border-ink/20">
            <a
              href={p.href}
              className="grid gap-2 py-8 transition-colors hover:bg-mint/60 md:grid-cols-[6rem_1fr_16rem] md:gap-8 md:px-4"
            >
              <span className="text-ink/60">{p.year}</span>
              <span>
                <span className="block font-display text-2xl font-semibold">
                  {p.name}
                </span>
                <span className="mt-1 block max-w-prose text-ink/80">
                  {p.description}
                </span>
              </span>
              <span className="text-ink/60 md:text-right">{p.stack}</span>
            </a>
          </li>
        ))}
        <li className="border-t border-ink/20" aria-hidden="true" />
      </ul>
    </section>
  );
}
