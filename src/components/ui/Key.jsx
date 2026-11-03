// Based on "witty-wolverine-69" by javierBarroso on uiverse.io (MIT), adapted to design.md section 6.1.
import Icon from './Icon'

const motion = '[transition:all_.3s] cursor-pointer'
const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

const variants = {
  default:
    'border-ground bg-ground text-ink sh-key active:sh-key-pressed active:text-key-pressed',
  primary:
    'border-accent bg-accent text-on-accent sh-primary active:sh-primary-pressed active:text-on-accent-pressed',
}

export const keySurface = `${motion} ${variants.default} border ${focusRing}`

export default function Key({
  children,
  variant = 'default',
  href,
  download = false,
  type = 'button',
  onClick,
  icon,
  className = '',
}) {
  const classes = `${motion} ${variants[variant]} inline-flex items-center justify-center gap-2.5 rounded-[10px] border px-[26px] py-3.5 text-[15px] font-semibold ${focusRing} ${className}`
  const content = (
    <>
      {icon && <Icon name={icon} className="h-[18px] w-[18px] shrink-0" />}
      {children}
    </>
  )

  if (href) {
    return (
      <a href={href} download={download || undefined} onClick={onClick} className={classes}>
        {content}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {content}
    </button>
  )
}

export function IconKey({ href, icon, label, external = false, download = false, className = '' }) {
  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`group flex flex-col items-center gap-2 text-xs font-semibold text-ink-2 outline-none ${className}`}
    >
      <span
        className={`${motion} flex h-[52px] w-[52px] items-center justify-center rounded-[14px] border border-ground bg-ground text-ink sh-key group-active:sh-key-pressed group-active:text-key-pressed group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-accent`}
      >
        <Icon name={icon} className="h-[18px] w-[18px]" />
      </span>
      {label}
    </a>
  )
}

// The keypad key of the Contact section at >= 900px: icon top left, label bottom left.
export function PadKey({
  href,
  icon,
  label,
  variant = 'default',
  external = false,
  download = false,
  className = '',
}) {
  return (
    <a
      href={href}
      download={download || undefined}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`${motion} ${variants[variant]} ${focusRing} flex h-[100px] flex-col items-start justify-between rounded-[18px] border px-[18px] py-4 text-left font-semibold ${
        variant === 'primary' ? 'text-[15px]' : 'text-sm'
      } ${className}`}
    >
      <Icon name={icon} className="h-[19px] w-[19px]" />
      {label}
    </a>
  )
}
