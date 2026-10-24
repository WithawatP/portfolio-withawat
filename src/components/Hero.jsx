import SectionCard from './ui/SectionCard'
import InsetPanel from './ui/InsetPanel'
import Pill from './ui/Pill'
import QuickContactRow from './ui/QuickContactRow'
import AvailabilityBadge from './ui/AvailabilityBadge'
import UiverseButton from './ui/UiverseButton'
import { coreStack, profile, quickContacts } from '../data/portfolio'

export default function Hero() {
  return (
    <SectionCard id="home" labelledBy="hero-title">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        <div className="flex min-w-0 flex-col lg:col-span-7">
          <h1
            id="hero-title"
            className="rise text-balance text-[clamp(3rem,9vw,5.75rem)] font-extrabold leading-[0.88] tracking-[-0.055em] text-[#333333]"
          >
            Withawat
            <br />
            Phiraban
          </h1>

          <p className="rise rise-delay-1 mt-5 text-xl font-semibold text-[#333333]">
            Junior Software Developer <span aria-hidden="true">·</span> QA / Software Tester
          </p>

          <p className="rise rise-delay-2 mt-5 max-w-[42ch] text-xl leading-relaxed text-[#333333]">
            {profile.headline}
          </p>

          <p className="rise rise-delay-2 mt-4 max-w-[52ch] text-base leading-relaxed text-[#333333]">
            {profile.bio}
          </p>

          <div className="rise rise-delay-3 mt-8">
            <InsetPanel>
              <p className="text-[13px] font-semibold text-[#333333]">
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

          <div className="rise rise-delay-4 mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <UiverseButton href={profile.cvHref} download icon="download">
              Download CV (PDF)
            </UiverseButton>
            <UiverseButton href="#featured" icon="arrowRight">
              View Portfolio / Projects
            </UiverseButton>
            <UiverseButton href="#contact" icon="mail">
              Contact Me
            </UiverseButton>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
          <InsetPanel className="rise rise-delay-1">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-bold text-[#333333]">Availability</h2>
              <AvailabilityBadge />
            </div>
            <p className="mt-4 text-base leading-relaxed text-[#333333]">
              Open to junior developer and QA / tester roles. Remote or hybrid
              across Pathum Thani and northern Bangkok.
            </p>
            <dl className="mt-5 flex flex-col gap-3">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[13px] font-medium text-[#333333]">
                  Location
                </dt>
                <dd className="text-right text-base font-semibold text-[#333333]">
                  {profile.location}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[13px] font-medium text-[#333333]">
                  Expected salary
                </dt>
                <dd className="text-right text-base font-semibold text-[#333333]">
                  {profile.salary}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[13px] font-medium text-[#333333]">
                  Work style
                </dt>
                <dd className="text-right text-base font-semibold text-[#333333]">
                  Remote / Hybrid
                </dd>
              </div>
            </dl>
          </InsetPanel>

          <InsetPanel className="rise rise-delay-2">
            <h2 className="text-base font-bold text-[#333333]">Quick contact</h2>
            <div className="mt-4 flex flex-col gap-3">
              {quickContacts.map((item) => (
                <QuickContactRow key={item.label} {...item} />
              ))}
            </div>
          </InsetPanel>
        </div>
      </div>
    </SectionCard>
  )
}
