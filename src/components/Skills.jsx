import SectionCard from './ui/SectionCard'
import SectionHeading from './ui/SectionHeading'
import InsetPanel from './ui/InsetPanel'
import SkillChip from './ui/SkillChip'
import { skillGroups } from '../data/portfolio'

export default function Skills() {
  const [primary, ...secondary] = skillGroups

  return (
    <SectionCard id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        title="Technical skills"
        intro="A practical toolkit for building, testing, and designing web applications, supported by the soft skills that keep delivery on track."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <InsetPanel className="rise rise-delay-1 md:col-span-2 lg:col-span-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <h3 className="text-xl font-bold text-ink">{primary.title}</h3>
              <p className="mt-1 text-base leading-relaxed text-ink">
                {primary.summary}
              </p>
            </div>
          </div>

          <div className="mt-5 grid items-start gap-5 lg:grid-cols-3">
            {primary.groups.map((group, groupIndex) => {
              const labelId = `skill-sub-${groupIndex}`
              return (
                <div key={group.label} className="@container">
                  <p id={labelId} className="text-[13px] font-medium text-ink">
                    {group.label}
                  </p>
                  <ul
                    aria-labelledby={labelId}
                    className="mt-2 grid grid-cols-2 gap-2 @max-[360px]:grid-cols-1"
                  >
                    {group.items.map((item, itemIndex) => {
                      const spansBoth =
                        group.items.length % 2 === 1 &&
                        itemIndex === group.items.length - 1
                      return (
                        <SkillChip
                          key={item}
                          className={spansBoth ? 'col-span-2 @max-[360px]:col-span-1' : ''}
                        >
                          {item}
                        </SkillChip>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </InsetPanel>

        {secondary.map((group, groupIndex) => {
          const labelId = `skill-cat-${groupIndex}`
          return (
            <InsetPanel
              key={group.title}
              className="@container rise rise-delay-2"
            >
              <h3 id={labelId} className="text-xl font-bold text-ink">
                {group.title}
              </h3>
              <p className="mt-1 text-base leading-relaxed text-ink">
                {group.summary}
              </p>
              <ul
                aria-labelledby={labelId}
                className="mt-5 grid grid-cols-2 gap-2 @max-[360px]:grid-cols-1"
              >
                {group.items.map((item, itemIndex) => {
                  const spansBoth =
                    group.items.length % 2 === 1 &&
                    itemIndex === group.items.length - 1
                  return (
                    <SkillChip
                      key={item}
                      className={spansBoth ? 'col-span-2 @max-[360px]:col-span-1' : ''}
                    >
                      {item}
                    </SkillChip>
                  )
                })}
              </ul>
            </InsetPanel>
          )
        })}
      </div>
    </SectionCard>
  )
}
