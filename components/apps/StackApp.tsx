"use client";

import { STACK, TECH } from "@/data/portfolio";
import { localize } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import { TONE_GRADIENT } from "@/components/ui/tones";
import { AppHeading, Paragraph, cardClass } from "@/components/ui/window-content";

export function StackApp() {
  const { t, locale } = useLocale();

  return (
    <>
      <AppHeading>{t.stack.title}</AppHeading>
      <Paragraph>{t.stack.intro}</Paragraph>
      {STACK.map((category) => (
        <section
          key={category.id}
          className={cx(
            cardClass,
            "mb-[9px] px-[13px] py-3 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-8px_rgba(30,30,60,.25)]",
          )}
        >
          <h4 className="mb-2.5 flex items-center gap-[9px] text-[13.5px] font-semibold text-fg">
            <span
              aria-hidden="true"
              className={cx(
                TONE_GRADIENT[category.tone],
                "flex size-[27px] shrink-0 items-center justify-center rounded-[9px] font-display text-[10px] font-bold text-white",
              )}
            >
              {category.glyph}
            </span>
            {t.stack.categories[category.id]}
            <span className="ml-auto rounded-full bg-tint/12 px-[9px] py-0.5 text-[10.5px] font-normal text-fg-subtle">
              {category.items.length}
            </span>
          </h4>
          <ul className="grid grid-cols-2 gap-1.5">
            {category.items.map((id) => {
              const tech = TECH[id];
              return (
                <li
                  key={id}
                  className="flex items-center gap-2 rounded-[10px] border border-glass-border bg-tint/4 px-2.5 py-[7px] text-[12.5px] font-medium text-fg-muted transition duration-150 hover:-translate-y-0.5 hover:border-accent hover:text-fg hover:shadow-[0_6px_14px_-5px_rgba(30,30,60,.25)]"
                >
                  <span
                    aria-hidden="true"
                    className="flex size-[21px] shrink-0 items-center justify-center rounded-[6.5px] text-[8px] font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${tech.colors[0]}, ${tech.colors[1]})` }}
                  >
                    {tech.mark}
                  </span>
                  {localize(tech.label, locale)}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
      <p className="mt-3 rounded-[10px] border border-dashed border-glass-border p-2 text-center text-xs text-fg-subtle">
        {t.stack.note}
      </p>
    </>
  );
}
