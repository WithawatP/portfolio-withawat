import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initSmoothScroll } from './lib/smoothScroll'
import { langFromPath } from './lib/content'

// The scroll hold in index.html waits for hydration from here on, instead of releasing at load.
window.__appStarted = true

// The page starts at the top: index.html sets manual scroll restoration and holds a #hash back before the
// browser could move the page, so there is nothing to reset here. A reset would undo what the reader did
// before hydration (Tab scrolls a focused element into view even while scrolling is held).
initSmoothScroll()

const container = document.getElementById('root')
const prerendered = Boolean(container.firstElementChild)

// /th/ is the Thai page (L1). A built page says its language in <html lang> (scripts/prerender.mjs), and
// hydration must match the HTML that arrived, whatever the path. The dev server serves the English
// index.html for every path, so there the path decides.
const lang = prerendered
  ? document.documentElement.lang === 'th' ? 'th' : 'en'
  : langFromPath(window.location.pathname)
document.documentElement.lang = lang

const app = (
  <StrictMode>
    <App lang={lang} />
  </StrictMode>
)

// The built page arrives with the app's HTML in #root (scripts/prerender.mjs): hydrate it. The dev
// server has only the placeholder comment there, so it renders from scratch.
if (prerendered) hydrateRoot(container, app)
else createRoot(container).render(app)
