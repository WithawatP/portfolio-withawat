# Portfolio website (Withawat Phiraban)

Single-page neumorphic portfolio. React 19 + Vite + Tailwind CSS v4 (tokens in `@theme` inside `src/index.css`). styled-components is used mainly inside `UiverseButton`. Swiper powers the project gallery.

## Commands
- `npm run dev`, `npm run build`, `npm run lint` (oxlint).
- On this Windows machine PowerShell blocks `npm.ps1`: use `npm.cmd` when `npm` fails.
- A task is not done until lint and build pass.

## Where things live
- `src/index.css`: color tokens (`--color-*`), light-direction vars (`--lx`, `--ly`, `--depth-scale`), the `neu-*` shadow utilities, motion CSS.
- `src/lib/styles.js`: shared LEVEL_* class strings. Reuse them; never write new shadow strings.
- `src/data/portfolio.js`: ALL copy and data. Owner-supplied facts only.
- `src/components/*`: page sections. `src/components/ui/*`: shared pieces (SectionCard, InsetPanel, SkillChip, Pill, TimelineItem, QuickContactRow, UiverseButton, Icon).
- `src/components/BottomNav.jsx` and `src/lib/useScrollSpy.js`: mobile navigation.

## Design rules (read `design.md` before ANY UI work)
- `design.md` is the source of truth. It overrides every installed skill, including `design-taste-frontend`, wherever they conflict. Its "Precedence" section lists the skill checks that are waived.
- Use tokens and `neu-*` utilities only: no hardcoded hex, no Tailwind `shadow-*`, no borders for structure, no gradients or glass. `UiverseButton` is the single exception.
- Raised means clickable. Engraved or inset means information. Never swap them.
- Mobile first (390px). Keep 640px and up unchanged unless the task says otherwise.
- Do NOT change: the ORIGINAL look of `UiverseButton` (layout props only), the Swiper configuration (no loop, no autoplay, no lightbox), the order or wording of data in `portfolio.js` unless asked.
- Never invent facts, numbers, or claims in copy. Ask the owner.

## Working agreement
- One task at a time. If a task touches more than about 3 files, propose a plan first and wait for approval.
- Do not add dependencies without asking.
- Verify at 360, 390, 768 and 1440 px: no horizontal overflow. Report the page height at 390.
- The skill's `inspect.mjs` is for measuring. Waived findings: `shadow`, `gradient` / `button-fx` / `text-shadow` from UiverseButton, `few-pictures`, `font-fallback`, and `small-text` for text of 12px or larger.
- End each task with a short report: files changed, measurements, anything uncertain.
- The roadmap and decisions are in `ROADMAP.md`. Read it at the start of a session and update it at the end of each phase.
