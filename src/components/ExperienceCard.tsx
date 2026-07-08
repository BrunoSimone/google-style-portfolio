"use client";

import Link from "next/link";
import { MoreVertical } from "lucide-react";

export interface ExperienceCardData {
  faviconColor: string;
  faviconLetter: string;
  company: string;
  displayUrl: string;
  tags: string[];
  current: boolean;
  role: string;
  period: string;
  duration: string;
  description: string;
}

export function ExperienceCard({ item }: { item: ExperienceCardData }) {
  return (
    <div className="flex flex-col max-w-[600px]">
      <div className="flex gap-3 items-center mb-2">
        <div
          className="size-[26px] rounded-full flex items-center justify-center text-white text-[9px] font-extrabold shrink-0"
          style={{ backgroundColor: item.faviconColor }}
        >
          {item.faviconLetter}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm text-content-primary leading-tight">
            {item.company}
          </div>
          <div className="text-xs text-content-secondary leading-tight truncate">
            {item.displayUrl}
          </div>
        </div>
        <MoreVertical className="size-5 text-content-tertiary shrink-0 cursor-pointer" />
      </div>

      <Link
        href="/wiki#carrera"
        className="text-xl text-link hover:underline leading-snug"
      >
        {item.role}
      </Link>

      <div className="flex items-center gap-2 text-[13px] text-content-secondary mt-0.5">
        <span>{item.period}</span>
        <span className="text-surface-border">·</span>
        <span
          className={`font-medium ${
            item.current ? "text-google-green" : "text-content-secondary"
          }`}
        >
          {item.duration}
        </span>
      </div>

      <p className="text-[13px] text-content-secondary leading-relaxed mt-2">
        {item.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-3">
        {item.tags.map((tag) => (
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
