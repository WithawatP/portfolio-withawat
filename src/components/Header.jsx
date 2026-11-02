import AvailabilityBadge from './ui/AvailabilityBadge'
import { profile } from '../data/portfolio'

const focus =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

const navLinks = [
  { href: '#featured', label: 'Project' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  return (
    <header className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between px-4 wide:px-12">
      <a
        href="#home"
        aria-label={`WP ${profile.name}, back to top`}
        className={`font-display text-[13px] tracking-[0.08em] text-ink ${focus}`}
      >
        WP
      </a>

      <AvailabilityBadge className="wide:hidden">{profile.statusShort}</AvailabilityBadge>

      <nav aria-label="Primary" className="hidden items-center gap-10 wide:flex">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`text-xs font-semibold uppercase tracking-[0.22em] text-ink-2 transition-colors duration-300 hover:text-ink ${focus}`}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
