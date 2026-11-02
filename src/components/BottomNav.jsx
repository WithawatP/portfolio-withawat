// Ball and socket style adapted from "splendid-mole-76" by the404_1512 on uiverse.io (MIT).
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useScrollSpy } from '../lib/useScrollSpy'

const NAV_ITEMS = [
  { section: 'home', href: '#home', label: 'Home' },
  { section: 'featured', href: '#featured', label: 'Project' },
  { section: 'experience', href: '#experience', label: 'Work' },
  { section: 'skills', href: '#skills', label: 'Skills' },
  { section: 'contact', href: '#contact', label: 'Contact' },
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

  const handleClick = (event, section) => {
    navigateTo(section)
    if (section !== 'home') return

    // The Hero starts below the WP row, so its anchor would stop with that row under the status bar.
    event.preventDefault()
    window.history.pushState(null, '', window.location.pathname + window.location.search)
    window.scrollTo(0, 0)
  }

  return createPortal(
    <nav
      data-scroll-nav
      aria-label="Section navigation"
      className="fixed left-3 right-3 bottom-[calc(16px+env(safe-area-inset-bottom))] z-40 rounded-full bg-ground px-1 pb-2 pt-3 sh-capsule wide:hidden"
    >
      <div className="relative grid grid-cols-5">
        {/* One socket wide and moved by transform, so the roll runs on the compositor and page work cannot stall it. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 w-1/5 transition-transform will-change-transform motion-reduce:transition-none"
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
            transitionDuration: `${0.35 + ball.sockets * 0.1}s`,
            transitionTimingFunction: BALL_EASING[ball.sockets],
          }}
        >
          <span className="mx-auto block h-9 w-9 rounded-full bg-accent sh-ball" />
        </span>
        {NAV_ITEMS.map((item) => {
          const isActive = item.section === activeId
          return (
            <a
              key={item.section}
              href={item.href}
              onClick={(event) => handleClick(event, item.section)}
              aria-current={isActive ? 'location' : undefined}
              className={`flex min-h-[54px] flex-col items-center gap-1.5 rounded-lg text-xs font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                isActive ? 'text-ink' : 'text-muted'
              }`}
            >
              {/* The ring is the one structural border on the page: design.md section 3 and 10. */}
              <span
                aria-hidden="true"
                className="h-9 w-9 rounded-full border-[7px] border-socket-ring bg-ground sh-socket"
              />
              {item.label}
            </a>
          )
        })}
      </div>
    </nav>,
    document.body
  )
}
