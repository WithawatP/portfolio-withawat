import { useState } from 'react'
import Icon from './ui/Icon'
import KnobSwitch from './ui/KnobSwitch'
import CountUp from './ui/CountUp'
import { useMediaQuery } from '../lib/useMediaQuery'
import { useContent } from '../lib/content'

// In the order of skillGroups in portfolio.js. The labels are ui.skills.tabs.
const TABS = [
  { id: 'dev', icon: 'code' },
  { id: 'qa', icon: 'check' },
  { id: 'design', icon: 'monitor' },
  { id: 'soft', icon: 'users' },
]

const SKILL_TEXT = 'text-base font-medium leading-normal text-ink wide:text-[17px]'

const countSkills = (group) =>
  group.groups
    ? group.groups.reduce((total, subgroup) => total + subgroup.items.length, 0)
    : group.items.length

export default function Skills() {
  const { skillGroups, ui } = useContent()
  const tabs = TABS.map((tab) => ({ ...tab, ...ui.skills.tabs[tab.id] }))
  const [activeId, setActiveId] = useState(TABS[0].id)
  const isWide = useMediaQuery('(min-width: 900px)')
  const activeIndex = tabs.findIndex((tab) => tab.id === activeId)
  const activeTab = tabs[activeIndex]
  const group = skillGroups[activeIndex]

  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="flex flex-col gap-7 wide:gap-12"
    >
      <header className="flex flex-col gap-4 wide:flex-row wide:items-end wide:justify-between wide:gap-16">
        <h2
          id="skills-title"
          className="text-[clamp(32px,3.4vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink wide:shrink-0"
        >
          {ui.skills.title}
        </h2>
        <p className="text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-body wide:max-w-[520px]">
          {ui.skills.intro}
        </p>
      </header>

      <div className="flex flex-col gap-6 wide:flex-row wide:items-stretch wide:gap-10">
        <KnobSwitch
          options={tabs.map((tab) => ({
            id: tab.id,
            label: isWide ? tab.label : tab.short,
          }))}
          value={activeId}
          onChange={setActiveId}
          ariaLabel={ui.skills.tabsLabel}
          orientation={isWide ? 'vertical' : 'horizontal'}
          idPrefix="skills"
          showLed
          className="w-full max-w-[340px] self-center wide:w-60 wide:max-w-none wide:shrink-0 wide:self-stretch"
        />

        {/* The tray is one sunken well; the switch stretches with it, so they stay the same height. */}
        <div
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`skills-tab-${activeId}`}
          tabIndex={0}
          className="flex min-w-0 flex-col gap-4 rounded-[26px] bg-ground px-5 py-[22px] sh-tray focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent wide:min-h-[236px] wide:flex-1 wide:flex-row wide:flex-wrap wide:gap-x-10 wide:gap-y-5 wide:rounded-[30px] wide:py-7 wide:pl-9 wide:pr-10 wide:sh-screen"
        >
          <div className="@container flex min-w-0 flex-col gap-4 wide:flex-[1_1_380px] wide:gap-5">
            <div className="flex items-center gap-3.5 wide:gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ground text-ink-2 sh-icon wide:h-11 wide:w-11 wide:sh-icon-lg">
                <Icon name={activeTab.icon} className="h-[17px] w-[17px] wide:h-[18px] wide:w-[18px]" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <h3 className="text-eyebrow font-semibold uppercase tracking-caps-sm text-label wide:text-xs wide:tracking-caps">
                  {group.title}
                </h3>
                <p className="text-[13px] leading-[1.45] text-muted wide:text-sm wide:leading-normal">
                  {group.summary}
                </p>
              </div>
            </div>

            {group.groups ? (
              <dl className="flex flex-col gap-3.5 wide:gap-2.5">
                {group.groups.map((subgroup) => (
                  <div
                    key={subgroup.label}
                    className="flex flex-col gap-[3px] wide:flex-row wide:flex-wrap wide:items-baseline wide:gap-x-4"
                  >
                    <dt className="text-eyebrow font-semibold uppercase tracking-caps-xs text-label wide:w-[150px] wide:shrink-0">
                      {subgroup.label}
                    </dt>
                    <dd className={`min-w-0 wide:flex-[1_1_300px] ${SKILL_TEXT}`}>
                      {subgroup.items.join(' · ')}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <ul className="flex flex-col gap-3 wide:grid wide:grid-cols-[repeat(2,auto)] wide:justify-start wide:gap-x-7 wide:gap-y-3.5 wide:@[570px]:grid-cols-[repeat(3,auto)]">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[calc(0.75em-3px)] h-1.5 w-1.5 shrink-0 rounded-full bg-faint"
                    />
                    <span className={SKILL_TEXT}>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Counted from the items this group shows (portfolio.js), never typed in. */}
          <div className="ml-auto hidden w-[150px] shrink-0 flex-col items-end justify-center gap-2 wide:flex">
            <span className="font-display text-[72px] leading-none text-accent">
              <CountUp value={countSkills(group)} align="end" />
            </span>
            <span className="whitespace-nowrap text-eyebrow font-semibold uppercase tracking-caps text-label">
              {ui.skills.countLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
