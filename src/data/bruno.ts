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
  education: "UTN — Tecnicatura en Programación",
  languages: ["Español (Nativo)", "Inglés (B2)"],
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

export const searchResultsBase: Omit<SearchResult, "title" | "description">[] = [
  {
    faviconColor: brandColors.linkedin,
    faviconLetter: "in",
    faviconUrl: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=64",
    siteName: "LinkedIn",
    displayUrl: "https://www.linkedin.com › in › bruno-daniel-simone",
    url: "https://www.linkedin.com/in/bruno-daniel-simone/",
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
    faviconColor: brandColors.wikipedia,
    faviconLetter: "W",
    faviconUrl: "https://www.google.com/s2/favicons?domain=es.wikipedia.org&sz=64",
    siteName: "Wikipedia",
    displayUrl: "https://es.wikipedia.org › wiki › Bruno_Simone",
    url: "/wiki",
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
  siteName: string;
  displayUrl: string;
  url: string;
  title: string;
  description: string;
  tags: string[];
}

export const projectsBase: Omit<Project, "title" | "description">[] = [
  {
    faviconColor: brandColors.portfolio,
    faviconLetter: "B",
    siteName: "Bruno Simone",
    displayUrl: "bruno-simone.vercel.app › portfolio",
    url: "/",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  },
  {
    faviconColor: brandColors.ai,
    faviconLetter: "AI",
    siteName: "WeCheck AI",
    displayUrl: "wecheck.ai › ai-service",
    url: "https://wecheck.ai",
    tags: ["Vercel AI SDK", "Langfuse", "NestJS", "LLMs"],
  },
  {
    faviconColor: brandColors.pdf,
    faviconLetter: "PDF",
    siteName: "WeCheck AI",
    displayUrl: "wecheck.ai › reports",
    url: "https://wecheck.ai",
    tags: ["Express", "react-pdf", "Node.js"],
  },
  {
    faviconColor: brandColors.integrations,
    faviconLetter: "$",
    siteName: "WeCheck AI",
    displayUrl: "wecheck.ai › integrations",
    url: "https://wecheck.ai",
    tags: ["Stripe", "Persona", "SSO", "APIs REST"],
  },
  {
    faviconColor: brandColors.mobile,
    faviconLetter: "RN",
    siteName: "WeCheck AI",
    displayUrl: "wecheck.ai › mobile",
    url: "https://wecheck.ai",
    tags: ["React Native", "Expo", "Android Studio"],
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
    "Next.js",
    "React Native",
    "Redux",
    "Tailwind CSS",
    "Material UI",
    "shadcn/ui",
    "react-pdf",
  ],
  backend: [
    "Node.js",
    "NestJS",
    "Express",
    "APIs REST",
    "Microservicios",
    "API Gateways",
  ],
  databases: ["MongoDB", "PostgreSQL", "Supabase", "Firebase"],
  cloud: [
    "AWS (S3, SNS, Secrets Manager, Rekognition, IAM)",
    "Railway",
    "Docker",
    "GitHub Actions",
    "CI/CD",
    "Vercel",
  ],
  ai: ["Vercel AI SDK", "Langfuse", "Integraciones con LLMs"],
  observability: ["Sentry", "PostHog", "Langfuse"],
  methodologies: ["Agile", "Scrum", "Code Reviews"],
};
