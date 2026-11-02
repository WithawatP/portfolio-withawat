import contourSvg from '../../assets/contour-hero.svg?raw'

// Inlined from the untouched asset so the level groups (svg > g) can move in the parallax.
export default function ContourHero({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      // Its own layer, so scrolling does not repaint the SVG filter on every frame.
      className={`contour-fade pointer-events-none overflow-hidden [contain:paint] [transform:translateZ(0)] [&_svg]:absolute [&_svg]:inset-0 [&_svg]:h-full [&_svg]:w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: contourSvg }}
    />
  )
}
