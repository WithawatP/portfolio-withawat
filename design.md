# design.md (v3, redesign)

The source of truth for how the portfolio looks and moves. It replaces design.md v2 completely.
It overrides every installed skill (design-taste-frontend or any other) wherever they disagree.
Content and copy still come from `src/data/portfolio.js`.

Visual reference: the approved mockup of Hero + Featured project, saved in the repo as
`docs/mockup/hero-featured.html` (plain static HTML; open it in a browser). Match it. Where this file and the mockup differ, this file wins.
The mockup shows the Build side selected; the Test side is the hidden `[data-side="test"]` block.

---

## 1. Concept: a quiet page with a few objects

Neumorphism works as an accent, not as the whole page. So:

- **Flat ground by default.** Headings, paragraphs, lists and labels sit directly on the page ground. No cards around text. The Skills tray (section 8) is the one exception.
- **Depth only for objects.** Raised means "you can press it" (keys, the switch knob, the nav capsules) or "this is the one device" (the Featured project panel); the small icon circle in the Skills tray is raised too. Inset means "a well or a screen" (icon wells, the gallery screen, the switch track, the status pill, the Skills tray, the nav sockets).
- **One container level inside a section, at most.** The device panel may hold a screen. The Skills tray may hold its icon circle. Nothing else nests.
- **Three peaks, one main.** The hero contour is the main visual moment of the page. Two smaller peaks answer it further down (section 7): the device panel's entrance in Featured project, and at the end of the page the Experience timeline opening role by role with the footer waves sliding. They stay smaller than the hero: no new colours, no new objects, motion only.
- **One accent colour,** used in five places only (section 3).

## 2. Tokens

```css
:root {
  --ground: #DADADA;        /* page and every raised object */
  --screen: #E9E9E9;        /* inside the gallery screen only */
  --ink: #2A2A2A;           /* headings, name, key labels (never pure black) */
  --ink-2: #3E3E3E;         /* role line, nav, small labels on keys */
  --body: #4F4A4C;          /* paragraphs (slightly warm, not flat grey) */
  --muted: #555055;         /* secondary lines, tech line, subtitles */
  --label: #4E4E4E;         /* uppercase eyebrow labels */
  --faint: #A3A3A3;         /* decoration only: inactive dots, off LED. Never text. */
  --accent: #651C32;
  --on-accent: #FFFFFF;

  --sh-key: 6px 6px 12px #B6B6B6, -6px -6px 12px #FBFBFB;
  --sh-key-pressed: 0 0 0 #B6B6B6, 0 0 0 #FBFBFB, inset 4px 4px 12px #B6B6B6, inset -4px -4px 12px #FBFBFB;
  --sh-primary: 6px 6px 12px #B2B2B2, -6px -6px 12px #FBFBFB;
  --sh-primary-pressed: 0 0 0 #B2B2B2, 0 0 0 #FBFBFB, inset 4px 4px 12px rgba(0,0,0,.35), inset -4px -4px 12px rgba(255,255,255,.18);
  --sh-device: 14px 14px 32px #B0B0B0, -12px -12px 28px #FBFBFB;            /* mobile */
  --sh-device-lg: 20px 20px 48px #B0B0B0, -18px -18px 44px #FBFBFB;         /* >= 900px */
  --sh-well: inset 4px 4px 9px #B6B6B6, inset -4px -4px 9px #F7F7F7;        /* icon wells, status pill */
  --sh-screen: inset 7px 7px 15px #B3B3B3, inset -7px -7px 15px #F8F8F8;
  --sh-track: inset 7px 7px 14px #A6A6A6, inset -7px -7px 14px #F6F6F6;
  --sh-knob: 5px 5px 12px #9C9C9C, -4px -4px 10px #EFEFEF, inset 2px 2px 3px rgba(255,255,255,.5);
  --knob: #C9C9C9;
  --led-glow: 0 0 7px 2px rgba(101,28,50,.6);
  --led: #22C55E;           /* status pill LED only */
  --sh-tray: inset 6px 6px 13px #B3B3B3, inset -6px -6px 13px #F8F8F8;      /* Skills tray, mobile; --sh-screen at >= 900px */
  --sh-icon: 4px 4px 9px #B6B6B6, -4px -4px 9px #FBFBFB;                    /* Skills icon circle, mobile */
  --sh-icon-lg: 5px 5px 10px #B6B6B6, -5px -5px 10px #FBFBFB;               /* Skills icon circle, >= 900px */
  --sh-capsule: 10px 10px 24px #B0B0B0, -8px -8px 20px #FBFBFB;             /* both nav capsules */
  --sh-socket: 0 0 20px -12px #6E6E6E, inset 0 0 20px -13px #6E6E6E, inset 3px 3px 6px #BDBDBD;  /* nav socket */
  --sh-ball: inset 0 -9px 10px 0 rgba(0,0,0,.28), inset 0 6px 8px 0 rgba(255,255,255,.22), 0 2px 1px rgba(0,0,0,.08), 0 4px 3px rgba(0,0,0,.1), 0 8px 6px rgba(0,0,0,.1), 0 14px 10px rgba(0,0,0,.08);  /* nav ball */
  --socket-ring: rgba(245,245,245,.6);                                      /* nav socket ring */
}
```

