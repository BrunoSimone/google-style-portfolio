import Link from "next/link";
import Image from "next/image";
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
}: KnowledgePanelProps) {
  return (
    <div className="border border-surface-border rounded-lg overflow-hidden">
      {photo && (
        <div className="p-5 pb-0">
          <div className="w-full aspect-square max-h-[280px] rounded-lg overflow-hidden relative">
            <Image
              src={photo}
              alt={name}
              fill
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
