import { useCallback, useEffect, useRef, useState } from 'react'
import { freeArea } from './sectionScroll'

const BOTTOM_EPSILON = 4
const LOCK_SAFETY_MS = 1500
const SCROLL_SETTLE_MS = 150

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0])
  const navigateRef = useRef(null)

  const navigateTo = useCallback((id) => {
    if (navigateRef.current) {
      navigateRef.current(id)
      return
    }
    setActiveId(id)
  }, [])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) return undefined

    const lastId = sectionIds[sectionIds.length - 1]
    const supportsScrollEnd = 'onscrollend' in window
    let lockId = null
    let safetyTimer = 0
    let settleTimer = 0
    let lastScrollY = window.scrollY

    const isAtBottom = () => {
      const doc = document.documentElement
      return window.innerHeight + window.scrollY >= doc.scrollHeight - BOTTOM_EPSILON
    }

    const evaluate = () => {
      if (isAtBottom()) {
        setActiveId(lastId)
        return
      }

      // A thin band in the middle of the screen the capsule leaves free, where a nav tap puts a
      // short section (design.md 5). A tall section lands with its top higher, so it covers the band too.
      const free = freeArea()
      const middle = (free.top + free.bottom) / 2
      const halfBand = window.innerHeight * 0.025
      const bandTop = middle - halfBand
      const bandBottom = middle + halfBand
      let bestSection = null
      let bestOverlap = 0

      for (const section of sections) {
        const rect = section.getBoundingClientRect()
        const overlap =
          Math.min(rect.bottom, bandBottom) - Math.max(rect.top, bandTop)

        if (overlap > bestOverlap) {
          bestOverlap = overlap
          bestSection = section
        }
      }

      if (bestSection) setActiveId(bestSection.id)
    }

    const clearTimers = () => {
      if (safetyTimer) {
        clearTimeout(safetyTimer)
        safetyTimer = 0
      }
      if (settleTimer) {
        clearTimeout(settleTimer)
        settleTimer = 0
      }
    }

    const scheduleSafety = () => {
      if (safetyTimer) clearTimeout(safetyTimer)
      safetyTimer = window.setTimeout(release, LOCK_SAFETY_MS)
    }

    const release = () => {
      if (!lockId) return
      lockId = null
      clearTimers()
      evaluate()
    }

    const scheduleSettle = () => {
      if (settleTimer) clearTimeout(settleTimer)
      settleTimer = window.setTimeout(release, SCROLL_SETTLE_MS)
    }

    const lockTo = (id) => {
      setActiveId(id)
      lockId = id
      clearTimers()

      if (prefersReducedMotion()) {
        lockId = null
        window.setTimeout(evaluate, 0)
        return
      }

      scheduleSafety()
      if (!supportsScrollEnd) scheduleSettle()
    }

    navigateRef.current = lockTo

    // Read once per frame at most, after the scroll, instead of an IntersectionObserver whose
    // margins would have to be rebuilt whenever the band moves.
    let frame = 0
    const scheduleEvaluate = () => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        if (!lockId) evaluate()
      })
    }

    const handleScroll = () => {
      const y = window.scrollY
      const moved = y !== lastScrollY
      lastScrollY = y

      if (lockId) {
        if (moved) {
          scheduleSafety()
          if (settleTimer) {
            clearTimeout(settleTimer)
            settleTimer = 0
          }
          if (!supportsScrollEnd) scheduleSettle()
        }
        return
      }

      scheduleEvaluate()
    }

    const isInsideNav = (target) =>
      target instanceof Element && Boolean(target.closest('[data-scroll-nav]'))

    // A scroll cut short by a new tap also ends with scrollend, while the new scroll is about to start.
    // So release only if the page then stays still; any movement cancels this in handleScroll.
    const handleScrollEnd = () => {
      if (lockId) scheduleSettle()
    }

    const handleWheel = () => release()

    const handleTouchStart = (event) => {
      if (!isInsideNav(event.target)) release()
    }

    const handlePointerDown = (event) => {
      if (!isInsideNav(event.target)) release()
    }

    const handleKeyDown = (event) => {
      const takeoverKeys = [
        'ArrowUp',
        'ArrowDown',
        'PageUp',
        'PageDown',
        'Home',
        'End',
        ' ',
      ]
      if (takeoverKeys.includes(event.key)) release()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', scheduleEvaluate)
    window.addEventListener('scrollend', handleScrollEnd)
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    handleScroll()

    return () => {
      navigateRef.current = null
      clearTimers()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', scheduleEvaluate)
      window.removeEventListener('scrollend', handleScrollEnd)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [sectionIds])

  return [activeId, navigateTo]
}
