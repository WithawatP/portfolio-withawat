import { useRef } from 'react'

// design.md 6.5. With two options the knob travels between left: 6px and left: 50%.
export default function KnobSwitch({
  options,
  value,
  onChange,
  ariaLabel,
  role = 'tablist',
  idPrefix,
  showLed = false,
  className = '',
}) {
  const isRadio = role === 'radiogroup'
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

    if (event.key === 'ArrowLeft' || (isRadio && event.key === 'ArrowUp')) {
      nextIndex = (index - 1 + options.length) % options.length
    } else if (event.key === 'ArrowRight' || (isRadio && event.key === 'ArrowDown')) {
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
      aria-orientation={isRadio ? undefined : 'horizontal'}
      className={`relative grid h-[60px] rounded-full bg-ground p-1.5 sh-track ${className}`}
      style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1.5 rounded-full bg-knob sh-knob [transition:left_.45s_cubic-bezier(.34,1.4,.64,1)]"
        style={{
          left: `calc(6px + ${activeIndex} * (100% - 12px) / ${options.length})`,
          width: `calc((100% - 12px) / ${options.length})`,
        }}
      />
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
            role={isRadio ? 'radio' : 'tab'}
            aria-checked={isRadio ? isActive : undefined}
            aria-selected={isRadio ? undefined : isActive}
            aria-controls={idPrefix ? `${idPrefix}-panel-${option.id}` : undefined}
            tabIndex={isActive ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`relative z-10 flex min-w-0 cursor-pointer items-center justify-center gap-2.5 rounded-full px-2 text-sm font-semibold [transition:color_.3s] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
              isActive ? 'text-ink' : 'text-switch-off'
            }`}
          >
            {showLed && (
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full [transition:all_.3s] ${
                  isActive ? 'bg-accent [box-shadow:var(--led-glow)]' : 'bg-faint'
                }`}
              />
            )}
            <span className="truncate">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
