"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";

/**
 * Header que organiza todo el portafolio.
 * Arriba de la página: el nombre ocupa casi toda la pantalla.
 * Al hacer scroll: se compacta en una barra fija con la navegación,
 * y el menú marca la sección que se está viendo.
 */
export default function Header() {
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const [first, ...rest] = profile.name.split(" ");
  const firstLine = `${first} ${rest[0]}`;
  const secondLine = rest.slice(1).join(" ");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-5 transition-[padding,background-color] duration-500 motion-reduce:transition-none md:px-10 ${
        compact
          ? "border-b border-ink/10 bg-paper/85 py-3 backdrop-blur"
          : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl ${
          compact ? "items-center justify-between gap-4" : "flex-col gap-6"
        }`}
      >
        <a
          href="#inicio"
          className={`font-display font-extrabold tracking-tight transition-[font-size,line-height] duration-500 motion-reduce:transition-none ${
            compact
              ? "text-lg leading-none"
              : "text-[clamp(3rem,11vw,9rem)] leading-[0.85]"
          }`}
          aria-label={`${profile.name}, ir al inicio`}
        >
          <span className={compact ? "inline" : "block"}>{firstLine}</span>{" "}
          <span className={compact ? "inline" : "block"}>{secondLine}</span>
        </a>

        <nav aria-label="Principal">
          <ul className="flex gap-1 text-sm md:text-base">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`rounded-full px-3 py-1.5 transition-colors motion-reduce:transition-none ${
                    active === id ? "bg-ink text-paper" : "hover:bg-ink/10"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
