import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

// design.md 7: smooth wheel scrolling on a desktop mouse only. Phones keep their native scroll,
// and reduced motion turns it off.
const SMOOTH_QUERY = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'
const SCRIPTED_SAFETY_MS = 2500

let lenis = null

const easeInOutQuart = (t) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2)

// While a nav tap is carrying the page, nothing may scroll it by script: any other scroll call
// cancels a native smooth scroll halfway. Work that would scroll waits for the landing instead.
let scripted = null
let waiting = []

function endScripted() {
  if (!scripted) return
  clearTimeout(scripted.timer)
  scripted = null
  const run = waiting
  waiting = []
  run.forEach((fn) => fn())
}

function handleScrollEnd() {
  if (!scripted) return
  // A scroll cut short by the next tap also ends with scrollend; only the landing counts.
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const landed = Math.abs(window.scrollY - Math.min(scripted.target, maxScroll)) < 2
  if (landed) endScripted()
}

function beginScripted(target) {
  if (scripted) clearTimeout(scripted.timer)
  scripted = { target, timer: window.setTimeout(endScripted, SCRIPTED_SAFETY_MS) }
}

export function isScriptedScroll() {
  return scripted !== null
}

export function whenScrollSettles(fn) {
  if (scripted) waiting.push(fn)
  else fn()
}

export function initSmoothScroll() {
  const query = window.matchMedia(SMOOTH_QUERY)
  const apply = () => {
    if (query.matches && !lenis) {
      lenis = new Lenis({ autoRaf: true })
    } else if (!query.matches && lenis) {
      lenis.destroy()
      lenis = null
    }
  }
  apply()
  query.addEventListener('change', apply)

  window.addEventListener('scrollend', handleScrollEnd)
  // The reader taking over ends the scripted scroll too; a tap on the nav itself starts the next one.
  const takeOver = (event) => {
    if (event.target instanceof Element && event.target.closest('[data-scroll-nav]')) return
    endScripted()
  }
  for (const type of ['wheel', 'touchstart', 'keydown']) {
    window.addEventListener(type, takeOver, { passive: true })
  }
}

// Moves the page by `delta` at once, telling Lenis too, so it does not carry on towards an old target.
// The page may have just changed height (Experience's pin space), so Lenis re-measures first; its
// cached height would otherwise cut the scroll short.
export function scrollByInstant(delta) {
  if (lenis) {
    lenis.resize()
    lenis.scrollTo(window.scrollY + delta, { immediate: true, force: true })
  } else {
    window.scrollBy({ top: delta, behavior: 'instant' })
  }
}

function jumpTo(y) {
  if (lenis) lenis.scrollTo(y, { immediate: true, force: true })
  else window.scrollTo({ top: y, behavior: 'instant' })
}

// Every scripted scroll goes through here: the nav, Home and the Experience rows. `via` is a point the
// page jumps to at once before the smooth part (the edge of Experience's pin space, sectionScroll.js).
export function scrollToY(top, { via } = {}) {
  const target = Math.max(0, Math.round(top))
  if (via !== undefined && Math.abs(via - window.scrollY) >= 1) {
    beginScripted(target)
    jumpTo(Math.round(via))
  }
  const distance = Math.abs(target - window.scrollY)
  if (distance < 1) {
    endScripted()
    return
  }
  beginScripted(target)
  if (lenis) {
    lenis.scrollTo(target, {
      duration: Math.min(1.4, 0.6 + distance / 4000),
      easing: easeInOutQuart,
      onComplete: endScripted,
    })
    return
  }
  const reduced = window.matchMedia(REDUCED_QUERY).matches
  window.scrollTo({ top: target, behavior: reduced ? 'instant' : 'smooth' })
  if (reduced) endScripted()
}