Contrast on `--ground`: ink about 11:1, body and muted above 5:1, white on accent about 12:1. Keep it that way: no lighter text greys.

Put these in `src/index.css` (Tailwind v4 `@theme` for colours, `@utility` for the shadows). Components use tokens only, never raw hex.

## 3. Accent rules

`#651C32` appears only on:
1. the primary key (Download CV, Send email),
2. LEDs (the selected side of every knob switch, the open row on the timeline, the active link of the desktop nav),
3. one large numeral per section (for example "14" on the Test side),
4. the active gallery dot,
5. the ball of the mobile nav.

Plus the keyboard focus ring (section 6.1), which is an accessibility signal, not decoration.
The status pill LED is green by the owner's decision. It is the one exception to the single-accent rule. Green appears nowhere else.
Nowhere else: not on links, headings, borders, icons or hover states.

## 4. Typography

- **Michroma** (display): the name and large numerals only. Never headings, never body.
- **Manrope** 400 / 500 / 600 / 700: everything else.
- Load both from Google Fonts in `index.html` (no new npm dependency).

| Role | Size | Weight / style |
|---|---|---|
| Name (2 lines, uppercase) | `clamp(34px, 4.6vw, 66px)`, line-height 1.06 | Michroma |
| Section title (h2) | `clamp(32px, 3.4vw, 48px)`, tracking -0.02em | 600 |
| Role line | `clamp(16px, 1.4vw, 19px)` | 600, `--ink-2` |
| Body | `clamp(15px, 1.2vw, 17px)`, line-height 1.65, max 440–620px wide | 400, `--body` |
| Item title | 15–16px | 600 |
| Secondary line | 13–14px | 400, `--muted` |
| Eyebrow label | 11–12px, uppercase, tracking 0.2–0.22em | 600, `--label` |
| Large numeral | `clamp(42px, 4vw, 56px)`; 72px in the Skills tray | Michroma, `--accent` |
| Contact email | `clamp(19px, 5.9vw, 24px)` on one line below 900px; `clamp(40px, 4.45vw, 64px)` at >= 900px | 600, tracking -0.02em / -0.03em |

Text is never smaller than 12px, except uppercase eyebrow labels at 11px.

## 5. Layout (mobile first)

- Design at **390px** first. One breakpoint: **900px**.
- Side gutter 16px, 48px at >= 900px. Content max width 1240px.
- Section spacing: 96px between sections on mobile, 160px at >= 900px. More space above a heading than below it.
- No horizontal overflow at 360, 390, 768, 1024, 1440.

### Hero
- **Mobile:** nav row (WP mark left, "Open to work" pill right), then the contour band (full bleed, 230px tall), then name, role, one-line claim, then two keys side by side (2-column grid). The text block starts directly below the band, with no margin and no overlap.
- **>= 900px:** min-height 760px. The contour sits absolutely on the right 52% of the hero, full hero height, touching the right edge of the screen. Text column on the left, max 540px, above the contour (z-index). The status pill moves into the text column; the nav shows spaced uppercase links.
- The name must never overlap the contour. If it would, shrink the name with the clamp; never move the contour over it. One exception, by the owner's decision: below 900px, while the page scrolls, the text moving up (section 7) may pass over the faded lower part of the contour band.

