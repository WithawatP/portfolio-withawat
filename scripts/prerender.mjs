// Last build step (package.json "build"): renders the app once with the server bundle from dist-ssr and
// writes the markup into dist/index.html, so the page's content is in the HTML before any JavaScript runs.
// main.jsx then hydrates it. dist-ssr is deleted afterwards, whether or not this succeeds.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ssrDir = fileURLToPath(new URL('../dist-ssr/', import.meta.url))
const page = fileURLToPath(new URL('../dist/index.html', import.meta.url))
const MARKER = '<!--app-html-->'

try {
  const { render } = await import(pathToFileURL(`${ssrDir}entry-server.js`).href)
  const html = readFileSync(page, 'utf8')
  if (!html.includes(MARKER)) throw new Error(`${MARKER} is missing from dist/index.html`)
  const markup = render()
  if (!markup.includes('<h1')) throw new Error('the rendered markup has no <h1>')
  // A function, so "$" in the markup is never read as a replacement pattern.
  writeFileSync(page, html.replace(MARKER, () => markup))
  console.log(`prerender: ${(markup.length / 1024).toFixed(1)} kB of markup written into dist/index.html`)
} finally {
  rmSync(ssrDir, { recursive: true, force: true })
}
