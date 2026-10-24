import SectionCard from './ui/SectionCard'
import SectionHeading from './ui/SectionHeading'
import InsetPanel from './ui/InsetPanel'
import Pill from './ui/Pill'
import { skillGroups } from '../data/portfolio'

export default function Skills() {
  const [primary, ...secondary] = skillGroups

  return (
    <SectionCard id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        title="Technical skills"
        intro="A practical toolkit for building, testing, and designing web applications, supported by the soft skills that keep delivery on track."
        meta="Four categories"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <InsetPanel className="rise rise-delay-1 md:col-span-2 lg:col-span-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-[#333333]">{primary.title}</h3>
              <p className="mt-1 text-base leading-relaxed text-[#333333]">
                {primary.summary}
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-3">
            {primary.groups.map((group) => (
              <div key={group.label}>
                <p className="text-[13px] font-medium text-[#333333]">
                  {group.label}
                </p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Pill>{item}</Pill>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </InsetPanel>

        {secondary.map((group) => (
          <InsetPanel key={group.title} className="rise rise-delay-2">
            <h3 className="text-xl font-bold text-[#333333]">{group.title}</h3>
            <p className="mt-1 text-base leading-relaxed text-[#333333]">
              {group.summary}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li key={item}>
                  <Pill>{item}</Pill>
                </li>
              ))}
            </ul>
          </InsetPanel>
        ))}
      </div>
    </SectionCard>
  )
}
