"use client";

import { GoogleLogo } from "@/components/GoogleLogo";
import { SearchBar } from "@/components/SearchBar";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/i18n/context";
import { useRouter } from "next/navigation";
import { Grid3X3 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <div className="h-screen flex flex-col w-full">
      <header className="w-full flex justify-end items-center gap-2 px-4 py-3">
        <LanguageToggle />
        <span className="text-[13px] text-content-secondary px-2">
          Gmail
        </span>
        <span className="text-[13px] text-content-secondary px-2">
          {t.home.images}
        </span>
        <button className="size-10 rounded-full flex items-center justify-center hover:bg-surface-hover transition-colors">
          <Grid3X3 className="size-5 text-content-tertiary" />
        </button>
        <button className="size-8 rounded-full bg-google-blue text-white flex items-center justify-center text-sm font-medium shrink-0">
          B
        </button>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 pt-28 md:pt-36 gap-6">
        <div className="text-center flex flex-col items-center gap-1">
          <GoogleLogo size="lg" animate />
          <p className="text-content-secondary text-lg">{t.home.subtitle}</p>
        </div>

        <SearchBar variant="home" autoFocus />

        <div className="flex items-center gap-3 mt-1">
          <button
            onClick={() =>
              router.push(
                `/search?q=${encodeURIComponent("Bruno Simone")}`
              )
            }
            className="px-4 py-2 text-sm text-content-primary bg-surface hover:border-surface-border border border-transparent rounded transition-colors"
          >
            {t.home.googleSearch}
          </button>
          <button
            onClick={() => router.push("/wiki")}
            className="px-4 py-2 text-sm text-content-primary bg-surface hover:border-surface-border border border-transparent rounded transition-colors"
          >
            {t.home.feelingLucky}
          </button>
        </div>
      </main>

      <footer className="w-full bg-surface text-sm text-content-secondary">
        <div className="flex py-3 border-b border-surface-border px-6">
          <p>{t.footer.country}</p>
        </div>
        <div className="flex py-3 flex-col md:flex-row justify-between items-center px-6 gap-2">
          <div className="flex flex-wrap justify-center gap-x-6">
            <a href="/wiki" className="hover:underline">
              About
            </a>
            <a
              href="https://www.linkedin.com/in/bruno-daniel-simone/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/BrunoSimone"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
          </div>
          <div className="flex flex-wrap gap-x-6">
            <a
              href="mailto:brunosimone.mdq@gmail.com"
              className="hover:underline"
            >
              Contact
            </a>
            <a href="/wiki" className="hover:underline">
              Wiki
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
