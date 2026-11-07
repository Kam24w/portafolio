"use client";

import { HOME_TECH, PROJECTS, STACK } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { Stat } from "@/components/ui/Stat";
import { TechChips } from "@/components/ui/TechChips";
import { AppHeading, Paragraph } from "@/components/ui/window-content";

export function HomeApp() {
  const { t } = useLocale();

  return (
    <>
      <AppHeading>{t.home.title}</AppHeading>
      <Paragraph>{t.home.intro}</Paragraph>
      <div className="my-3.5 grid grid-cols-3 gap-2">
        <Stat to={PROJECTS.length} label={t.home.stats.projects} />
        <Stat to={STACK.length} label={t.home.stats.areas} />
        <Stat to={1} label={t.home.stats.portfolio} />
      </div>
      <TechChips ids={HOME_TECH} />
      <p className="mt-3.5 text-[12.5px] text-fg-subtle">{t.home.note}</p>
    </>
  );
}
