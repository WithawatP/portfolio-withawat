# ROADMAP

Read this at the start of every session. Update the Status table and "Next task" at the end of each phase. Design rules live in `design.md` (source of truth) and `CLAUDE.md`.

Goal: a neumorphic portfolio for a junior dev / QA job seeker. Tidy, mobile first, limited but clearly visible motion, no "AI slop", every claim defensible in an interview.

## Status

| Phase | Scope | Status |
|---|---|---|
| 1 | Mobile spacing (padding, radii, content width). Page 390px: 9,280 -> 8,062px | Done |
| 2 | Experience timeline as an accessible accordion, highlights as bullet arrays, copy corrections in `portfolio.js` | Done |
| 2b | Timeline is click-only (no hover) on every width; whole card clickable; smaller mobile radius | Done |
| 3a | Bottom nav bar (edge-attached) + scroll-spy; navigation lock so the knob does not zig-zag; portal + viewport-fit=cover + safe-area cap | Done. Bug 2 (bar missing in iPhone 16 Pro Max DevTools emulation) not reproduced; if it returns, ask for a DevTools Elements screenshot |
| 3b | Shorter mobile page (8,145 -> ~8,035px); key cluster layout for UiverseButton | Done |
| 3b-fix | Restore original UiverseButton look; remove intro text under Contact heading | Done (via OpenCode) |
| 3c | Shorten mobile page further. Page 390px: ~8,035 -> 5,997px with the Dev tab open (longest Skills tab). Skills knob switch, compact Quick contact, collapsed Tech stack, shorter timeline rows, bio hidden below 640px | Done |
| 3d | Hero first screen + display font (Unbounded 700, name only). Keys follow the role below 640px; role shortened to one line on mobile. Skills chips 2 columns on mobile (Design stays 1). Page 390px: 5,997 -> 5,760px with the Dev tab open | Done |
| 4 | Skills as unequal-size modules from 768px (1024+: 8:4 then 5:7); Contact with one large email as the single focal point. Dev and QA chips split to equal rows from 1024px / 1280px. Owner tested a `--recess` fill on the Dev and email trays and removed it, then waived `empty-screens`. Page 390px: 5,760 -> 5,815px with the Dev tab open | Done |
| 5 | Motion: section extrude (pressed in, flat, raised; scale .95), inset window on project screenshots, hero depth layers + scoped light. Removed `RevealOnScroll` and `.rise`. Scroll rail built, then removed by owner. Page 390px unchanged at 5,815px with the Dev tab open | Done. Owner check on a real phone and in Firefox still open |
| 6 | Build/Test switch in the featured project (`KnobSwitch` radio mode, shared grid cell for stable height, owner's Postman method and 2 bugs). Page 390px: 5,815 -> 6,197px with the Dev tab open | Done. Not tested with a real screen reader or on a real phone |
| 7 | Copy rewrite from owner facts, inspector, Lighthouse (mobile 87/100/100/100, desktop 100/100/100/100), meta/OG, robots.txt, 960px WebP screenshots. Removed chips "Crisis Management" and "Fast Learner" (owner decision). Page 390px unchanged at 6,197px with the Dev tab open | Done except `og:image` and `og:url`, which need the production URL |

## Locked decisions (do not reopen without asking)

Layout and navigation
- Mobile bottom nav is a bar attached to the screen edge (not a floating pill). Labels: Home, Project, Work, Skills, Contact.
- Mobile first at 390px. Radius on mobile is at most about 1.5x the padding, so text never hugs the corner.
- Experience timeline: click only, no hover, same behavior on desktop and mobile. The whole card toggles. Single `open` state. Latest role open by default at all widths.
- Chips use grids (2 columns, equal width is fine) with shallow inset chips; trays are inset, sections raised.
- Swiper config is not to be touched (coverflow, no loop, no autoplay, no lightbox).

Look and feel
- Strict neumorphism, soft grey surface `#E7E7E7`, no pure black. Raised = clickable, inset = information.
- No borders, gradients or glass, except `UiverseButton`.
- `UiverseButton` keeps its ORIGINAL uiverse.io look (a deliberate "remote control" gimmick). Only layout props (mobileBlock, primary), focus-visible outline and `@media (hover: hover)` gating may differ.
- Display font only for the name and large numerals. Owner picked Unbounded 700 over Archivo.

Content in `src/data/portfolio.js` (owner-supplied facts only)
- Shift Manager: 3 bullets. Rotated as one of three shift managers; built the schedule for a team of 5; inventory control through festival peaks including a weekly Monday stock count to the gram; resolved wrong orders on the spot without stalling the line, trained staff, no complaint reports reached me.
- Versatile Haus: 2 bullets. Developed responsive templates; tested 20 templates in Chrome, Edge and Brave, mostly via DevTools, most defects were responsive-layout issues.
- IT Support: 2 bullets. 80+ machines, on-site installations.
- Removed: PHP/MySQL. "Cross-Browser QC" is now "Responsive Testing"; tag "Cross-browser testing" is now "Responsive testing". No "Four categories" claim.
- No personal photo in the hero.

## Next task: add `og:image` and `og:url` to `index.html` when the owner supplies the production URL

`public/og-image.jpg` (1200x630, name, role and headline only; salary, email and phone kept out on purpose) is ready. Both tags need absolute URLs.

Inspector findings checked in Phase 7, both false positives, so no layout change: `eyebrow` at 390 counts the last chip of one section as a label above the next section's heading; `covered-text` at 390 is "Atelier De Flora" passing under the fixed bottom nav while scrolling.
Lighthouse `label-content-name-mismatch` still appears on desktop for the header home link, with no score impact.
Mobile performance is held back mainly by render-blocking Google Fonts. Self-hosting them would add a step or dependency, so ask first.


Open from Phase 6:
- `aria-live` wraps both views. Announcements were not tested with a real screen reader. If they read badly, move `aria-live` to a short status message.
- The Build side has spare space at the bottom because the panel keeps the taller Test height (design.md section 8). The owner may want to review this at 390px.
- Owner facts kept out of the page copy: no test scripts and no Postman environments (full localhost URLs in each request). If asked in an interview, answer from these.

Open from Phase 5:
- Not tested on a real phone or in a browser without `animation-timeline` (Firefox). The extrude fallback code has never run.
- If frame rate drops on a mid-range phone: remove the touch scroll light first, then the hero parallax (design.md section 7).
- The scroll rail was rejected by the owner: it did not suit the page and competed with the click-to-open LED. Do not add it back.

Page heights after 7 (Dev tab open): 360px 6,342; 390px 6,197; 768px 7,537; 1440px 5,449.

Known from Phase 4: between 1024px and 1279px the QA tray stays at one column (5 rows), so the Dev tray has a little empty space at the bottom.

## Needs from owner

- Anything new that should become a claim on the page must come from the owner, never be invented.

## Working routine

1. `git checkout -b phase-<n>`; commit the previous work first.
2. Plan Mode for anything touching more than about 3 files.
3. Verify at 360, 390, 768, 1440; report page height at 390.
4. Commit, update this file, `/clear`, start the next task.
5. Waived inspector findings are listed in `CLAUDE.md`.
