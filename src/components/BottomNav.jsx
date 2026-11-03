// Ball and socket style adapted from "splendid-mole-76" by the404_1512 on uiverse.io (MIT).
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useScrollSpy } from '../lib/useScrollSpy'
import { scrollToSection } from '../lib/sectionScroll'
import Icon from './ui/Icon'

const NAV_ITEMS = [
  { section: 'home', href: '#home', label: 'Home', icon: 'home' },
  { section: 'featured', href: '#featured', label: 'Project', icon: 'folder' },
  { section: 'experience', href: '#experience', label: 'Work', icon: 'briefcase' },
  { section: 'skills', href: '#skills', label: 'Skills', icon: 'code' },
  { section: 'contact', href: '#contact', label: 'Contact', icon: 'mail' },
]

const SECTION_IDS = NAV_ITEMS.map((item) => item.section)

// The ball's easing, by sockets travelled. A bezier overshoots by a share of the distance, so short
// moves need a stronger curve for every move to bounce by about the same 10-14px on a phone.
const BALL_EASING = [
  'cubic-bezier(0.34, 1.78, 0.64, 1)',
  'cubic-bezier(0.34, 1.78, 0.64, 1)',
  'cubic-bezier(0.34, 1.56, 0.64, 1)',
  'cubic-bezier(0.34, 1.43, 0.64, 1)',
  'cubic-bezier(0.34, 1.37, 0.64, 1)',
]

export default function BottomNav() {
  const [activeId, navigateTo] = useScrollSpy(SECTION_IDS)
  const activeIndex = Math.max(
    0,
    NAV_ITEMS.findIndex((item) => item.section === activeId)
  )

  // The roll takes longer the further the ball has to go: 0.35s plus 0.1s per socket.
  const [ball, setBall] = useState({ index: activeIndex, sockets: 0 })
  if (ball.index !== activeIndex) {
    setBall({ index: activeIndex, sockets: Math.abs(activeIndex - ball.index) })
  }
  const rollSeconds = 0.35 + ball.sockets * 0.1

  const handleClick = (event, section) => {
    navigateTo(section)
    scrollToSection(event, section)
  }

  return createPortal(
    <nav
      data-scroll-nav
      aria-label="Section navigation"
      className="fixed left-3 right-3 bottom-[calc(16px+env(safe-area-inset-bottom))] z-40 rounded-full bg-ground px-1.5 py-2 sh-capsule"
    >
      <div className="relative grid grid-cols-5">
        {/* One socket wide and moved by transform, so the roll runs on the compositor and page work cannot stall it. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-1 z-10 w-1/5 transition-transform will-change-transform motion-reduce:transition-none"
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
            transitionDuration: `${rollSeconds}s`,
            transitionTimingFunction: BALL_EASING[ball.sockets],
          }}
        >
          <span className="mx-auto block h-10 w-10 rounded-full bg-accent sh-ball" />
        </span>
        {NAV_ITEMS.map((item) => {
          const isActive = item.section === activeId
          return (
            <a
              key={item.section}
              href={item.href}
              onClick={(event) => handleClick(event, item.section)}
              aria-label={item.label}
              aria-current={isActive ? 'location' : undefined}
              // The icon turns white once the ball has arrived. The socket it left goes grey at once.
              style={isActive ? { transitionDelay: `${rollSeconds}s` } : undefined}
              className={`flex h-12 items-center justify-center rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                isActive
                  ? 'text-on-accent transition-colors duration-[250ms] motion-reduce:transition-none'
                  : 'text-ink/40'
              }`}
            >
              {/* The ring is the one structural border on the page: design.md section 10. */}
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-[7px] border-socket-ring bg-ground sh-socket">
                {/* Above the ball, so the active icon shows white on it. */}
                <Icon name={item.icon} strokeWidth={2} className="relative z-20 h-[15px] w-[15px]" />
              </span>
            </a>
          )
        })}
      </div>
    </nav>,
    document.body
  )
}
