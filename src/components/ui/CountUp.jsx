import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../../lib/useMediaQuery'

// design.md 7: a large accent numeral counts up (0.8s, ease-out) when it first comes into view, when it
// becomes active (the Test side), and from its old value to a new one. The final value, invisible, sets
// the box, so the text beside it never moves; the counting digits sit over it and may run past its edge.
// Screen readers get the real value at all times. Reduced motion shows the real value at once.
const DURATION_MS = 800
const easeOutCubic = (t) => 1 - (1 - t) ** 3
export default function CountUp({ value, active = true, align = 'start' }) {
  const boxRef = useRef(null)
  // Reduced motion shows the real value and never counts. False in the prerendered HTML (useMediaQuery).
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  // The real value in the prerendered HTML and the first render, so the page reads right without
  // JavaScript and hydration matches. The layout effect below then sets it to 0 if it still has to count.
  const [shown, setShown] = useState(value)
  const live = useRef({ shown: value, seen: false, frame: 0, active, value })

  const show = (next) => {
    live.current.shown = next
    setShown(next)
  }

  const run = (from, to) => {
    cancelAnimationFrame(live.current.frame)
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / DURATION_MS, 1)
      show(Math.round(from + (to - from) * easeOutCubic(t)))
      live.current.frame = t < 1 ? requestAnimationFrame(tick) : 0
    }
    live.current.frame = requestAnimationFrame(tick)
  }

  useEffect(() => {
    const state = live.current
    return () => cancelAnimationFrame(state.frame)
  }, [])

  // Once mounted (hydrated), before paint: a numeral off screen, or not displayed (the phone Skills tray),
  // waits at 0 and counts up when it comes into view or becomes active. One already on screen keeps its
  // value and counts as seen. With reduced motion the value shows either way (the render below).
  useLayoutEffect(() => {
    const box = boxRef.current.getBoundingClientRect()
    const onScreen = box.width > 0 && box.bottom > 0 && box.top < window.innerHeight
    if (onScreen) live.current.seen = true
    else show(0)
  }, [])

  // (a) First time on screen, if active.
  useEffect(() => {
    if (reduced) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        const state = live.current
        if (!entry.isIntersecting || state.seen || !state.active) return
        state.seen = true
        run(0, state.value)
        observer.disconnect()
      },
      { threshold: 0.5 }
    )
    observer.observe(boxRef.current)
    return () => observer.disconnect()
  }, [reduced])

  // (b) Becoming active counts from 0. (c) A new value counts from what is shown now.
  useEffect(() => {
    const state = live.current
    const wasActive = state.active
    const oldValue = state.value
    state.active = active
    state.value = value
    if (reduced) return
    if (active && !wasActive) {
      state.seen = true
      run(0, value)
    } else if (active && value !== oldValue && state.seen) {
      run(state.shown, value)
    }
  }, [active, value, reduced])

  return (
    <span ref={boxRef} className="relative inline-block">
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="invisible">
        {value}
      </span>
      <span
        aria-hidden="true"
        className={`absolute top-0 whitespace-nowrap ${align === 'end' ? 'right-0' : 'left-0'}`}
      >
        {reduced ? value : shown}
      </span>
    </span>
  )
}
