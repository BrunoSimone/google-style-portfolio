export const en = {
  home: {
    subtitle: "Full-Stack Developer",
    searchPlaceholder: "Search in portfolio",
    googleSearch: "Google Search",
    feelingLucky: "I'm Feeling Lucky",
    images: "Images",
  },
  tabs: {
    all: "Overview",
    experience: "Experience",
    projects: "Projects",
    contact: "Contact & links",
  },
  search: {
    resultsCount: "About {count} results ({time} seconds)",
    noResultsFor: "No results found for",
    suggestions: "Suggestions:",
    trySearch: "Try searching",
    checkSpelling: "Check your spelling",
    onlyMe: "This portfolio only contains information about me",
    moreQuestions: "People also ask",
    projectsFound: "{count} projects found",
    expCount: "2 positions · 4 years total",
    contactTitle: "Links & ways to contact me",
    copy: "Copy",
    copied: "Copied!",
  },
  cv: {
    href: "/cv-bruno-simone-en.pdf",
    fileName: "Bruno Simone - Full-Stack Developer Resume.pdf",
  },
  panel: {
    source: "Source:",
    subtitle: "Full-Stack Developer",
    bio: "Bruno Daniel Simone is an Argentine software developer specializing in Full-Stack development. With 4 years of experience building and maintaining SaaS products in startup environments, he currently works as a Full-Stack Developer at WeCheck AI, where he owns features end-to-end across the entire tech stack.",
    born: "Born",
    occupation: "Occupation",
    occupationValue: "Full-Stack Developer",
    company: "Company",
    education: "Education",
    educationValue: "UTN, Associate Degree in Computer Programming (in progress)",
    downloadCv: "Download CV",
    seeMore: "See more on Wikipedia",
  },
  proj: {
    noImage: "no image",
    demo: "Live demo",
    repo: "Code on GitHub",
    caseStudy: "View case study",
    store: "View in store",
    private: "Private repository",
  },
  contact: {
    cvLabel: "CV",
  },
  case: {
    back: "← Back to Projects",
    fromWikipedia: "From Wikipedia, the free encyclopedia",
    problemTitle: "Problem",
    decisionsTitle: "Design decisions",
    solutionTitle: "Solution",
    impactTitle: "Impact",
    linkDemo: "Live demo",
    linkRepo: "Code on GitHub",
    notFound: "Case study not found.",
    infobox: {
      type: "Type",
      stack: "Stack",
      status: "Status",
      role: "Role",
      year: "Year",
    },
  },
  footer: {
    country: "Argentina",
  },
  searchResults: [
    {
      title: "Bruno Simone - Wikipedia, the free encyclopedia",
      description:
        "Bruno Daniel Simone (Mar del Plata, Argentina) is an Argentine software developer specializing in Full-Stack development with 4 years of experience in SaaS products ...",
    },
    {
      title: "BrunoSimone (Bruno Simone) · GitHub",
      description:
        "Full-Stack Developer. React, TypeScript, Node.js, NestJS, Python. Building web tools and AI projects like JubiGestor.",
    },
    {
      title: "Bruno Simone - Full-Stack Developer - WeCheck AI | LinkedIn",
      description:
        "Mar del Plata, Argentina · Full-Stack Developer at WeCheck AI · 4 years of experience building SaaS products with React, TypeScript, and Node.js in startup environments.",
    },
    {
      title: "WeCheck AI: Background Check Platform",
      description:
        "SaaS background check platform. Bruno Simone has worked there as a Full-Stack Developer (remote) since October 2023, his current job.",
    },
  ],
  peopleAlsoAsk: [
    {
      question: "What technologies does Bruno Simone use?",
      answer:
        "I primarily work with React, TypeScript, Next.js, Node.js, NestJS, and Express. Also Python (FastAPI), MongoDB, PostgreSQL, AWS, Docker, and AI tools like Vercel AI SDK, Gemini, and Langfuse.",
    },
    {
      question: "Where does Bruno Simone work?",
      answer:
        "I work as a Full-Stack Developer at WeCheck AI (remote, based in Miami) since October 2023, where I own features end-to-end across the frontend, the API gateway, and the microservices.",
    },
    {
      question: "What projects has Bruno Simone built?",
      answer:
        "JubiGestor, an AI (RAG) assistant for Argentine pension procedures built with FastAPI, Gemini, and pgvector; this very portfolio; and at WeCheck AI an AI microservice that cut times and costs by 50%+, a PDF generation service, and several third-party integrations.",
    },
    {
      question: "How to contact Bruno Simone?",
      answer:
        "You can reach me through my LinkedIn profile (linkedin.com/in/bruno-daniel-simone) or by email at brunosimone.mdq@gmail.com.",
    },
  ],
  projects: [
    {
      title: "JubiGestor: AI assistant for pension procedures",
      description:
        "Conversational (RAG) assistant that answers questions about pensions in Argentina, citing official ANSES documentation. FastAPI backend with Gemini and PostgreSQL + pgvector; Next.js frontend with streaming chat.",
      placeholder: "chat UI · screenshot · 4:3",
    },
    {
      title: "Guild: Lead-generation site for trades",
      description:
        "Marketing site for “Buenas Manos”, a trades guild (plumbing, carpentry, electricity, and ironwork) in Mar del Plata. Next.js with Sanity CMS, local SEO, a works gallery, and low-friction WhatsApp contact.",
      placeholder: "landing + services · 4:3",
    },
    {
      title: "Portfolio: Google Search Clone",
      description:
        "Personal portfolio built as a Google Search clone with Next.js 16, React 19, TypeScript, and Tailwind CSS. Includes a Wikipedia-style page with detailed info.",
      placeholder: "home / search / wiki · 4:3",
    },
  ],
  experienceCards: [
    {
      role: "Full-Stack Developer",
      period: "Oct 2023 – Present",
      duration: "Current · 3 yrs",
      description:
        "I own product features end-to-end across the React/TypeScript frontend, the NestJS/Express API gateway, and the underlying microservices, making technical decisions from evaluation to production. I cut times and costs by 50%+ on an AI microservice (Vercel AI SDK, Langfuse), built a PDF service with Express/react-pdf, and integrated Stripe, Persona, SSO, and AWS.",
    },
    {
      role: "Frontend Developer",
      period: "Jan 2023 – Sep 2023",
      duration: "9 mos",
      description:
        "My first professional role. I built and maintained an internal back-office for product and user management; fixed bugs, improved UX/UI, and contributed to code reviews.",
    },
  ],
  caseStudies: {
    jubigestor: {
      title: "JubiGestor: AI assistant for pension procedures",
      logo: "/jubigestor-logo.svg",
      type: "Web app · AI (RAG)",
      role: "Design + Development",
      status: "In development",
      statusColor: "#1a73e8",
      stack: "FastAPI, Gemini, pgvector, Next.js",
      year: "2026",
      lede: "JubiGestor is a conversational assistant that answers questions about pensions in Argentina in plain language, always citing official ANSES documentation.",
      problem:
        "Information about pension procedures is scattered across dense, hard-to-parse documents. The challenge was to answer concrete questions in plain language without making things up, a real risk in a sensitive domain like pensions.",
      decisions: [
        "RAG architecture: retrieve the relevant chunks from the official corpus before generating, so every answer is grounded in real sources.",
        "Anti-hallucination: if no chunk clears the similarity threshold, the model defers to ANSES instead of inventing.",
        "FastAPI backend with Gemini (generation + embeddings) and PostgreSQL + pgvector for vector search.",
        "Idempotent ingestion pipeline over a versioned Markdown corpus with frontmatter (title, source, date); every answer cites its source.",
        "Next.js frontend with streaming chat (NDJSON) that surfaces the citations, plus per-IP rate limiting.",
      ],
      solution:
        "The user asks a question; the system embeds the query, finds the nearest chunks in pgvector, and builds the context with its citations. Gemini streams a grounded answer with links to the official documentation. When there isn't enough context, it defers to ANSES rather than risk an incorrect fact.",
      solutionImage: "chat with answer + citations · 16:9",
      impact:
        "Turns dense pension documentation into clear, traceable answers: every fact is verifiable at its source, reducing the uncertainty of a pension procedure without sacrificing rigor.",
      metrics: [
        { value: "768", label: "embedding dimensions (Gemini, MRL)", color: "#4285F4" },
        { value: "100%", label: "answers with a citation or deferral to ANSES", color: "#34A853" },
        { value: "0", label: "facts invented outside the corpus", color: "#EA4335" },
      ],
    },
    guild: {
      title: "Guild: Lead-generation site for trades",
      logo: "/buenas-manos-logo.svg",
      type: "Website · Marketing / Lead-gen",
      role: "Design + Development",
      status: "In production",
      statusColor: "#1e7e42",
      stack: "Next.js, Sanity, Tailwind",
      year: "2026",
      lede: "“Buenas Manos” is a lead-generation site for a trades guild (plumbing, carpentry, electricity, and ironwork) in Mar del Plata, built for local SEO, conversion, and low-friction contact.",
      problem:
        "Trades rely on word of mouth and on platforms that keep the customer and charge a commission. The challenge was to give the guild a channel of its own that shows up in local searches and turns visits into direct inquiries, with no middlemen.",
      decisions: [
        "Local SEO first: one page per service with optimized titles and copy, structured data (JSON-LD), sitemap, and robots.",
        "Low-friction contact: a quote button and a floating WhatsApp contact present across the whole site.",
        "Headless CMS (Sanity) so the guild can upload its completed works (photos, service, area) without touching code.",
        "Serverless architecture: a single Next.js app on managed services, with no backend of its own to maintain.",
        "Works gallery with a carousel (Embla) and animations (Motion) to showcase the portfolio of jobs smoothly.",
      ],
      solution:
        "A landing with per-trade sections plus dedicated service pages, each optimized for its local search (“plumber in Mar del Plata”, etc.). Completed works are pulled from Sanity and shown in a paginated gallery. Every screen pushes toward direct WhatsApp contact in one click.",
      solutionImage: "home + service page · 16:9",
      impact:
        "Gives the guild a channel of its own, indexable and conversion-oriented: it turns local searches into direct WhatsApp inquiries, with no commissions or middlemen.",
      metrics: [
        { value: "4", label: "trades with their own page and SEO", color: "#4285F4" },
        { value: "1", label: "click to reach WhatsApp contact", color: "#EA4335" },
        { value: "0", label: "commissions to middlemen", color: "#34A853" },
      ],
    },
    portfolio: {
      title: "Portfolio: Google Search Clone",
      logo: "",
      type: "Website · Portfolio",
      role: "Design + Development",
      status: "In production",
      statusColor: "#1e7e42",
      stack: "Next.js 16, React 19, TS",
      year: "2026",
      lede: 'Bruno Simone’s Portfolio is a personal site built as a pixel-perfect recreation of Google Search and Wikipedia, whose metaphor invites the visitor to "google him".',
      problem:
        "A traditional resume does not set one full-stack developer apart from another. The challenge was to demonstrate technical skill, attention to detail, and creativity in the product’s own medium, not to describe them in a bullet list.",
      decisions: [
        'The "google me" metaphor: recreate Search + Wikipedia pixel-perfect instead of a generic portfolio layout.',
        "Next.js 16 (App Router) with /, /search and /wiki routes; search state in the URL.",
        "Bilingual ES/EN via i18n context: all copy is translatable.",
        "A single search-result card component reused across the tabs and the projects.",
      ],
      solution:
        "The navigation reproduces a real search journey: Home → results with a knowledge panel → Wikipedia article. The tabs (Overview / Experience / Projects / Contact) organize the content while reusing a single search-result card component.",
      solutionImage: "screenshot: home → search → wiki flow · 16:9",
      impact:
        "The format turns reviewing a portfolio into a memorable, coherent experience from start to finish, without sacrificing accessibility or performance.",
      metrics: [
        { value: "3", label: "navigable routes (home · search · wiki)", color: "#4285F4" },
        { value: "2", label: "languages, 100% of copy translatable", color: "#EA4335" },
        { value: "0", label: "heavy animation dependencies", color: "#34A853" },
      ],
    },
  },
  wiki: {
    freeEncyclopedia: "The free encyclopedia",
    searchPlaceholder: "Search Wikipedia",
    searchBtn: "Search",
    donations: "Donate",
    createAccount: "Create account",
    login: "Log in",
    article: "Article",
    discussion: "Talk",
    read: "Read",
    viewSource: "View source",
    viewHistory: "View history",
    tools: "Tools",
    contents: "Contents",
    hide: "hide",
    fromWikipedia: "From Wikipedia, the free encyclopedia",
    backToSearch: "← Back to search",
    index: "Contents",
    edit: "edit",
    career: "Professional career",
    skills: "Technical skills",
    education: "Education",
    externalLinks: "External links",
    lastEdited: "This page was last edited on May 8, 2026.",
    license:
      "Content is available under Creative Commons Attribution-ShareAlike 4.0.",
    fullName: "Full name",
    born: "Born",
    occupation: "Occupation",
    company: "Company",
    educationLabel: "Education",
    yearsActive: "Years active",
    languages: "Languages",
    website: "Website",
    category: "Category",
    technologies: "Technologies",
    linkedinProfile: "LinkedIn profile",
    githubProfile: "GitHub profile",
    emailContact: "Email contact",
    languagesValue: "Spanish (Native), English (B2)",
    introParagraph:
      "Bruno Daniel Simone (Mar del Plata, Buenos Aires, Argentina) is a Full-Stack Developer with 4 years of experience building and maintaining SaaS products in startup environments. He currently works as a Full-Stack Developer at WeCheck AI (remote), where he owns features end-to-end across the frontend, the API gateway, and the microservices.",
    careerIntro:
      "Simone began his professional career in January 2023 as a Frontend Developer at GOL BALL (remote, Miami). There he built and maintained an internal back-office for product and user management, resolved bugs, improved user experience, and participated in code reviews.",
    careerWecheck:
      "In October 2023 he joined WeCheck AI as a Full-Stack Developer (remote), where he owns end-to-end product features across the frontend (React/TypeScript), the API gateway (NestJS/Express), and the underlying microservices, making technical decisions from evaluation to production rollout. He also built and maintained the company's main website and internal back-office, plus a mobile app for Android and iOS with React Native (Expo).",
    careerPromotion:
      "His key achievements include: reducing processing times and operational costs by over 50% in an internal AI microservice by integrating Vercel AI SDK and Langfuse; designing and implementing an automatic PDF generation service with Express and react-pdf; integrating third-party services such as Stripe, Persona, SSO providers, and AWS services (S3, SNS, Secrets Manager, Amazon Rekognition, IAM); and implementing tracing with Sentry, PostHog, and Langfuse. Alongside this he builds JubiGestor, an AI (RAG) assistant for pension procedures.",
    eduUtn:
      "Universidad Tecnológica Nacional (UTN), Associate Degree in Computer Programming (Feb 2026 – Present)",
    eduHighSchool:
      "Escuela Secundaria N° 3, High School in Economics (2013 – 2019)",
    skillCategories: {
      languages: "Languages",
      frontend: "Frontend",
      backend: "Backend",
      testing: "Testing",
      databases: "Databases",
      observability: "Observability",
      cloud: "Cloud & DevOps",
      ai: "AI / LLMs",
      tools: "Version control",
      methodologies: "Methodologies",
    },
  },
};
