import contourSvg from '../../assets/contour-footer.svg?raw'

const art = contourSvg.replace(/<metadata>.*?<\/metadata>/s, '')
const svgOpen = art.match(/<svg[^>]*>/)[0]
const defs = art.match(/<defs>.*?<\/defs>/s)[0]

// One <svg> per wave level, from the untouched asset, so each level is its own layer and sliding it
// never repaints the filter. The filter lives in the first one and the others point at it.
const levels = [...art.matchAll(/<g\b[^>]*>.*?<\/g>/gs)]
  .map((match) => match[0])
  .filter((group) => group.includes('<path'))
  .map((group, index) => `${svgOpen}${index === 0 ? defs : ''}${group}</svg>`)

// Rendered at >= 900px only. App.jsx leaves it out below that, so phones never paint its filter.
export default function ContourFooter() {
  return (
    <div
      aria-hidden="true"
      className="footer-fade footer-parallax pointer-events-none absolute inset-0 overflow-hidden [&_svg]:absolute [&_svg]:left-0 [&_svg]:top-0 [&_svg]:h-full [&_svg]:w-full [&_svg]:overflow-visible"
    >
      {levels.map((html, index) => (
        <div
          key={index}
          className={`footer-level footer-level-${index + 1} absolute inset-0`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ))}
    </div>
  )
}
