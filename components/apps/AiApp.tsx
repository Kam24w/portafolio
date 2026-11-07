"use client";

import { AI_TOOLS } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { AppHeading, FeatureRow, Paragraph } from "@/components/ui/window-content";

export function AiApp() {
  const { t } = useLocale();

  return (
    <>
      <AppHeading>{t.ai.title}</AppHeading>
      <Paragraph>{t.ai.intro}</Paragraph>
      {AI_TOOLS.map((tool) => {
        const text = t.ai.items[tool.id];
        return (
          <FeatureRow key={tool.id} mark={tool.mark} tone={tool.tone} title={tool.name}>
            {text.description} · {t.ai.projectLabel}: <b className="font-semibold text-accent">{text.project}</b>
          </FeatureRow>
        );
      })}
    </>
  );
}
