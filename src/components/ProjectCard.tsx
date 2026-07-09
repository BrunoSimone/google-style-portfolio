"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Lock, ImageIcon } from "lucide-react";
import type { Project } from "@/data/bruno";
import { useLanguage } from "@/i18n/context";

const HATCH =
  "repeating-linear-gradient(135deg,#eef1f4 0 10px,#e6e9ee 10px 20px)";

function Sitelinks({ project }: { project: Project }) {
  const { t } = useLanguage();

  const links: {
    key: string;
    label: string;
    href?: string;
    external?: boolean;
    primary?: boolean;
  }[] = [];

  if (project.demoUrl)
    links.push({ key: "demo", label: t.proj.demo, href: project.demoUrl, external: true });
  if (project.storeUrl)
    links.push({ key: "store", label: t.proj.store, href: project.storeUrl, external: true });
  if (project.repoUrl)
    links.push({ key: "repo", label: t.proj.repo, href: project.repoUrl, external: true });
  if (project.caseSlug)
    links.push({
      key: "case",
      label: t.proj.caseStudy,
      href: `/case/${project.caseSlug}`,
      primary: true,
    });

  if (links.length === 0 && !project.isPrivate) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5">
      {links.map((link) =>
        link.external ? (
          <a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[13px] text-link font-medium hover:underline"
          >
            <ArrowUpRight className="size-3" />
            {link.label}
          </a>
        ) : (
          <Link
            key={link.key}
            href={link.href!}
            className={`inline-flex items-center gap-1.5 text-[13px] text-link hover:underline ${
              link.primary ? "font-semibold" : "font-medium"
            }`}
          >
            <ArrowUpRight className="size-3" />
            {link.label}
          </Link>
        )
      )}
      {project.isPrivate && (
        <span className="inline-flex items-center gap-1.5 text-[13px] text-content-tertiary">
          <Lock className="size-3" />
          {t.proj.private}
        </span>
      )}
    </div>
  );
}

function Thumbnail({ project }: { project: Project }) {
  const { t } = useLanguage();

  if (project.hasImage && project.imageSrc) {
    return (
      <div className="relative w-full aspect-[16/9] sm:w-[148px] sm:h-[111px] sm:aspect-auto rounded-[10px] overflow-hidden shrink-0 border border-surface-border">
        <Image
          src={project.imageSrc}
          alt={project.title}
          fill
          sizes="(min-width: 640px) 148px, 100vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Placeholder tile (structure ready for a future screenshot).
  if (project.hasImage) {
    return (
      <div
        className="relative w-full aspect-[16/9] sm:w-[148px] sm:h-[111px] sm:aspect-auto rounded-[10px] overflow-hidden shrink-0"
        style={{ backgroundImage: HATCH }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 px-2 text-center">
          <ImageIcon className="size-5 text-content-tertiary" strokeWidth={1.6} />
          <span className="font-mono text-[9px] leading-tight text-content-tertiary">
            {project.placeholder}
          </span>
        </div>
        {project.hoverPreview && (
          <span className="absolute top-1.5 right-1.5 rounded bg-black/65 px-1.5 py-0.5 font-mono text-[8px] text-white">
            GIF ▸
          </span>
        )}
      </div>
    );
  }

  // No image at all → branded fallback, never an empty gap.
  return (
    <div
      className="relative w-full aspect-[16/9] sm:w-[148px] sm:h-[111px] sm:aspect-auto rounded-[10px] overflow-hidden shrink-0 flex flex-col items-center justify-center gap-1.5 border border-surface-border"
      style={{ backgroundColor: `${project.faviconColor}12` }}
    >
      <div
        className="size-[34px] rounded-lg flex items-center justify-center text-white text-[13px] font-bold"
        style={{ backgroundColor: project.faviconColor }}
      >
        {project.faviconLetter}
      </div>
      <span className="font-mono text-[8px] text-content-tertiary">
        {t.proj.noImage}
      </span>
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const titleHref = project.caseSlug
    ? `/case/${project.caseSlug}`
    : project.demoUrl ?? project.url;
  const titleExternal = !project.caseSlug && Boolean(project.demoUrl);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:gap-5 items-start">
        <div className="flex-1 min-w-0 flex flex-col max-w-[600px]">
          <div className="flex gap-3 items-center mb-2">
            {project.faviconUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.faviconUrl}
                alt={project.siteName}
                className="size-[26px] rounded-full shrink-0 object-cover"
              />
            ) : (
              <div
                className="size-[26px] rounded-full flex items-center justify-center text-white text-[9px] font-extrabold shrink-0"
                style={{ backgroundColor: project.faviconColor }}
              >
                {project.faviconLetter}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="text-sm text-content-primary leading-tight">
                {project.siteName}
              </div>
              <div className="text-xs text-content-secondary leading-tight truncate">
                {project.displayUrl}
              </div>
            </div>
          </div>

          {titleExternal ? (
            <a
              href={titleHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl text-link hover:underline leading-snug"
            >
              {project.title}
            </a>
          ) : (
            <Link
              href={titleHref}
              className="text-xl text-link hover:underline leading-snug"
            >
              {project.title}
            </Link>
          )}

          <p className="text-[13px] text-content-secondary leading-relaxed mt-1">
            {project.description}
          </p>

          <Sitelinks project={project} />
        </div>

        <div className="w-full sm:w-[148px] mt-3 sm:mt-0 shrink-0">
          <Thumbnail project={project} />
        </div>
      </div>

      <div className="flex gap-2 mt-2.5 flex-wrap">
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
  );
}
