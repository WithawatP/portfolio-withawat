import SectionCard from './ui/SectionCard'
import SectionHeading from './ui/SectionHeading'
import InsetPanel from './ui/InsetPanel'
import Pill from './ui/Pill'
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

      <ol className="relative flex flex-col gap-5">
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-[37px] top-6 hidden w-[6px] rounded-full bg-[#E7E7E7] shadow-[inset_2px_2px_4px_#b6b6b6,inset_-2px_-2px_4px_#ffffff] md:block"
        />

        {experiences.map((experience, index) => (
          <li
            key={`${experience.company}-${experience.period}`}
            className={`rise relative grid min-w-0 gap-4 md:grid-cols-[80px_1fr] rise-delay-${(index % 5) + 1}`}
          >
            <div className="hidden items-start justify-center pt-7 md:flex">
              <span
                aria-hidden="true"
                className="relative z-10 h-4 w-4 rounded-full bg-[#E7E7E7] shadow-[3px_3px_6px_#b6b6b6,-3px_-3px_6px_#ffffff]"
              />
            </div>

            <InsetPanel>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-xl font-bold tracking-tight text-[#333333]">
                    {experience.role}
                  </h3>
                  <p className="mt-1 text-base font-medium text-[#333333]">
                    {experience.company}
                  </p>
                </div>
                <p className="shrink-0 text-[13px] font-semibold text-[#333333]">
                  {experience.period}
                </p>
              </div>

              <p className="mt-4 max-w-[70ch] text-base leading-relaxed text-[#333333]">
                {experience.highlights}
              </p>

              <ul
                aria-label={`${experience.company} focus areas`}
                className="mt-4 flex flex-wrap gap-2"
              >
                {experience.tags.map((tag) => (
                  <li key={tag}>
                    <Pill>{tag}</Pill>
                  </li>
                ))}
              </ul>
            </InsetPanel>
          </li>
        ))}
      </ol>
    </SectionCard>
  )
}
