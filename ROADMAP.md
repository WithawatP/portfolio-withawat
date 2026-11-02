# ROADMAP

Read this at the start of every session. Update the Status table and "Next task" at the end of each phase.
Design rules: `design.md` (v3). Visual reference: `docs/mockup/hero-featured.html`.

## Why a redesign

The v2 site was tidy but read as cluttered and flat: every element sat in a raised or inset box, dozens of chips, no accent, and four small motion moments that nobody noticed. v3 keeps the content, data and logic, and replaces the visual layer: flat ground, a few neumorphic objects, one accent (`#651C32`), one peak (the hero contour).

Work on the `redesign-v2` branch. The v2 phases (1 to 7) are finished and live in git history; their content decisions below still hold.

## Status

| Phase | Scope | Status |
|---|---|---|
| R0 | Setup: branch `redesign-v2`; `design.md`, `docs/mockup/hero-featured.html`, `src/assets/contour-hero.svg` in repo; add v3 tokens and shadow utilities to `index.css`; load Michroma + Manrope; build the `Key` component (design.md 6.1) | Done |
| R1 | Hero (mobile first): nav row, status pill, contour band / right-side contour, name, role, claim, two keys | **Next** |
| R2 | Featured project: heading block on flat ground, device panel, Swiper inside the screen, Build/Test switch restyled (design.md 6.5), Build and Test content, tech line, icon keys | Todo |
| R3 | Experience: flat timeline, inset rail, accent LED on current role; keep accordion logic | Todo |
| R4 | Skills: plain-text groups, no chips; mobile group switch restyled | Todo |
| R5 | Contact, footer, bottom nav restyle | Todo |
| R6 | Motion: hero contour parallax, reduced-motion pass | Todo |
| R7 | Cleanup: remove `UiverseButton`, styled-components, chip components and unused `neu-*` utilities; inspector, Lighthouse, meta/OG | Todo |

## Next task: R1

Build the hero from design.md section 5 and the mockup, using `src/components/ui/Key.jsx`. Plan first if it touches more than about 3 files.

Carry over from R0:
- Delete `dev/key-test.html` and `dev/key-test.jsx` when R1 ends.
- Point `--font-display` at Michroma (`--font-michroma` holds it for now), then drop Unbounded from `index.html`.
- Move the page and `html` background from `surface` to `ground`, and update `theme-color`. Until then the scrollbar gutter shows `surface` beside a `ground` section.
- `faint` is still used as text in v2 sections; design.md allows it for decoration only. Fix each one as its section is restyled.

## Locked decisions (still valid from v2)

- Mobile bottom nav is a bar attached to the screen edge, labels Home, Project, Work, Skills, Contact. Scroll-spy with the navigation lock stays.
- Experience timeline: click only, the whole row toggles, single open, latest role open by default.
- Swiper config is not to be touched (coverflow, no loop, no autoplay, no lightbox).
- No personal photo.
- Content in `portfolio.js` (owner-supplied facts only): Shift Manager 3 bullets, Versatile Haus 2 bullets, IT Support 2 bullets; no PHP/MySQL; "Responsive Testing" naming.
- Test side content: manual API testing in Postman, one collection with Auth and Products folders (14 requests); bug 1 userId in the URL exposed other users' data, fixed by reading it from the JWT; bug 2 token expired after 15 minutes and broke plain fetch calls, fixed with an axios refresh-token interceptor.

## New decisions (v3)

- Ground `#DADADA`, accent `#651C32` in four places only.
- Michroma for the name and large numerals; Manrope for everything else.
- Buttons are the uiverse "witty-wolverine-69" key style (javierBarroso, MIT) adapted to the ground colour; the old UiverseButton look is retired.
- No chips anywhere; tech and skills are " · " separated text.
- Hero contour artwork is final; do not redraw it.

## Needs from owner

- One line each for "Admin dashboard" and "Customer-facing UI" (what you built).
- Who found and who fixed each of the two bugs (group project).
- Screenshots for the gallery if they change; bug screenshots if any.

## Working routine

1. Commit first, then work on `redesign-v2`.
2. Plan Mode for anything touching more than about 3 files.
3. Verify at 360, 390, 768, 1024, 1440; report page height at 390; answer design.md section 11.
4. Commit, update this file, `/clear`, next phase.
