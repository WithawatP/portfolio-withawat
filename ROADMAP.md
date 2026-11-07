# ROADMAP

Read this at the start of every session. Update the Status table and "Next task" at the end of each phase.
Design rules: `design.md` (v3). Visual reference: `docs/mockup/hero-featured.html`.

## Why a redesign

The v2 site was tidy but read as cluttered and flat: every element sat in a raised or inset box, dozens of chips, no accent, and four small motion moments that nobody noticed. v3 keeps the content, data and logic, and replaces the visual layer: flat ground, a few neumorphic objects, one accent (`#651C32`), one peak (the hero contour).

The redesign was built on `redesign-v2`, now merged into `main`. The v2 phases (1 to 7) are finished and live in git history; their content decisions below still hold.

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
| R7 | Cleanup: remove `UiverseButton`, styled-components, chip components and unused `neu-*` utilities; inspector, Lighthouse, meta/OG | Done |
| P1 | Prerender: the page's HTML is rendered at build time and hydrated, so crawlers and no-JS browsers get the content; scroll hold until hydration; count-up numerals show their real value in the HTML | Done, merged into `main` (PR #4, `4b9547a`) |
| D1 | Light and dark theme (see D1 and L1) | Done, merged into `main` (PR #6, `aa7de3d`) |
| L1 | Thai and English, `/` and `/th/` (see D1 and L1) | Done, merged into `main` (PR #7, `850cd1d`) after two rounds of the owner's copy review |

## Deployed

The site is live on Vercel at https://portfolio-withawat.vercel.app/. `VITE_SITE_URL` is set there, so the live page has the canonical, `og:url` and absolute share-image tags. P1 is merged into `main` (PR #4); a crawler fetching the page without JavaScript gets the content. Since PR #6 and PR #7 the live site has the light and dark theme and a Thai page at https://portfolio-withawat.vercel.app/th/ (`sitemap.xml` lists both pages).

## D1 and L1 (done)

Two features, planned with the owner on 2026-11-06, both merged into `main`: D1 (PR #6) and L1 (PR #7). Kept here as the record of their decisions. There is no next task scheduled; see Optional.

### D1: light and dark theme (branch `dark-theme`, merged PR #6)

- **Process:** mockup first, `docs/mockup/dark-theme.html`, built on `hero-featured.html`: Hero and Featured at 390 and 1440, light next to dark, then a strip of every depth object (Skills tray and knob switch, timeline rail and LED, both nav capsules, icon keys, Contact keys, footer contour). The owner approves it, then `design.md` changes, then code.
- **Reference:** `docs/reference/dark-theme/` (in `.gitignore`: other designers' work, and the repo is public). One image is enough: an otakoyi neumorphism freebie (ground `#292D32`, 18px offset, 20px blur).
- **Ground `#2B2B2B`**, neutral like the light theme (the reference's blue-grey was not chosen). The shadows need careful tuning to look right.
- **Text** keeps the design.md contrast targets on the dark ground (ink about 11:1, body and muted above 5:1), no pure white (ink about `#E6E6E6`).
- **Accent in dark is `#8C2A47`** (owner, after the mockup), in the same five places. `#651C32` sank into the dark ground (1.2:1, the LEDs and gallery dot nearly vanished); `#8C2A47` is 1.7:1 and white on it 8.3:1. The light theme keeps `#651C32`.
- **Contours:** the same three files; CSS changes only the fill and the shadow and light colours. Paths untouched.
- **Unchanged in dark:** `og-image.png`, the favicon, the gallery screenshots, the CV. `theme-color` follows the theme.
- **First visit** follows `prefers-color-scheme`; a manual choice is remembered on the device. An inline script in `index.html` sets the theme before the first paint (the prerendered HTML must not flash light).
- **Switching** cross-fades 0.4s with the View Transitions API; instant where unsupported or with reduced motion.
- **The theme switch** is adapted from uiverse "bright-dolphin-91" (Yaya12085, MIT): inset track from tokens; the knob keeps its gradient (light in light, dark in dark), a design.md exception like the LED ping; tokens only; sized to the row it sits in. Left = light, right = dark; ☀ and ☾ icons at the track ends, faint, except the sun in the dark theme: white with a soft glow (owner, after the mockup). A real `<button role="switch" aria-checked>` with the keys' focus ring (the original hid its checkbox). The hover tilt only with `hover: hover` and without reduced motion.
- **Placement:** the Hero's top row at both widths, and the desktop capsule. The phone bottom nav keeps its 5 icons.

**D1 as built** (design.md sections 2, 3, 6.7, 6.8, 7, 10 and 11 hold the rules):
- The mockup was approved with the owner's two changes: accent `#8C2A47` in dark, and the sun lit white with a soft glow in dark. The mockup is the real page captured from the dev server with the dark tokens laid over it, not a redrawn page.
- `src/index.css`: the dark tokens under `html[data-theme='dark']`, the switch and contour tokens in both themes, the switch's CSS (`.theme-switch`), the 0.4s view transition, and `html:not([data-theme]) .theme-switch { display: none }` for no-JS. `--color-recessed` (only the text selection) is `#424242` in dark so a selection shows.
- `index.html`: the existing inline script sets `data-theme` (stored choice, else the system) and `theme-color` before the first paint; the `theme-color` meta moved above it.
- `src/lib/theme.js`: `useTheme` (server value 'light', like `useMediaQuery`), `setTheme` (stores, cross-fades or changes at once), one system listener that applies only while nothing is stored.
- `src/components/ui/ThemeSwitch.jsx` in `Header.jsx` and `DesktopNav.jsx`; sun and moon added to `Icon.jsx`.
- `src/lib/contourTheme.js`: the three contour components give the files' fill and `feFlood` colours tokens as inline styles. The files are untouched; `ContourExperience`'s 0.4/0.65 opacity replacements became the light tokens.
- Measured on the production build: overflow 0 at 360/390/768/1024/1440 in both themes; page height at 390 is 3950px (unchanged); no console errors or hydration warnings; the click sets the theme, `aria-checked`, storage and `theme-color`, and a reload keeps it; reduced motion changes at once; a stored choice ignores system changes, and without one the page follows them; without JS the page is light and the switch hidden; Tab reaches the switch with the accent focus ring. Lint and build pass.

### L1: Thai and English (branch `bilingual`, merged PR #7)

- **URLs:** `/` English (primary: meta, share image, CV are English), `/th/` Thai, both prerendered. No redirect by browser language. Switching loads the other page at the top.
- **Language switch:** text only, no key (owner, after the font mockup), showing the language it goes to ("ไทย" on `/`, "EN" on `/th/`), a link (`hreflang`), just before the theme switch. 15px 700, no white rim (owner, second look). Hover darkens the letters; pressing sinks them.
- **Copy:** Claude drafts the Thai, the owner reviews every line; nothing unreviewed is merged. Review: an English/Thai table in the PR and the real page on the Vercel preview at 390 and 1440 (Thai has no spaces, so it wraps differently).
- **Not translated:** technology, company and project names, email, links, the CV (a Thai CV may come later).
- **Name:** the `/th/` Hero shows **วิทวัส ภิระบรรณ์** in **Mitr 300** on **one line**, line-height 1.2: 42.4px below 900px, so it is as long as the role line under it (owner, third look), and the English name's `clamp(34px, 4.6vw, 64px)` at >= 900px (option A of the mockup). The owner first chose ExtraLight 200, tried 300 and kept it, and asked for first and last name on one line. Everywhere else (title, footer, meta, share image) the English name stays.
- **Fonts:** `/th/` sets everything in **Anuphan alone**, Latin words included (owner chose option 2 of the mockup over Manrope + Anuphan). Large numerals and the WP mark stay Michroma. Self-hosted files, no npm dependency.
- **Thai labels:** headings keep line-height 1.1; eyebrows and nav links are 12px with .04em letter spacing (the English .2–.22em scatters a Thai word into letters).
- **Job titles stay English** on `/th/`, as in the CV.
- **Dates:** Thai month names, Gregorian years ("กรกฎาคม 2026 – ตุลาคม 2026", "2019 – 2026").
- **Data:** `src/data/portfolio.th.js`, the same shape and order as `portfolio.js`; values that do not change (email, links, CV) come from `portfolio.js`. Strings hard-coded in components today ("Built with React and Tailwind CSS", "2019 – 2026", the nav `aria-label`s) move into the data files, with the English wording unchanged.
- **Meta on `/th/`:** Thai title and description (drafted, owner-reviewed), `og:locale` `th_TH`, canonical to itself, the same share image. `hreflang` alternates on both pages, built from `VITE_SITE_URL` like the canonical.

**L1 as built** (design.md sections 4, 5 and 6.9 hold the rules):
- Step 1 (`14363f6`): the Thai font files, `docs/mockup/thai-fonts.html` (fonts inlined, opens without a server), and the Thai copy draft `src/data/portfolio.th.js`. The mockup was then updated twice with the owner's answers: section A shows the name in Mitr 300 on one line, section D the text-only language link (15px 700, no white rim) with its three states.
- `src/data/portfolio.js` gains `ui`: every string that was hard-coded in a component (nav labels and `aria-label`s, keys, section titles and intros, "2019 – 2026", the gallery alt texts, the copy status, the footer line), English wording unchanged. `portfolio.th.js` has the same keys, plus `profile.heroName` and `meta` (the `/th/` `<head>` text).
- `src/lib/content.js`: `CONTENT.en` / `CONTENT.th` and `useContent()`. `App` takes `lang` and provides it; every component reads its copy from `useContent()`.
- `main.jsx`: a built page hydrates in the language its `<html lang>` says (so it always matches the HTML that arrived); the dev server uses the path.
- `scripts/prerender.mjs` renders both pages: `dist/index.html` and `dist/th/index.html` (Thai `lang`, title, description, `og:`/`twitter:` text, `og:locale` `th_TH`, canonical and `og:url` to `/th/`, the Thai fonts preloaded instead of Manrope). Both pages get `hreflang` en / th / x-default from the canonical URL; without `VITE_SITE_URL` there are none. Every swap fails the build if its tag is missing.
- `src/index.css`: `@font-face` for Anuphan (Thai and Latin subsets) and Mitr 300; `--font-thai-name`; the caps labels became tokens (`text-eyebrow`, `tracking-caps`, `-sm`, `-xs`, same values in English) that `html:lang(th)` redefines with `--font-sans`; `.lang-link` and its `--lang-rest` / `--lang-press` text shadows in both themes.
- `src/components/ui/LanguageLink.jsx` in `Header.jsx` and `DesktopNav.jsx`, before the theme switch.
- `public/fonts`: `anuphan-thai-variable.woff2` (19 kB), `anuphan-latin-variable.woff2` (35 kB), `mitr-thai-300.woff2` (14 kB); `mitr-thai-200.woff2` from step 1 is deleted. The Anuphan files are Google's full variable files, so 700 (the language link) needs no extra file; `@font-face` declares 400–700. `/` downloads only the Anuphan Thai subset (for "ไทย").
- Measured on the production build with `VITE_SITE_URL` set: overflow 0 at 360/390/768/1024/1440 for both languages in both themes; page height at 390 is 3950px on `/` (unchanged) and 3869px on `/th/` (the name on one line, 42.4px; 3894px after the owner's copy review); no console errors or hydration warnings on either page; without JS `/th/` is Thai (lang, title, h1, h2s); the language link loads the other page; the 360px top row fits (the link is 44px wide). Lint and build pass.
- After merging `main` (C1, crawler metadata): `sitemap.xml` (vite.config.js) lists `/` and `/th/`, each with the en / th / x-default alternates, the same set as the pages' `hreflang` links. The JSON-LD Person and `llms.txt` stay English on both pages (`/` is the primary page). Rechecked after the merge: lint, build, overflow, heights, no hydration warnings.
- Owner review, round 1 (PR #7 table, 2026-11-07): 22 strings changed in `portfolio.th.js`, word for word. The owner prefers the English terms recruiters use where Thai is stiff (remote, hybrid, authentication, frameworks, Soft skills, e-commerce, manual); a few strings are now the same as the English ones. `/th/` title: "วิทวัส ภิระบรรณ์ — Software Developer & QA". "ดูโปรเจกต์ของผม" fits its key at 360px with nothing to spare.
- Owner review, round 2 (PR #7 table): the status reads "กำลังมองหางาน" (pill, Hero status line, Contact line). The pill still fits the 360px top row.
- `/th` without the slash: checked by the owner on the Vercel preview, it serves the Thai page.
- Merged by the owner on 2026-11-07 (PR #7, `850cd1d`). Not confirmed in this record: a check on a real iPhone.
- Later, if wanted: a Thai CV (the CV link stays the English PDF on `/th/`).

## P1 decisions (prerender)

- **Own script, no dependency.** `npm run build` = client build, then `vite build --ssr src/entry-server.jsx --outDir dist-ssr`, then `scripts/prerender.mjs`, which renders `<App/>` with `renderToString` into `<!--app-html-->` in `dist/index.html` and deletes `dist-ssr` (also on failure; it is in `.gitignore`). `main.jsx` hydrates when `#root` has HTML in it and renders from scratch on the dev server. `vite-react-ssg` and headless snapshots were rejected (same app fixes needed, plus a dependency; snapshots capture post-script state).
- **The server HTML is the phone layout.** `useMediaQuery` is a `useSyncExternalStore` whose server value is `false`; while hydrating React uses that value and then re-renders with the real one, so the markup always matches. `useHydrated()` (same file) is false in the HTML and while hydrating: the navs render only after it (`BottomNav` portals into `<body>`), so neither is in the HTML. On phones the bottom nav appears at hydration, slightly after the content (fixed, no layout shift; owner accepted).
- **Scroll hold until hydration** (owner's choice of three options; the others were hiding `#root` until hydration, which gives up the earlier paint, and making the desktop layout CSS-driven plus compensating in the motion code). Measured without it: a reader who scrolled before hydration was snapped back to the top (`main.jsx` reset), and without that reset the Experience pin and the desktop layout moved the page under them (CLS 0.38-0.59 at 1440). Now an inline script in `index.html` adds `html.js-pending` (`overflow: hidden`, `src/index.css`) only when JavaScript runs, so no-JS browsers scroll as usual. Released by `App.jsx` after hydration (`window.__releaseScroll`), at `load` if the app never started (`window.__appStarted`), and after 4s in any case. Lenis starts stopped while the class is there (it scrolls by script, which `overflow: hidden` does not stop).
- **The page still opens at the top, as before.** The inline script sets manual scroll restoration and takes a `#hash` off the URL until the release (then puts it back with `replaceState`, unless the reader followed another anchor meanwhile). Without that, a new tab on `/#skills` jumped to the section before hydration and the pin then pushed the reader into Experience. The `window.scrollTo(0, 0)` at startup in `main.jsx` is gone: it is no longer needed and it undid a Tab focus scroll made before hydration. Reload, back/forward and new-tab hash loads were measured against the previous build: identical.
- **Count-up numerals:** the HTML and the first render show the real value (14, 13), so no-JS readers never see "0" and hydration matches; right after hydration a numeral that is off screen or not displayed drops to 0 and counts up as before. The box width is unchanged.
- React 19 adds `<link rel="preload" as="image">` for the three gallery images at the start of `#root`. Removing them made no measurable difference, so they stay.
- **Font swap on slow networks:** text now paints before the fonts arrive, so on a throttled desktop load the hero copy grows 28px when Manrope swaps in (CLS 0.009; 0.005 with reduced motion; 0 at 390 and on normal connections). The old build hid this by painting nothing until the JavaScript ran. Kept as is by the owner's decision (fonts were matched pixel for pixel in R7); the metric-matched fallback is listed under Optional.
- Lighthouse 13.6, production build served with gzip like Vercel, median of 3 (performance / accessibility / best practices / SEO):

  | | R7 build | P1 build |
  |---|---|---|
  | Mobile scores | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
  | Mobile FCP = LCP (simulated) | 754 ms | 907 ms |
  | Mobile TBT | 44 ms | 15 ms |
  | Desktop scores | 100 / 100 / 100 / 100 | 100 / 100 / 100 / 100 |
  | Desktop FCP = LCP | 203 ms | 243 ms |
  | CLS (mobile and desktop) | 0 | 0 |
  | HTML transfer (gzip) | 0.8 kB | 19.5 kB |

  The simulated FCP is about 150ms higher, mostly from the hero contour SVG now in the HTML; the simulation leaves out the JavaScript the R7 build needed before anything could paint. In a real browser on a throttled connection (1.6 Mbps, 150ms latency, 4x CPU) the content shows sooner: FCP 1740ms before, about 1100ms now, at 390 and 1440.
- Measured, all at 390 and 1440 with and without reduced motion: no hydration warnings or errors in production or development React (React keeps every server node; a deliberate mismatch is reported, so the check works); the behaviour regression (nav landing and lock, pin and click mode, phone accordion, Skills switch and counts, count-up, Featured entrance, contours, overflow at 360-1920) shows 0 differences in 207 recorded values against the R7 build; a clean clone builds with `npm ci && npm run build` without a `.env`.
- The owner tested the Vercel preview of `prerender` on a real iPhone: all 5 checks passed (iOS Safari holds and then releases the scroll as Chrome does).

R7 summary:
- Removed after proving they have no users: `UiverseButton`, the styled-components dependency, `SkillChip`, `SectionCard`, `InsetPanel`, `QuickContactRow`, `Pill`, `SectionHeading`, `src/lib/styles.js` (`LEVEL_*`), the 13 `neu-*` utilities and their tokens (`--lx`, `--ly`, `--depth-scale`, `--color-shadow`, `--color-highlight`), `--color-surface`, the `.extrude` CSS, the `?parallax-debug` mode, `public/icons.svg`, and unused images in `src/assets` (`hero.png`, `neumorphism*.png`, `react.svg`, `vite.svg`, the four `atelier-*.jpg` originals and `reference ui components style.jpg`; the owner kept copies).
- Favicon: the WP mark in Michroma (variant B: outlines with a 3-unit stroke so it reads at 16px), `--ink` on a `--ground` rounded square. `favicon.svg` (outline paths, no webfont), `favicon-32.png`, and `apple-touch-icon.png` (180px, square, since iOS rounds it). Vite's default icon is gone.
- Fonts self-hosted in `public/fonts`: the same Latin woff2 files Google Fonts serves (Manrope variable for 400-600, Michroma 400), `font-display: swap`, both preloaded; the Google Fonts links are gone. Screenshots of the Hero, the Skills numeral and Contact at 390 and 1440 match the Google Fonts version pixel for pixel, and the count-up boxes keep their widths.
- Meta: title, description, theme-color, Open Graph and Twitter tags in `index.html`. Canonical, `og:url` and the absolute share-image tags come from `VITE_SITE_URL` (`.env`, see `.env.example`) through a small plugin in `vite.config.js`, and are left out while it is empty or not a public http(s) URL.
- New share image `public/og-image.png` (1200x630), rendered from the real Hero (contour art, name in Michroma, role line). The v2 `og-image.jpg` is gone.
- Hero intro (`profile.headline`) is now "I build full-stack web apps with React and Node.js, then test them across browsers, screen sizes, and the API layer." (owner). The old line joined the Atelier Postman work and the Versatile Haus template QC with numbers out of context; the numbers stay where they have context (Featured: 14 requests, Experience: 20 templates). Still 3 lines at 360, 390 and 1440. The approved mockup `docs/mockup/hero-featured.html` keeps the old wording; `portfolio.js` wins.
- Lighthouse on the production build (median of 3): mobile 100 / 100 / 100 / 100, desktop 100 / 100 / 100 / 100 (performance, accessibility, best practices, SEO). Before self-hosting the fonts, mobile performance was 99 with a 1.4s first paint; now 0.76s.

Carry over:
- Performance leads, left as they are by the owner's decision (scores are 100): the gallery WebPs are 1440px wide for a smaller box (about 95KB to save with responsive sizes); about 58KB of unused JS; a 56ms forced layout from `useHeroMotion` measuring on mount (motion code).
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

- Screenshots for the gallery if they change; bug screenshots if any.

## Optional (not scheduled)

- Manrope fallback with matched metrics: an `@font-face` for a local fallback with `size-adjust` (and ascent/descent overrides) so the swap to Manrope no longer moves the hero copy on slow networks (P1 decisions, CLS 0.009 at 1440 throttled). The owner kept the font setup as is for now.

## Working routine

1. Commit first, then work on the phase's own branch from `main` (`redesign-v2` is merged and finished).
2. Plan Mode for anything touching more than about 3 files.
3. Verify at 360, 390, 768, 1024, 1440; report page height at 390; answer design.md section 11.
4. Commit, update this file, `/clear`, next phase.
