import { useEffect } from 'react'

const REST = -1
const RANGE = 0.2
const EASE = 0.12
const EPSILON = 0.002

// Shifts the light direction inside one section so it follows the pointer. The values stay on that
// section, never on :root. Touch devices get the scroll version in index.css instead.
export function useHeroLight(sectionId) {
  useEffect(() => {
    const node = document.getElementById(sectionId)
    if (
      !node ||
      !window.matchMedia('(hover: hover)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return undefined
    }

    const target = { x: REST, y: REST }
    const current = { x: REST, y: REST }
    let frame = 0

    const tick = () => {
      current.x += (target.x - current.x) * EASE
      current.y += (target.y - current.y) * EASE
      const settled =
        Math.abs(target.x - current.x) < EPSILON &&
        Math.abs(target.y - current.y) < EPSILON

      if (settled) {
        current.x = target.x
        current.y = target.y
      }

      node.style.setProperty('--lx', current.x.toFixed(3))
      node.style.setProperty('--ly', current.y.toFixed(3))
      frame = settled ? 0 : requestAnimationFrame(tick)
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const handleMove = (event) => {
      const rect = node.getBoundingClientRect()
      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1
      target.x = REST + nx * RANGE
      target.y = REST + ny * RANGE
      start()
    }

    const handleLeave = () => {
      target.x = REST
      target.y = REST
      start()
    }

    node.addEventListener('pointermove', handleMove, { passive: true })
    node.addEventListener('pointerleave', handleLeave)

    return () => {
      cancelAnimationFrame(frame)
      node.removeEventListener('pointermove', handleMove)
      node.removeEventListener('pointerleave', handleLeave)
      node.style.removeProperty('--lx')
      node.style.removeProperty('--ly')
    }
  }, [sectionId])
}
