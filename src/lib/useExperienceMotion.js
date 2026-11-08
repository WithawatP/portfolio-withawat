import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { isScriptedScroll, scrollByInstant, whenScrollSettles } from './smoothScroll'

// design.md 8, Experience. Three modes:
// - pinned (>= 900px): the section sticks, centred in the space under the desktop capsule, and each role
//   gets 40svh of scroll (the [data-pin-space] box in Experience.jsx).
// - manual (>= 900px): a click while pinned. The pin lets go at once and rows toggle freely, several
//   open at a time, until the section has left the screen; then it pins again.
// - accordion: phones, reduced motion, or a desktop screen too short to pin. Click only, single open.
const CAPSULE_BOTTOM = 76
const PIN_TOP_MIN = 124 // 48px under the capsule, where a nav tap lands a tall section (design.md 5)
const PIN_BOTTOM_GAP = 24
const MIN_PIN_SCREEN = 600
const TOP_MARGIN = 96 // accordion: about one closed row, so the row above stays on screen

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)'
const WIDE_QUERY = '(min-width: 900px)'

function rowParts(list) {
  return [...list.querySelectorAll('[data-row]')].map((row) => ({
    row,
    button: row.querySelector('[data-row-button]'),
    panel: row.querySelector('[data-row-panel]'),
    details: row.querySelector('[data-row-details]'),
  }))
}

// The panel's top margin: 0, or on a phone's open row the negative pull up under the title.
const panelMargin = (part) => parseFloat(getComputedStyle(part.panel).marginTop) || 0
const finalPanelMargin = (part, isOpen) =>
  isOpen && part.panel.style.marginTop ? parseFloat(part.row.style.getPropertyValue('--meta-pull')) || 0 : 0

// A row's height once its panel stops moving. Only the panel animates (its height and, on a phone, its
// top margin), so the rest is its height now.
const finalRowHeight = (part, isOpen) =>
  part.row.offsetHeight -
  part.panel.offsetHeight -
  panelMargin(part) +
  finalPanelMargin(part, isOpen) +
  (isOpen ? part.details.offsetHeight : 0)

// How far an open panel moves up into the empty part of its title button (phones, design.md 8).
function measureMetaPull(parts) {
  parts.forEach((part) => {
    const lines = part.button.firstElementChild
    part.row.style.setProperty('--meta-pull', `${lines.offsetHeight - part.button.offsetHeight}px`)
  })
}

// Changes the open rows while one point stays still on screen: the listed panels close at once, and the
// page scrolls by the difference before the browser paints. Scrolling on every frame of an animated
// collapse made the rows shake on phones, so this scrolls once.
function changeKeepingPoint(measure, instantPanels, change) {
  const before = measure()
  instantPanels.forEach((panel) => {
    panel.style.transition = 'none'
  })
  flushSync(change)
  const delta = measure() - before
  if (delta) scrollByInstant(delta)
  instantPanels.forEach((panel) => {
    void panel.offsetHeight
    panel.style.transition = ''
  })
}

function pinGeometry(section, count, pinTop) {
  const start = section.getBoundingClientRect().top + window.scrollY - pinTop
  const space = section.querySelector('[data-pin-space]')
  const step = (space ? space.offsetHeight : 0) / count || 1
  return { start, step }
}