### Navigation
- Desktop, in the Hero: spaced uppercase links (Project, Experience, Skills, Contact), 12px, 600, tracking 0.22em.
- Desktop, past the Hero: a sticky raised capsule, approved in `docs/mockup/contact-desktop.html`.
  - **Capsule:** `--ground`, `--sh-capsule`, radius 999px, 56px tall, centred, 20px from the top of the screen. WP (Michroma 12px), then Project, Experience, Skills, Contact (12px, 600, uppercase, tracking 0.2em).
  - **Active link:** a 7px LED in `--accent` with `--led-glow` and `--ink` text. The others have a 7px `--faint` dot and `--switch-off` text. The active link has `aria-current`.
  - **Appearing:** once the Hero has left the screen, it fades in and moves down 8px over 0.3s. While hidden it cannot be reached with Tab. With reduced motion it appears at once.
  - **Logic:** the same scroll-spy and navigation lock as the mobile nav. `scroll-padding-top` is 124px at >= 900px, 48px below the capsule, which ends 76px down.
- Mobile: a floating raised capsule with icons only, approved in `docs/mockup/contact-mobile.html`. Ball and socket style adapted from "splendid-mole-76" by the404_1512 on uiverse.io (MIT); put a credit comment in the component.
  - **Capsule:** `--ground`, `--sh-capsule`, radius 999px, 12px from the left and right of the screen, 16px plus `safe-area-inset-bottom` from the bottom.
  - **Sockets:** five in a row, 40px, `--sh-socket`, each with a 15px icon from `Icon.jsx` in the centre (home, folder, briefcase, code, mail). No visible text; each link has an `aria-label` (Home, Project, Work, Skills, Contact) and is at least 44px tall and wide. The active icon sits above the ball and is `--on-accent`; the others are `--ink` at 40%. The timing is in section 7.
  - **Ball:** 40px, `--accent`, `--sh-ball`. It rolls to the socket of the active section with `transform: translateX()`, never `left`, so page work cannot stall it, and the timing in section 7. With reduced motion it moves at once.
  - **Logic:** the existing scroll-spy and its navigation lock stay. The active link has `aria-current`. Home scrolls to `scrollY` 0, not to the Hero element, which starts below the WP row. Sections have a `scroll-margin-top` of `env(safe-area-inset-top)`, so they never land under the status bar.
  - The page leaves room under the footer, so the capsule never covers the last key or the footer at the end of the scroll.
- **Where a tap lands (both navs).** The free area is the part of the screen the capsule leaves: from 76px down to the bottom at >= 900px, and from the status bar (`safe-area-inset-top`) to the top of the bottom capsule below 900px. A section no taller than the free area lands centred in it. A taller one lands with its top 48px under the desktop capsule (124px), or right under the status bar on a phone. The page never scrolls past its ends, so the last section may sit higher. At >= 900px, while Experience is pinned, Experience lands where it starts to stick (its first role), and a route that crosses its pin space jumps over that space at once, to the edge nearest the destination, then scrolls smoothly the rest of the way: the open role never changes on the way, and neither nav lights Work or Experience in passing. `sectionScroll.js` works this out.
- **Scroll-spy:** the active section is the one covering a thin band (5% of the screen) in the middle of the free area, so a section a tap has just landed always shows as active.

## 6. Components

### 6.1 Key (all buttons and icon links)
Based on "witty-wolverine-69" by javierBarroso on uiverse.io (MIT). Put a credit comment in the component.

- Radius 10px, padding 14px 26px, 1px border in the same colour as the background, `--sh-key`, `transition: all .3s`.
- `:active`: `--sh-key-pressed`, text `#5E5E5E`.
- Primary: background and border `--accent`, text white, `--sh-primary`; `:active` uses `--sh-primary-pressed` and text `#E6D3D9`.
- Icon key: 52x52, radius 14px, icon 18px, label (12px, 600) underneath, outside the key.
- Pad key (Contact at >= 900px): 100px tall, radius 18px, padding 16px 18px, icon 19px top left, label bottom left (15px on the primary, 14px on the others).
- Focus: `outline: 2px solid var(--accent); outline-offset: 4px` on `:focus-visible`.
- Hover effects only inside `@media (hover: hover)`.
- The old `UiverseButton` (styled-components) is retired once every button uses the Key.

