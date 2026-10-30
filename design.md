# Design System: Hardware Neumorphism (v2.1)

Content, order, and copy live in `portfolio_content_structure_blueprint.md`. This file governs how the page looks, feels, and moves.

**Precedence.** This file overrides any installed skill (including `design-taste-frontend`) wherever they conflict.
Known conflicts and how to treat them:

- "No shadows on things at rest": waived for the `neu-*` classes. Depth is the design. `inspect.mjs` will report `FAIL shadow` at 1440, 768 and 390; that is expected and not to be "fixed".
- "No floating pill navigation": the mobile bottom bar must be attached to the bottom edge of the screen, full width, never a floating pill.
- "Entrance for every section, rising 16 to 32px, at least 8 moving elements": replaced by the motion plan in section 7. If the inspector complains about the count of moving elements, report it; do not add fade-ups to satisfy it.
- `draw.mjs` (direction dealer), `assets.mjs` (found pictures), and the "add a video or photographs" advice: do not use. The direction is fixed here, and the only images are the owner's project screenshots and, optionally, one portrait supplied by the owner (never stock or AI-generated). `WARN no-footage` is accepted.
- `UiverseButton` is the one deliberate exception (section 8b): the skill's `gradient`, `button-fx`, and `text-shadow` findings are waived for that component only. `few-pictures` is waived too.
- Everything else in the skill still applies and must pass: no eyebrow labels, no gradients, no thin rules or outlined boxes, no icon-topped feature cards or rows of identical cards, no covered text, headlines at most two lines, and no empty screens (`FAIL empty-screens` is a real design problem to fix).
- Run `inspect.mjs` at 1440, 768 and 390 px and `lint.mjs`; fix everything except the waivers above.

## 1. Concept

The page is one sheet of matte plastic lit by ONE light source. Everything on it is a piece of hardware: panels, trays, dials, switches, LEDs, grooves. Depth is the only decoration.

What makes the reference images work (borrow these, not their layout):

- Objects differ from each other: pill, squircle, circle (dial), groove (slider), tick marks. Not one card repeated.
- A recessed tray can be a slightly darker tone (`--recess`), not only a shadow.
- Almost everything is grey. Strong contrast appears only in small places: clock hands, a play icon, one photo.
- Type has real scale contrast: big numerals next to tiny labels.
- Every detail carries meaning (tick marks mark a scale, the LED shows a state).

## 2. Tokens

Never hardcode hex values or shadow strings in components. Use these tokens (CSS variables in `index.css`, exposed to Tailwind through the theme).

| Token       | Value     | Use                                                                                   |
| :---------- | :-------- | :------------------------------------------------------------------------------------ |
| `--surface` | `#E7E7E7` | Page and every panel. All surfaces match exactly.                                     |
| `--light`   | `#FFFFFF` | Highlight side of every shadow                                                        |
| `--shade`   | `#B6B6B6` | Dark side of every shadow                                                             |
| `--recess`  | `#D1D1D1` | Optional darker fill inside a tray                                                    |
| `--ink`     | `#333333` | Headings, key text, active icons                                                      |
| `--ink-2`   | `#4A4A4A` | Body text                                                                             |
| `--ink-3`   | `#666666` | Labels, dates, secondary text (4.6:1 on surface)                                      |
| `--ink-4`   | `#9B9B9B` | Decorative only: tick marks, disabled icons. Never for text that carries information. |
| `--led`     | `#22C55E` | The only functional color: status LED. Plus real project screenshots.                 |

Light direction: `--lx: -1; --ly: -1;` (light from top-left; each `-1..1`). Shadows are classes in `index.css` (or Tailwind `@utility`), NOT stored shadow variables, so a local override of `--lx/--ly` on one section really changes that section's shadows.

