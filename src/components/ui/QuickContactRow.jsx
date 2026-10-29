import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { FOCUS } from '../../lib/styles'

export default function QuickContactRow({ href, label, value, icon }) {
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

  return (
    <Component
      {...componentProps}
      className={`group flex min-w-0 items-center gap-3 rounded-2xl bg-surface p-3 text-left neu-raise-sm transition-all duration-300 hover:-translate-y-0.5 hover:neu-raise-lift active:scale-[0.99] active:neu-inset-press cursor-pointer ${FOCUS}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface text-faint neu-raise-xs">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span
          aria-live={isCopyable ? 'polite' : undefined}
          className="block text-[13px] font-medium leading-snug text-ink"
        >
          {statusLabel}
        </span>
        <span className="block break-all text-base font-semibold leading-snug text-ink">
          {value}
        </span>
      </span>
      {isCopyable ? (
        <Icon
          name={copyState === 'copied' ? 'check' : 'copy'}
          className="h-4 w-4 shrink-0 text-faint"
        />
      ) : (
        <Icon
          name="arrowUpRight"
          className="h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </Component>
  )
}
