import { useEffect, useRef } from 'react'
import contourSvg from '../../assets/contour-experience.svg?raw'
import { themeContour } from '../../lib/contourTheme'

const art = themeContour(contourSvg.replace(/<metadata>.*?<\/metadata>/s, ''), 'experience')
const svgOpen = art.match(/<svg[^>]*>/)[0]
// The file's filter (offset 7, blur 7, shadow 0.8, light 0.85) reads about twice as heavy on this site
// as the footer waves (edges 18-22 levels under the ground, against the footer's 11). These values
// match the footer at 1440 and 1920 (measured on screenshots); the paths are untouched. The shadow and
// light opacities (0.4 and 0.65 in light) are tokens now: --contour-experience-* in index.css.
const filter = art
  .match(/<filter[\s\S]*?<\/filter>/)[0]
  .replace('dx="7" dy="7"', 'dx="6" dy="6"')
  .replace('dx="-5.6" dy="-5.6"', 'dx="-4.8" dy="-4.8"')
  .replaceAll('stdDeviation="7"', 'stdDeviation="5"')

// One <svg> per band from the untouched asset, each with its own copy of the filter under its own id,
// so each band is its own layer: moving it never re-filters it.
const bands = [...art.matchAll(/<g\b[^>]*>.*?<\/g>/gs)]
  .map((match) => match[0])
  .filter((group) => group.includes('<path'))
  .map((group, index) => {
    const id = `debx-${index}`
    return `${svgOpen}<defs>${filter.replace('id="debx"', `id="${id}"`)}</defs>${group.replace('url(#debx)', `url(#${id})`)}</svg>`
  })

// design.md 7: where each band (top to bottom) has moved, in px, at the end of the travel.
const SHIFT = [
  [0, 0],
  [-24, -30],
  [-48, -60],
  [-80, -100],
]
const easeOutQuad = (p) => 1 - (1 - p) ** 2

// Faint waves behind Experience at >= 900px. The travel runs from the section entering the screen to the
// end of its pin, read from the pin's own marks on the section (data-pin-top, [data-pin-space]).
// `animate` false freezes the bands where they are (manual mode) or leaves them still (reduced motion).
export default function ContourExperience({ sectionRef, animate }) {
  const levelsRef = useRef([])

  useEffect(() => {
    if (!animate) return undefined
    const section = sectionRef.current
    const levels = levelsRef.current
    let frame = 0

    const update = () => {
      frame = 0
      const space = section.querySelector('[data-pin-space]')
      const pinTop = Number(section.dataset.pinTop)
      if (!space || !pinTop) return
      const y = window.scrollY
      const top = section.getBoundingClientRect().top + y
      const start = top - window.innerHeight
      const end = top - pinTop + space.offsetHeight
      const progress = Math.min(Math.max((y - start) / (end - start), 0), 1)
      const eased = easeOutQuad(progress)
      levels.forEach((level, index) => {
        const [x, shiftY] = SHIFT[index]
        level.style.transform = `translate3d(${(x * eased).toFixed(2)}px, ${(shiftY * eased).toFixed(2)}px, 0)`
      })
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [animate, sectionRef])

  return (
    // Full screen width, from the top of the frame to 140px below it, clipped here and nowhere above:
    // an overflow on any ancestor of the sticky frame would stop it sticking.
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-[140px] left-[calc(50%-50vw)] top-0 -z-10 w-screen [overflow:clip] [&_svg]:absolute [&_svg]:inset-0 [&_svg]:h-full [&_svg]:w-full [&_svg]:overflow-visible"
    >
      {bands.map((html, index) => (
        <div
          key={index}
          ref={(node) => {
            levelsRef.current[index] = node
          }}
          className="absolute inset-0 will-change-transform"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ))}
      {/* Still fades over the moving bands, not a mask on them, so the bands stay cached layers: the top
          keeps the heading on plain ground, the bottom lets the lines fade out instead of being cut. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-ground)_0%,transparent_45%,transparent_80%,var(--color-ground)_100%)]" />
    </div>
  )
}
