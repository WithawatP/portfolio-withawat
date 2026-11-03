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
| R5 | Contact, footer, floating bottom nav, sticky desktop nav, end band | Done |
| R6 | Motion: three peaks (hero parallax, device panel entrance, Experience pin + footer waves), Lenis, nav landing points, counting numerals, reduced-motion pass | Done |
| R7 | Cleanup: remove `UiverseButton`, styled-components, chip components and unused `neu-*` utilities; inspector, Lighthouse, meta/OG | **Next** |

## Next task: R7

Cleanup from the Status table. Plan first if it touches more than about 3 files.

Carry over:
- These have no users; remove them in R7: `Pill`, `SkillChip`, `SectionCard`, `SectionHeading`, `InsetPanel`, `QuickContactRow`, `UiverseButton`, `src/lib/styles.js` and the `.extrude` CSS.
- Remove the `?parallax-debug` mode (`ContourHero.jsx` and its CSS in `index.css`) and its line in design.md section 7.
- The contour mockups no longer match the site's end band: `contact-desktop.html` and `contact-mobile.html` still show it 420px tall and on phones. The v3 decisions below and design.md win.
- The iPhone stall when tapping the nav quickly did not come back in R6 testing (owner, real iPhone). If it does, profile it with Safari Web Inspector.
- Inspector after R6: the six FAILs are the same as before R6 (`off-centre` @1440 is new in R6 and comes from the hero contour layers reaching the right edge, which design.md section 5 asks for; overflow is 0). New WARN `long-pin` @1440 is the pinned Experience, which opens a new role at each step. `still-page` is gone.
- Inspector `covered-text` on "Work experience" at 768 and 360 is the bottom nav passing over the heading while it scrolls. A floating nav always does this, so it is not a blocker; it is not in the design.md waiver list yet.
- Inspector `reduced-hidden` at 1440 is the desktop nav capsule, deliberately hidden while the Hero shows. The same four links are visible in the Hero's top row.

## Locked decisions (still valid from v2)

- Mobile bottom nav link names are Home, Project, Work, Skills, Contact (as `aria-label`s since the nav became icon-only in R5). Scroll-spy with the navigation lock stays. (Its shape changed in R5: see the v3 decisions.)
- Experience timeline: the whole row toggles, latest role open by default. Since R6: single open on phones and as the fallback accordion; pinned and click-to-manual on desktops (see the R6 decisions).
- Swiper config is not to be touched (coverflow, no loop, no autoplay, no lightbox).
- No personal photo.
- Content in `portfolio.js` (owner-supplied facts only): Shift Manager 3 bullets, Versatile Haus 2 bullets, IT Support 2 bullets; no PHP/MySQL; "Responsive Testing" naming.
- Test side content: manual API testing in Postman, one collection with Auth and Products folders (14 requests); bug 1 userId in the URL exposed other users' data, fixed by reading it from the JWT; bug 2 token expired after 15 minutes and broke plain fetch calls, fixed with an axios refresh-token interceptor.

## New decisions (v3)

- Ground `#DADADA`, accent `#651C32` in five places only (the nav ball was added in R5).
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
- Inspector findings `eyebrow`, `micro-label`, `body-size` and `small-text` are waived in design.md section 11: they come from type that section 4 sets deliberately. The only text under 12px is uppercase 11px eyebrow labels; all other text must be 12px or larger.
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
- The mobile nav is a floating capsule with a wine ball (design.md section 5), not a bar on the screen edge.
- After testing on a real iPhone, the ball's easing changed from the mockup's `cubic-bezier(1, -0.4, 0, 1.4)`, which looked like a jump on long moves, to the design.md section 7 timing. The ball moves by `transform`, not the mockup's `left`, so it runs on the compositor. Gallery images load eagerly, so they are already downloaded when the page first reaches Project; they still decode on arrival (about 6ms each in throttled Chrome). Home in the bottom nav scrolls to `scrollY` 0 and clears the hash, because the `#home` anchor stopped with the WP row under the status bar.
- Contact follows the approved mockups, with these differences the owner approved: the status pill keeps its 10px pinging LED (section 6.2); the email is `clamp(40px, 4.45vw, 64px)` at >= 900px because the mockup only shows 1440; icon keys stay 52px and the Send email key keeps radius 10px (section 6.1); icons come from `Icon.jsx`; section spacing stays 96/160px and the wrapper lines up with Skills; "Copied!" / "Copy failed" shows under the copy key for 2 seconds.
- The email is plain text, as in the mockup; Send email is the mailto link. The phone is plain text too, and the Call key is the tel link on mobile.
- The end band differs from the mockups by the owner's decision after seeing it: >= 900px only, 340px tall, directly under the keys, the SVG filling the band. Below 900px it is not rendered, and the footer sits under Contact on the ground.
- `scrollend` no longer releases the navigation lock at once. A scroll cut short by a new tap fires it too, which released the new lock and sent the ball through every section on the way. It now releases after 150ms with no movement.
- The hero contour wrapper has its own layer (`contain: paint`, `translateZ(0)`), added for the stalls seen when tapping the nav quickly on a real iPhone.
- `App.jsx` renders either `DesktopNav` or `BottomNav`, so only one scroll-spy runs.
- The WP mark goes to `scrollY` 0 with `scrollToTop`, like Home in the bottom nav.
- Links in the Hero's top row do not use the navigation lock. After clicking one, the capsule appears on the way and its LED follows the sections it passes.
- `--ink` at 40% on the inactive nav icons is about 2.2:1, under the 3:1 WCAG asks of icons. It is the owner's choice from the mockup.
- `profile.contactLine` holds the sentence that used to be hard-coded in `Contact.jsx`, word for word.

