import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { keySurface } from './Key'
import { useContent } from '../../lib/content'

export default function CopyKey({ value, label, className = '' }) {
  const { ui } = useContent()
  const status = { idle: '', copied: ui.contact.copied, error: ui.contact.copyFailed }
  const [copyState, setCopyState] = useState('idle')
  const resetTimer = useRef(null)

  useEffect(() => {
    return () => window.clearTimeout(resetTimer.current)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopyState('copied')
    } catch {
      setCopyState('error')
    }

    window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(() => setCopyState('idle'), 2000)
  }

  return (
    <span className={`relative shrink-0 ${className}`}>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={label}
        className={`${keySurface} flex h-[46px] w-[46px] items-center justify-center rounded-[13px] wide:h-[52px] wide:w-[52px] wide:rounded-[14px]`}
      >
        <Icon
          name={copyState === 'copied' ? 'check' : 'copy'}
          className="h-[18px] w-[18px] wide:h-[19px] wide:w-[19px]"
        />
      </button>
      {/* Absolute, so the message does not move the layout around it. */}
      <span
        aria-live="polite"
        className="absolute right-0 top-full mt-1 whitespace-nowrap text-xs font-semibold leading-none text-ink-2"
      >
        {status[copyState]}
      </span>
    </span>
  )
}
