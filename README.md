# google-style-portfolio

Personal portfolio disguised as a Google Search experience. Search for me, browse results, read my Wikipedia article, all within a pixel-perfect recreation of Google's UI.

## Live Demo

[**brunosimone.dev**](https://www.brunosimone.dev)

## Stack

- **Next.js 16** (App Router + Turbopack)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**

## Project Structure

```
src/
├── app/            # Routes (/, /search, /wiki, /case/[slug])
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