### 6.2 Status pill
Inset (`--sh-well`), radius 999px, text 12–13px 600 `--ink-2`.
The LED is the green light from before R1: a 10px dot in `--led` over a 10px `animate-ping` ring in `--led` at `opacity-75`, with no glow. It is used in the Hero, the mobile nav row and Contact. With reduced motion on, the ping stops and the dot stays still.

### 6.3 Device panel (Featured project only)
- Radius 32px and padding 16px on mobile; radius 48px and padding 32px at >= 900px. `--sh-device` / `--sh-device-lg`. Its entrance is in section 7.
- Mobile: stacked (screen, switch, content, tech line, icon keys). Desktop: two columns, screen 55% left, side 45% right.

### 6.4 Screen (gallery)
- Inset frame: radius 24px, padding 10px, `--sh-screen`. Inner area radius 16px, `--screen`, `aspect-ratio: 16 / 10` to match the screenshots, vertically centred in its column.
- The existing Swiper lives inside the screen. Keep its configuration (no loop, no autoplay, no lightbox).
- Slides are about 88% of the screen width: the main image is never cropped and the neighbouring images still show at the edges.
- Pagination under the screen: inactive dots 6px `--faint`, active dot an 18x6px pill in `--accent`.

### 6.5 Build / Test switch
- `role="radiogroup"`, two buttons with `role="radio"` and `aria-checked`. Arrow keys move between them.
- Track: 60px tall, full width up to 320px, **centred in its column** (`align-self: center`), radius 999px, `--sh-track`, padding 6px.
- Knob: `--knob` with `--sh-knob`, half the track width, slides between `left: 6px` and `left: 50%` with `transition: left .45s cubic-bezier(.34, 1.4, .64, 1)`.
- Each label has an 8px LED: selected = `--accent` + `--led-glow`, text `--ink`; unselected = `--faint`, no glow, text `#555555`. On the Featured switch the selected LED lights as the last step of the panel's entrance (section 7) and is off before it; with reduced motion it is always lit.
- Both content sides sit in the same grid cell so the panel height does not jump; the hidden side gets `inert`.
- Build side: "WHAT I BUILT" label, then rows of icon well (46px, `--sh-well`) + title + one secondary line.
- Test side: "HOW I TESTED" label, the large numeral with its caption, then one block per bug (eyebrow label + one sentence: symptom and fix).

### 6.6 Lists instead of chips
There are no chips anywhere. Tech stacks and skills are plain text, items separated by " · ", in `--muted` 13–14px, grouped under eyebrow labels.

### 6.7 Hero contour
- File: `src/assets/contour-hero.svg` (provided). `ContourHero` splits it at run time into one inline `<svg>` per level, each in its own wrapper, so each level is its own layer and moving it does not repaint the filter (section 7). The file itself stays as it is. `aria-hidden`, no pointer events.
- Three families of debossed (sinking) contour lines; each family's outer edge follows its neighbours with an even channel between them. Do not redraw or "improve" the paths.
- The `<g>` groups are levels: the first is the outer level of every family, the last group with paths is the innermost.
- Fill stays exactly `--ground`. No accent dot.
- The SVG uses `preserveAspectRatio="xMinYMid slice"`, so the artwork is anchored to its left edge.
- Lines fade out instead of being cut. The wrapper has a CSS `mask-image` that fades to transparent over about the top 10% at every width, over about the bottom 30% below 900px and the bottom 18% at >= 900px, and over about the left 10% at >= 900px. This is a mask, not a decorative gradient, so the gradient ban in section 10 does not apply to it.

- The wrapper has `contain: paint` and `transform: translateZ(0)`: its own layer, so scrolling does not repaint the filter on every frame. The art moves inside this clip, so its opaque fill never covers the section below. Each `<svg>` has `overflow: visible`, so art outside the viewBox can move into view.

**Footer contour.** File: `src/assets/contour-footer.svg`. Inlined as a React component, `aria-hidden`, no pointer events. Do not redraw the paths. Like the hero, `ContourFooter` splits it into one `<svg>` per wave level (filter in the first, `overflow: visible`), so its levels can slide (section 7). It exists at >= 900px only. Below 900px it is not rendered at all, not hidden with CSS. It fills the band with the file's own viewBox and shadows, and a mask goes from transparent at 0% to opaque at 35%. The paths run to x=1900 while the band shows up to 1600, so a level can slide 300 units left before its end shows.

