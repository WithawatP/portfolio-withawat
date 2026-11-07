// Last build step (package.json "build"): renders the app with the server bundle from dist-ssr, once per
// language (L1), so each page's content is in its HTML before any JavaScript runs:
//   /    -> dist/index.html     English, the <head> as written in index.html
//   /th/ -> dist/th/index.html  Thai: lang="th", the <head> text from portfolio.th.js "meta", the Thai fonts
// Both pages link to each other with hreflang, from the canonical URL vite.config.js wrote (VITE_SITE_URL);
// without one there is no absolute URL, so no hreflang either. main.jsx then hydrates the page in the
// language of its path. dist-ssr is deleted afterwards, whether or not this succeeds.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ssrDir = fileURLToPath(new URL('../dist-ssr/', import.meta.url))
const distDir = fileURLToPath(new URL('../dist/', import.meta.url))
const MARKER = '<!--app-html-->'

// Where each language's page goes, and its path on the site.
const PAGES = {
  en: { file: 'index.html', path: '/' },
  th: { file: 'th/index.html', path: '/th/' },
}

const OG_LOCALE = { en: 'en_US', th: 'th_TH' }

// The first screen of /th/ needs these instead of Manrope (src/index.css). Michroma stays: the WP mark.
const THAI_FONTS = ['anuphan-thai-variable.woff2', 'anuphan-latin-variable.woff2', 'mitr-thai-300.woff2']
const MANROPE_PRELOAD = /<link rel="preload" href="\/fonts\/manrope-latin-variable\.woff2"[^>]*>/

const escapeAttr = (text) =>
  text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Every swap must find its tag: a change to index.html that breaks one fails the build instead of
// shipping a Thai page with English tags. Replacements are functions, so "$" is never a pattern.
function swap(html, pattern, replacement, what) {
  if (!pattern.test(html)) throw new Error(`prerender: ${what} is missing from dist/index.html`)
  return html.replace(pattern, replacement)
}

const metaContent = (html, key, value) =>
  swap(
    html,
    new RegExp(`(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*(")`),
    (_, open, close) => open + escapeAttr(value) + close,
    `<meta ${key}>`
  )

function localizeHead(html, lang, meta, base) {
  let out = html
  if (lang !== 'en') {
    out = swap(out, /<html lang="en">/, () => `<html lang="${lang}">`, '<html lang="en">')
    out = swap(out, /<title>[^<]*<\/title>/, () => `<title>${escapeAttr(meta.title)}</title>`, '<title>')
    out = metaContent(out, 'description', meta.description)
    out = metaContent(out, 'og:title', meta.title)
    out = metaContent(out, 'og:description', meta.ogDescription)
    out = metaContent(out, 'twitter:title', meta.title)
    out = metaContent(out, 'twitter:description', meta.ogDescription)
    out = metaContent(out, 'og:locale', OG_LOCALE[lang])
    out = metaContent(out, 'og:locale:alternate', OG_LOCALE.en)
    out = swap(
      out,
      MANROPE_PRELOAD,
      () =>
        THAI_FONTS.map(
          (file) => `<link rel="preload" href="/fonts/${file}" as="font" type="font/woff2" crossorigin />`
        ).join('\n    '),
      'the Manrope preload'
    )
  }
  if (base) {
    const url = base + PAGES[lang].path
    out = swap(out, /<link rel="canonical" href="[^"]*" \/>/, () => {
      const alternates = Object.entries(PAGES).map(
        ([code, page]) => `<link rel="alternate" hreflang="${code}" href="${base}${page.path}" />`
      )
      alternates.push(`<link rel="alternate" hreflang="x-default" href="${base}/" />`)
      return [`<link rel="canonical" href="${url}" />`, ...alternates].join('\n    ')
    }, 'the canonical link')
    out = metaContent(out, 'og:url', url)
  }
  return out
}

try {
  const { render, headFor, LANGS } = await import(pathToFileURL(`${ssrDir}entry-server.js`).href)
  const template = readFileSync(`${distDir}index.html`, 'utf8')
  if (!template.includes(MARKER)) throw new Error(`${MARKER} is missing from dist/index.html`)
  // The site's address without the trailing slash, from the canonical link (vite.config.js), if any.
  const base = template.match(/<link rel="canonical" href="([^"]+)\/" \/>/)?.[1] ?? null

  for (const lang of LANGS) {
    const page = PAGES[lang]
    if (!page) throw new Error(`prerender: no page is set for language "${lang}"`)
    const markup = render(lang)
    if (!markup.includes('<h1')) throw new Error(`prerender: the ${lang} markup has no <h1>`)
    const html = localizeHead(template, lang, headFor(lang), base).replace(MARKER, () => markup)
    const out = join(distDir, page.file)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, html)
    console.log(`prerender: ${(markup.length / 1024).toFixed(1)} kB of ${lang} markup written into dist/${page.file}`)
  }
  if (!base) console.log('prerender: no canonical URL (VITE_SITE_URL), so no hreflang links')
} finally {
  rmSync(ssrDir, { recursive: true, force: true })
}
