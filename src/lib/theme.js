import { useSyncExternalStore } from 'react'

// design.md 2, dark theme. The inline script in index.html sets <html data-theme> before the first paint
// (a stored choice, else the system's); from then on this module owns it. CSS reads the attribute, so the
// theme never waits for React. The key is shared with that script.
const STORAGE_KEY = 'theme'
const SYSTEM_DARK = '(prefers-color-scheme: dark)'

const listeners = new Set()

const readStored = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'dark' || value === 'light' ? value : null
  } catch {
    return null
  }
}

export const getTheme = () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')

function paint(theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  // The browser bar follows the page ground (index.html sets it first).
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.content = getComputedStyle(root).getPropertyValue('--color-ground').trim()
  listeners.forEach((listener) => listener())
}

// The reader's choice: kept, and it wins over the system from then on. The page cross-fades over 0.4s
// (index.css) where View Transitions exist and motion is allowed; otherwise it changes at once.
export function setTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // Private mode or blocked storage: the theme still changes for this visit.
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (document.startViewTransition && !reduce) document.startViewTransition(() => paint(theme))
  else paint(theme)
}

// Until the reader chooses, a change of the system theme applies at once. One system listener, held
// while any component listens.
let stopSystem = null

function subscribe(listener) {
  listeners.add(listener)
  if (!stopSystem) {
    const system = window.matchMedia(SYSTEM_DARK)
    const onSystem = (event) => {
      if (!readStored()) paint(event.matches ? 'dark' : 'light')
    }
    system.addEventListener('change', onSystem)
    stopSystem = () => system.removeEventListener('change', onSystem)
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0 && stopSystem) {
      stopSystem()
      stopSystem = null
    }
  }
}

// 'light' in the prerendered HTML and while hydrating (there is no document on the server), then the
// real theme, the same way useMediaQuery avoids a hydration mismatch.
export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => 'light')
}
