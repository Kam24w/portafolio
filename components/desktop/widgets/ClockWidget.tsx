"use client";

import { useNow } from "@/hooks/useNow";
import { useLocale } from "@/i18n/LocaleProvider";

/** Separa "10:29 p. m." en hora ("10:29") y periodo ("p. m."), para mostrar el periodo en pequeño. */
export function splitTime(date: Date, locale: string): { time: string; period: string } {
  const parts = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).formatToParts(date);
  const period = parts.find((part) => part.type === "dayPeriod")?.value ?? "";
  const time = parts
    .filter((part) => part.type !== "dayPeriod")
    .map((part) => part.value)
    .join("")
    .trim();
  return { time, period };
}

/** Reloj grande en fuente de puntos, directamente sobre el marco (sin tarjeta). */
export function ClockWidget() {
  const { t, dateLocale } = useLocale();
  const now = useNow();
  const { time, period } = now ? splitTime(now, dateLocale) : { time: "--:--", period: "" };

  return (
    <div className="text-fg">
      <div className="flex items-baseline gap-2 whitespace-nowrap">
        <span className="font-dot text-[58px] leading-none font-black tracking-tight tabular-nums max-sm:text-[44px]">{time}</span>
        {period && <span className="font-dot text-xl font-black text-fg">{period}</span>}
      </div>
      <div className="mt-1.5 font-dot text-base font-black text-fg">
        {now
          ? `${now.toLocaleDateString(dateLocale, { weekday: "long" })} ${now.toLocaleDateString(dateLocale, { day: "2-digit", month: "2-digit" })}`
          : " "}
      </div>
      <div className="mt-2.5 inline-flex items-center gap-2 rounded-full bg-glass px-2.5 py-1 text-[11px] font-medium text-fg-muted">
        <span className="size-2 rounded-full bg-ok motion-safe:animate-pulse-ring" />
        {t.desktop.openToWork}
      </div>
    </div>
  );
}