```css
.neu-raise-lg {
  box-shadow:
    calc(var(--lx) * -12px) calc(var(--ly) * -12px) 24px var(--shade),
    calc(var(--lx) * 12px) calc(var(--ly) * 12px) 24px var(--light);
}
.neu-raise-sm {
  box-shadow:
    calc(var(--lx) * -4px) calc(var(--ly) * -4px) 10px var(--shade),
    calc(var(--lx) * 4px) calc(var(--ly) * 4px) 10px var(--light);
}
.neu-inset-lg {
  box-shadow:
    inset calc(var(--lx) * -6px) calc(var(--ly) * -6px) 12px var(--shade),
    inset calc(var(--lx) * 6px) calc(var(--ly) * 6px) 12px var(--light);
}
.neu-inset-sm {
  box-shadow:
    inset calc(var(--lx) * -2px) calc(var(--ly) * -2px) 4px var(--shade),
    inset calc(var(--lx) * 2px) calc(var(--ly) * 2px) 4px var(--light);
}
```

Below 640px, scale offsets and blur down by about 30% (use a `--depth-scale` multiplier) so raised sections do not eat the side margins.

Forbidden: pure black or `rgba(0,0,0,...)` shadows, Tailwind `shadow-*` utilities, gradients, glass/blur, neon, emoji, mixed icon families.
Borders: none for structure. Exception: keyboard focus uses `outline: 2px solid var(--ink); outline-offset: 3px` on `:focus-visible`.

## 3. Depth roles

Depth means a role. If you cannot name the role, do not add a shadow.

| Role               | Look                                                    | Use ONLY for                                |
| :----------------- | :------------------------------------------------------ | :------------------------------------------ |
| L1 Raised section  | `neu-raise-lg`, large radius                            | Main section wrappers                       |
| L2 Tray            | `neu-inset-lg` (optional `--recess` fill)               | A group of related content inside L1        |
| L3a Control        | `neu-raise-sm`, pressed = `neu-inset-sm` + `scale(.97)` | Things you can click or toggle              |
| L3b Engraved label | `neu-inset-sm`, no hover, no press                      | Static tags: tech chips, skill chips, roles |
| Pointer            | `--led`, tiny                                           | Status                                      |

Rules:

- Raised means clickable. Engraved means information. Never swap them.
- Max 3 physical layers stacked in any area (L1 > L2 > L3).
- An engraved chip inside a tray must be clearly shallower than the tray (about one third of the depth).
- Equal-width 2-column chip grids are the owner's choice for the Tech stack and Technical skills cards: keep them (an odd last chip spans both columns; fall back to 1 column when a label would clip). Everywhere else (hero Core stack, timeline tags) use natural-width chips that wrap.

## 4. Variation rules (anti-slop)

Slop is sameness, not tidiness. Check these on every section:

- Use a radius scale tied to size: pill (controls), 16px (rows), 24px (trays), 40px (sections), full circle (dials, avatar). Do not put one radius on everything.
- Panels of different sizes. Never more than two identical sibling panels in a row. Prefer 2:1 or 3:2 cells.
- Each section has a different composition. Do not repeat "heading + one-line subtitle + right-aligned meta label" on every section.
- Each section includes at least one object that is not a card: dial, switch, slider groove, tick scale, LED, avatar circle.
- Decoration must carry information. If it signals nothing, delete it.
- No fake precision: no skill-level percentages, no star ratings.
- One signature moment on the whole page (section 7). Everything else stays quiet.
- Remove unnecessary labels above content (eyebrows, "Four categories" style counters). A label must change what the reader understands.

## 5. Type and copy

- One family, or two clearly different. Body 15 to 16px on mobile, labels at least 12px. Sentence case. No all-caps labels.
- Use scale contrast: large display text or numerals against small labels.
- Display face: an expanded/wide face is allowed ONLY for the owner's name and large numerals (36px or bigger, one weight). Never for labels, chips, buttons, or body. Manrope (the current face) has no width axis, so keep it for everything else and add exactly ONE display family for these cases (candidates: Archivo with `font-stretch` up to 125%, or Unbounded; the owner picks after a side-by-side test). Two typefaces in total. Latin glyphs only, so keep those elements English. Load Latin subset only, with `font-display: swap`.
- Do not accent a single word in a headline with color or italics.
- Copy is specific: a number, a tool, a decision, a result. Replace adjectives with evidence.
- Avoid: passionate, seamless, leverage, robust, cutting-edge, "quality mindset", "practical toolkit", "delivery on track", and any sentence that would fit any developer's portfolio.
- Every skill, tool, or claim shown must be something the owner can discuss in an interview. Never invent numbers, counts, or results; use only facts supplied by the owner.

