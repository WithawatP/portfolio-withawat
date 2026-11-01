import SectionCard from './ui/SectionCard'
import SectionHeading from './ui/SectionHeading'
import TimelineItem from './ui/TimelineItem'
import { experiences } from '../data/portfolio'

export default function Experience() {
  return (
    <SectionCard id="experience" labelledBy="experience-title">
      <SectionHeading
        id="experience-title"
        title="Work experience"
        intro="A career that moved from IT support and design through operations to full-stack development and quality-focused front-end work."
        meta="2019 – 2026"
      />

      <div className="rail-timeline relative">
        <div
          aria-hidden="true"
          className="absolute bottom-3 left-1.5 top-4 w-2 overflow-hidden rounded-full bg-surface neu-inset-sm sm:bottom-8"
        >
          <span className="rail-fill absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-led" />
        </div>

        <ol className="flex flex-col">
          {experiences.map((experience, index) => (
            <TimelineItem
              key={`${experience.company}-${experience.period}`}
              role={experience.role}
              company={experience.company}
              period={experience.period}
              highlights={experience.highlights}
              skills={experience.tags}
              defaultOpen={index === 0}
            />
          ))}
        </ol>

        <div
          aria-hidden="true"
          className="rail-knob pointer-events-none absolute bottom-3 left-0 top-4 w-5 sm:bottom-8"
        >
          <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface neu-raise-xs" />
        </div>
      </div>
    </SectionCard>
  )
}
