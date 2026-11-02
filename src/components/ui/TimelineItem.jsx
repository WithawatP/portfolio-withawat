import { useId, useRef } from 'react'
import Icon from './Icon'

const COLLAPSE_MS = 350
let stopHolding = null

// Opening a row collapses the open one, which may sit above it. Scrolling by the same
// amount each frame keeps the clicked row where it was, instead of sliding off the screen.
function holdInPlace(node) {
  stopHolding?.()
  const top = node.getBoundingClientRect().top
  const end = performance.now() + COLLAPSE_MS
  let frame = 0

  const step = () => {
    const drift = node.getBoundingClientRect().top - top
    if (drift) window.scrollBy({ top: drift, behavior: 'instant' })
    frame = performance.now() < end ? requestAnimationFrame(step) : 0
  }

  frame = requestAnimationFrame(step)
  stopHolding = () => cancelAnimationFrame(frame)
}

export default function TimelineItem({
  role,
  company,
  period,
  highlights = [],
  skills = [],
  isLast,
  open,
  onToggle,
}) {
  const id = useId()
  const buttonId = `${id}-button`
  const panelId = `${id}-panel`
  const headerButtonRef = useRef(null)

  function handleRowClick(event) {
    if (window.getSelection()?.toString()) return
    const target = event.target
    if (!(target instanceof Element)) return
    const blocker = target.closest('[data-no-toggle], a, button')
    if (blocker && blocker !== headerButtonRef.current) return
    if (!open) holdInPlace(headerButtonRef.current)
    onToggle()
  }

  return (
    <li className="relative flex w-full gap-4 wide:gap-6">
      {/* The groove runs from this node's centre to the next node's centre; the nodes cover its ends. */}
      {!isLast && (
        <span
          aria-hidden="true"
          className="absolute -bottom-3 left-[7px] top-3 w-1.5 rounded-full sh-well"
        />
      )}

      <span
        aria-hidden="true"
        className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ground sh-well"
      >
        <span
          className={`h-2 w-2 rounded-full [transition:all_.3s] ${
            open ? 'animate-pulse bg-accent [box-shadow:var(--led-glow)]' : 'bg-faint'
          }`}
        />
      </span>

      <div
        onClick={handleRowClick}
        className={`min-w-0 flex-1 cursor-pointer ${isLast ? '' : 'pb-6'}`}
      >
        <h3>
          <button
            ref={headerButtonRef}
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            className="flex min-h-11 w-full cursor-pointer items-start justify-between gap-3 rounded-[10px] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[15px] font-semibold leading-snug text-ink wide:text-base">
                {role}
              </span>
              <span className="text-[13px] font-normal leading-normal text-muted">
                {company} · {period}
              </span>
            </span>
            <Icon
              name="chevronDown"
              className={`mt-0.5 h-4 w-4 shrink-0 text-muted [transition:transform_.3s] ${
                open ? 'rotate-180' : ''
              }`}
            />
          </button>
        </h3>

        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          inert={!open}
          className={`grid [transition:grid-template-rows_.3s] ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="flex max-w-[620px] flex-col gap-3.5 pt-3.5">
              <ul className="flex flex-col gap-2">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2.5 text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-body"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[calc(0.825em-3px)] h-1.5 w-1.5 shrink-0 rounded-full bg-faint"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[13px] leading-[1.6] text-muted">{skills.join(' · ')}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
