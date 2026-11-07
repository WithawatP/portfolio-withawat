import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { CONTENT } from './lib/content'

// Build-time only (scripts/prerender.mjs). Each language is its own page: / and /th/ (L1).
export const LANGS = Object.keys(CONTENT)

// The <head> text of a language's page; null for English, whose text is written in index.html.
export const headFor = (lang) => CONTENT[lang].meta ?? null

// The page's HTML, so it is readable before and without JavaScript.
export function render(lang) {
  return renderToString(
    <StrictMode>
      <App lang={lang} />
    </StrictMode>
  )
}
