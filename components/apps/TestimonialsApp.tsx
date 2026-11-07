"use client";

import Image from "next/image";
import { TESTIMONIALS } from "@/data/portfolio";
import { useLocale } from "@/i18n/LocaleProvider";
import { cx } from "@/lib/cx";
import { TONE_GRADIENT } from "@/components/ui/tones";
import { AppHeading, cardClass } from "@/components/ui/window-content";

export function TestimonialsApp() {
  const { t } = useLocale();

  return (
    <>
      <AppHeading>{t.testimonials.title}</AppHeading>
      {TESTIMONIALS.map((testimonial) => {
        const text = t.testimonials.items[testimonial.id];
        return (
          <figure
            key={testimonial.id}
            className={cx(cardClass, "mb-[11px] p-[13px] transition-transform duration-200 last:mb-0 hover:-translate-y-[3px]")}
          >
            <figcaption className="mb-2 flex items-center gap-2.5">
              <Image
                src={testimonial.image}
                alt=""
                width={34}
                height={34}
                className={cx(TONE_GRADIENT[testimonial.tone], "size-[34px] shrink-0 rounded-full object-cover")}
              />
              <div>
                <div className="text-[12.5px] font-semibold text-fg">{text.author}</div>
                <div className="text-[11px] text-fg-subtle">{text.relation}</div>
              </div>
              <span role="img" aria-label={t.testimonials.rating} className="ml-auto text-xs tracking-[1px] text-[#f5a623]">
                ★★★★★
              </span>
            </figcaption>
            <blockquote className="text-[13px]">“{text.quote}”</blockquote>
          </figure>
        );
      })}
    </>
  );
}
