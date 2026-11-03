import { scrollToY } from './smoothScroll'

// design.md 5: where a nav tap lands. The desktop capsule ends 76px down; a section taller than the
// free area lands 48px under it. On a phone the free area runs from the status bar to the bottom capsule.
const CAPSULE_BOTTOM = 76
const GAP_UNDER_CAPSULE = 48

let safeTopProbe = null

function safeAreaTop() {
  if (!safeTopProbe) {
    safeTopProbe = document.createElement('div')
    safeTopProbe.setAttribute('aria-hidden', 'true')
    safeTopProbe.style.cssText =
      'position:fixed;top:0;left:0;width:0;height:env(safe-area-inset-top);visibility:hidden;pointer-events:none'
    document.body.append(safeTopProbe)
  }
  return safeTopProbe.offsetHeight
}

const isWide = () => window.matchMedia('(min-width: 900px)').matches

// The part of the screen the nav capsule does not cover, in viewport px.
export function freeArea() {
  const height = window.innerHeight
  if (isWide()) return { top: CAPSULE_BOTTOM, bottom: height }
  const nav = document.querySelector('[data-scroll-nav]')
  const bottom = nav ? nav.getBoundingClientRect().top : height
  return { top: safeAreaTop(), bottom }
}

// The scroll range over which Experience stays pinned (desktop only), in page px.
function pinRange() {
  const section = document.querySelector('[data-pin-top]')
  if (!section) return null
  const start = section.getBoundingClientRect().top + window.scrollY - Number(section.dataset.pinTop)
  const space = section.querySelector('[data-pin-space]')
  return { start, end: start + (space ? space.offsetHeight : 0) }
}

export function sectionTarget(id) {
  const section = document.getElementById(id)
  if (!section) return null
  // A pinned section lands where it starts to stick, on its first role.
  if (section.dataset.pinTop !== undefined) return pinRange().start
  const { top, bottom } = freeArea()
  const rect = section.getBoundingClientRect()
  const pageTop = rect.top + window.scrollY
  const free = bottom - top
  const target =
    rect.height <= free
      ? pageTop - top - (free - rect.height) / 2
      : pageTop - (isWide() ? CAPSULE_BOTTOM + GAP_UNDER_CAPSULE : top)
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  return Math.min(Math.max(target, 0), maxScroll)
}

// A nav scroll never travels through the pin space: that would open every role on the way. If the route
// crosses it, the page jumps at once to the edge nearest the destination and scrolls smoothly from there.
export function navigateToY(target) {
  const range = pinRange()
  const from = window.scrollY
  let via
  if (range && Math.min(from, target) < range.end && Math.max(from, target) > range.start) {
    if (target <= range.start) via = range.start
    else if (target >= range.end) via = range.end
  }
  scrollToY(target, { via })
}

export function scrollToSection(event, id) {
  event.preventDefault()
  if (id === 'home') {
    // The Hero starts below the WP row, so Home goes to the very top instead.
    window.history.pushState(null, '', window.location.pathname + window.location.search)
    navigateToY(0)
    return
  }
  const target = sectionTarget(id)
  if (target === null) return
  window.history.pushState(null, '', `#${id}`)
  navigateToY(target)
}
