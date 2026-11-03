import { useId, useRef } from 'react'
import Icon from './Icon'

// One role on the timeline. Which rows are open, and the lit LED that moves along the rail, belong to
// Experience (useExperienceMotion); this row shows the off LED on its node.
export default function TimelineItem({
  role,
  company,
  period,
  highlights = [],
  skills = [],
  isLast,
  open,
  compact = false,
  onRowClick,
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
    onRowClick()
  }

  // Below 900px a closed row shows only its title and the rows sit closer. The company line sits at the
  // top of the details there, so a row animates one height, not two (each animated height re-lays out
  // the page on every frame). Screen readers still hear it as part of the title.
  const meta = `${company} · ${period}`
  const spacing = isLast ? '' : compact ? 'pb-4' : 'pb-6'

  return (
    <li data-row className="relative flex w-full gap-4 wide:gap-6">
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
        <span className="relative h-2 w-2 rounded-full bg-faint" />
      </span>

      <div onClick={handleRowClick} className={`min-w-0 flex-1 cursor-pointer ${spacing}`}>
        <h3>
          <button
            ref={headerButtonRef}
            data-row-button
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
              {compact ? (
                <span className="sr-only">{meta}</span>
              ) : (
                <span className="text-[13px] font-normal leading-normal text-muted">{meta}</span>
              )}
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
          data-row-panel
          role="region"
          aria-labelledby={buttonId}
          inert={!open}
          // Phones: an open panel also moves up into the empty part of the 44px title button, so the
          // company line sits right under the title. --meta-pull is measured per row (useExperienceMotion).
          className={`grid [transition:grid-template-rows_.3s,margin-top_.3s] ${
            open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
          }`}
          style={compact && open ? { marginTop: 'var(--meta-pull, 0px)' } : undefined}
        >
          <div className="min-h-0 overflow-hidden">
            <div data-row-details className="flex max-w-[620px] flex-col gap-3.5 pt-3.5">
              {compact && (
                <p aria-hidden="true" className="-mt-3 text-[13px] leading-normal text-muted">
                  {meta}
                </p>
              )}
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
