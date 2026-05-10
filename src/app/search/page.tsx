"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { GoogleLogo } from "@/components/GoogleLogo";
import { SearchBar } from "@/components/SearchBar";
import { SearchResultCard } from "@/components/SearchResultCard";
import { KnowledgePanel } from "@/components/KnowledgePanel";
import { PeopleAlsoAsk } from "@/components/PeopleAlsoAsk";
import { LanguageToggle } from "@/components/LanguageToggle";
import { useLanguage } from "@/i18n/context";
import { bruno, searchResultsBase, projectsBase } from "@/data/bruno";
import { brandColors } from "@/data/palette";
import type { SearchResult, Project, ContactMethod, KnowledgePanelInfo } from "@/data/bruno";
import { Copy, Check } from "lucide-react";

type Tab = "all" | "projects" | "contact";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t } = useLanguage();
  const query = searchParams.get("q") ?? "";
  const activeTab = (searchParams.get("tab") as Tab) ?? "all";

  const isValidQuery =
    query.toLowerCase().includes("bruno") ||
    query.toLowerCase().includes("simone");

  const tabs: { key: Tab; label: string }[] = [
    { key: "all", label: t.tabs.all },
    { key: "projects", label: t.tabs.projects },
    { key: "contact", label: t.tabs.contact },
  ];

  const handleTabChange = (tab: Tab) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "all") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 bg-white z-40 border-b border-surface-border">
        <div className="flex items-center gap-7 pl-6 md:pl-[52px] pr-[30px] pt-[24px] pb-[16px]">
          <GoogleLogo size="sm" />
          <div className="flex-1 max-w-[692px]">
            <SearchBar variant="header" defaultValue={query} />
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <LanguageToggle />
            <button className="size-8 rounded-full bg-google-blue text-white flex items-center justify-center text-sm font-medium shrink-0">
              B
            </button>
          </div>
        </div>
        <nav className="flex items-center ml-4 md:ml-[182px]">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`px-4 pb-3 pt-3 text-[13px] border-b-[2px] transition-colors cursor-pointer ${
                activeTab === tab.key
                  ? "border-google-blue text-google-blue font-medium"
                  : "border-transparent text-content-tertiary hover:text-content-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="flex-1 px-4 md:pl-[240px] md:pr-[30px] py-4">
        {isValidQuery ? (
          <TabContent activeTab={activeTab} />
        ) : (
          <NoResults query={query} />
        )}
      </main>

      <footer className="bg-surface text-sm text-content-secondary mt-auto">
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
              className="hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/BrunoSimone"
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

function TabContent({ activeTab }: { activeTab: Tab }) {
  switch (activeTab) {
    case "all":
      return <AllTab />;
    case "projects":
      return <ProjectsTab />;
    case "contact":
      return <ContactTab />;
    default:
      return <AllTab />;
  }
}

function AllTab() {
  const { t } = useLanguage();

  const searchResults: SearchResult[] = searchResultsBase.map((base, i) => ({
    ...base,
    title: t.searchResults[i].title,
    description: t.searchResults[i].description,
  }));

  const knowledgePanel = {
    name: bruno.shortName,
    subtitle: t.panel.subtitle,
    bio: t.panel.bio,
    sourceLabel: "Wikipedia",
    sourceUrl: "/wiki",
    info: [
      { label: t.panel.born, value: bruno.location },
      { label: t.panel.occupation, value: t.panel.occupationValue },
      { label: t.panel.company, value: bruno.company, href: "https://wecheck.ai" },
      { label: t.panel.education, value: t.panel.educationValue },
      { label: "GitHub", value: bruno.github.display, href: bruno.github.url },
      { label: "LinkedIn", value: bruno.linkedin.display, href: bruno.linkedin.url },
    ] satisfies KnowledgePanelInfo[],
  };

  return (
    <>
      <p className="text-[13px] text-content-secondary mb-5">
        {t.search.resultsCount
          .replace("{count}", "4")
          .replace("{time}", "0.42")}
      </p>
      <div className="flex gap-[60px]">
        <div className="flex-1 flex flex-col gap-7 min-w-0 max-w-[652px]">
          {searchResults.slice(0, 3).map((result, i) => (
            <SearchResultCard key={i} {...result} />
          ))}

          <PeopleAlsoAsk items={t.peopleAlsoAsk} title={t.search.moreQuestions} />

          {searchResults.slice(3).map((result, i) => (
            <SearchResultCard key={i + 3} {...result} />
          ))}
        </div>

        <aside className="hidden lg:block w-[356px] shrink-0">
          <KnowledgePanel
            {...knowledgePanel}
            photo="/bruno.jpeg"
            sourcePrefixLabel={t.panel.source}
          />
        </aside>
      </div>
    </>
  );
}

function ProjectsTab() {
  const { t } = useLanguage();

  const projects: Project[] = projectsBase.map((base, i) => ({
    ...base,
    title: t.projects[i].title,
    description: t.projects[i].description,
  }));

  return (
    <>
      <p className="text-[13px] text-content-secondary mb-5">
        {t.search.projectsFound.replace("{count}", String(projects.length))}
      </p>
      <div className="flex flex-col gap-7 max-w-[652px]">
        {projects.map((project, i) => (
          <div key={i}>
            <SearchResultCard {...project} />
            <div className="flex gap-2 mt-2 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-surface border border-surface-border text-content-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-auto shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-surface-border text-xs text-content-secondary hover:bg-surface-hover transition-colors"
    >
      {copied ? (
        <>
          <Check className="size-3.5 text-google-green" />
          {t.search.copied}
        </>
      ) : (
        <>
          <Copy className="size-3.5" />
          {t.search.copy}
        </>
      )}
    </button>
  );
}

function ContactTab() {
  const { t } = useLanguage();

  const contactMethods: ContactMethod[] = [
    {
      icon: "✉",
      label: "Email",
      value: bruno.email,
      color: brandColors.email,
      copyable: true,
    },
    {
      icon: "☎",
      label: t.contact.phone,
      value: bruno.phone,
      color: brandColors.phone,
      copyable: true,
    },
    {
      icon: "in",
      label: "LinkedIn",
      value: bruno.linkedin.display,
      href: bruno.linkedin.url,
      color: brandColors.linkedin,
      copyable: false,
    },
    {
      icon: "G",
      label: "GitHub",
      value: bruno.github.display,
      href: bruno.github.url,
      color: brandColors.github,
      copyable: false,
    },
  ];

  return (
    <>
      <p className="text-[13px] text-content-secondary mb-5">
        {t.search.contactTitle}
      </p>
      <div className="flex flex-col gap-5 max-w-[652px]">
        {contactMethods.map((method) =>
          method.copyable ? (
            <div
              key={method.label}
              className="flex items-center gap-4 p-4 rounded-lg border border-surface-border hover:shadow-md transition-shadow"
            >
              <div
                className="size-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: method.color }}
              >
                {method.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm text-content-tertiary">
                  {method.label}
                </span>
                <span className="text-base text-content-primary truncate">
                  {method.value}
                </span>
              </div>
              <CopyButton value={method.value} />
            </div>
          ) : (
            <a
              key={method.label}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 rounded-lg border border-surface-border hover:shadow-md transition-shadow group"
            >
              <div
                className="size-10 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: method.color }}
              >
                {method.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm text-content-tertiary">
                  {method.label}
                </span>
                <span className="text-base text-link group-hover:underline truncate">
                  {method.value}
                </span>
              </div>
            </a>
          )
        )}
      </div>
    </>
  );
}

function NoResults({ query }: { query: string }) {
  const { t } = useLanguage();

  return (
    <div className="mt-8 max-w-[600px]">
      <p className="text-content-primary mb-2">
        {t.search.noResultsFor}{" "}
        <span className="font-medium">&quot;{query}&quot;</span>
      </p>
      <p className="text-sm text-content-secondary mb-4">
        {t.search.suggestions}
      </p>
      <ul className="text-sm text-content-secondary list-disc pl-5 space-y-1">
        <li>
          {t.search.trySearch}{" "}
          <a
            href="/search?q=Bruno+Simone"
            className="text-link hover:underline"
          >
            Bruno Simone
          </a>
        </li>
        <li>{t.search.checkSpelling}</li>
        <li>{t.search.onlyMe}</li>
      </ul>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
