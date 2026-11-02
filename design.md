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

- **Flat ground by default.** Headings, paragraphs, lists and labels sit directly on the page ground. No cards around text.
- **Depth only for objects.** Raised means "you can press it" (keys, the switch knob) or "this is the one device" (the Featured project panel). Inset means "a well or a screen" (icon wells, the gallery screen, the switch track, the status pill).
- **One container level inside a section, at most.** The device panel may hold a screen. Nothing else nests.
- **One peak.** The hero contour is the single big visual moment of the page. Nothing else competes with it.
- **One accent colour,** used in four places only (section 3).

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
}
```

Contrast on `--ground`: ink about 11:1, body and muted above 5:1, white on accent about 12:1. Keep it that way: no lighter text greys.

Put these in `src/index.css` (Tailwind v4 `@theme` for colours, `@utility` for the shadows). Components use tokens only, never raw hex.

## 3. Accent rules

`#651C32` appears only on:
1. the primary key (Download CV, Send email),
2. LEDs (the selected side of the Build/Test switch, the open row on the timeline),
3. one large numeral per section (for example "14" on the Test side),
4. the active gallery dot.

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
| Large numeral | `clamp(42px, 4vw, 56px)` | Michroma, `--accent` |

Text is never smaller than 12px, except uppercase eyebrow labels at 11px.

## 5. Layout (mobile first)

- Design at **390px** first. One breakpoint: **900px**.
- Side gutter 16px, 48px at >= 900px. Content max width 1240px.
- Section spacing: 96px between sections on mobile, 160px at >= 900px. More space above a heading than below it.
- No horizontal overflow at 360, 390, 768, 1024, 1440.

### Hero
- **Mobile:** nav row (WP mark left, "Open to work" pill right), then the contour band (full bleed, 230px tall), then name, role, one-line claim, then two keys side by side (2-column grid). The text block starts directly below the band, with no margin and no overlap.
- **>= 900px:** min-height 760px. The contour sits absolutely on the right 52% of the hero, full hero height, touching the right edge of the screen. Text column on the left, max 540px, above the contour (z-index). The status pill moves into the text column; the nav shows spaced uppercase links.
- The name must never overlap the contour. If it would, shrink the name with the clamp; never move the contour over it.

### Navigation
- Desktop: spaced uppercase links (Project, Experience, Skills, Contact), 12px, 600, tracking 0.22em.
- Mobile: keep the existing edge-attached bottom bar and its scroll-spy logic. Restyle it with these tokens: bar on `--ground` with an upward shadow, the active item as a pressed key with the accent LED.

## 6. Components

### 6.1 Key (all buttons and icon links)
Based on "witty-wolverine-69" by javierBarroso on uiverse.io (MIT). Put a credit comment in the component.

- Radius 10px, padding 14px 26px, 1px border in the same colour as the background, `--sh-key`, `transition: all .3s`.
- `:active`: `--sh-key-pressed`, text `#5E5E5E`.
- Primary: background and border `--accent`, text white, `--sh-primary`; `:active` uses `--sh-primary-pressed` and text `#E6D3D9`.
- Icon key: 52x52, radius 14px, icon 18px, label (12px, 600) underneath, outside the key.
- Focus: `outline: 2px solid var(--accent); outline-offset: 4px` on `:focus-visible`.
- Hover effects only inside `@media (hover: hover)`.
- The old `UiverseButton` (styled-components) is retired once every button uses the Key.

### 6.2 Status pill
Inset (`--sh-well`), radius 999px, text 12–13px 600 `--ink-2`.
The LED is the green light from before R1: a 10px dot in `--led` over a 10px `animate-ping` ring in `--led` at `opacity-75`, with no glow. It is used in the Hero and in the mobile nav. With reduced motion on, the ping stops and the dot stays still.

### 6.3 Device panel (Featured project only)
- Radius 32px and padding 16px on mobile; radius 48px and padding 32px at >= 900px. `--sh-device` / `--sh-device-lg`.
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
- Each label has an 8px LED: selected = `--accent` + `--led-glow`, text `--ink`; unselected = `--faint`, no glow, text `#555555`.
- Both content sides sit in the same grid cell so the panel height does not jump; the hidden side gets `inert`.
- Build side: "WHAT I BUILT" label, then rows of icon well (46px, `--sh-well`) + title + one secondary line.
- Test side: "HOW I TESTED" label, the large numeral with its caption, then one block per bug (eyebrow label + one sentence: symptom and fix).

