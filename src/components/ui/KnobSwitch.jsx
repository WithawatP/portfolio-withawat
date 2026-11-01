import { useRef } from 'react'
import { FOCUS } from '../../lib/styles'

export default function KnobSwitch({
  options,
  value,
  onChange,
  ariaLabel,
  role = 'tablist',
  idPrefix,
  className = '',
}) {
  const buttonRefs = useRef([])
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.id === value)
  )

  const select = (index) => {
    const option = options[index]
    if (!option) return
    onChange(option.id)
    buttonRefs.current[index]?.focus()
  }

  const handleKeyDown = (event, index) => {
    let nextIndex = index

    if (event.key === 'ArrowLeft') {
      nextIndex = (index - 1 + options.length) % options.length
    } else if (event.key === 'ArrowRight') {
      nextIndex = (index + 1) % options.length
    } else if (event.key === 'Home') {
      nextIndex = 0
    } else if (event.key === 'End') {
      nextIndex = options.length - 1
    } else {
      return
    }

    event.preventDefault()
    select(nextIndex)
  }

  return (
    <div
      role={role}
      aria-label={ariaLabel}
      aria-orientation="horizontal"
      className={`relative rounded-2xl bg-surface p-1 neu-inset-md ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute left-1 top-1 bottom-1 rounded-xl bg-surface neu-raise-sm transition-transform duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          transform: `translate3d(${activeIndex * 100}%, 0, 0)`,
        }}
      />
      <div
        className="relative grid"
        style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
      >
        {options.map((option, index) => {
          const isActive = index === activeIndex
          return (
            <button
              key={option.id}
              ref={(node) => {
                buttonRefs.current[index] = node
              }}
              id={idPrefix ? `${idPrefix}-tab-${option.id}` : undefined}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={idPrefix ? `${idPrefix}-panel-${option.id}` : undefined}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              className={`${FOCUS} relative z-10 flex min-h-11 min-w-0 items-center justify-center rounded-xl px-2 text-[13px] font-medium transition-colors duration-200 ${
                isActive ? 'text-ink' : 'text-muted'
              }`}
            >
              <span className="truncate">{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
