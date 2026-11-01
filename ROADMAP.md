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
| 4 | Skills as unequal-size modules on desktop (Partial); Contact with one large email as the single focal point (Partial); inspect.mjs empty-screens must pass (Todo) | **Next** |
| 5 | Motion (4 scroll moments, reduced-motion) | Todo |
| 6 | Build/Test switch in the featured project | Blocked on owner content (see "Needs from owner") |
| 7 | Copy rewrite, inspector, Lighthouse, meta/OG | Todo |

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

## Next task: Phase 4 (Skills, Contact, empty-screens)

Audit of the code at `bd11a76`:

| Part | Status | Evidence |
|---|---|---|
| Skills as unequal-size modules on desktop | Partial | `Skills.jsx`: one full-width Dev panel, then three equal panels at `lg:grid-cols-3`. `design.md` section 4 allows at most two identical siblings in a row. At 768, the Soft panel sits alone beside an empty cell. |
| Contact with one large email as the single focal point | Partial | `Contact.jsx:20` has one email link and it is the largest text in its panel. It is not the largest text in the section: 44px against the 44px "Contact" heading at 1440, about 29px against 30px at 768, and about 22px against 30px at 390 (computed from the `clamp()` values in `Contact.jsx:20` and `SectionHeading.jsx:7`). |
| `inspect.mjs` `empty-screens` must pass | Todo | Latest run: `FAIL`, 3 of 6 screens at 1440 under 20% fill. Screens 3, 5 and 6 are 0.14, 0.16 and 0.13. The rule fails at two or more such screens (`inspect.mjs:224,236`), so at most one may remain. |

Two facts for this phase:
- Screen 3 is What I built and Tech stack in Featured Project, outside Skills and Contact. Screens 5 and 6 appear to be Skills and Contact, from the inspector's page screenshots. Getting both to 0.20 would pass while screen 3 stays low, but layout changes move the screen boundaries, and screen 4 is only at 0.21.
- The rule counts text, images and backgrounds that differ from the page background (`probe.mjs:539-548`). Panels in `--surface` count as empty even when they look solid, so raised depth alone will not raise the score.

Page heights after 3d (Dev tab open): 360px 5,975; 390px 5,760; 768px 7,297; 1440px 5,283.

## After that

5: Motion. Four scroll moments, clearly visible but limited. Respect `prefers-reduced-motion`. Consider installing the Emil Kowalski motion skill before this phase and run its animation review afterwards.

6: Build/Test switch in the featured project (design.md section 8). Needs the owner content below.

7: Interview-safe copy rewrite, run `inspect.mjs`, Lighthouse, meta tags and OG image. Optionally run Impeccable `critique` on a separate branch as a second opinion (report only, design.md wins). Open inspector FAILs that are not waived and predate 3d: `eyebrow` ("IT support" pill above "Technical skills"), `covered-text` (390).

## Needs from owner

- Phase 6 "Test" side: how Postman was used for API testing (collections, assertions, environments?) and the two bugs found, with screenshots.
- Anything new that should become a claim on the page must come from the owner, never be invented.

## Working routine

1. `git checkout -b phase-<n>`; commit the previous work first.
2. Plan Mode for anything touching more than about 3 files.
3. Verify at 360, 390, 768, 1440; report page height at 390.
4. Commit, update this file, `/clear`, start the next task.
5. Waived inspector findings are listed in `CLAUDE.md`.
