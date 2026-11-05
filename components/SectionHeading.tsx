type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  id?: string;
  tone?: "light" | "dark";
};

export default function SectionHeading({
  eyebrow,
  title,
  id,
  tone = "dark",
}: SectionHeadingProps) {
  return (
    <div>
      <p className={`text-sm font-semibold uppercase tracking-[0.2em] ${tone === "light" ? "text-mint" : "text-signal"}`}>
        {eyebrow}
      </p>
      <h2 id={id} className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
        {title}
      </h2>
    </div>
  );
}
