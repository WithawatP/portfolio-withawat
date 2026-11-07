import AvailabilityBadge from './ui/AvailabilityBadge'
import ThemeSwitch from './ui/ThemeSwitch'
import LanguageLink from './ui/LanguageLink'
import { scrollToTop } from '../lib/scrollToTop'
import { useContent } from '../lib/content'

const focus =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

const navLinks = [
  { href: '#featured', key: 'project' },
  { href: '#experience', key: 'experience' },
  { href: '#skills', key: 'skills' },
  { href: '#contact', key: 'contact' },
]

export default function Header() {
  const { profile, ui } = useContent()

  return (
    <header className="mx-auto flex h-[72px] w-full max-w-[1240px] items-center justify-between px-4 wide:px-12">
      <a
        href="#home"
        onClick={scrollToTop}
        aria-label={ui.backToTop}
        className={`font-display text-[13px] tracking-[0.08em] text-ink ${focus}`}
      >
        WP
      </a>

      {/* design.md 5: the pill (phone) or the links (desktop), then the language link and the theme switch. */}
      <div className="flex items-center gap-3 wide:gap-10">
        <AvailabilityBadge className="wide:hidden">{profile.statusShort}</AvailabilityBadge>

        <nav aria-label={ui.primaryNav} className="hidden items-center gap-10 wide:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-xs font-semibold uppercase tracking-caps text-ink-2 transition-colors duration-300 hover:text-ink ${focus}`}
            >
              {ui.nav[link.key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageLink />
          <ThemeSwitch />
        </div>
      </div>
    </header>
  )
}