## 6. Mobile-first

Most visitors arrive on a phone. Design at 390px first, then enhance at 768px and 1024px+, with a 1440px max width. In Tailwind, unprefixed classes are mobile; add `md:` and `lg:` for larger.

- First screen on mobile must show: the name (display face), the availability LED, and the primary action, without scrolling.
- Touch targets at least 44 by 44px with at least 8px between controls. Nothing is reachable only by hover.
- Layout collapses to one column; the most important cell comes first. Bento cells stack, they are not just shrunk.
- Navigation: mobile uses a fixed bottom bar attached to the screen edge, full width, not a floating pill (inset groove with a raised knob that slides to the active section; respects `safe-area-inset-bottom`). Desktop uses the top header.
- Switches and segmented controls are full-width on mobile.
- Long text wraps; no horizontal scroll at 360px.
- Corner radius on mobile must not exceed about 1.5x the padding of the same box, so text never sits close to a curve: sections 24px (`rounded-3xl`) with `p-5`, trays and rows 16px (`rounded-2xl`) with `p-4`. Desktop radii stay as they are. Pills, chips, and keys stay fully round.
- Test at 360, 390, 768, 1024, 1440.

## 7. Motion and interaction (level: clearly visible)

Motion follows physics: surfaces extrude, controls press in, light shifts. Never decorative. The owner wants motion that is clearly noticeable, so keep moments bold but few.

Scroll moments (budget: these four only):

1. Section extrude: a Level 1 section rises from the surface as it enters the viewport (shadow strength 0 to 1, plus a small scale from .97 to 1). Do NOT use fade-and-slide-up on every section.
2. Hero depth layers: name, panels, and controls move at different speeds. Travel up to 40px on desktop, 16 to 20px on mobile. The light direction shifts slightly in the hero: follows the pointer on desktop, follows scroll progress on touch (scoped to the hero, range about 0.4).
3. Inset window: an image inside a tray shifts 8 to 12 percent while the tray stays still.
4. Scroll rail: the timeline groove fills like an LED strip as you scroll; the progress indicator is a raised knob in an inset groove.

User-triggered feedback (always allowed): press-in on controls, copy-to-clipboard confirmation as a pressed state, accordion open/close, the Build/Test switch, the bottom dock knob.

Technical rules:

- Animate only `transform`, `opacity`, and CSS variables on small scopes. For shadow changes on large elements, crossfade the opacity of two layers (pseudo-elements) instead of animating `box-shadow`.
- Prefer CSS scroll-driven animations (`animation-timeline: view()`) inside `@supports`. Fallback: IntersectionObserver with a static final state. No scroll listeners that read layout.
- Respect `prefers-reduced-motion: reduce`: no parallax, no extrude animation, no knob travel; state changes are instant.
- Mobile keeps parallax at reduced travel. If frame rate drops on a mid-range phone, fall back to extrude plus press feedback only. Never use gyroscope or device-orientation effects.
- Duration 150 to 350 ms for feedback; 400 to 600 ms for switches and scroll reveals. Easing `cubic-bezier(.2,.7,.2,1)`; a slight overshoot is allowed on knobs only. No looping animation except the status LED pulse.
- Never change `--lx/--ly` on `:root`; scope to a section.
- Hover must never be the only way to reach content (timeline details open by tap and keyboard, with `aria-expanded`).

## 8. Signature moment: Build / Test switch

Location: Featured project, in the "What I built" panel.

