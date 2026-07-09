"use client";

import { useLanguage } from "@/i18n/context";
import type { Locale } from "@/i18n/translations";

const LOCALES: { code: Locale; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  const other: Locale = locale === "es" ? "en" : "es";

  return (
    <button
      onClick={() => setLocale(other)}
      aria-label={other === "es" ? "Ver en español" : "View in English"}
      title={other === "es" ? "Ver en español" : "View in English"}
      className="inline-flex items-center rounded-full border border-surface-border bg-surface p-0.5 cursor-pointer transition-colors hover:border-content-tertiary"
    >
      {LOCALES.map(({ code, label }) => {
        const active = locale === code;
        return (
          <span
            key={code}
            className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${
              active ? "bg-google-blue text-white" : "text-content-secondary"
            }`}
          >
            {label}
          </span>
        );
      })}
    </button>
  );
}
