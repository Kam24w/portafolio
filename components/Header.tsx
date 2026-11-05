"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

/**
 * Header que organiza todo el portafolio.
 * Arriba de la página: el nombre ocupa casi toda la pantalla.
 * Al hacer scroll: se compacta en una barra fija con la navegación,
 * y el menú marca la sección que se está viendo.
 */
export default function Header() {
  const { language, setLanguage, content } = useLanguage();
  const { navLinks, profile, header } = content;
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
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
      observer.disconnect();
    };
  }, [navLinks]);

  return (
    <header className="game-header sticky top-0 z-50 px-5 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="game-header__top flex items-center justify-between py-2 text-[0.55rem] text-white/45">
          <span className="pixel-label">FC // PORTFOLIO_OS v1.0</span>
          <span className="pixel-label hidden items-center gap-2 sm:flex"><i className="status-dot" /> {header.online}</span>
        </div>
        <div className="flex items-center justify-between py-4">
        <a href="#inicio" className="group flex items-center gap-3 font-display text-lg font-extrabold" aria-label={`${profile.name}, ir al inicio`}>
          <span className="logo-mark grid size-11 place-items-center rounded-sm bg-signal text-sm text-white shadow-[4px_4px_0_#5fe7ff] transition-transform group-hover:translate-x-1 group-hover:translate-y-1 group-hover:shadow-none">{profile.initials}</span>
          <span className="hidden sm:block"><span className="block text-[0.58rem] font-normal tracking-[0.2em] text-mint">{header.profileLabel}</span>{profile.name}</span>
        </a>
        <button
          type="button"
          className="pixel-label rounded-sm border border-mint/50 px-4 py-2 text-[0.55rem] text-mint md:hidden"
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? header.close : header.menu} <span aria-hidden="true">{open ? "×" : "☰"}</span>
        </button>
        <nav id="primary-navigation" aria-label={header.navigation} className={`${open ? "block" : "hidden"} absolute inset-x-5 top-full rounded-sm border border-signal/60 bg-[#020817] p-3 shadow-xl md:static md:block md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
          <ul className="flex flex-col gap-1 text-sm md:flex-row md:items-center md:gap-1">
            {navLinks.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className={`nav-link rounded-sm px-3 py-2 transition-colors motion-reduce:transition-none ${
                    active === id ? "bg-ink text-paper" : "hover:bg-ink/10"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="mt-2 md:mt-0 md:ml-2">
              <a href="#contacto" className="nav-cta inline-block rounded-sm bg-signal px-4 py-2 font-medium text-white hover:brightness-110">{header.contact}</a>
            </li>
            <li className="mt-2 md:mt-0 md:ml-2">
              <div className="flex items-center gap-1 rounded-sm border border-mint/40 p-1" aria-label={header.language}>
                {(["es", "en"] as const).map((option) => (
                  <button key={option} type="button" onClick={() => setLanguage(option)} aria-pressed={language === option} className={`px-2 py-1 text-[0.55rem] font-semibold ${language === option ? "bg-mint text-ink" : "text-mint/70 hover:text-mint"}`}>
                    {option.toUpperCase()}
                  </button>
                ))}
              </div>
            </li>
          </ul>
        </nav>
      </div>
      </div>
    </header>
  );
}
