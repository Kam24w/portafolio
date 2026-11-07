"use client";

import { TECH, type TechId } from "@/data/portfolio";
import { localize } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";

export function TechChip({ id }: { id: TechId }) {
  const { locale } = useLocale();
  const tech = TECH[id];

  return (
    <span className="pointer-events-auto my-[3px] mr-1 inline-flex items-center gap-[5px] rounded-full border border-glass-border bg-tint/8 px-2.5 py-[3px] text-[11.5px] font-medium text-fg-muted transition duration-150 hover:-translate-y-0.5 hover:shadow-[0_4px_10px_-3px_rgba(30,30,60,.25)]">
      <i className="size-[7px] shrink-0 rounded-[2.5px]" style={{ background: tech.colors[0] }} />
      {localize(tech.label, locale)}
    </span>
  );
}

export function TechChips({ ids }: { ids: readonly TechId[] }) {
  return (
    <>
      {ids.map((id) => (
        <TechChip key={id} id={id} />
      ))}
    </>
  );
}
