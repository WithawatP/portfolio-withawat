import contourSvg from '../../assets/contour-footer.svg?raw'

const art = contourSvg.replace(/<metadata>.*?<\/metadata>/s, '')

// Rendered at >= 900px only. App.jsx leaves it out below that, so phones never paint its filter.
export default function ContourFooter() {
  return (
    <div
      aria-hidden="true"
      className="footer-fade pointer-events-none absolute inset-0 overflow-hidden [&_svg]:absolute [&_svg]:left-0 [&_svg]:top-0 [&_svg]:h-full [&_svg]:w-full"
      dangerouslySetInnerHTML={{ __html: art }}
    />
  )
}
