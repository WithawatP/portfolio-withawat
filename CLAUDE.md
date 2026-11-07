# Portfolio website (Withawat Phiraban)

Single-page neumorphic portfolio, live on Vercel (https://portfolio-withawat.vercel.app/). React 19 + Vite + Tailwind CSS v4 (tokens in `@theme` inside `src/index.css`). Swiper powers the project gallery. The design.md v3 redesign is finished and merged into `main`, along with prerendering (P1), crawler metadata (C1), the light and dark theme (D1) and the Thai page at `/th/` (L1). Work happens on a branch per phase from `main`, merged by PR.

## Commands
- `npm run dev`, `npm run build`, `npm run lint` (oxlint).
- Run every command with the Bash tool (Git Bash) in bash syntax: use `npm`, not `npm.cmd`, and chain with `&&`. Never use PowerShell. If the Bash tool does not work, tell the owner first; do not switch to PowerShell.
- A task is not done until lint and build pass.

## Where things live
- `src/index.css`: the design.md tokens (light under `@theme` / `:root`, dark under `html[data-theme='dark']`, Thai overrides under `html:lang(th)`), shadow utilities, `@font-face` rules, and the CSS of the theme switch and the language link.
- `src/assets/contour-hero.svg`, `contour-experience.svg`, `contour-footer.svg`: the contour artwork. Their colours follow the theme through `src/lib/contourTheme.js`; the files stay untouched.
- `docs/mockup/*.html`: approved mockups (`hero-featured.html` is the main visual reference; `dark-theme.html` and `thai-fonts.html` for D1 and L1).
- `src/data/portfolio.js`: ALL English copy and data, including `ui` (the strings components show). `src/data/portfolio.th.js`: the Thai copy, same keys, owner-reviewed; values that do not change come from `portfolio.js`. Owner-supplied facts only.
- `src/lib/content.js`: `useContent()`. Components read their copy from it, never from the data files directly.
- `src/lib/theme.js` + the inline script in `index.html`: the theme (stored choice, else the system), set before the first paint.
- `src/entry-server.jsx` + `scripts/prerender.mjs`: build-time rendering of `/` (`dist/index.html`) and `/th/` (`dist/th/index.html`), each with its own `<head>` and `hreflang`. `main.jsx` hydrates in the page's `<html lang>`.
- `vite.config.js` (`site-meta`): canonical and share-image tags, JSON-LD, `robots.txt`, `sitemap.xml` and `llms.txt`, built from `VITE_SITE_URL` and `portfolio.js`.
- `src/components/*`: page sections. `src/components/ui/*`: shared pieces (Key, Icon, KnobSwitch, TimelineItem, CountUp, ThemeSwitch, LanguageLink, the contour art components).
- `src/components/BottomNav.jsx`, `src/components/DesktopNav.jsx` and `src/lib/useScrollSpy.js`: section navigation.

## Design rules (read `design.md` before ANY UI work)
- `design.md` (v3, redesign) is the source of truth. It overrides every installed skill, including `design-taste-frontend`, wherever they conflict. The approved visual reference is `docs/mockup/hero-featured.html`.
- Flat ground by default; depth only for keys, the switch, the one device panel, the gallery screen, icon wells, the Skills tray and the nav capsules. No cards around text (the Skills tray is the one exception, design.md section 8), no chips, no nested containers.
- Use the design.md tokens only: no hardcoded hex in components, no Tailwind `shadow-*`, no borders for structure, no gradients or glass.
- Accent `#651C32` (`#8C2A47` in the dark theme) only in the five places design.md section 3 allows.
- Mobile first (390px), one breakpoint at 900px.
- Every change works in both themes and both languages: tokens, never colours or copy written into a component.
- Do NOT change: the contour paths in the `src/assets/contour-*.svg` files, the Swiper configuration (no loop, no autoplay, no lightbox), the order or wording of data in `portfolio.js` or `portfolio.th.js` unless asked.
- Never invent facts, numbers, or claims in copy. Leave a bracketed placeholder and ask the owner. New Thai copy is a draft until the owner reviews it; nothing unreviewed is merged.

## Working agreement
- One task at a time. If a task touches more than about 3 files, propose a plan first and wait for approval.
- Do not add dependencies without asking.
- Verify at 360, 390, 768, 1024 and 1440 px, on `/` and `/th/`, in both themes: no horizontal overflow, no hydration warning. Report the page height at 390. Answer the review gate in design.md section 11.
- Commit and push only when the owner asks.
- `.claude/skills/design-taste-frontend/scripts/inspect.mjs` is for measuring. Waived findings are listed at the end of design.md.
- End each task with a short report: files changed, measurements, anything uncertain.
- The roadmap and decisions are in `ROADMAP.md`. Read it at the start of a session and update it at the end of each phase.
