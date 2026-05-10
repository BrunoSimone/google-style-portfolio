# google-style-portfolio

Personal portfolio disguised as a Google Search experience. Search for me, browse results, read my Wikipedia article — all within a pixel-perfect recreation of Google's UI.

## Live Demo

[**google-me.vercel.app**](https://google-me.vercel.app)

## What's inside

- **Google Home** — Search bar that leads to results about me
- **Search Results** — Real-looking results linking to LinkedIn, GitHub, Wikipedia, and WeCheck AI
- **Knowledge Panel** — Sidebar with bio, links, and photo
- **People Also Ask** — Expandable FAQ section
- **Projects Tab** — Portfolio projects styled as search results
- **Contact Tab** — Quick access to email, phone, LinkedIn, GitHub
- **Wikipedia Page** — Full article page mimicking Wikipedia's layout with career, skills, and education
- **i18n** — Fully translated in Spanish and English, switchable in real-time

## Tech Stack

- **Next.js 15** (App Router + Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**

## Project Structure

```
src/
├── app/            # Routes (/, /search, /wiki)
├── components/     # Reusable UI components
├── data/           # Static data (URLs, skills, structure)
│   ├── bruno.ts    # Personal info + search/project base data
│   └── palette.ts  # Brand colors
├── i18n/           # Internationalization
│   ├── es.ts       # Spanish translations
│   ├── en.ts       # English translations
│   ├── translations.ts
│   └── context.tsx # React context + useLanguage hook
└── lib/            # Utilities
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Architecture Decisions

- **All visible text lives in i18n files** — `es.ts` and `en.ts` are the single source of truth for any user-facing string
- **Data layer is pure** — `bruno.ts` contains only static, language-independent data (URLs, favicon configs, skill lists)
- **Colors are centralized** — `palette.ts` holds all brand colors used across search results and contact cards
- **File-system routing** — Each page maps directly to a URL segment (`/search`, `/wiki`)
- **No external CMS or API** — Everything is static and pre-rendered for instant load times

## License

MIT