export function useExperienceMotion({ sectionRef, listRef, count }) {
  const [mode, setMode] = useState('accordion')
  const [open, setOpen] = useState([0])
  // The rail LED sits on the role opened (or, on a desktop, clicked) last, so it never goes out.
  const [led, setLed] = useState(0)
  const [ledY, setLedY] = useState(0)
  const [pinnedListHeight, setPinnedListHeight] = useState(0)
  const [pinTop, setPinTop] = useState(PIN_TOP_MIN)
  // The scroll hint under the pinned block: on while the pin holds a role before the last one.
  const [hint, setHint] = useState(false)
  const pinnable = useRef(false)

  // The latest committed state, for scroll handlers and observers. Declared first, so it is current
  // before the other layout effects run.
  const state = useRef({ mode, open, led, pinTop })
  useLayoutEffect(() => {
    state.current = { mode, open, led, pinTop }
  })

  const openOnly = useCallback((index) => {
    setOpen([index])
    setLed(index)
  }, [])

  // The LED's place on the rail: the rows above the lit one, at their final heights.
  const placeLed = useCallback(() => {
    const parts = rowParts(listRef.current)
    const openRows = new Set(state.current.open)
    let y = 0
    for (let index = 0; index < state.current.led; index += 1) {
      y += finalRowHeight(parts[index], openRows.has(index))
    }
    setLedY(y)
  }, [listRef])

  // Whether the pinned mode fits, how tall the list is with its longest role open, and where the pinned
  // block sits: centred in the space under the capsule, never higher than 124px. This runs when the
  // width or the screen changes, never while a row animates its height.
  useLayoutEffect(() => {
    const section = sectionRef.current
    const list = listRef.current
    const reduced = window.matchMedia(REDUCED_QUERY)
    const wide = window.matchMedia(WIDE_QUERY)

    const evaluate = () => {
      const parts = rowParts(list)
      measureMetaPull(parts)
      const longest =
        parts.reduce((sum, part) => sum + finalRowHeight(part, false), 0) +
        Math.max(...parts.map((part) => part.details.offsetHeight))
      setPinnedListHeight(longest)

      const header = section.querySelector('header')
      const headerContent =
        header.lastElementChild.getBoundingClientRect().bottom - header.getBoundingClientRect().top
      const block = Math.max(longest, headerContent)
      const screen = window.innerHeight
      setPinTop(Math.max(PIN_TOP_MIN, Math.round(CAPSULE_BOTTOM + (screen - CAPSULE_BOTTOM - block) / 2)))

      const fits = screen >= MIN_PIN_SCREEN && PIN_TOP_MIN + block + PIN_BOTTOM_GAP <= screen
      pinnable.current = !reduced.matches && wide.matches && fits
      const current = state.current.mode
      // A desktop reader who clicked keeps control until the section leaves the screen.
      const next = pinnable.current ? (current === 'manual' ? 'manual' : 'pinned') : 'accordion'
      if (next !== current) {
        setMode(next)
        setOpen([state.current.led])
      }
      placeLed()
    }

    let width = section.offsetWidth
    const observer = new ResizeObserver(() => {
      if (section.offsetWidth === width) return
      width = section.offsetWidth
      evaluate()
    })
    evaluate()
    observer.observe(section)
    document.fonts?.ready.then(evaluate)
    window.addEventListener('resize', evaluate)
    reduced.addEventListener('change', evaluate)
    wide.addEventListener('change', evaluate)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', evaluate)
      reduced.removeEventListener('change', evaluate)
      wide.removeEventListener('change', evaluate)
    }
  }, [sectionRef, listRef, placeLed])

  useLayoutEffect(placeLed, [placeLed, open, led, mode])

  // Pinned: the scroll inside the pin space picks the role. While a nav tap carries the page, the open
  // role stays as it is; on landing inside the pin space it catches up.
  useEffect(() => {
    if (mode !== 'pinned') return undefined
    const section = sectionRef.current
    let frame = 0
    let deferred = false

    // On inside the pin until the last role's step; off while a nav tap carries the page.
    const showHint = () => {
      const { start, step } = pinGeometry(section, count, state.current.pinTop)
      const y = window.scrollY
      setHint(!isScriptedScroll() && y >= start - 1 && y < start + (count - 1) * step)
    }

    const pick = (onlyInside) => {
      const { start, step } = pinGeometry(section, count, state.current.pinTop)
      const y = window.scrollY
      if (onlyInside && (y < start - 1 || y >= start + count * step)) return
      const index = Math.min(Math.max(Math.floor((y - start) / step), 0), count - 1)
      const current = state.current
      if (index !== current.led || current.open.length !== 1 || current.open[0] !== index) {
        openOnly(index)
      }
    }

    const update = () => {
      frame = 0
      showHint()
      if (isScriptedScroll()) {
        if (!deferred) {
          deferred = true
          whenScrollSettles(() => {
            deferred = false
            pick(true)
            showHint()
          })
        }
        return
      }
      pick(false)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    // A frame later, not now: when the pin comes back from manual, the page is scrolled to keep the
    // reader's place right after this effect may run, and the role must match that final position.
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      setHint(false)
    }
  }, [mode, count, sectionRef, openOnly])

  // Manual: once the section is fully off the screen, the pin comes back, with the role that matches
  // where the reader is. A reader below the section sees nothing move: the page scrolls by what the
  // section grew. Waits for a nav tap to land first, since a scroll would stop it.
  useEffect(() => {
    if (mode !== 'manual') return undefined
    const section = sectionRef.current
    const list = listRef.current
    let cancelled = false

    const restore = () => {
      if (cancelled || !pinnable.current) return
      const rect = section.getBoundingClientRect()
      const readerBelow = rect.bottom <= 0
      if (!readerBelow && rect.top < window.innerHeight) return // back on screen already
      const index = readerBelow ? count - 1 : 0
      changeKeepingPoint(
        () => {
          const now = section.getBoundingClientRect()
          return readerBelow ? now.bottom : now.top
        },
        rowParts(list).map((part) => part.panel),
        () => {
          openOnly(index)
          setMode('pinned')
        }
      )
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) whenScrollSettles(restore)
    })
    observer.observe(section)
    return () => {
      cancelled = true
      observer.disconnect()
    }
  }, [mode, count, sectionRef, listRef, openOnly])

  const handleRowClick = useCallback(
    (index) => {
      const current = state.current
      const isOpen = current.open.includes(index)
      const parts = rowParts(listRef.current)
      const title = parts[index].button
      const toggled = isOpen ? current.open.filter((row) => row !== index) : [...current.open, index]

      // Desktop: a click always wins over the pin. In the same frame the pin lets go, its space goes,
      // the clicked row toggles, and the page scrolls so the clicked title stays where it was.
      if (current.mode === 'pinned' || current.mode === 'manual') {
        changeKeepingPoint(
          () => title.getBoundingClientRect().top,
          [],
          () => {
            setMode('manual')
            setOpen(toggled)
            setLed(index)
          }
        )
        return
      }

      // Accordion. Opening a row collapses the open one, which may sit above it, so the clicked row
      // slides up. That is fine unless the row would pass the top of the screen; then the upper panel
      // closes at once and the page scrolls by the same amount before paint, so the row stays still.
      if (isOpen) {
        setOpen([])
        return
      }
      const openAbove = current.open.find((row) => row < index)
      const top = title.getBoundingClientRect().top
      // What the open row above gives back as it closes: its details, less the pull on a phone.
      const shrink =
        openAbove === undefined ? 0 : parts[openAbove].panel.offsetHeight + panelMargin(parts[openAbove])
      if (openAbove === undefined || top - shrink >= Math.min(top, TOP_MARGIN)) {
        openOnly(index)
        return
      }
      changeKeepingPoint(
        () => title.getBoundingClientRect().top,
        [parts[openAbove].panel],
        () => openOnly(index)
      )
    },
    [listRef, openOnly]
  )

  return { mode, open, ledY, pinnedListHeight, pinTop, hint: mode === 'pinned' && hint, handleRowClick }
}
