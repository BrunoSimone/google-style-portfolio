"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Search, Menu, ChevronDown } from "lucide-react";
import { bruno, skills } from "@/data/bruno";
import { useLanguage } from "@/i18n/context";
import { LanguageToggle } from "@/components/LanguageToggle";

function WikiHeader() {
  const { t } = useLanguage();

  return (
    <header className="bg-white border-b border-[#a7d7f9] px-4 py-1.5">
      <div className="flex items-center gap-4 max-w-[1600px] mx-auto">
        <Menu className="size-5 text-[#54595d] shrink-0 cursor-pointer" />

        <Link href="/wiki" className="flex items-center gap-2 shrink-0">
          <Image
            src="/wikipedia-logo.png"
            alt="Wikipedia"
            width={36}
            height={36}
            className="size-9"
          />
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-serif font-bold tracking-tight">
              Wikipedia
            </span>
            <span className="text-[11px] text-[#54595d]">
              {t.wiki.freeEncyclopedia}
            </span>
          </div>
        </Link>

        <div className="flex-1 flex justify-center">
          <div className="flex items-center border border-[#a2a9b1] rounded-[2px] bg-white w-full max-w-[500px]">
            <div className="flex items-center px-2 py-1.5 flex-1">
              <Search className="size-4 text-[#72777d] mr-2 shrink-0" />
              <input
                type="text"
                placeholder={t.wiki.searchPlaceholder}
                className="text-[13px] w-full outline-none bg-transparent"
                readOnly
              />
            </div>
            <button className="px-3 py-1.5 bg-[#f8f9fa] border-l border-[#a2a9b1] text-[13px] text-[#202122] hover:bg-[#eaecf0]">
              {t.wiki.searchPlaceholder.split(" ")[0]}
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          <LanguageToggle />
          <span className="text-[12px] text-wiki-blue cursor-default">{t.wiki.donations}</span>
          <span className="text-[12px] text-wiki-blue cursor-default">{t.wiki.createAccount}</span>
          <span className="text-[12px] text-wiki-blue cursor-default">{t.wiki.login}</span>
        </div>
      </div>
    </header>
  );
}

