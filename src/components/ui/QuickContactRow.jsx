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
      className={`group flex min-w-0 items-center gap-3 rounded-2xl bg-[#E7E7E7] p-3 text-left shadow-[4px_4px_10px_#b6b6b6,-4px_-4px_10px_#ffffff] transition-all duration-200 active:scale-[0.99] active:shadow-[inset_3px_3px_6px_#b6b6b6,inset_-3px_-3px_6px_#ffffff] ${
        isCopyable ? 'cursor-copy' : 'cursor-pointer'
      } ${FOCUS}`}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E7E7E7] text-[#9B9B9B] shadow-[3px_3px_6px_#b6b6b6,-3px_-3px_6px_#ffffff]">
        <Icon name={icon} className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span
          aria-live={isCopyable ? 'polite' : undefined}
          className="block text-[13px] font-medium leading-snug text-[#333333]"
        >
          {statusLabel}
        </span>
        <span className="block break-all text-base font-semibold leading-snug text-[#333333]">
          {value}
        </span>
      </span>
      {isCopyable ? (
        <Icon
          name={copyState === 'copied' ? 'check' : 'copy'}
          className="h-4 w-4 shrink-0 text-[#9B9B9B]"
        />
      ) : (
        <Icon
          name="arrowUpRight"
          className="h-4 w-4 shrink-0 text-[#9B9B9B] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </Component>
  )
}
