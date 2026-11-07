"use client";

import Image from "next/image";
import { useMemo } from "react";
import { FEATURED_TECH, PROFILE, PROJECTS } from "@/data/portfolio";
import { useNow } from "@/hooks/useNow";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import { Icon } from "@/components/ui/Icon";
import { TechChips } from "@/components/ui/TechChips";
import { useDesktop } from "./DesktopContext";
import { projectWindowId } from "./windows";

const widgetClass = "glass absolute rounded-[20px] p-[18px] hover:-translate-y-[3px]";

/* ---------- reloj ---------- */

/** Separa "10:29 p. m." en hora ("10:29") y periodo ("p. m."), para mostrar el periodo en pequeño. */
function splitTime(date: Date, locale: string): { time: string; period: string } {
  const parts = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).formatToParts(date);
  const period = parts.find((part) => part.type === "dayPeriod")?.value ?? "";
  const time = parts
    .filter((part) => part.type !== "dayPeriod")
    .map((part) => part.value)
    .join("")
    .trim();
  return { time, period };
}

export function ClockWidget() {
  const { t, dateLocale } = useLocale();
  const now = useNow();
  const { time, period } = now ? splitTime(now, dateLocale) : { time: "--:--", period: "" };

  return (
    <div className={cx(widgetClass, "top-[18px] left-5 w-[210px] max-[820px]:w-[170px]")}>
      <div className="flex items-baseline gap-1.5 whitespace-nowrap">
        <span className="font-display text-[44px] leading-none font-semibold tracking-[.01em] tabular-nums max-[820px]:text-[34px]">
          {time}
        </span>
        {period && <span className="text-sm font-semibold text-fg-muted">{period}</span>}
      </div>
      <div className="mt-1.5 text-[12.5px] text-fg-muted">
        {now?.toLocaleDateString(dateLocale, { weekday: "long", day: "numeric", month: "long" })}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[11.5px] text-fg-muted">
        <span className="size-2 rounded-full bg-ok motion-safe:animate-pulse-ring" /> {t.desktop.openToWork}
      </div>
    </div>
  );
}

/* ---------- calendario ---------- */

/** El 7 de enero de 2024 fue domingo: se usa como referencia para nombrar los días de la semana. */
const REFERENCE_SUNDAY = 7;

type CalendarCell = { key: string; label: string; kind: "weekday" | "empty" | "day" | "today" };

const CELL_CLASS = {
  weekday: "py-[3px] font-semibold text-fg-subtle",
  empty: "",
  day: "rounded-[7px] py-1 text-fg-muted transition duration-150 hover:bg-accent-soft",
  today: "rounded-[7px] bg-accent py-1 font-semibold text-white motion-safe:animate-pop",
} as const satisfies Record<CalendarCell["kind"], string>;

