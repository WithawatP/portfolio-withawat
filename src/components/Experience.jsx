import { useRef } from 'react'
import TimelineItem from './ui/TimelineItem'
import ContourExperience from './ui/ContourExperience'
import { useExperienceMotion } from '../lib/useExperienceMotion'
import { useMediaQuery } from '../lib/useMediaQuery'
import { experiences } from '../data/portfolio'

// Scroll per role while the section is pinned (design.md 7, peak 3).
const PIN_STEP = '40svh'

export default function Experience() {
  const sectionRef = useRef(null)
  const listRef = useRef(null)
  const { mode, open, ledY, pinnedListHeight, pinTop, handleRowClick } = useExperienceMotion({
    sectionRef,
    listRef,
    count: experiences.length,
  })
  const pinned = mode === 'pinned'
  const wide = useMediaQuery('(min-width: 900px)')
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
  // Phones: closed rows show only the title, so the open role gets the room.
  const compact = !wide
  // The background waves: desktops only, with the pin (moving), after a click (frozen) or with reduced
  // motion (still). Phones never render them, like the footer art.
  const waves = wide && (pinned || mode === 'manual' || reduced)

  return (
    <section
      ref={sectionRef}
      id="experience"
      aria-labelledby="experience-title"
      data-motion={mode}
      // Where the pinned block sticks; the desktop nav lands here, on the first role (sectionScroll.js).
      data-pin-top={pinned ? pinTop : undefined}
      // useExperienceMotion keeps the reader's place itself; the browser's scroll anchoring would add to it.
      className="[overflow-anchor:none]"
    >
      {/* isolate: its own stacking context, so the waves sit behind the text but above the page ground. */}
      <div
        className={`isolate flex flex-col gap-7 wide:grid wide:grid-cols-[5fr_7fr] wide:gap-16 ${
          pinned ? 'sticky' : 'relative'
        }`}
        style={pinned ? { top: `${pinTop}px` } : undefined}
      >
        {waves && <ContourExperience sectionRef={sectionRef} animate={pinned && !reduced} />}
        <header className="flex max-w-[620px] flex-col gap-3.5">
          <h2
            id="experience-title"
            className="text-[clamp(32px,3.4vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink"
          >
            Work experience
          </h2>
          <p className="text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-body">
            A career that moved from IT support and design through operations to full-stack development and quality-focused front-end work.
          </p>
          <p className="text-[13px] leading-normal text-muted">2019 – 2026</p>
        </header>

        <ol
          ref={listRef}
          className="relative flex min-w-0 flex-col"
          // Pinned, the list keeps the height of its longest role, so nothing below it moves.
          style={pinned ? { minHeight: `${pinnedListHeight}px` } : undefined}
        >
          {/* The one lit LED, on the node of the role opened last. It moves with transform. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0.5 z-10 flex h-5 w-5 items-center justify-center [transition:transform_.4s_ease-out]"
            style={{ transform: `translateY(${ledY}px)` }}
          >
            <span className="absolute h-2 w-2 animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-accent [box-shadow:var(--led-glow)]" />
          </span>

          {experiences.map((experience, index) => (
            <TimelineItem
              key={`${experience.company}-${experience.period}`}
              role={experience.role}
              company={experience.company}
              period={experience.period}
              highlights={experience.highlights}
              skills={experience.tags}
              isLast={index === experiences.length - 1}
              open={open.includes(index)}
              compact={compact}
              onRowClick={() => handleRowClick(index)}
            />
          ))}
        </ol>
      </div>

      {/* The scroll the pinned block stays for. A sticky element only travels inside its parent's
          content box, so this is a real box after it, not padding. */}
      {pinned && (
        <div
          aria-hidden="true"
          data-pin-space
          style={{ height: `calc(${experiences.length} * ${PIN_STEP})` }}
        />
      )}
    </section>
  )
}
