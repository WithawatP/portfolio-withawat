import { useEffect, useState } from 'react'
import { useScrollSpy } from '../lib/useScrollSpy'
import { scrollToSection } from '../lib/sectionScroll'
import { useContent } from '../lib/content'
import ThemeSwitch from './ui/ThemeSwitch'
import LanguageLink from './ui/LanguageLink'

const focus =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent'

const NAV_ITEMS = [
  { section: 'featured', href: '#featured', key: 'project' },
  { section: 'experience', href: '#experience', key: 'experience' },
  { section: 'skills', href: '#skills', key: 'skills' },
  { section: 'contact', href: '#contact', key: 'contact' },
]

const SECTION_IDS = ['home', ...NAV_ITEMS.map((item) => item.section)]

export default function DesktopNav() {
  const { ui } = useContent()
  const [activeId, navigateTo] = useScrollSpy(SECTION_IDS)
  const [pastHero, setPastHero] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('home')
    if (!hero) return undefined

    const observer = new IntersectionObserver(([entry]) => setPastHero(!entry.isIntersecting))
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      data-scroll-nav
      aria-label={ui.sectionNav}
      className={`fixed left-1/2 top-5 z-40 flex h-14 -translate-x-1/2 items-center gap-9 rounded-full bg-ground pl-6 pr-7 sh-capsule [transition:opacity_.3s,translate_.3s,visibility_.3s] motion-reduce:transition-none ${
        pastHero ? '' : 'pointer-events-none invisible -translate-y-2 opacity-0'
      }`}
    >
      <a
        href="#home"
        onClick={(event) => {
          navigateTo('home')
          scrollToSection(event, 'home')
        }}
        aria-label={ui.backToTop}
        className={`pr-3 font-display text-xs tracking-[0.08em] text-ink ${focus}`}
      >
        WP
      </a>

      {NAV_ITEMS.map((item) => {
        const isActive = item.section === activeId
        return (
          <a
            key={item.section}
            href={item.href}
            onClick={(event) => {
              navigateTo(item.section)
              scrollToSection(event, item.section)
            }}
            aria-current={isActive ? 'location' : undefined}
            className={`flex h-14 items-center gap-2 text-xs font-semibold uppercase tracking-caps-sm ${focus} ${
              isActive ? 'text-ink' : 'text-switch-off'
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-[7px] w-[7px] rounded-full transition-[background-color,box-shadow] duration-300 ${
                isActive ? 'bg-accent [box-shadow:var(--led-glow)]' : 'bg-faint'
              }`}
            />
            {ui.nav[item.key]}
          </a>
        )
      })}

      <div className="flex items-center gap-3">
        <LanguageLink />
        <ThemeSwitch />
      </div>
    </nav>
  )
}
