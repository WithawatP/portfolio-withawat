import Icon from './Icon'
import {
  FOCUS,
  LEVEL_3,
  LEVEL_3_ACTIVE,
  LEVEL_3_HOVER,
} from '../../lib/styles'

export default function Pill({
  href,
  icon,
  download = false,
  className = '',
  children,
}) {
  const isLink = Boolean(href)
  const isExternal = href?.startsWith('http')
  const Component = isLink ? 'a' : 'span'

  const linkProps = isLink
    ? {
        href,
        ...(isExternal ? { target: '_blank', rel: 'noreferrer' } : {}),
        ...(download ? { download: true } : {}),
      }
    : {}

  return (
    <Component
      {...linkProps}
      className={`inline-flex items-center justify-center gap-2 text-[13px] ${
        isLink
          ? `${LEVEL_3} ${LEVEL_3_HOVER} ${LEVEL_3_ACTIVE} cursor-pointer ${FOCUS}`
          : 'bg-surface text-ink-2 neu-inset-sm rounded-full h-8 px-3 font-medium cursor-default'
      } ${className}`}
    >
      {icon ? <Icon name={icon} className="h-4 w-4 shrink-0 text-faint" /> : null}
      <span>{children}</span>
    </Component>
  )
}
