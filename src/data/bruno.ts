import { brandColors } from "./palette";

export const bruno = {
  name: "Bruno Daniel Simone",
  shortName: "Bruno Simone",
  location: "Mar del Plata, Argentina",
  email: "brunosimone.mdq@gmail.com",
  phone: "+54 223 616 1356",
  linkedin: {
    url: "https://www.linkedin.com/in/bruno-daniel-simone/",
    display: "linkedin.com/in/bruno-daniel-simone",
  },
  github: {
    url: "https://github.com/BrunoSimone",
    display: "github.com/BrunoSimone",
  },
  role: "Full-Stack Developer",
  company: "WeCheck AI",
  education: "UTN, Tecnicatura en Programación",
  languages: ["Español (Nativo)", "Inglés (Intermedio-Alto, B2)"],
};

export interface SearchResult {
  faviconColor: string;
  faviconLetter: string;
  faviconUrl?: string;
  siteName: string;
  displayUrl: string;
  url: string;
  title: string;
  description: string;
}

// Order (top → bottom): Wikipedia, GitHub, LinkedIn, WeCheck.
export const searchResultsBase: Omit<SearchResult, "title" | "description">[] = [
  {
    faviconColor: brandColors.wikipedia,
    faviconLetter: "W",
    faviconUrl: "https://www.google.com/s2/favicons?domain=es.wikipedia.org&sz=64",
    siteName: "Wikipedia",
    displayUrl: "https://es.wikipedia.org › wiki › Bruno_Simone",
    url: "/wiki",
  },
  {
    faviconColor: brandColors.github,
    faviconLetter: "G",
    faviconUrl: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
    siteName: "GitHub",
    displayUrl: "https://github.com › BrunoSimone",
    url: "https://github.com/BrunoSimone",
  },
  {
    faviconColor: brandColors.linkedin,
    faviconLetter: "in",
    faviconUrl: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=64",
    siteName: "LinkedIn",
    displayUrl: "https://www.linkedin.com › in › bruno-daniel-simone",
    url: "https://www.linkedin.com/in/bruno-daniel-simone/",
  },
  {
    faviconColor: brandColors.wecheck,
    faviconLetter: "W",
    faviconUrl: "https://www.google.com/s2/favicons?domain=wecheck.ai&sz=64",
    siteName: "WeCheck AI",
    displayUrl: "https://wecheck.ai › team",
    url: "https://wecheck.ai",
  },
];

export interface Project {
  faviconColor: string;
  faviconLetter: string;
  /** Optional favicon image (e.g. the project's own logo) shown instead of the letter tile. */
  faviconUrl?: string;
  siteName: string;
  displayUrl: string;
  url: string;
  title: string;
  description: string;
  placeholder: string;
  tags: string[];
  /** Whether a real screenshot exists. When false, a fallback tile is shown. */
  hasImage: boolean;
  /** Whether the thumbnail has an animated preview on hover. */
  hoverPreview: boolean;
  /** Private repo → shows a non-clickable "Private repository" chip. */
  isPrivate: boolean;
  imageSrc?: string;
  demoUrl?: string;
  repoUrl?: string;
  storeUrl?: string;
  /** Slug into caseStudies (i18n) when a case study page exists. */
  caseSlug?: string;
}

export const projectsBase: Omit<
  Project,
  "title" | "description" | "placeholder"
>[] = [
  {
    faviconColor: "#3a5ba0",
    faviconLetter: "J",
    faviconUrl: "/jubigestor-logo.svg",
    siteName: "JubiGestor",
    displayUrl: "github.com › BrunoSimone › Jubigestor",
    url: "https://github.com/BrunoSimone/Jubigestor",
    tags: ["Next.js", "FastAPI", "Gemini", "pgvector", "RAG"],
    hasImage: true,
    hoverPreview: false,
    isPrivate: false,
    repoUrl: "https://github.com/BrunoSimone/Jubigestor",
    caseSlug: "jubigestor",
  },
  {
    faviconColor: "#0B0B0B",
    faviconLetter: "G",
    faviconUrl: "/buenas-manos-logo.svg",
    siteName: "Guild",
    displayUrl: "github.com › BrunoSimone › guild",
    url: "https://github.com/BrunoSimone/guild",
    tags: ["Next.js", "Sanity CMS", "SEO local", "Motion"],
    hasImage: true,
    hoverPreview: false,
    isPrivate: false,
    demoUrl: "https://guild-livid.vercel.app/",
    repoUrl: "https://github.com/BrunoSimone/guild",
    caseSlug: "guild",
  },
  {
    faviconColor: brandColors.portfolio,
    faviconLetter: "B",
    faviconUrl: "/favicon-512.png",
    siteName: "Bruno Simone",
    displayUrl: "github.com › BrunoSimone › portfolio",
    url: "/",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    hasImage: true,
    hoverPreview: true,
    isPrivate: false,
    demoUrl: "https://google-style-portfolio.vercel.app/",
    repoUrl: "https://github.com/BrunoSimone/portfolio",
    caseSlug: "portfolio",
  },
];

export interface ExperienceMeta {
  faviconColor: string;
  faviconLetter: string;
  company: string;
  displayUrl: string;
  tags: string[];
  /** Current role → duration badge is highlighted green. */
  current: boolean;
}

export const experienceBase: ExperienceMeta[] = [
  {
    faviconColor: brandColors.wecheck,
    faviconLetter: "W",
    company: "WeCheck AI",
    displayUrl: "linkedin.com › company › wecheck-ai",
    tags: ["React", "TypeScript", "NestJS", "Node.js", "MongoDB", "AWS"],
    current: true,
  },
  {
    faviconColor: "#00A15A",
    faviconLetter: "GB",
    company: "GOL BALL",
    displayUrl: "linkedin.com › company › gol-ball",
    tags: ["React", "TypeScript", "Redux", "Material UI", "Git"],
    current: false,
  },
];

export interface ContactMethod {
  icon: string;
  label: string;
  value: string;
  href?: string;
  color: string;
  copyable: boolean;
}

export interface PeopleAlsoAskItem {
  question: string;
  answer: string;
}

export interface KnowledgePanelInfo {
  label: string;
  value: string;
  href?: string;
}

export const skills = {
  languages: ["TypeScript", "JavaScript", "Python", "SQL", "HTML", "CSS"],
  frontend: [
    "React",
    "React Native",
    "Next.js",
    "Redux",
    "Tailwind CSS",
    "Material UI",
    "shadcn/ui",
    "Bootstrap",
    "react-pdf",
    "SPA",
    "SSR",
  ],
  backend: [
    "Node.js",
    "NestJS",
    "Express",
    "FastAPI",
    "APIs REST",
    "Microservicios",
    "API Gateways",
  ],
  testing: ["Jest", "React Testing Library"],
  databases: ["MongoDB", "PostgreSQL", "Supabase", "Firebase"],
  observability: ["Sentry", "PostHog", "Langfuse"],
  cloud: [
    "AWS",
    "Railway",
    "Docker",
    "GitHub Actions",
    "CI/CD",
    "Vercel",
  ],
  ai: ["Vercel AI SDK", "Langfuse", "Integraciones con LLMs"],
  tools: ["Git", "GitHub"],
  methodologies: ["Agile", "Scrum", "Code Reviews"],
};
