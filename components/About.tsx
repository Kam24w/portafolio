import { about, skills } from "@/lib/data";

export default function About() {
  return (
    <section id="sobre-mi" className="scroll-mt-20 py-24">
      <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
        Sobre mí
      </h2>
      <div className="mt-8 grid gap-12 md:grid-cols-2">
        <div className="space-y-4 text-lg leading-relaxed">
          {about.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <dl className="space-y-6">
          {skills.map(({ group, items }) => (
            <div key={group} className="border-t border-ink/20 pt-4">
              <dt className="font-display text-xl font-semibold">{group}</dt>
              <dd className="mt-1 text-ink/80">{items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
