import { FOCUS } from '../lib/styles'
import UiverseButton from './ui/UiverseButton'

const navLinks = [
  { href: '#featured', label: 'Project' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
]

export default function Header({ className = '' }) {
  return (
    <header className={`sticky top-6 z-50 mx-auto w-full rounded-full bg-surface/85 px-8 py-3 neu-raise-md backdrop-blur-md transition-all duration-300 ${className}`}>
      <div className="mx-auto flex w-full items-center justify-between gap-4">
        <a
          href="#home"
          aria-label="Withawat Phiraban — back to top"
          className={`flex items-center gap-3 rounded-full ${FOCUS}`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-[13px] font-extrabold tracking-tight text-ink neu-raise-sm">
            WP
          </span>
          <span className="hidden text-[13px] font-semibold text-ink sm:block">
            Withawat Phiraban
          </span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-4">
          <div className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-[13px] font-medium text-ink underline-offset-4 transition-all duration-200 hover:underline ${FOCUS}`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <UiverseButton href="#contact">Contact</UiverseButton>
        </nav>
      </div>
    </header>
  )
}
