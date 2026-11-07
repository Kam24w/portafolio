"use client";

import { TIMELINE, type TimelineKind } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import { AppHeading } from "@/components/ui/window-content";

const KIND_BADGE = {
  academic: "bg-accent-soft text-accent",
  work: "bg-ok/15 text-ok",
} as const satisfies Record<TimelineKind, string>;

export function TimelineApp() {
  const { t } = useLocale();

  return (
    <>
      <AppHeading>{t.timeline.title}</AppHeading>
      <ol className="relative pl-6 before:absolute before:inset-y-2 before:left-[7px] before:w-0.5 before:rounded-full before:bg-linear-to-b before:from-accent before:to-transparent">
        {TIMELINE.map((entry) => {
          const text = t.timeline.items[entry.id];
          return (
            <li
              key={entry.id}
              className="relative mb-[15px] last:mb-0 before:absolute before:top-[5px] before:-left-6 before:size-3 before:rounded-full before:border-3 before:border-glass-strong before:bg-accent before:shadow-[0_0_0_3px_var(--accent-soft)] motion-safe:before:animate-dot-pulse"
            >
              <div className="text-[13.5px] font-semibold text-fg">
                {text.period} · {text.title}
                <span
                  className={cx(
                    KIND_BADGE[entry.kind],
                    "ml-1.5 inline-block rounded-full px-2 py-0.5 align-[1px] text-[10px] font-semibold",
                  )}
                >
                  {t.timeline.kinds[entry.kind]}
                </span>
              </div>
              <p className="mt-[3px] text-[12.5px]">{text.description}</p>
            </li>
          );
        })}
      </ol>
    </>
  );
}
