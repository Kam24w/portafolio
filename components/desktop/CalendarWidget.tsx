import { useMemo } from "react";

const WEEKDAYS = ["D", "L", "M", "X", "J", "V", "S"];

type CalendarWidgetProps = {
  date: Date | null;
};

export function CalendarWidget({ date }: CalendarWidgetProps) {
  const cells = useMemo(() => {
    if (!date) return [];

    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

    return [
      ...WEEKDAYS.map((day) => ({ key: `weekday-${day}`, value: day, className: "dow" })),
      ...Array.from({ length: firstDay }, (_, index) => ({
        key: `empty-${index}`,
        value: "",
        className: "",
      })),
      ...days.map((day) => ({
        key: `day-${day}`,
        value: String(day),
        className: day === date.getDate() ? "day today" : "day",
      })),
    ];
  }, [date]);

  const month = date?.toLocaleDateString("es-CO", { month: "long" }) ?? "";
  const year = date?.getFullYear() ?? "";

  return (
    <div className="gw" id="w-calendar">
      <div className="cal-head">
        <span className="cal-month">{month}</span>
        <span className="cal-year">{year}</span>
      </div>
      <div className="cal-grid">
        {cells.map((cell) => (
          <span key={cell.key} className={cell.className}>
            {cell.value}
          </span>
        ))}
      </div>
    </div>
  );
}
