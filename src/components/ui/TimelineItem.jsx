import { useId, useRef } from 'react'
import { flushSync } from 'react-dom'
import Icon from './Icon'

// About one closed row, so the row above stays on screen and can be clicked next.
const TOP_MARGIN = 96

// Opening a row collapses the open one, which may sit above it, so the clicked row slides up.
// That slide is fine unless the row would pass the top of the screen. Then the upper panel
// closes at once and the page scrolls by the same amount in one step, before the browser
// paints, so the clicked row does not move. Scrolling on every frame of the collapse made
// the row shake, and scrolling on every click made the rows creep off the screen.
function toggleKeepingRowOnScreen(button, toggle) {
  const openButton = button.closest('ol')?.querySelector('[aria-expanded="true"]')
  const opensBelow =
    openButton && openButton.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING
  if (!opensBelow) return toggle()

  const panel = document.getElementById(openButton.getAttribute('aria-controls'))
  const top = button.getBoundingClientRect().top
  if (top - panel.offsetHeight >= Math.min(top, TOP_MARGIN)) return toggle()

  panel.style.transition = 'none'
  flushSync(toggle)
  window.scrollBy({ top: button.getBoundingClientRect().top - top, behavior: 'instant' })
  void panel.offsetHeight
  panel.style.transition = ''
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
    if (open) onToggle()
    else toggleKeepingRowOnScreen(headerButtonRef.current, onToggle)
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
            open ? 'animate-led-blink bg-accent [box-shadow:var(--led-glow)]' : 'bg-faint'
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
