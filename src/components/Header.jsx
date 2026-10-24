import Icon from './ui/Icon'
import { FOCUS } from '../lib/styles'
import UiverseButton from './ui/UiverseButton'

const navLinks = [
  { href: '#featured', label: 'Project' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
]

export default function Header({ className = '' }) {
  return (
    <header className={`sticky top-6 z-50 mx-auto w-full rounded-full bg-[#E7E7E7]/85 px-8 py-3 shadow-[8px_8px_16px_#b6b6b6,-8px_-8px_16px_#ffffff] backdrop-blur-md transition-all duration-300 ${className}`}>
      <div className="mx-auto flex w-full items-center justify-between gap-4">
        <a
          href="#home"
          aria-label="Withawat Phiraban — back to top"
          className={`flex items-center gap-3 rounded-full ${FOCUS}`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7E7E7] text-[13px] font-extrabold tracking-tight text-[#333333] shadow-[4px_4px_10px_#b6b6b6,-4px_-4px_10px_#ffffff]">
            WP
          </span>
          <span className="hidden text-[13px] font-semibold text-[#333333] sm:block">
            Withawat Phiraban
          </span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-4">
          <div className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-full px-3 py-2 text-[13px] font-medium text-[#333333] underline-offset-4 transition-all duration-200 hover:underline ${FOCUS}`}
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