## 7. Motion

The page has three peaks. The hero is the main one; the other two are smaller and use motion only. Every scroll-driven animation is CSS (`animation-timeline`, written in longhand, `transform` or `opacity` only); browsers without support and reduced motion show the resting state.

- **Peak 1 (main): hero contour parallax.** It starts at the first scrolled pixel, on `animation-timeline: scroll(root)`.
  - **The whole contour** moves down, so it crawls on screen: 70% of the page's scroll at >= 900px, 42% below, from `scrollY` 0 until the contour leaves the top of the screen (the bottom of the Hero at >= 900px, the bottom of the band below 900px).
  - **Each level** moves up on top of that, in the artwork's own units (one viewBox unit = the larger of the box's width and height / 800), so the distances fit the art at every width: outer 40, middle 72, inner 136, and the inner level scales from 1 to 1.04 (1.024 below 900px). The differences, 32 and 64, stay under the narrowest gaps between the levels (about 34 and 70), so a level never touches the one around it. About 38 / 68 / 129px at 1440, 20 / 35 / 66px at 390.
  - **The levels' range** ends at 400px of scroll at >= 900px and when the band leaves the screen below 900px. They ease out (`1 - (1 - p)²`, as `linear()` samples): fastest at the first pixel, settling by the end. `useHeroMotion` measures every range.
- **Hero text:** the text column moves up 60px and fades to 0.4 from `scrollY` 0 until the Hero leaves the top of the screen. Its keys stay clickable.
- **Mouse on the contour:** at >= 900px with `hover: hover` and `pointer: fine`, each level follows the pointer: outer up to 8px, middle 20px, inner 36px either way. The follow fades out with the same curve as the levels rise, so at the end of their range it is gone: mouse and scroll together never close a gap. It uses `requestAnimationFrame` and a smoothed follow, and runs only while the Hero is on screen.
- `?parallax-debug` in the URL draws a box around each hero level.
- **Peak 2: the device panel's entrance.** The one exception to the ban on entrance animation (section 10). When about a quarter of the panel is on screen (an IntersectionObserver on a wrapper that never moves), three steps play in a row: (1) the panel rises from `translateY(160px)` at >= 900px or `90px` below, and `scale(0.94)`, to its place in 0.65s with the switch knob's easing `cubic-bezier(0.34, 1.4, 0.64, 1)`, so it overshoots a few px and settles; (2) the slides in its screen go from opacity 0.15 to 1 in 0.6s, as if the screen had just been switched on; (3) the switch's selected LED lights over 0.3s. Transform and opacity only: nothing in the layout moves, and the text is in the DOM and readable all along. It plays again only after the panel has gone off the bottom of the screen (the reader scrolled back above it) and comes back in; returning to it from below shows it finished. With reduced motion it is finished from the start.
- **Peak 3: the end of the page.**
  - **Experience opens role by role (section 8).** At >= 900px the section pins, centred in the space under the desktop capsule (from its measured height, never higher than 124px), and each role gets 40svh of scroll; the role whose step is reached opens and the one before closes. The list keeps the height of its longest role, so nothing below it moves. While a nav tap carries the page, the open role stays as it is and catches up on landing. A click always wins over the pin: clicking any row while pinned switches to manual at once. In the same frame the pin lets go, its scroll space goes, the clicked row opens or closes, and the page scrolls so the clicked title stays where it was on screen (within 1px). In manual, rows open and close instantly on click, several at a time, with no scrolling. The pin comes back only after the section has left the screen completely: the open role is then the one that matches the scroll position, and if the reader is below the section the page scrolls by what the section grew, so nothing on screen moves. Below 900px nothing pins and nothing opens by itself: it is the click accordion of section 8.
  - **Rail LED:** one accent LED with `animate-ping` sits on the node of the role opened last (on a desktop in manual, clicked last) and moves there with `transform` (0.4s, ease-out, no overshoot). It never goes out while the rail is on screen.
  - **Footer waves (>= 900px):** as the end band comes into view, its wave levels slide left at different speeds, reaching the end at the end of the scroll: outer 0, then 40, 80 and 120 viewBox units. Levels never come closer than they are at rest, and the paths' ends stay off screen.