export function CalendarWidget() {
  const { dateLocale } = useLocale();
  const now = useNow(60_000);

  const cells = useMemo<CalendarCell[]>(() => {
    if (!now) return [];
    const weekdayFormat = new Intl.DateTimeFormat(dateLocale, { weekday: "narrow" });
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstWeekday = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return [
      ...Array.from({ length: 7 }, (_, i): CalendarCell => ({
        key: `weekday-${i}`,
        label: weekdayFormat.format(new Date(2024, 0, REFERENCE_SUNDAY + i)).toUpperCase(),
        kind: "weekday",
      })),
      ...Array.from({ length: firstWeekday }, (_, i): CalendarCell => ({ key: `empty-${i}`, label: "", kind: "empty" })),
      ...Array.from({ length: daysInMonth }, (_, i): CalendarCell => ({
        key: `day-${i + 1}`,
        label: String(i + 1),
        kind: i + 1 === now.getDate() ? "today" : "day",
      })),
    ];
  }, [now, dateLocale]);

  return (
    <div className={cx(widgetClass, "top-[172px] left-5 w-[210px] max-[820px]:hidden")}>
      <div className="mb-2.5 flex items-baseline justify-between">
        <span className="font-display text-[15px] font-semibold capitalize">
          {now?.toLocaleDateString(dateLocale, { month: "long" })}
        </span>
        <span className="text-xs text-fg-subtle">{now?.getFullYear()}</span>
      </div>
      <div className="grid grid-cols-7 gap-0.5 text-center text-[11px]">
        {cells.map((cell) => (
          <span key={cell.key} className={CELL_CLASS[cell.kind]}>
            {cell.label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- galería ---------- */

export function GalleryWidget() {
  const { t } = useLocale();
  const { openWindow } = useDesktop();

  return (
    <div className={cx(widgetClass, "top-[18px] right-5 w-[230px] max-[820px]:hidden")}>
      <div className="mb-[11px] flex items-center gap-2 font-display text-[13.5px] font-semibold">
        <Icon name="image" size={15} />
        {t.gallery.title}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            type="button"
            title={project.name}
            aria-label={`${t.projects.openDetail}: ${project.name}`}
            onClick={() => openWindow(projectWindowId(project.id))}
            className="group/thumb relative overflow-hidden rounded-xl border border-glass-border transition-transform duration-200 hover:scale-[1.08] hover:-rotate-2 focus-visible:scale-[1.08]"
          >
            <Image src={project.image.src} alt="" width={100} height={100} className="aspect-square w-full object-cover" />
            <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-1.5 pt-3 pb-1 text-left text-[10px] font-semibold text-white opacity-0 transition group-hover/thumb:opacity-100 group-focus-visible/thumb:opacity-100">
              {project.name}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-2.5 text-[11px] text-fg-subtle">{t.gallery.footer}</div>
    </div>
  );
}

/* ---------- personaje central ---------- */

export function ProfileFigure() {
  const { t } = useLocale();

  return (
    <div className="pointer-events-none absolute top-[63%] left-[57%] z-1 -translate-x-1/2 -translate-y-1/2 text-center max-[820px]:top-[62%] max-[820px]:left-[55%] max-[820px]:w-[min(360px,calc(100%-32px))]">
      <Image
        src={PROFILE.photo}
        alt={t.profile.photoAlt}
        width={427}
        height={900}
        quality={95}
        priority
        className="h-[min(86vh,840px)] w-auto drop-shadow-[0_26px_42px_rgba(12,12,45,.38)] motion-safe:animate-float max-[820px]:h-[min(80vh,680px)] max-[820px]:max-w-full max-[820px]:object-contain"
      />
      <div
        className={cx(
          "pointer-events-auto absolute top-[2%] left-[calc(100%+18px)] w-max max-w-[220px] rounded-2xl border border-glass-border bg-glass-strong px-[17px] py-[13px] text-left shadow-glass backdrop-blur-[20px]",
          "min-[820px]:motion-safe:animate-float [animation-direction:reverse]",
          "max-[820px]:top-auto max-[820px]:bottom-[8%] max-[820px]:left-1/2 max-[820px]:max-w-[calc(100%-24px)] max-[820px]:-translate-x-1/2 max-[820px]:text-center",
        )}
      >
        <div className="font-display text-base font-semibold text-fg">{PROFILE.name}</div>
        <div className="mt-[3px] text-[11.5px] text-fg-muted">{t.profile.role}</div>
      </div>
      <div className="pointer-events-auto absolute -bottom-[4%] left-1/2 -translate-x-1/2 whitespace-nowrap">
        <TechChips ids={FEATURED_TECH} />
      </div>
    </div>
  );
}

/* ---------- pista inicial ---------- */

export function DesktopHint({ hidden }: { hidden: boolean }) {
  const { t } = useLocale();

  return (
    <div
      aria-hidden={hidden}
      className={cx(
        "absolute right-5 bottom-3.5 z-1 max-w-[270px] rounded-[13px] border border-glass-border bg-glass px-[13px] py-[9px] text-right text-xs leading-[1.55] text-fg-muted backdrop-blur-[14px] transition-opacity duration-400 max-sm:hidden",
        hidden && "pointer-events-none opacity-0",
      )}
    >
      {t.desktop.hint}
    </div>
  );
}
