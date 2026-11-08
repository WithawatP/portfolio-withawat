# Portfolio — Withawat Phiraban

My personal portfolio: a single-page, neumorphic site in English and Thai, with a light and a dark theme.

**Live:** https://portfolio-withawat.vercel.app/ (Thai: [/th/](https://portfolio-withawat.vercel.app/th/))

## Stack

- React 19 + Vite
- Tailwind CSS v4 (design tokens in `src/index.css`)
- Swiper for the project gallery, Lenis for smooth scrolling
- Prerendered at build time (`/` and `/th/`), deployed on Vercel

## Getting started

```bash
npm install
npm run dev      # dev server
npm run build    # production build + prerender into dist/
npm run lint     # oxlint
```

Copy `.env.example` to `.env` and set `VITE_SITE_URL` to the deployed address (used for canonical and share-image tags). It can stay empty for local work.

## Project structure

```
src/
  components/      page sections (Hero, Experience, FeaturedProject, Skills, Contact…)
  components/ui/   shared pieces (keys, switches, icons, contour art)
  data/            portfolio.js (English copy) and portfolio.th.js (Thai copy)
  lib/             content, theme, scroll and motion hooks
  index.css        design tokens and theme styles
scripts/prerender.mjs   renders the static HTML for each language
design.md               design rules for the site
```

All page copy lives in `src/data/`; components read it through `useContent()`.
