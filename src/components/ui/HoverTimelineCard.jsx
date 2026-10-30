import { useEffect, useId, useRef, useState } from 'react'
import Icon from './Icon'
import Pill from './Pill'
import { FOCUS } from '../../lib/styles'

const HOVER_OPEN_DELAY = 100
const HOVER_CLOSE_DELAY = 120

export default function HoverTimelineCard({
  role,
  company,
  period,
  highlights = [],
  skills = [],
  isLast,
  defaultOpen = false,
}) {
  const [hovered, setHovered] = useState(false)
  const [pinned, setPinned] = useState(
    () =>
      defaultOpen &&
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 639px)').matches,
  )
  const open = hovered || pinned
  const openTimer = useRef(null)
  const closeTimer = useRef(null)
  const id = useId()
  const buttonId = `${id}-button`
  const panelId = `${id}-panel`

  const clearTimers = () => {
    window.clearTimeout(openTimer.current)
    window.clearTimeout(closeTimer.current)
  }

  useEffect(() => clearTimers, [])

  const handlePointerEnter = (event) => {
    if (event.pointerType !== 'mouse') return
    clearTimers()
    openTimer.current = window.setTimeout(
      () => setHovered(true),
      HOVER_OPEN_DELAY,
    )
  }

  const handlePointerLeave = (event) => {
    if (event.pointerType !== 'mouse') return
    clearTimers()
    closeTimer.current = window.setTimeout(
      () => setHovered(false),
      HOVER_CLOSE_DELAY,
    )
  }

  const handleClick = () => {
    if (hovered && !pinned) {
      setPinned(true)
      return
    }
    setPinned((value) => !value)
  }

  return (
    <li className="flex w-full gap-4 sm:gap-6">
      <div aria-hidden="true" className="mt-2 flex flex-col items-center">
        <div className="relative flex h-5 w-5 items-center justify-center rounded-full bg-surface neu-inset-sm">
          {open ? (
            <span className="relative flex h-2 w-2">
              {pinned ? (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-led opacity-75" />
              ) : null}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-led" />
            </span>
          ) : (
            <span className="h-2 w-2 rounded-full bg-faint" />
          )}
        </div>
        {!isLast ? (
          <div className="mb-1 mt-3 w-[2px] flex-1 rounded-full bg-recessed opacity-50" />
        ) : null}
      </div>

      <div
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        className={`mb-3 min-w-0 flex-1 rounded-[2rem] bg-surface p-4 transition-transform duration-200 sm:mb-8 sm:p-6 ${
          open ? 'neu-inset-lg' : 'neu-raise-md'
        }`}
      >
        <h3 className="text-lg font-bold text-ink">
          <button
            id={buttonId}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={handleClick}
            className={`${FOCUS} flex min-h-14 w-full cursor-pointer flex-col gap-2 rounded-2xl text-left active:scale-[0.99] sm:flex-row sm:items-center sm:justify-between`}
          >
            <span className="min-w-0">
              <span className="block text-lg font-bold leading-snug text-ink">
                {role}
              </span>
              <span className="mt-1 block text-sm font-medium text-muted">
                {company}
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-2 self-start sm:self-auto">
              <span className="text-[13px] font-medium text-muted sm:text-sm">
                {period}
              </span>
              <Icon
                name="chevronDown"
                className={`h-4 w-4 text-faint transition-transform duration-300 ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </span>
          </button>
        </h3>

        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          inert={!open}
          className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="pt-4">
              <ul className="mb-5 flex flex-col gap-2">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-2.5 text-[14px] leading-relaxed text-ink"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-surface neu-inset-sm"
                    />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <li key={skill}>
                    <Pill>{skill}</Pill>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
