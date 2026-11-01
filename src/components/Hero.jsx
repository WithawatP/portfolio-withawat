import SectionCard from './ui/SectionCard'
import InsetPanel from './ui/InsetPanel'
import Pill from './ui/Pill'
import QuickContactRow from './ui/QuickContactRow'
import AvailabilityBadge from './ui/AvailabilityBadge'
import UiverseButton from './ui/UiverseButton'
import { coreStack, profile, quickContacts } from '../data/portfolio'

export default function Hero() {
  const copyContacts = quickContacts.filter(
    (item) => item.href.startsWith('mailto:') || item.href.startsWith('tel:')
  )
  const compactContacts = quickContacts.filter(
    (item) => !item.href.startsWith('mailto:') && !item.href.startsWith('tel:')
  )

  return (
    <SectionCard id="home" labelledBy="hero-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="flex min-w-0 flex-col lg:col-span-7">
          <h1
            id="hero-title"
            className="rise text-balance font-display text-[clamp(2.875rem,9vw,5.75rem)] font-bold leading-none tracking-[-0.03em] text-ink"
          >
            Withawat
            <br />
            Phiraban
          </h1>

          <p className="rise rise-delay-1 mt-5 text-base font-semibold text-ink max-sm:whitespace-nowrap sm:text-xl">
            Junior Software Developer <span aria-hidden="true">·</span> QA <span className="hidden sm:inline">/ Software </span>Tester
          </p>

          <p className="rise rise-delay-2 mt-5 max-w-[42ch] text-xl leading-relaxed text-ink max-sm:order-1">
            {profile.headline}
          </p>

          <p className="rise rise-delay-2 mt-4 hidden max-w-[52ch] text-base leading-relaxed text-ink sm:block">
            {profile.bio}
          </p>

          <div className="rise rise-delay-3 mt-8 max-sm:order-1">
            <InsetPanel>
              <p className="text-[13px] font-semibold text-ink">
                Core stack
              </p>
              <ul
                aria-label="Core technologies"
                className="mt-3 flex flex-wrap gap-2"
              >
                {coreStack.map((skill) => (
                  <li key={skill}>
                    <Pill>{skill}</Pill>
                  </li>
                ))}
              </ul>
            </InsetPanel>
          </div>

          <div className="rise rise-delay-4 mt-8 grid grid-cols-2 gap-3 max-sm:mt-5 sm:flex sm:flex-wrap">
            <UiverseButton
              href={profile.cvHref}
              download
              icon="download"
              primary
              mobileBlock
              className="col-span-2 sm:col-auto"
            >
              Download CV (PDF)
            </UiverseButton>
            <UiverseButton href="#featured" icon="arrowRight" mobileBlock>
              View projects
            </UiverseButton>
            <UiverseButton href="#contact" icon="mail" mobileBlock>
              Contact me
            </UiverseButton>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
          <InsetPanel className="rise rise-delay-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-bold text-ink">Availability</h2>
              <AvailabilityBadge />
            </div>
            <p className="mt-4 text-base leading-relaxed text-ink">
              Open to junior developer and QA / tester roles. Remote or hybrid
              across Pathum Thani and northern Bangkok.
            </p>
            <dl className="mt-5 flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[13px] font-medium text-ink">
                  Location
                </dt>
                <dd className="text-right text-base font-semibold text-ink">
                  {profile.location}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[13px] font-medium text-ink">
                  Expected salary
                </dt>
                <dd className="text-right text-base font-semibold text-ink">
                  {profile.salary}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[13px] font-medium text-ink">
                  Work style
                </dt>
                <dd className="text-right text-base font-semibold text-ink">
                  Remote / Hybrid
                </dd>
              </div>
            </dl>
          </InsetPanel>

          <InsetPanel className="rise rise-delay-2">
            <h2 className="text-base font-bold text-ink">Quick contact</h2>
            <div className="mt-4 flex flex-col gap-3">
              {copyContacts.map((item) => (
                <QuickContactRow key={item.label} {...item} />
              ))}
              <div className="flex gap-3 sm:flex-col">
                {compactContacts.map((item) => (
                  <QuickContactRow key={item.label} {...item} compact />
                ))}
              </div>
            </div>
          </InsetPanel>
        </div>
      </div>
    </SectionCard>
  )
}
