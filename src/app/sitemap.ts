import type { MetadataRoute } from "next";
import { webs } from "@/content/work";

const SITE = "https://www.brunosimone.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/web`, changeFrequency: "monthly", priority: 0.8 },
    ...webs.map((w) => ({ url: `${SITE}/web/${w.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
