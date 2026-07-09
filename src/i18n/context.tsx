"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Locale, type Translations } from "./translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "es",
  setLocale: () => {},
  t: translations.es,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-locale");
    if (saved === "en" || saved === "es") {
      setLocale(saved);
      return;
    }
    // First visit with no saved choice: match the visitor's browser language
    // so a recruiter lands in their own language (Spanish, or English otherwise).
    const browser = navigator.language.toLowerCase();
    setLocale(browser.startsWith("es") ? "es" : "en");
  }, []);

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem("portfolio-locale", newLocale);
  };

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale: handleSetLocale, t: translations[locale] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
