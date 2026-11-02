import { useCallback, useEffect, useRef, useState } from 'react'

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

      const bandTop = window.innerHeight * 0.45
      const bandBottom = window.innerHeight * 0.5
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
      if (!supportsScrollEnd) {
        settleTimer = window.setTimeout(release, SCROLL_SETTLE_MS)
      }
    }

    navigateRef.current = lockTo

    const observer = new IntersectionObserver(
      (entries) => {
        if (lockId) return
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))

    const handleScroll = () => {
      const y = window.scrollY
      const moved = y !== lastScrollY
      lastScrollY = y

      if (lockId) {
        if (moved) {
          scheduleSafety()
          if (!supportsScrollEnd) {
            if (settleTimer) clearTimeout(settleTimer)
            settleTimer = window.setTimeout(release, SCROLL_SETTLE_MS)
          }
        }
        return
      }

      if (isAtBottom()) setActiveId(lastId)
    }

    const isInsideNav = (target) =>
      target instanceof Element && Boolean(target.closest('[data-scroll-nav]'))

    const handleScrollEnd = () => {
      if (lockId) release()
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
    window.addEventListener('scrollend', handleScrollEnd)
    window.addEventListener('wheel', handleWheel, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    handleScroll()

    return () => {
      navigateRef.current = null
      clearTimers()
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scrollend', handleScrollEnd)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [sectionIds])

  return [activeId, navigateTo]
}
