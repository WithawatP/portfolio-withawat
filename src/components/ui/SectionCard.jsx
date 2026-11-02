import { useEffect, useRef } from 'react'
import { LEVEL_1 } from '../../lib/styles'

export default function SectionCard({
  id,
  labelledBy,
  className = '',
  extrude = true,
  children,
}) {
  const ref = useRef(null)

  // Browsers with scroll-driven animations run the extrude in CSS. Others play it once on entry;
  // the attribute is only set here, so without JavaScript the section simply stays raised.
  useEffect(() => {
    const node = ref.current
    if (
      !node ||
      !extrude ||
      CSS.supports('animation-timeline: view()') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return undefined
    }

    node.dataset.extrude = 'pending'
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        node.dataset.extrude = 'done'
        observer.disconnect()
      },
      { rootMargin: '0px 0px -10% 0px' }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [extrude])

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={labelledBy}
      className={`${LEVEL_1} ${extrude ? 'extrude' : ''} ${className}`}
    >
      {children}
    </section>
  )
}
