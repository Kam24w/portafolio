"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { searchFromWindowId, projectWindowId } from "@/components/desktop/windows";
import { Icon } from "@/components/ui/Icon";
import { TechChips } from "@/components/ui/TechChips";
import { TONE_GRADIENT } from "@/components/ui/tones";
import { Paragraph, cardClass } from "@/components/ui/window-content";
import type { Project } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";

const COPIED_FEEDBACK_MS = 2000;

const sectionTitleClass = "mb-1.5 font-display text-[13px] font-semibold tracking-wide text-fg uppercase";

export function ProjectDetailApp({ project }: { project: Project }) {
  const { t } = useLocale();
  const text = t.projects.items[project.id];
  const labels = t.projects.detail;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}${searchFromWindowId(projectWindowId(project.id))}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt(labels.share, url); // sin permiso de portapapeles: se muestra para copiar a mano
    }
  };

  const isPortrait = project.image.height > project.image.width;

  return (
    <article>
      {/* captura grande, sin recortes */}
      <div className={cx(TONE_GRADIENT[project.tone], "relative mb-4 overflow-hidden rounded-[14px] p-[3px]")}>
        <div className="flex justify-center rounded-[11px] bg-[#0d1026]/85">
          <Image
            src={project.image.src}
            alt={`${t.gallery.previewOf} ${project.name}`}
            width={project.image.width}
            height={project.image.height}
            sizes="(max-width: 640px) 100vw, 560px"
            className={cx("h-auto rounded-[11px] object-contain", isPortrait ? "max-h-72 w-auto" : "w-full")}
          />
        </div>
      </div>

      {/* encabezado */}
      <header className="mb-3">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          <h3 className="font-display text-[22px] leading-tight font-semibold text-fg">{project.name}</h3>
          <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-semibold text-accent">{text.platform}</span>
          <span className="ml-auto rounded-full bg-tint/10 px-2 py-0.5 text-[11px] text-fg-subtle">{project.year}</span>
        </div>
        <Paragraph>{text.description}</Paragraph>
      </header>

      {/* acciones principales */}
      <div className="mb-4 flex flex-wrap gap-2">
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-[13px] font-semibold text-white shadow-[0_8px_20px_-8px_var(--accent)] transition hover:-translate-y-0.5 hover:brightness-110"
          >
            ↗ {labels.liveDemo}
          </a>
        )}
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className={cx(
            "inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[13px] font-semibold transition hover:-translate-y-0.5",
            project.demo
              ? "border border-glass-border bg-tint/8 text-fg hover:border-accent"
              : "bg-accent text-white shadow-[0_8px_20px_-8px_var(--accent)] hover:brightness-110",
          )}
        >
          <Icon name="github" size={16} />
          {labels.sourceCode}
        </a>
        <button
          type="button"
          onClick={copyLink}
          aria-live="polite"
          className="inline-flex items-center gap-2 rounded-xl border border-glass-border bg-tint/8 px-3.5 py-2 text-[13px] font-medium text-fg-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-fg"
        >
          {copied ? `✓ ${labels.linkCopied}` : `⧉ ${labels.share}`}
        </button>
      </div>

      {/* video promocional: la app en funcionamiento */}
      {project.video && (
        <section className="mb-4">
          <h4 className={sectionTitleClass}>{labels.video}</h4>
          <div className={cx(TONE_GRADIENT[project.tone], "overflow-hidden rounded-[14px] p-[3px]")}>
            <video
              src={project.video}
              poster={project.image.src}
              controls
              playsInline
              preload="metadata"
              aria-label={`${labels.video} · ${project.name}`}
              className="block max-h-[420px] w-full rounded-[11px] bg-[#0d1026]"
            />
          </div>
        </section>
      )}

      {/* problema y rol */}
      <div className="mb-4 grid gap-2.5 @md:grid-cols-2">
        <section className={cx(cardClass, "p-3")}>
          <h4 className={sectionTitleClass}>{labels.problem}</h4>
          <p className="text-[13px]">{text.problem}</p>
        </section>
        <section className={cx(cardClass, "p-3")}>
          <h4 className={sectionTitleClass}>{labels.role}</h4>
          <p className="text-[13px]">{text.role}</p>
        </section>
      </div>

      {/* aprendizajes */}
      <section className="mb-4">
        <h4 className={sectionTitleClass}>{labels.learnings}</h4>
        <ul className="space-y-1.5">
          {text.learnings.map((learning) => (
            <li key={learning} className="flex gap-2 text-[13px]">
              <span aria-hidden="true" className="mt-[3px] flex size-4 shrink-0 items-center justify-center rounded-full bg-ok/15 text-[10px] text-ok">
                ✓
              </span>
              {learning}
            </li>
          ))}
        </ul>
      </section>

      {/* stack */}
      <section>
        <h4 className={sectionTitleClass}>{labels.stack}</h4>
        <TechChips ids={project.tech} />
      </section>
    </article>
  );
}
