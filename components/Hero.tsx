import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="flex min-h-svh flex-col justify-end pb-16 pt-[clamp(16rem,40vw,30rem)]"
    >
      <p className="max-w-xl text-xl leading-snug md:text-2xl">
        {profile.role}. {profile.intro}
      </p>
      <a
        href="#proyectos"
        className="mt-8 w-fit rounded-full bg-signal px-6 py-3 font-medium text-white transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
      >
        Ver proyectos
      </a>
    </section>
  );
}
