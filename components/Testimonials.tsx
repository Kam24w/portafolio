"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  const { content } = useLanguage();
  const { testimonials } = content;
  return (
    <section id="testimonios" aria-labelledby="testimonials-title" className="scroll-mt-24 overflow-hidden border-t border-ink/15 py-24">
      <div className="relative rounded-sm border border-signal/60 bg-[#020817] p-8 text-paper shadow-[8px_8px_0_rgb(53_70_245_/_0.25)] md:p-14">
        <span className="absolute -right-8 -top-16 font-display text-[18rem] leading-none text-signal/20">&ldquo;</span>
        <div className="relative grid gap-10 md:grid-cols-[0.7fr_1.3fr]">
          <div>
            <SectionHeading id="testimonials-title" eyebrow={testimonials.eyebrow} title={testimonials.title} tone="light" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {testimonials.items.map((testimonial) => (
              <figure key={testimonial.name} className="testimonial-card rounded-sm border border-white/20 bg-[#101b31] p-5 backdrop-blur transition duration-500 hover:-translate-y-2 hover:bg-[#16264a]">
                <div className="pixel-label mb-5 text-[0.55rem] tracking-widest text-signal">★★★★★</div>

                <figcaption className="mb-5 flex items-center gap-3 border-b border-white/15 pb-4 text-sm">
                  <Image src={testimonial.image} alt={`${testimonials.imageAlt} ${testimonial.name}`} width={44} height={44} className="size-11 rounded-full object-cover object-top ring-2 ring-signal/60" />
                  <span>
                    <strong className="block text-base text-white">{testimonial.name}</strong>
                    <span className="text-white/50">{testimonial.role}</span>
                  </span>
                </figcaption>

                <blockquote className="text-lg leading-relaxed text-white/90">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
