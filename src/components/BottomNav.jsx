import { createPortal } from 'react-dom'
import { useScrollSpy } from '../lib/useScrollSpy'
import { FOCUS } from '../lib/styles'
import Icon from './ui/Icon'

const NAV_ITEMS = [
  { section: 'home', href: '#home', label: 'Home', icon: 'home' },
  { section: 'featured', href: '#featured', label: 'Project', icon: 'folder' },
  { section: 'experience', href: '#experience', label: 'Work', icon: 'briefcase' },
  { section: 'skills', href: '#skills', label: 'Skills', icon: 'code' },
  { section: 'contact', href: '#contact', label: 'Contact', icon: 'mail' },
]

const SECTION_IDS = NAV_ITEMS.map((item) => item.section)

export default function BottomNav() {
  const [activeId, navigateTo] = useScrollSpy(SECTION_IDS)
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.section === activeId)
  )

  return createPortal(
    <nav
      data-scroll-nav
      aria-label="Section navigation"
      className="fixed inset-x-0 bottom-0 z-40 bg-surface pb-[min(env(safe-area-inset-bottom),1.5rem)] neu-raise-bar sm:hidden"
    >
      <div className="px-3 py-2">
        <div className="rounded-2xl bg-surface p-1 neu-inset-md">
          <div className="relative">
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1/5 rounded-xl bg-surface neu-raise-sm transition-transform duration-[350ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]"
              style={{ transform: `translateX(${activeIndex * 100}%)` }}
            />
            <div className="relative grid grid-cols-5">
              {NAV_ITEMS.map((item) => {
                const isActive = item.section === activeId
                return (
                  <a
                    key={item.section}
                    href={item.href}
                    onClick={() => navigateTo(item.section)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`${FOCUS} flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[12px] font-medium transition-colors duration-200 ${
                      isActive ? 'text-ink' : 'text-muted'
                    }`}
                  >
                    <Icon name={item.icon} className="h-[18px] w-[18px]" />
                    <span className="leading-none">{item.label}</span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>,
    document.body
  )
}
