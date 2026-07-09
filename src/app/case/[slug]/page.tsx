"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Menu, ImageIcon, ArrowUpRight } from "lucide-react";
import { projectsBase } from "@/data/bruno";
import { useLanguage } from "@/i18n/context";
import { LanguageToggle } from "@/components/LanguageToggle";

const HATCH =
  "repeating-linear-gradient(135deg,#eef1f4 0 12px,#e6e9ee 12px 24px)";

function CaseHeader({ backLabel }: { backLabel: string }) {
  const { t } = useLanguage();
  return (
    <header className="bg-white border-b border-[#a7d7f9] px-4 py-1.5">
      <div className="flex items-center gap-4 max-w-[1600px] mx-auto">
        <Menu className="size-5 text-[#54595d] shrink-0" />
        <Link href="/search?tab=projects" className="flex items-center gap-2 shrink-0">
          <Image src="/wikipedia-logo.png" alt="Wikipedia" width={36} height={36} className="size-9" />
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-serif font-bold tracking-tight">Wikipedia</span>
            <span className="text-[11px] text-[#54595d]">{t.wiki.freeEncyclopedia}</span>
          </div>
        </Link>
        <div className="flex-1" />
        <LanguageToggle />
        <Link
          href="/search?tab=projects"
          className="hidden sm:inline-block text-[13px] text-wiki-blue hover:underline shrink-0"
        >
          {backLabel}
        </Link>
      </div>
    </header>
  );
}

function SectionHeader({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="text-xl font-serif border-b border-[#a2a9b1] pb-1 mt-6 mb-2.5">
      {n} · {title}
    </h2>
  );
}

export default function CaseStudyPage() {
  const { t } = useLanguage();
  const params = useParams();
  const slug = String(params.slug);

  const studies = t.caseStudies as Record<
    string,
    (typeof t.caseStudies)["portfolio"] | undefined
  >;
  const study = studies[slug];
  const project = projectsBase.find((p) => p.caseSlug === slug);

  if (!study) {
    return (
      <div className="min-h-screen bg-white text-[#202122]">
        <CaseHeader backLabel={t.case.back} />
        <div className="max-w-[1100px] mx-auto p-8">
          <p className="text-[15px]">{t.case.notFound}</p>
        </div>
      </div>
    );
  }

  const infoRows = [
    { label: t.case.infobox.type, value: study.type, color: "#202122" },
    { label: t.case.infobox.stack, value: study.stack, color: "#202122" },
    { label: t.case.infobox.status, value: study.status, color: study.statusColor },
    { label: t.case.infobox.role, value: study.role, color: "#202122" },
    { label: t.case.infobox.year, value: study.year, color: "#202122" },
  ];

  return (
    <div className="min-h-screen bg-white text-[#202122]">
      <CaseHeader backLabel={t.case.back} />

      <div className="max-w-[1100px] mx-auto p-4">
        <p className="text-xs text-[#54595d] mb-2.5">
          <Link href="/search?tab=projects" className="text-wiki-blue hover:underline">
            {t.tabs.projects}
          </Link>{" "}
          › <span>{study.title}</span>
        </p>
        <h1 className="text-[28px] font-serif font-normal border-b border-[#a2a9b1] pb-1 mb-1">
          {study.title}
        </h1>
        <p className="text-xs text-[#54595d] italic font-serif mb-4">
          {t.case.fromWikipedia}
        </p>

        <div className="flex gap-7 flex-wrap">
          <div className="flex-1 min-w-[280px] font-serif text-sm leading-[1.65]">
            <p className="mb-4">{study.lede}</p>

            <SectionHeader n={1} title={t.case.problemTitle} />
            <p className="mb-3">{study.problem}</p>

            <SectionHeader n={2} title={t.case.decisionsTitle} />
            <ul className="list-disc pl-6 mb-3 space-y-1.5">
              {study.decisions.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>

            <SectionHeader n={3} title={t.case.solutionTitle} />
            <p className="mb-3">{study.solution}</p>
            <div className="border border-surface-border rounded-[10px] overflow-hidden my-3.5 bg-white font-sans">
              <div
                className="h-[200px] relative flex flex-col items-center justify-center gap-2"
                style={{ backgroundImage: HATCH }}
              >
                <ImageIcon className="size-6 text-content-tertiary" strokeWidth={1.6} />
                <span className="font-mono text-[10px] text-content-tertiary">
                  {study.solutionImage}
                </span>
              </div>
            </div>

            <SectionHeader n={4} title={t.case.impactTitle} />
            <div className="flex gap-3 flex-wrap font-sans my-2.5">
              {study.metrics.map((m, i) => (
                <div
                  key={i}
                  className="flex-1 min-w-[120px] border border-surface-border rounded-[10px] p-3.5 bg-surface"
                >
                  <div
                    className="text-[26px] font-bold font-display leading-none"
                    style={{ color: m.color }}
                  >
                    {m.value}
                  </div>
                  <div className="text-xs text-content-secondary mt-1.5">{m.label}</div>
                </div>
              ))}
            </div>
            <p className="mb-3">{study.impact}</p>
          </div>

          <aside className="w-[280px] shrink-0 font-sans">
            <div className="border border-[#a2a9b1] bg-surface">
              <div className="bg-[#c8ccd1] text-center py-2 text-[15px] font-bold font-serif">
                {study.title}
              </div>
              {study.logo ? (
                <div className="h-[150px] flex items-center justify-center border-b border-[#a2a9b1] bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={study.logo}
                    alt={study.title}
                    className="size-20"
                  />
                </div>
              ) : (
                <div
                  className="h-[150px] relative flex items-center justify-center border-b border-[#a2a9b1]"
                  style={{ backgroundImage: HATCH }}
                >
                  <span className="font-mono text-[9px] text-content-tertiary">
                    logo / hero · 1:1
                  </span>
                </div>
              )}
              {infoRows.map((row) => (
                <div key={row.label} className="flex border-t border-[#a2a9b1] text-xs">
                  <div className="py-1.5 px-2.5 font-bold w-24 shrink-0">{row.label}</div>
                  <div className="py-1.5 px-2.5" style={{ color: row.color }}>
                    {row.value}
                  </div>
                </div>
              ))}
              <div className="border-t border-[#a2a9b1] p-2.5 flex flex-col gap-1.5">
                {project?.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-wiki-blue hover:underline"
                  >
                    <ArrowUpRight className="size-3" />
                    {t.case.linkDemo}
                  </a>
                )}
                {project?.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-wiki-blue hover:underline"
                  >
                    <ArrowUpRight className="size-3" />
                    {t.case.linkRepo}
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/search?tab=projects"
            className="text-[13px] text-wiki-blue hover:underline font-sans"
          >
            {t.case.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
