"use client";

import { STACK, TECH } from "@/data/portfolio";
import { localize } from "@/i18n/config";
import { useLocale } from "@/i18n/LocaleProvider";
import { AppHeading, FeatureRow, Paragraph } from "@/components/ui/window-content";

export function AboutApp() {
  const { t, locale } = useLocale();

  return (
    <>
      <AppHeading>{t.about.title}</AppHeading>
      {t.about.paragraphs.map((paragraph) => (
        <Paragraph key={paragraph}>{paragraph}</Paragraph>
      ))}
      <div className="mt-3">
        {STACK.map((category) => (
          <FeatureRow
            key={category.id}
            size="sm"
            mark={category.glyph}
            tone={category.tone}
            title={t.stack.categories[category.id]}
          >
            {category.items.map((id) => localize(TECH[id].label, locale)).join(" · ")}
          </FeatureRow>
        ))}
      </div>
    </>
  );
}
