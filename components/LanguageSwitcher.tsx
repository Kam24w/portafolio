"use client";

import type { Language } from "@/content";
import { useLanguage } from "./LanguageProvider";

export default function LanguageSwitcher({ label }: { label: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-sm border border-mint/40 p-1" aria-label={label}>
      {(["es", "en"] as Language[]).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLanguage(option)}
          aria-pressed={language === option}
          className={`px-2 py-1 text-[0.55rem] font-semibold ${language === option ? "bg-mint text-ink" : "text-mint/70 hover:text-mint"}`}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
