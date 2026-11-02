import { useRef } from 'react'

// design.md 6.5 and 8. The knob covers one option and slides to the selected one, across or down.
const BUTTON_LAYOUT = {
  vertical: 'justify-start gap-3 px-5 text-left text-[15px]',
  compact: 'justify-center gap-1.5 text-[13px]',
  horizontal: 'justify-center gap-2.5 px-2 text-sm',
}

export default function KnobSwitch({
  options,
  value,
  onChange,
  ariaLabel,
  role = 'tablist',
  orientation = 'horizontal',
  idPrefix,
  showLed = false,
  className = '',
}) {
  const isRadio = role === 'radiogroup'
  const isVertical = orientation === 'vertical'
  const isCompact = !isVertical && options.length > 2
  const buttonRefs = useRef([])
  const activeIndex = Math.max(
    0,
    options.findIndex((option) => option.id === value)
  )
  const knobOffset = `calc(6px + ${activeIndex} * (100% - 12px) / ${options.length})`
  const knobSize = `calc((100% - 12px) / ${options.length})`

  const select = (index) => {
    const option = options[index]
    if (!option) return
    onChange(option.id)
    buttonRefs.current[index]?.focus()
  }

  const handleKeyDown = (event, index) => {
    const moveBack = isRadio
      ? event.key === 'ArrowLeft' || event.key === 'ArrowUp'
      : event.key === (isVertical ? 'ArrowUp' : 'ArrowLeft')
    const moveForward = isRadio
      ? event.key === 'ArrowRight' || event.key === 'ArrowDown'
      : event.key === (isVertical ? 'ArrowDown' : 'ArrowRight')
    let nextIndex = index

    if (moveBack) {
      nextIndex = (index - 1 + options.length) % options.length
    } else if (moveForward) {
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
      aria-orientation={isRadio ? undefined : orientation}
      className={`relative grid bg-ground p-1.5 sh-track ${
        isVertical ? 'rounded-[30px]' : 'h-[60px] rounded-full'
      } ${className}`}
      style={
        isVertical
          ? { gridTemplateRows: `repeat(${options.length}, minmax(56px, 1fr))` }
          : { gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }
      }
    >
      <span
        aria-hidden="true"
        className={`absolute rounded-full bg-knob sh-knob ${
          isVertical
            ? 'inset-x-1.5 [transition:top_.45s_cubic-bezier(.34,1.4,.64,1)]'
            : 'inset-y-1.5 [transition:left_.45s_cubic-bezier(.34,1.4,.64,1)]'
        }`}
        style={
          isVertical
            ? { top: knobOffset, height: knobSize }
            : { left: knobOffset, width: knobSize }
        }
      />
      {options.map((option, index) => {
        const isActive = index === activeIndex
        const layout = isVertical ? 'vertical' : isCompact ? 'compact' : 'horizontal'
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
            aria-controls={idPrefix ? `${idPrefix}-panel` : undefined}
            tabIndex={isActive ? 0 : -1}
            onClick={() => select(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={`relative z-10 flex min-w-0 cursor-pointer items-center rounded-full font-semibold [transition:color_.3s] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
              BUTTON_LAYOUT[layout]
            } ${isActive ? 'text-ink' : 'text-switch-off'}`}
          >
            {showLed && (
              <span
                aria-hidden="true"
                className={`shrink-0 rounded-full [transition:all_.3s] ${
                  isCompact ? 'h-[7px] w-[7px]' : 'h-2 w-2'
                } ${isActive ? 'bg-accent [box-shadow:var(--led-glow)]' : 'bg-faint'}`}
              />
            )}
            <span className="truncate">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
