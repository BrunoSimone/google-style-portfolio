import { MoreVertical } from "lucide-react";
import type { SearchResult } from "@/data/bruno";
import { isExternalUrl } from "@/lib/utils";

export function SearchResultCard({
  faviconColor,
  faviconLetter,
  faviconUrl,
  siteName,
  displayUrl,
  url,
  title,
  description,
}: SearchResult) {
  return (
    <div className="flex flex-col max-w-[600px]">
      <div className="flex gap-3 items-center mb-2">
        {faviconUrl ? (
          <img
            src={faviconUrl}
            alt={siteName}
            className="size-[26px] rounded-full shrink-0 object-cover"
          />
        ) : (
          <div
            className="size-[26px] rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
            style={{ backgroundColor: faviconColor }}
          >
            {faviconLetter}
          </div>
        )}
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-sm text-content-primary leading-tight">
            {siteName}
          </span>
          <span className="text-xs text-content-secondary truncate leading-tight">
            {displayUrl}
          </span>
        </div>
        <MoreVertical className="size-5 text-content-tertiary shrink-0 cursor-pointer" />
      </div>
      <a
        href={url}
        className="block"
        {...(isExternalUrl(url)
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        <h3 className="text-xl text-link hover:underline leading-snug cursor-pointer">
          {title}
        </h3>
      </a>
      <p className="text-[13px] text-content-secondary leading-relaxed mt-1">
        {description}
      </p>
    </div>
  );
}
