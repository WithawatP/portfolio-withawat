import { useState } from 'react'
import TimelineItem from './ui/TimelineItem'
import { experiences } from '../data/portfolio'

export default function Experience() {
  // Single open: the latest role starts open, and an open row can be closed.
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="flex flex-col gap-7 wide:grid wide:grid-cols-[5fr_7fr] wide:gap-16"
    >
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

      <ol className="flex min-w-0 flex-col">
        {experiences.map((experience, index) => (
          <TimelineItem
            key={`${experience.company}-${experience.period}`}
            role={experience.role}
            company={experience.company}
            period={experience.period}
            highlights={experience.highlights}
            skills={experience.tags}
            isLast={index === experiences.length - 1}
            isCurrent={index === 0}
            open={index === openIndex}
            onToggle={() => setOpenIndex((current) => (current === index ? null : index))}
          />
        ))}
      </ol>
    </section>
  )
}
