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
| R1 | Hero (mobile first): nav row, status pill, contour band / right-side contour, name, role, claim, two keys | Done |
| R2 | Featured project: heading block on flat ground, device panel, Swiper inside the screen, Build/Test switch restyled (design.md 6.5), Build and Test content, tech line, icon keys | Done |
| R3 | Experience: flat timeline, inset rail, accent LED on current role; keep accordion logic | Done |
| R4 | Skills: knob switch and one sunken tray, from `docs/mockup/skills-desktop.html` and `skills-mobile.html` | Done |
| R5 | Contact, footer, bottom nav restyle | **Next** |
| R6 | Motion: hero contour parallax, reduced-motion pass | Todo |
| R7 | Cleanup: remove `UiverseButton`, styled-components, chip components and unused `neu-*` utilities; inspector, Lighthouse, meta/OG | Todo |

## Next task: R5

Restyle Contact, the footer and the bottom nav from design.md sections 5 and 8. Plan first if it touches more than about 3 files.

Carry over:
- `Pill` has no users since R3 and `SkillChip` has none since R4; remove them in R7.
- Inspector `small-text` is now a FAIL at every width because of the 11px and 12px labels in R4, which design.md section 4 allows. It is not waived; the owner decides.
- Inspector `still-page` is a WARN, as it was before R3; the LED pings keep it there. Recheck after R5, when the last extrude goes, and after R6.
- Inspector `covered-text` on "Work experience" at 768 is the bottom nav passing over the heading while it enters the screen. It was already there before R3. Review it in R5 with the bottom nav.
- `faint` is still used as text in v2 sections; design.md allows it for decoration only. Fix each one as its section is restyled.
- v2 sections and `BottomNav` still use `surface` on the new `ground` page until their phases.
- `scroll-padding-top` still allows for the old sticky header at 640px and up. At 1440 the Featured heading lands 96px below the top, which reads fine, so it stayed. Review it when the remaining sections are restyled.

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
- Expected salary is not shown on the page; `profile.salary` stays in `portfolio.js`.
- Hero role line is "Junior Software Developer · QA Tester" (`profile.heroRole`); `profile.roles` is unchanged.
- Hero bio and core stack are no longer shown; the data stays in `portfolio.js`.
- Name clamp maximum is 64px, not 66px, so the name stays inside the 540px column and clear of the contour box up to 1920px (design.md section 5 allows shrinking it).
- The page scrollbar is hidden on every page; scrolling still works.
- Hero keys use 14px side padding below 900px, not 26px, so "Download CV" stays on one line in the 2-column grid.
- Featured project shows the short copy the owner approved: `buildRows`, `techLine`, `testing.requestCaption`, `testing.bugs[].tag` and `.short`. The Admin and Customer-facing lines are condensed from `contributions`. `type`, `contributions`, `stack`, `method`, `folders`, `cause`, `requestLabel` and `bugsTitle` are no longer shown; the data stays in `portfolio.js`.
- The summary comes from `portfolio.js` ("A full-stack storefront..."), not the mockup's wording.
- Gallery captions and "Screens captured from the deployed demo." are removed; alt text stays.
- The gallery screen is `aspect-ratio: 16 / 10` instead of a fixed height, and slides are 88% wide at every width (design.md 6.4). Swiper props are unchanged.
- Gallery dots are driven by `onSlideChange` state, so the Pagination module is not added.
- Build and Test swap instantly: design.md section 7 lists no fade for them.
- `--color-switch-off` (`#555555`) is a token for the unselected switch label that design.md 6.5 specifies.
- Inspector findings `eyebrow`, `micro-label` and `body-size` are waived in design.md section 11: they come from type that section 4 sets deliberately.
- The timeline's accent LED follows the open row and has the same `animate-ping` as the status pill; if every row is closed, no LED is lit. The switch LEDs stay still. The status pill LED is the size and `animate-ping` from before R1 (`a8d4edb`), inside the v3 pill, with both the dot and the ring in `--color-led` (`#22C55E`) by the owner's decision. These two pings are the only looping animations. The owner asked for all of this, so design.md sections 2, 3, 6.2, 7 and 8 were changed to match. The custom blink is gone.
- Experience at >= 900px is two columns: heading left (not sticky), timeline right.
- The timeline is now truly single open, with state in `Experience.jsx`; v2 let several rows open. An open row can be closed, so no row may be open.
- When a row opens and the open row above collapses, the clicked row slides up with the collapse unless it would pass the top of the screen. Then the upper panel closes at once and the page scrolls in one step before paint, so the row stays still (`toggleKeepingRowOnScreen` in `TimelineItem.jsx`). Do not scroll on every frame of the collapse: that made the row shake on phones. Do not pin the row on every click: that made the rows creep down and off the screen when two rows were opened in turn.
- Row details open with a 0.3s height change and no fade.
- Experience tags are a " · " text line; the intro and "2019 – 2026" keep their wording and stay in `Experience.jsx`.
- The rail uses the existing `sh-well`; no new groove token was needed.
- Skills follows the approved mockups and design.md section 8. Its wrapper stays 1144px wide at most, so its left edge lines up with Experience; the mockup was drawn at 1240px, so the tray is 864px wide at 1440, not 960px.
- From 900 to 1279px the Skills tray reflows instead of adding a breakpoint, and the switch stretches to match it; its options grow past 56px there. The tray height changes between groups in this range.
- Skills lists use columns sized to their content, not equal thirds, or "Responsive Web Layouts" would wrap.
- The owner approved the labels "Frameworks" and "Tools & Data" in `portfolio.js`, to match the mockup and fit the 150px label column.
- The mockup's `#5A5A5A` (labels) and `#4A4A4A` (icons) have no token; they use `label` and `ink-2`.
- Every knob switch has LEDs, the Skills switch included, so they all look the same (the owner's decision; design.md section 3 changed to match). The switch stays a `tablist` on Skills.

## Needs from owner

- Who found and who fixed each of the two bugs (group project).
- Screenshots for the gallery if they change; bug screenshots if any.

## Working routine

1. Commit first, then work on `redesign-v2`.
2. Plan Mode for anything touching more than about 3 files.
3. Verify at 360, 390, 768, 1024, 1440; report page height at 390; answer design.md section 11.
4. Commit, update this file, `/clear`, next phase.