### 6.6 Lists instead of chips
There are no chips anywhere. Tech stacks and skills are plain text, items separated by " · ", in `--muted` 13–14px, grouped under eyebrow labels.

### 6.7 Hero contour
- File: `src/assets/contour-hero.svg` (provided). Use it inline as a React component so its level groups can move for the parallax (section 7). `aria-hidden`, no pointer events.
- Three families of debossed (sinking) contour lines; each family's outer edge follows its neighbours with an even channel between them. Do not redraw or "improve" the paths.
- The `<g>` groups are levels: the first is the outer level of every family, the last is the innermost.
- Fill stays exactly `--ground`. No accent dot.
- The SVG uses `preserveAspectRatio="xMinYMid slice"`, so the artwork is anchored to its left edge.
- Lines fade out instead of being cut. The wrapper has a CSS `mask-image` that fades to transparent over about the top 10% at every width, over about the bottom 30% below 900px and the bottom 18% at >= 900px, and over about the left 10% at >= 900px. This is a mask, not a decorative gradient, so the gradient ban in section 10 does not apply to it.

## 7. Motion

- **The peak: hero contour parallax.** While the hero scrolls out, the level groups move up at different speeds: outer level 0, middle level up to 12px, inner levels up to 24px on mobile and up to 40px on desktop. Use CSS scroll-driven animation (`animation-timeline: view()` or `scroll()`) on `transform` only; browsers without support show it static.
- **Micro-interactions:** key press 0.3s, switch knob 0.45s with a small overshoot, LED fade 0.3s.
- **LED ping:** `animate-ping` on the status pill LED (section 6.2) and on the open timeline row's LED are the only looping animations allowed. The switch LEDs stay still.
- No entrance fades or slide-ups, no scroll cues, no other looping animation.
- `prefers-reduced-motion: reduce`: everything static, transitions off.

## 8. Sections not in the mockup yet (apply the same rules)

Build these after Hero and Featured project are approved on the real site.

- **Experience:** the timeline on flat ground, no cards. Each role is one row (title 15–16px 600; company and dates in `--muted`). The whole row toggles its details (keep the existing accordion logic: click only, single open, latest role open). The rail is an inset groove; the open row's node has the accent LED with `animate-ping`, and closed rows show the off LED.
- **Skills:** four groups (Programming & Web, QA & Testing, Design, Soft skills) as plain-text lists under eyebrow labels. Mobile may keep the existing switch between groups, restyled like the Build/Test switch.
- **Contact:** the email large (Manrope 600, `clamp(28px, 4vw, 48px)`, wraps with `overflow-wrap: anywhere`), one line of location and availability, then keys: Send email (primary), Call, Download CV, and icon keys for GitHub and LinkedIn.
- **Footer:** one line of plain text on the ground.

## 9. Content

- Every fact comes from `src/data/portfolio.js`. Never invent numbers, names or claims.
- Missing copy stays a visible placeholder in brackets, for example `[One line on what you built]`, until the owner supplies it.

## 10. Refuse list

Borders used for structure · gradients · glass or blur panels · pure black · chips · cards inside cards · more than one raised container per section · accent outside section 3 · `01 / 06` counters · gradient text · emoji · entrance fade or slide animations · scroll-down cues · invented statistics.

## 11. Review gate (answer before calling a task done)

1. At 390px, does the first screen show the contour band, name, role, claim and both keys with little or no scrolling?
2. Is any text sitting inside a box that is not a key, the device panel, the screen or a well?
3. Is the accent used anywhere outside the four allowed places?
4. Does the name overlap the contour at any width from 900 to 1440?
5. Do keys press in (inset) on `:active` and show a focus ring on keyboard focus?
6. Is the switch centred, keyboard operable, and announced as a radio group?
7. No horizontal overflow at 360 / 390 / 768 / 1024 / 1440; report the page height at 390.
8. With reduced motion on, does nothing move?
9. `npm run lint` and `npm run build` pass.

Waived findings from the skill's inspector: `shadow` (neumorphism needs shadows), `button-fx` (the Key's inset press is the design), `few-pictures`, `font-fallback`, `eyebrow`, `micro-label`, `body-size` (the 11–12px labels and 15–17px body in section 4 are deliberate; `body-size` also counts section 4's 13–14px secondary lines as body).
Until R7 removes them, findings caused by v2 leftovers (`UiverseButton` gradient, text-shadow and button-fx) are expected and are not blockers. Dev test pages under `dev/` are not inspected for content findings.
