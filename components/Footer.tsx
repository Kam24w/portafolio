"use client";

import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { content } = useLanguage();
  const { profile, footer } = content;
  return (
    <footer className="flex flex-col gap-3 border-t border-ink/20 py-8 text-sm text-ink/60 md:flex-row md:items-center md:justify-between">
      <span>© 2026 {profile.name}</span>
      <span>{footer}</span>
    </footer>
  );
}