- Control: a two-position physical switch (inset groove, raised knob), labelled "Build" and "Test", with the LED lit on the active side. Knob slides 400 to 500 ms with a slight overshoot. On mobile it is full-width.
- Behavior: panel content crossfades; the panel keeps a stable height (set a min-height) so nothing jumps.
- Accessibility: segmented radio group (arrow keys move between options), `aria-live="polite"` on the content region.
- Build side: what the owner built (authentication and security, admin dashboard, core UI).
- Test side: the testing method and bugs found and fixed, each as symptom, cause, fix. Facts come only from the owner (`src/data/portfolio.js`).
- This is the one memorable moment. Do not add a second showpiece elsewhere.

## 8b. The remote key (`UiverseButton`): the one allowed exception

The primary action buttons are keys on an old remote control: chunky plastic or rubber keys with real travel. The component was taken from uiverse.io and the owner wants to keep it.

- Keep the layered structure (`button-outer`, `button-inner`, clip-path, stacked shadows). Gradients, layered highlights, and blend effects are allowed here and nowhere else.
- The palette stays soft grey. Every color and shadow derives from `--color-surface`, `--color-highlight`, `--color-shadow`, `--color-ink`. No near-black such as `rgba(5,5,5,...)`, and no pure black.
- Press: the whole key sinks (`scale(.96)` plus inset shadows) with 1 to 2px of visible travel. Hover only darkens the label.
- Typography: inherit the project font (remove `Inter`), label at least 13px, sentence case.
- Small gimmicks are allowed, at most two, chosen in Phase 3: a one-time LED blink on press (uses `--color-led`), a concave "dish" on the key top, a short haptic tick (`navigator.vibrate(8)`, only where supported, never required). No sound.
- Use it for primary actions only (download CV, contact, view projects). Never for tags, toggles, or navigation.
- Respect `prefers-reduced-motion`, visible `:focus-visible`, and a 44px minimum touch target.

## 9. Accessibility floor

- Text contrast at least 4.5:1 (`--ink-3` or darker on `--surface`).
- Visible `:focus-visible` on every control. Real `<button>` and `<a>` for interactive things; `<ul>/<li>` for tag groups.
- Images have meaningful `alt`. Layout does not shift on load.

## 10. Default compositions (change only with owner approval)

- Hero: mobile first screen as in section 6. Desktop: two columns; left name and role, right status LED and quick-contact rows (raised controls).
- Featured project: unequal bento: title and role tile, screens in a tray (inset window), the Build/Test panel, tech stack, links.
- Experience: vertical groove with LED nodes. Each row is a real `<button>` toggle (`aria-expanded`, `aria-controls`). Collapsed = raised key; open = pressed-in tray with the details revealed. The company name is visible when collapsed. The node LED is lit (with the status pulse) while the row is open.
  - One state only: `open`. Click, tap, or Enter/Space toggles it. There is NO hover expansion on any device, and focus alone never opens a row.
  - On hover-capable devices a closed row may lift by 1px as a hint (Tailwind's `hover:` variant already applies only to hover-capable devices). Never change the content on hover.
  - The latest role starts open at every screen width; the others start closed. Details animate with `grid-template-rows` 0fr to 1fr, instant under reduced motion. Highlights render as a list of up to 3 short bullets.
- Skills: one control-panel layout with uneven modules; tags are engraved labels.
- Contact: the email address as the single large focal element; actions as raised controls.

## 11. Review gate (run before saying "done")

Answer each item in the final summary. If any fails, fix it first.

1. Could this section be dropped into another portfolio unchanged? If yes, what is specific to this owner?
2. Is any role mismatched (raised static info, engraved clickable thing)?
3. Does any section repeat another section's structure?
4. Is there a non-card object in each section, and does it carry meaning?
5. Any hardcoded hex, pure black, `shadow-*` utility, border, or gradient?
6. Is each moving thing inside the motion budget and reduced-motion safe?
7. Is any copy generic enough to belong to anyone? List it for the owner.
8. 390px first screen shows name, availability, primary action? No horizontal scroll at 360px?
9. `inspect.mjs` run at 1440, 768, 390: resting-shadow failures on `neu-*` are expected and waived; every other failure fixed.
10. Contrast, focus, and touch-target check done.
