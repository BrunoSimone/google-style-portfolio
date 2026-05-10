# google-style-portfolio

Personal portfolio disguised as a Google Search experience. Search for me, browse results, read my Wikipedia article — all within a pixel-perfect recreation of Google's UI.

## Live Demo

[**google-me.vercel.app**](https://google-style-portfolio.vercel.app/)

## Stack

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
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build
```
## License

MIT
