import Link from "next/link";
import Image from "next/image";
import { Download } from "lucide-react";
import type { KnowledgePanelInfo } from "@/data/bruno";

interface KnowledgePanelProps {
  name: string;
  subtitle: string;
  bio: string;
  sourceLabel: string;
  sourceUrl: string;
  info: KnowledgePanelInfo[];
  photo?: string;
  sourcePrefixLabel?: string;
  cvHref: string;
  downloadCvLabel: string;
  cvFileName?: string;
}

function CvButton({
  href,
  label,
  fileName,
}: {
  href: string;
  label: string;
  fileName?: string;
}) {
  return (
    <a
      href={href}
      download={fileName ?? true}
      className="flex items-center justify-center gap-2 rounded-lg bg-[#1a73e8] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1b66c9]"
    >
      <Download className="size-[17px]" />
      {label}
    </a>
  );
}

export function KnowledgePanel({
  name,
  subtitle,
  bio,
  sourceLabel,
  sourceUrl,
  info,
  photo,
  sourcePrefixLabel = "Fuente:",
  cvHref,
  downloadCvLabel,
  cvFileName,
}: KnowledgePanelProps) {
  return (
    <div className="border border-surface-border rounded-lg overflow-hidden">
      {photo && (
        <div className="p-5 pb-0">
          <div className="w-full aspect-[4/5] max-h-[330px] rounded-lg overflow-hidden relative">
            <Image
              src={photo}
              alt={name}
              fill
              sizes="(min-width: 1024px) 340px, 100vw"
              className="object-cover object-top"
              priority
            />
          </div>
        </div>
      )}

      <div className="p-5 pb-0">
        <h2 className="text-[28px] font-normal text-content-primary leading-tight">
          {name}
        </h2>
        <p className="text-sm text-content-secondary mt-0.5">{subtitle}</p>
      </div>

      <div className="p-5 pb-0 pt-4">
        <CvButton href={cvHref} label={downloadCvLabel} fileName={cvFileName} />
      </div>

      <div className="p-5 pt-4">
        <p className="text-sm text-content-secondary leading-relaxed">{bio}</p>
        <p className="text-xs text-content-tertiary mt-3">
          {sourcePrefixLabel}{" "}
          <Link href={sourceUrl} className="text-link hover:underline">
            {sourceLabel}
          </Link>
        </p>
      </div>

      <div className="border-t border-surface-border">
        {info.map((item) => (
          <div
            key={item.label}
            className="flex px-5 py-3 border-b border-surface-border last:border-b-0"
          >
            <span className="text-sm text-content-tertiary w-28 shrink-0">
              {item.label}
            </span>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-link hover:underline"
              >
                {item.value}
              </a>
            ) : (
              <span className="text-sm text-content-primary">{item.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface KnowledgePanelMobileProps {
  name: string;
  subtitle: string;
  photo: string;
  seeMoreLabel: string;
  seeMoreUrl: string;
  cvHref: string;
  downloadCvLabel: string;
  cvFileName?: string;
}

/** Condensed knowledge card shown ABOVE the results on mobile. */
export function KnowledgePanelMobile({
  name,
  subtitle,
  photo,
  seeMoreLabel,
  seeMoreUrl,
  cvHref,
  downloadCvLabel,
  cvFileName,
}: KnowledgePanelMobileProps) {
  return (
    <div className="border border-surface-border rounded-xl overflow-hidden mb-6 lg:hidden">
      <div className="flex gap-3.5 p-3.5">
        <div className="relative size-[74px] rounded-[10px] overflow-hidden shrink-0">
          <Image src={photo} alt={name} fill sizes="74px" className="object-cover object-top" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl font-normal text-content-primary leading-tight">
            {name}
          </h2>
          <p className="text-[13px] text-content-secondary mt-0.5">{subtitle}</p>
          <Link
            href={seeMoreUrl}
            className="inline-block mt-1.5 text-xs text-link hover:underline"
          >
            {seeMoreLabel} ›
          </Link>
        </div>
      </div>
      <a
        href={cvHref}
        download={cvFileName ?? true}
        className="flex items-center justify-center gap-2 border-t border-surface-border bg-[#1a73e8] p-3 text-sm font-semibold text-white transition-colors hover:bg-[#1b66c9]"
      >
        <Download className="size-4" />
        {downloadCvLabel}
      </a>
    </div>
  );
}