## R6 decisions (motion)

Five test rounds with the owner on a desktop and a real iPhone. design.md sections 1, 5, 6 and 7 hold the final rules; the points below are the decisions and the reasons behind them.
- **Three peaks, the hero the main one** (design.md 1 and 7), replacing "one peak".
- **Hero parallax:** CSS `scroll(root)` from the first pixel, one `<svg>` per level so moving a level never re-filters it. Level distances are in the artwork's units (40 / 72 / 136) because the 60/100/180px of round 2 made the levels touch at the end of the range (measured gaps 34 and 70 units). The levels' range ends at 400px on desktops with an ease-out; the whole contour still crawls over the full Hero. Mouse follow is ±8/20/36px and fades out as the levels rise, so the two never close a gap.
- **Device panel entrance** (peak 2) replaced the scroll-linked shadow and gallery drift of round 3: an IntersectionObserver at about 25% plays rise (0.65s, knob easing), screen light-up (0.6s), switch LED (0.3s). It replays only after the panel has left through the bottom of the screen. It is the one exception to the no-entrance-animation rule.
- **Experience on desktops:** pinned, centred under the capsule (never above 124px), 40svh per role, and the list keeps its longest height. A click always wins: it unpins in the same frame, removes the pin space and scrolls so the clicked title stays put (manual mode, several rows open). The pin returns once the section has left the screen, compensating the scroll if the reader is below it. The pin space is a real box after the sticky block, not padding: a sticky element only travels inside its parent's content box.
- **Experience on phones:** the click accordion (an auto-open-on-scroll mode was tried in round 3 and dropped). Closed rows show only the title, 16px apart; the company line sits in the details panel so a row animates one height, and the open panel moves up into the empty part of the 44px title button. The 0.3s height animation stays (owner, round 5).
- **Rail LED:** one moving LED on the role opened (desktop manual: clicked) last; it never goes out.
- **Phone tap jank (round 5):** two ResizeObservers on the timeline ran on every frame of the height animation (50 callbacks per tap, half the script time) and up to four heights animated at once. Now one observer reacts to width changes only, and one height animates per row.
- **Footer waves** slide left 0 / 40 / 80 / 120 viewBox units as the end band comes in (desktop only); a common drift was tried and brought the converging right ends into view.
- **Lenis** on desktop mice only (`lenis` dependency). It refreshes its size before instant scrolls, or a page that just grew (the pin space) would cut them short. Native smooth scrolling is off while it runs.
- **Nav landing points** (design.md 5): centred in the free area, or the top 48px under the capsule; desktop routes jump over the Experience pin space and never change the open role on the way. While a nav scroll travels, nothing else scrolls the page by script.
- **Counting numerals:** the Test "14" and the Skills count count up over 0.8s; the Skills count comes from the items each group shows (13, 5, 3, 3).
- **`scroll-padding-top`:** 124px on desktops, 0 on phones (plus the safe area).
- **Experience waves (after R6, approved):** `contour-experience.svg` behind the pinned Experience at >= 900px, one layer per band moved by `transform` with the pin's progress (design.md 6.7 and 7). The file's filter read twice as heavy as the footer waves, so the component uses offset 6 / blur 5 / shadow 0.4 / light 0.65, matched on screenshots at 1440 and 1920; the asset itself is untouched. Still fades at the top and bottom instead of a mask; full screen width, clipped on its own box only. Frozen in manual mode, static with reduced motion, not on phones. No paints on the band layers while scrolling through the pin.

## Needs from owner

- Who found and who fixed each of the two bugs (group project).
- Screenshots for the gallery if they change; bug screenshots if any.

## Working routine

1. Commit first, then work on `redesign-v2`.
2. Plan Mode for anything touching more than about 3 files.
3. Verify at 360, 390, 768, 1024, 1440; report page height at 390; answer design.md section 11.
4. Commit, update this file, `/clear`, next phase.
