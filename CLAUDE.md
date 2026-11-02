# Portfolio website (Withawat Phiraban)

Single-page neumorphic portfolio. React 19 + Vite + Tailwind CSS v4 (tokens in `@theme` inside `src/index.css`). Swiper powers the project gallery. A redesign (design.md v3) is in progress on the `redesign-v2` branch; styled-components and `UiverseButton` are being retired.

## Commands
- `npm run dev`, `npm run build`, `npm run lint` (oxlint).
- On this Windows machine PowerShell blocks `npm.ps1`: use `npm.cmd` when `npm` fails.
- A task is not done until lint and build pass.

## Where things live
- `src/index.css`: tokens and shadow utilities (being replaced by the design.md v3 set).
- `src/assets/contour-hero.svg`: the hero contour artwork. `docs/mockup/hero-featured.html`: the approved mockup markup.
- `src/data/portfolio.js`: ALL copy and data. Owner-supplied facts only.
- `src/components/*`: page sections. `src/components/ui/*`: shared pieces (SectionCard, InsetPanel, SkillChip, Pill, TimelineItem, QuickContactRow, UiverseButton, Key, Icon).
- `src/components/BottomNav.jsx` and `src/lib/useScrollSpy.js`: mobile navigation.

## Design rules (read `design.md` before ANY UI work)
- `design.md` (v3, redesign) is the source of truth. It overrides every installed skill, including `design-taste-frontend`, wherever they conflict. The approved visual reference is `docs/mockup/hero-featured.html`.
- Flat ground by default; depth only for keys, the switch, the one device panel, the gallery screen and icon wells. No cards around text, no chips, no nested containers.
- Use the design.md tokens only: no hardcoded hex in components, no Tailwind `shadow-*`, no borders for structure, no gradients or glass.
- Accent `#651C32` only in the four places design.md section 3 allows.
- Mobile first (390px), one breakpoint at 900px.
- Do NOT change: the hero contour paths in `src/assets/contour-hero.svg`, the Swiper configuration (no loop, no autoplay, no lightbox), the order or wording of data in `portfolio.js` unless asked.
- Never invent facts, numbers, or claims in copy. Leave a bracketed placeholder and ask the owner.

## Working agreement
- One task at a time. If a task touches more than about 3 files, propose a plan first and wait for approval.
- Do not add dependencies without asking.
- Verify at 360, 390, 768, 1024 and 1440 px: no horizontal overflow. Report the page height at 390. Answer the review gate in design.md section 11.
- The skill's `inspect.mjs` is for measuring. Waived findings are listed at the end of design.md.
- End each task with a short report: files changed, measurements, anything uncertain.
- The roadmap and decisions are in `ROADMAP.md`. Read it at the start of a session and update it at the end of each phase.
