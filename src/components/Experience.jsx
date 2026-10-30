import SectionCard from './ui/SectionCard'
import SectionHeading from './ui/SectionHeading'
import HoverTimelineCard from './ui/HoverTimelineCard'
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

      <ol className="flex flex-col">
        {experiences.map((experience, index) => (
          <HoverTimelineCard
            key={`${experience.company}-${experience.period}`}
            role={experience.role}
            company={experience.company}
            period={experience.period}
            highlights={experience.highlights}
            skills={experience.tags}
            isLast={index === experiences.length - 1}
            defaultOpen={index === 0}
          />
        ))}
      </ol>
    </SectionCard>
  )
}
