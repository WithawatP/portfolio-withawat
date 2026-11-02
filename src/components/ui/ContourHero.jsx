import contourSvg from '../../assets/contour-hero.svg?raw'

// Inlined from the untouched asset so the level groups (svg > g) can move in the parallax.
export default function ContourHero({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`contour-fade pointer-events-none overflow-hidden [&_svg]:absolute [&_svg]:inset-0 [&_svg]:h-full [&_svg]:w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: contourSvg }}
    />
  )
}