- **Smooth scrolling:** on a desktop mouse (`hover: hover` and `pointer: fine`) the wheel is smoothed by Lenis, and both navs scroll with it (ease-in-out, 0.6s plus a little per distance, at most 1.4s). Phones keep their native scroll; reduced motion turns Lenis off. While a nav tap carries the page, nothing else may scroll it.
- **Micro-interactions:** key press 0.3s, switch knob 0.45s with a small overshoot, LED fade 0.3s.
- **Counting numerals:** the large accent numerals (the "14" on the Test side, the Skills count) count up over 0.8s with an ease-out (`1 - (1 - t)³`): from 0 the first time the numeral is on screen and each time the switch goes to Test, and from the old value to the new one when the Skills group changes. The box keeps the width of the final value, so the text beside it never moves. Screen readers always get the real value (hidden text); the counting digits are `aria-hidden`. With reduced motion the real value shows at once. The Skills count is worked out from the items each group shows in `portfolio.js`: Development 13 (3 + 5 + 5), QA & Testing 5, Design 3, Soft skills 3.
- **Nav ball (section 5):** a `transform` transition with `cubic-bezier(.34, Y, .64, 1)`: it never moves backwards first, and bounces on arrival by about the same 10–14px on a phone at any distance. Y depends on the sockets travelled: 1.78 for 1, 1.56 for 2, 1.43 for 3, 1.37 for 4. The duration depends on the distance too: 0.35s plus 0.1s per socket (1 socket 0.45s, 4 sockets 0.75s).
- **Nav icons:** the active icon fades to white over 0.25s with a `transition-delay` equal to that roll's duration, so it changes after the ball arrives. The icon of the socket the ball left goes grey at once. With reduced motion the colour changes at once.
- **LED ping:** `animate-ping` on the status pill LED (section 6.2) and on the timeline's rail LED are the only looping animations allowed. The switch LEDs stay still.
- No entrance fades or slide-ups (the device panel's entrance, peak 2, is the one exception), no scroll cues, no other looping animation.
- `prefers-reduced-motion: reduce`: everything static, transitions off, including the contour, the Hero text, the mouse follow, the device panel's entrance (shown finished), the footer waves and Lenis. Experience is the click accordion.

## 8. Sections not in the mockup yet (apply the same rules)

Build these after Hero and Featured project are approved on the real site.

- **Experience:** the timeline on flat ground, no cards. Each role is one row (title 15–16px 600; company and dates in `--muted`). The rail is an inset groove; every node shows the off LED, and the one lit LED moves along the rail (section 7). Latest role open at the start. Three modes:
  - **Pinned (>= 900px):** section 7, peak 3. Needs a screen at least 600px tall with room for the longest role under the capsule; otherwise the accordion.
  - **Manual (>= 900px):** after a click while pinned (section 7, peak 3): rows toggle on click, several open at a time, until the section leaves the screen.
  - **Accordion (phones, reduced motion, or a desktop screen too short to pin):** click only, single open. When a row opens below the open one and the collapse would push it off the top, the upper row closes at once and the page scrolls by the same amount, so the row stays still. Below 900px closed rows show only the title (same size) and sit 16px apart; company and dates sit at the top of the details, so a row animates one height when it opens or closes, and screen readers still hear them as part of the title.
- **Skills:** approved mockups: `docs/mockup/skills-desktop.html` and `docs/mockup/skills-mobile.html` (both show the Development group). One knob switch selects one group, shown in one sunken tray. The tray is `--ground` with no lighter fill inside. Groups swap instantly.
  - **Tray content:** a raised icon circle that changes with the group, the group title as an eyebrow, and the summary in `--muted`. The Development group has three rows (11px label, skills in `--ink` separated by " · "). The other groups are lists with a 6px `--faint` dot.
  - **>= 900px:** heading left and intro right in one row. Below them, a vertical switch 240px wide with 56px options and a knob that slides up and down, beside a tray of the same height: 236px when the text fits, as it does from 1280px up. Icon circle 44px, summary 14px, skills 17px, lists in 3 columns. To the right of the tray content is the section's one large numeral: 72px Michroma in `--accent`, counted from `portfolio.js` for the selected group, never hard-coded, with the label "SKILLS IN GROUP".
  - **900–1279px:** no extra breakpoint; the content reflows. Row labels move above their skills, lists drop to 2 columns, and the numeral moves under the content when there is no room beside it. The tray grows and the switch stretches with it, so they stay the same height.
  - **< 900px:** a horizontal switch (Dev, QA, Design, Soft) up to 340px wide, with 13px labels and 7px LEDs, then the same tray at the height of its content. Icon circle 40px, summary 13px, skills 16px, lists in one column, labels above their skills, no numeral.
  - **Keyboard:** `role="tablist"` with `aria-orientation`. Up and Down on the vertical switch, Left and Right on the horizontal one, Home and End on both.
- **Contact:** approved mockups: `docs/mockup/contact-desktop.html` and `docs/mockup/contact-mobile.html`. Flat ground, no device panel and no large h2. The heading is a small uppercase "CONTACT" eyebrow, still an `h2`, with the status pill on the right of the same row. The large email (section 4) is the focus of the section, followed by a copy key, and a line of phone and location under it. All of it comes from `portfolio.js`.
  - **Copy key:** 46px below 900px, 52px at >= 900px. The icon becomes a check, and "Copied!" or "Copy failed" shows under the key for 2 seconds without moving the layout.
  - **>= 900px:** from the email down, everything is centred. Pad keys (section 6.1) in one row, 20px apart: Send email (primary, 280px), Download CV, GitHub, LinkedIn (140px each). No Call key.
  - **< 900px:** the email stays on one line (`white-space: nowrap`). Send email (primary) fills the width, then one row of four icon keys: Call, CV, GitHub, LinkedIn.
- **End band (>= 900px only):** the footer contour (section 6.7), full width and 340px tall, directly under the row of keys with no gap. At the end of the scroll the Contact block sits around the middle of the screen, 40–55% of its height, at 1440x900 and 1920x1080.
- **Footer:** plain text. At >= 900px, one line over the end band, outside its mask, 32px from the bottom, with the two items at the left and right. Below 900px, two centred lines on the ground, 72px under Contact, with room under them for the nav capsule.

## 9. Content

- Every fact comes from `src/data/portfolio.js`. Never invent numbers, names or claims.
- Missing copy stays a visible placeholder in brackets, for example `[One line on what you built]`, until the owner supplies it.

## 10. Refuse list

Borders used for structure · gradients · glass or blur panels · pure black · chips · cards inside cards · more than one raised container per section · accent outside section 3 · `01 / 06` counters · gradient text · emoji · entrance fade or slide animations (one exception: the device panel, section 7) · scroll-down cues · invented statistics.

The nav socket ring (7px, `--socket-ring`) is the one exception to the border rule: it draws the rim of the socket.

## 11. Review gate (answer before calling a task done)

1. At 390px, does the first screen show the contour band, name, role, claim and both keys with little or no scrolling?
2. Is any text sitting inside a box that is not a key, the device panel, the screen, a well, the Skills tray or the nav capsule?
3. Is the accent used anywhere outside the five allowed places?
4. Does the name overlap the contour at any width from 900 to 1440?
5. Do keys press in (inset) on `:active` and show a focus ring on keyboard focus?
6. Is the switch centred, keyboard operable, and announced as a radio group?
7. No horizontal overflow at 360 / 390 / 768 / 1024 / 1440; report the page height at 390.
8. With reduced motion on, does nothing move?
9. `npm run lint` and `npm run build` pass.

Waived findings from the skill's inspector: `shadow` (neumorphism needs shadows), `button-fx` (the Key's inset press is the design), `few-pictures`, `font-fallback`, `eyebrow`, `micro-label`, `body-size` (the 11–12px labels and 15–17px body in section 4 are deliberate; `body-size` also counts section 4's 13–14px secondary lines as body), `small-text` (the only text under 12px is the uppercase 11px eyebrow labels that section 4 allows; all other text must be 12px or larger).
Until R7 removes them, findings caused by v2 leftovers (`UiverseButton` gradient, text-shadow and button-fx) are expected and are not blockers. Dev test pages under `dev/` are not inspected for content findings.
