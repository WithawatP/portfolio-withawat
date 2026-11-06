import contourSvg from '../../assets/contour-hero.svg?raw'
import { themeContour } from '../../lib/contourTheme'

const art = themeContour(contourSvg.replace(/<metadata>.*?<\/metadata>/s, ''), 'hero')
const svgOpen = art.match(/<svg[^>]*>/)[0]
const defs = art.match(/<defs>.*?<\/defs>/s)[0]

// One <svg> per level, from the untouched asset, so each level is its own layer and moving it never
// repaints the filter. The filter lives in the first one and the others point at it. The file's last group is empty.
const levels = [...art.matchAll(/<g\b[^>]*>.*?<\/g>/gs)]
  .map((match) => match[0])
  .filter((group) => group.includes('<path'))
  .map((group, index) => `${svgOpen}${index === 0 ? defs : ''}${group}</svg>`)

export default function ContourHero({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      // Its own layer, so scrolling does not repaint the SVG filter on every frame.
      // The art moves inside this clip, so its opaque fill can never cover the section below.
      className={`contour-fade contour-parallax pointer-events-none overflow-hidden [contain:paint] [transform:translateZ(0)] [&_svg]:absolute [&_svg]:inset-0 [&_svg]:h-full [&_svg]:w-full [&_svg]:overflow-visible ${className}`}
    >
      <div className="contour-block absolute inset-0">
        {levels.map((html, index) => (
          <div
            key={index}
            className={`contour-level contour-level-${index + 1} absolute inset-0`}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
      </div>
    </div>
  )
}
