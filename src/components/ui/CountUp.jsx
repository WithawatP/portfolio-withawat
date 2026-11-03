import { useEffect, useRef, useState } from 'react'

// design.md 7: a large accent numeral counts up (0.8s, ease-out) when it first comes into view, when it
// becomes active (the Test side), and from its old value to a new one. The final value, invisible, sets
// the box, so the text beside it never moves; the counting digits sit over it and may run past its edge.
// Screen readers get the real value at all times. Reduced motion shows the real value at once.
const DURATION_MS = 800
const easeOutCubic = (t) => 1 - (1 - t) ** 3
const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function CountUp({ value, active = true, align = 'start' }) {
  const boxRef = useRef(null)
  // Reduced motion is read once: it shows the real value and never counts.
  const [reduced] = useState(prefersReduced)
  // Until it has been seen, it waits at 0 (a numeral below the fold, or the hidden Test side).
  const [shown, setShown] = useState(0)
  const live = useRef({ shown: 0, seen: false, frame: 0, active, value })

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
