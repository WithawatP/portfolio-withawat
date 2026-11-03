import { useEffect, useLayoutEffect } from 'react'

const WIDE_QUERY = '(min-width: 900px)'
const POINTER_QUERY =
  '(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
// At >= 900px the levels finish rising after this much scroll; below that, when the band leaves the screen.
const RISE_END_PX = 400
// How far each contour level follows the mouse, in px either way: outer, middle, inner.
const POINTER_REACH = [8, 20, 36]
// Time constant of the follow, so it feels the same at any refresh rate.
const SMOOTHING_MS = 120
const SETTLED_PX = 0.01

// The levels' easing in index.css: linear() samples of this curve.
const easeOutQuad = (p) => 1 - (1 - p) ** 2

// Gives the scroll-driven CSS its ends: where the Hero and the contour leave the top of the screen,
// and where the levels stop rising. Then, on a desktop mouse, moves each contour level towards the
// pointer while the Hero is on screen. The follow fades out as the levels rise, so the two together
// never close the gap between two levels (design.md 7).
export function useHeroMotion(sectionRef) {
  useLayoutEffect(() => {
    const section = sectionRef.current
    const contour = section?.querySelector('.contour-parallax')
    if (!contour) return undefined
    const wide = window.matchMedia(WIDE_QUERY)

    const measure = () => {
      const pageEnd = (element) => element.getBoundingClientRect().bottom + window.scrollY
      const contourEnd = pageEnd(contour)
      const riseEnd = wide.matches ? Math.min(RISE_END_PX, contourEnd) : contourEnd
      section.style.setProperty('--hero-end', `${pageEnd(section)}px`)
      section.style.setProperty('--contour-end', `${contourEnd}px`)
      section.style.setProperty('--contour-rise-end', `${riseEnd}px`)
      section.dataset.riseEnd = String(riseEnd)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(section)
    observer.observe(contour)
    return () => observer.disconnect()
  }, [sectionRef])

  useEffect(() => {
    const section = sectionRef.current
    const levels = section ? [...section.querySelectorAll('.contour-level')] : []
    if (levels.length === 0) return undefined

    const query = window.matchMedia(POINTER_QUERY)
    const target = { x: 0, y: 0 }
    const current = { x: 0, y: 0 }
    let frame = 0
    let lastTime = 0
    let stopPointer = null

    const paint = () => {
      const riseEnd = Number(section.dataset.riseEnd) || RISE_END_PX
      const strength = 1 - easeOutQuad(Math.min(Math.max(window.scrollY / riseEnd, 0), 1))
      levels.forEach((level, index) => {
        const reach = (POINTER_REACH[index] ?? 0) * strength
        level.style.translate = `${(current.x * reach).toFixed(2)}px ${(current.y * reach).toFixed(2)}px`
      })
    }

    const tick = (time) => {
      const blend = 1 - Math.exp(-(time - (lastTime || time - 16)) / SMOOTHING_MS)
      lastTime = time
      current.x += (target.x - current.x) * blend
      current.y += (target.y - current.y) * blend

      // Compared at the largest reach, so the movement stops only once no level can visibly change.
      const largest = Math.max(...POINTER_REACH)
      const settled =
        Math.abs(target.x - current.x) * largest < SETTLED_PX &&
        Math.abs(target.y - current.y) * largest < SETTLED_PX
      if (settled) {
        current.x = target.x
        current.y = target.y
      }
      paint()
      frame = settled ? 0 : requestAnimationFrame(tick)
    }

    const wake = () => {
      if (frame) return
      lastTime = 0
      frame = requestAnimationFrame(tick)
    }

    const startPointer = () => {
      if (stopPointer) return
      const handleMove = (event) => {
        if (event.pointerType !== 'mouse') return
        target.x = (event.clientX / window.innerWidth) * 2 - 1
        target.y = (event.clientY / window.innerHeight) * 2 - 1
        wake()
      }
      const handleLeave = () => {
        target.x = 0
        target.y = 0
        wake()
      }
      // The follow's strength depends on the scroll, so a scroll repaints it too.
      const handleScroll = () => {
        if (current.x !== 0 || current.y !== 0) wake()
      }
      window.addEventListener('pointermove', handleMove, { passive: true })
      window.addEventListener('scroll', handleScroll, { passive: true })
      document.documentElement.addEventListener('pointerleave', handleLeave)
      stopPointer = () => {
        window.removeEventListener('pointermove', handleMove)
        window.removeEventListener('scroll', handleScroll)
        document.documentElement.removeEventListener('pointerleave', handleLeave)
        cancelAnimationFrame(frame)
        frame = 0
        stopPointer = null
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) startPointer()
      else stopPointer?.()
    })

    const apply = () => {
      observer.disconnect()
      stopPointer?.()
      if (query.matches) {
        observer.observe(section)
        return
      }
      target.x = target.y = current.x = current.y = 0
      levels.forEach((level) => level.style.removeProperty('translate'))
    }

    apply()
    query.addEventListener('change', apply)
    return () => {
      query.removeEventListener('change', apply)
      observer.disconnect()
      stopPointer?.()
    }
  }, [sectionRef])
}