function Infobox() {
  const { t } = useLanguage();

  return (
    <table className="w-full mb-4 md:float-right md:ml-6 md:w-[280px] border border-[#a2a9b1] text-[13px] bg-[#f8f9fa] font-sans border-collapse">
      <thead>
        <tr>
          <th
            colSpan={2}
            className="bg-[#c8ccd1] text-center py-2 text-base font-bold border border-[#a2a9b1]"
          >
            {bruno.name}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td colSpan={2} className="text-center py-2 bg-[#e8e8e8] border border-[#a2a9b1]">
            <div className="w-[200px] h-[218px] mx-auto relative overflow-hidden">
              <Image
                src="/bruno.jpeg"
                alt={bruno.name}
                fill
                sizes="200px"
                className="object-cover object-top"
              />
            </div>
          </td>
        </tr>
        <InfoRow label={t.wiki.fullName} value={bruno.name} />
        <InfoRow label={t.wiki.born} value={bruno.location} />
        <InfoRow label={t.wiki.occupation} value={bruno.role} />
        <InfoRow label={t.wiki.company} value={bruno.company} />
        <InfoRow label={t.wiki.educationLabel} value={bruno.education} />
        <InfoRow label={t.wiki.yearsActive} value="2023 –" />
        <InfoRow label={t.wiki.languages} value={t.wiki.languagesValue} />
        <tr>
          <td className="border border-[#a2a9b1] px-3 py-1.5 font-bold align-top bg-[#f8f9fa]">
            {t.wiki.website}
          </td>
          <td className="border border-[#a2a9b1] px-3 py-1.5">
            <a
              href={bruno.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-wiki-blue hover:underline break-all"
            >
              {bruno.github.display}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="border border-[#a2a9b1] px-3 py-1.5 font-bold align-top bg-[#f8f9fa] w-[110px]">
        {label}
      </td>
      <td className="border border-[#a2a9b1] px-3 py-1.5">{value}</td>
    </tr>
  );
}

function SectionHeader({ id, title }: { id: string; title: string }) {
  const { t } = useLanguage();

  return (
    <h2
      id={id}
      className="text-[22px] font-serif border-b border-[#a2a9b1] pb-1 mt-8 mb-3 scroll-mt-4"
    >
      {title}
      <span className="text-[13px] font-sans font-normal text-[#54595d] ml-2 cursor-default">
        [<span className="text-wiki-blue">{t.wiki.edit}</span>]
      </span>
    </h2>
  );
}

function LeftSidebar() {
  const { t } = useLanguage();

  const toc = [
    { id: "carrera", label: t.wiki.career },
    { id: "habilidades", label: t.wiki.skills },
    { id: "educacion", label: t.wiki.education },
    { id: "enlaces", label: t.wiki.externalLinks },
  ];

  return (
    <aside className="hidden lg:block w-[220px] shrink-0 pr-6 pt-6 border-r border-[#eaecf0]">
      <div className="sticky top-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[14px] font-bold text-[#202122]">{t.wiki.contents}</h3>
          <span className="text-[12px] text-[#54595d] cursor-default">
            [<span className="text-wiki-blue">{t.wiki.hide}</span>]
          </span>
        </div>
        <ul className="text-[13px] space-y-1.5">
          {toc.map((item) => (
            <li key={item.id} className="pl-0">
              <a href={`#${item.id}`} className="text-[#202122] hover:text-[#202122]">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function MobileToc() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const toc = [
    { id: "carrera", label: t.wiki.career },
    { id: "habilidades", label: t.wiki.skills },
    { id: "educacion", label: t.wiki.education },
    { id: "enlaces", label: t.wiki.externalLinks },
  ];

  return (
    <div className="lg:hidden border border-[#a2a9b1] bg-[#f8f9fa] rounded-[2px] mb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full px-3 py-2.5"
      >
        <span className="text-sm font-bold text-[#202122]">{t.wiki.contents}</span>
        <ChevronDown
          className={`size-4 text-[#54595d] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <ul className="px-3 pb-3 pt-2.5 flex flex-col gap-2 border-t border-[#c8ccd1]">
          {toc.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-[13px] text-wiki-blue">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function WikiPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-[#202122]">
      <WikiHeader />

      <div className="max-w-[1600px] mx-auto px-4 flex">
        <LeftSidebar />

        <main className="flex-1 min-w-0 max-w-[960px] py-4 pl-0 lg:pl-6">
          <h1 className="text-[28px] font-serif font-normal border-b border-[#a2a9b1] pb-1 mb-0">
            Bruno Simone
          </h1>

          <div className="flex items-center justify-between border-b border-[#a2a9b1] mb-4">
            <div className="flex">
              <span className="px-2 py-1 text-[13px] text-[#202122] border-b-2 border-wiki-blue font-medium cursor-default">
                {t.wiki.article}
              </span>
              <span className="px-2 py-1 text-[13px] text-wiki-blue cursor-default">
                {t.wiki.discussion}
              </span>
            </div>
            <div className="hidden md:flex text-[13px]">
              <span className="px-2 py-1 text-wiki-blue border-b-2 border-wiki-blue font-medium cursor-default">
                {t.wiki.read}
              </span>
              <span className="px-2 py-1 text-[#54595d] cursor-default">
                {t.wiki.viewSource}
              </span>
              <span className="px-2 py-1 text-[#54595d] cursor-default">
                {t.wiki.viewHistory}
              </span>
              <span className="px-2 py-1 text-[#54595d] cursor-default">
                {t.wiki.tools} ▾
              </span>
            </div>
          </div>

          <p className="text-[12px] text-[#54595d] mb-4 font-sans italic">
            {t.wiki.fromWikipedia}
          </p>

          <MobileToc />

          <div className="font-serif text-[14px] leading-[1.6]">
            <Infobox />

            <p className="mb-4">
              <b>Bruno Daniel Simone</b> (<a className="text-wiki-blue">Mar del Plata</a>,{" "}
              <a className="text-wiki-blue">Buenos Aires</a>,{" "}
              <a className="text-wiki-blue">Argentina</a>)
              {t.wiki.introParagraph.substring(t.wiki.introParagraph.indexOf(")") + 1)}
            </p>

            <div className="clear-both" />

            <SectionHeader id="carrera" title={t.wiki.career} />
            <p className="mb-3">{t.wiki.careerIntro}</p>
            <p className="mb-3">{t.wiki.careerWecheck}</p>
            <p className="mb-3">{t.wiki.careerPromotion}</p>

            <SectionHeader id="habilidades" title={t.wiki.skills} />
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[13px] font-sans min-w-[420px]">
                <thead>
                  <tr className="bg-[#eaecf0]">
                    <th className="border border-[#a2a9b1] px-3 py-2 text-left w-1/4">
                      {t.wiki.category}
                    </th>
                    <th className="border border-[#a2a9b1] px-3 py-2 text-left">
                      {t.wiki.technologies}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(skills).map(([key, values]) => (
                    <tr key={key}>
                      <td className="border border-[#a2a9b1] px-3 py-2 font-bold bg-[#f8f9fa]">
                        {(t.wiki.skillCategories as Record<string, string>)[key] ?? key}
                      </td>
                      <td className="border border-[#a2a9b1] px-3 py-2">
                        {values.join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SectionHeader id="educacion" title={t.wiki.education} />
            <ul className="list-disc ml-6 space-y-2 mb-6">
              <li>{t.wiki.eduUtn}</li>
              <li>{t.wiki.eduHighSchool}</li>
            </ul>

            <SectionHeader id="enlaces" title={t.wiki.externalLinks} />
            <ul className="list-disc ml-6 space-y-1 mb-8">
              <li>
                <a
                  href={bruno.linkedin.url}
                  className="text-wiki-blue hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.wiki.linkedinProfile}
                </a>
              </li>
              <li>
                <a
                  href={bruno.github.url}
                  className="text-wiki-blue hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.wiki.githubProfile}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${bruno.email}`}
                  className="text-wiki-blue hover:underline"
                >
                  {t.wiki.emailContact}
                </a>
              </li>
            </ul>
          </div>

          <div className="border-t border-[#a2a9b1] pt-4 text-[12px] text-[#54595d] font-sans text-center">
            <p>{t.wiki.lastEdited}</p>
            <p className="mt-1">{t.wiki.license}</p>
          </div>

          <div className="mt-4 text-center">
            <Link
              href={`/search?q=${encodeURIComponent("Bruno Simone")}`}
              className="text-[13px] text-wiki-blue hover:underline font-sans"
            >
              {t.wiki.backToSearch}
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
