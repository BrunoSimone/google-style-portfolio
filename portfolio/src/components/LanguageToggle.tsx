"use client";

import { useLanguage } from "@/i18n/context";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <button
      onClick={() => setLocale(locale === "es" ? "en" : "es")}
      className="text-xs font-medium px-2 py-1 rounded border border-surface-border hover:bg-surface-hover transition-colors text-content-secondary"
      title={locale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      {locale === "es" ? "EN" : "ES"}
    </button>
  );
}
