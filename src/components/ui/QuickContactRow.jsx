import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { FOCUS } from '../../lib/styles'

export default function QuickContactRow({ href, label, value, icon, compact = false }) {
  const isCopyable = href.startsWith('mailto:') || href.startsWith('tel:')
  const isExternal = href.startsWith('http')
  const [copyState, setCopyState] = useState('idle')
  const resetTimer = useRef(null)

  useEffect(() => {
    return () => window.clearTimeout(resetTimer.current)
  }, [])

  const handleCopy = async (event) => {
    event.preventDefault()

    try {
      await navigator.clipboard.writeText(value)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }

    window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(() => setCopyState('idle'), 2000)
  }

  const statusLabel =
    copyState === 'copied'
      ? 'Copied!'
      : copyState === 'error'
        ? 'Copy failed'
        : label

  const Component = isCopyable ? 'button' : 'a'
  const componentProps = isCopyable
    ? { type: 'button', onClick: handleCopy }
    : {
        href,
        ...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {}),
      }

  const rowClasses = compact
    ? `group flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface p-0 text-ink neu-raise-sm transition-all duration-300 hover:-translate-y-0.5 hover:neu-raise-lift active:scale-[0.99] active:neu-inset-press cursor-pointer sm:h-auto sm:w-auto sm:min-w-0 sm:justify-start sm:gap-3 sm:rounded-2xl sm:p-3 sm:text-left ${FOCUS}`
    : `group flex min-w-0 items-center gap-3 rounded-2xl bg-surface p-2.5 text-left neu-raise-sm transition-all duration-300 hover:-translate-y-0.5 hover:neu-raise-lift active:scale-[0.99] active:neu-inset-press cursor-pointer sm:p-3 ${FOCUS}`

  const iconClasses = compact
    ? 'flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9 sm:bg-surface sm:text-faint sm:neu-inset-sm'
    : 'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-faint neu-inset-sm max-[399px]:hidden'

  return (
    <Component
      {...componentProps}
      aria-label={compact ? `${label}: ${value}` : undefined}
      className={rowClasses}
    >
      <span className={iconClasses}>
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <span
        className={
          compact ? 'sr-only sm:not-sr-only sm:min-w-0 sm:flex-1' : 'min-w-0 flex-1'
        }
      >
        <span
          aria-live={isCopyable ? 'polite' : undefined}
          className="block text-[13px] font-medium leading-snug text-ink"
        >
          {statusLabel}
        </span>
        <span className="block text-[15px] font-semibold leading-snug text-ink [overflow-wrap:anywhere] sm:text-base">
          {value}
        </span>
      </span>
      {isCopyable ? (
        <Icon
          name={copyState === 'copied' ? 'check' : 'copy'}
          className={`h-4 w-4 shrink-0 text-faint ${compact ? 'hidden sm:block' : ''}`}
        />
      ) : (
        <Icon
          name="arrowUpRight"
          className={`h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${compact ? 'hidden sm:block' : ''}`}
        />
      )}
    </Component>
  )
}
