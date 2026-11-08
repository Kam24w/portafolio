"use client";

import { useMemo } from "react";
import { useNow } from "@/hooks/useNow";
import { useLocale } from "@/i18n/LocaleProvider";

/** El 7 de enero de 2024 fue domingo: se usa como referencia para nombrar los días de la semana. */
const REFERENCE_SUNDAY = 7;

type CalendarCell = { key: string; label: string; kind: "weekday" | "empty" | "day" | "today" };

const CELL_CLASS = {
  weekday: "pb-1 font-semibold text-white/45",
  empty: "",
  day: "rounded-md py-[3px] text-white/85 transition duration-150 hover:bg-white/15",
  today: "rounded-md bg-white py-[3px] font-bold text-[#111118] motion-safe:animate-pop",
} as const satisfies Record<CalendarCell["kind"], string>;

/** Calendario compacto en una tarjeta oscura (igual en tema claro y oscuro). */
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
    <div className="w-[196px] rounded-[20px] bg-[#111118]/85 px-3.5 pt-3 pb-2.5 text-white shadow-[0_18px_40px_-14px_rgba(0,0,0,.6)] backdrop-blur-md">
      <div className="mb-2 text-center font-display text-[15px] font-semibold capitalize">
        {now?.toLocaleDateString(dateLocale, { month: "long" })}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5 text-center text-[10.5px] tabular-nums">
        {cells.map((cell) => (
          <span key={cell.key} className={CELL_CLASS[cell.kind]}>
            {cell.label}
          </span>
        ))}
      </div>
      <div aria-hidden="true" className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-white/35" />
    </div>
  );
}
