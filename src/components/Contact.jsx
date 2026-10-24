import { useState } from 'react'
import SectionCard from './ui/SectionCard'
import SectionHeading from './ui/SectionHeading'
import InsetPanel from './ui/InsetPanel'
import Pill from './ui/Pill'
import Icon from './ui/Icon'
import QuickContactRow from './ui/QuickContactRow'
import { FOCUS, LEVEL_3, LEVEL_3_ACTIVE, LEVEL_3_HOVER } from '../lib/styles'
import { profile } from '../data/portfolio'

export default function Contact() {
  const [mailAnimating, setMailAnimating] = useState(false)

  const handleSendEmail = (event) => {
    event.preventDefault()
    if (mailAnimating) return
    setMailAnimating(true)
    window.setTimeout(() => {
      window.location.href = `mailto:${profile.email}`
    }, 1000)
  }

  return (
    <SectionCard id="contact" labelledBy="contact-title">
      <SectionHeading
        id="contact-title"
        title="Contact"
        intro="Open to junior developer and QA / tester roles. If your team values careful building, clear communication, and a quality mindset, let's talk."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        <InsetPanel className="rise rise-delay-1 flex flex-col justify-between gap-8 lg:col-span-7">
          <div>
            <a
              href={`mailto:${profile.email}`}
              className={`block break-all rounded-lg text-[clamp(1.5rem,3.8vw,2.75rem)] font-extrabold leading-tight tracking-[-0.04em] text-[#333333] underline-offset-8 transition-all duration-200 hover:underline ${FOCUS}`}
            >
              {profile.email}
            </a>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-[#333333]">
              Based in Pathum Thani, Thailand. Open to remote and hybrid roles
              across Bangkok and Pathum Thani.
            </p>
            <a
              href={profile.phoneHref}
              className={`mt-2 inline-block rounded-lg text-base font-semibold text-[#333333] underline-offset-4 transition-all duration-200 hover:underline ${FOCUS}`}
            >
              {profile.phone}
            </a>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={handleSendEmail}
              disabled={mailAnimating}
              className={`${LEVEL_3} ${LEVEL_3_HOVER} ${LEVEL_3_ACTIVE} ${FOCUS} group inline-flex w-full items-center justify-center gap-2 text-[13px] sm:w-auto ${
                mailAnimating ? 'pointer-events-none' : 'cursor-pointer'
              }`}
            >
              <Icon
                name="arrowRight"
                className={`h-4 w-4 shrink-0 text-[#9B9B9B] transition-transform duration-700 ${
                  mailAnimating ? '-translate-y-6 translate-x-6 opacity-0' : ''
                }`}
              />
              <span>Send an email</span>
            </button>
            <Pill
              href={profile.phoneHref}
              icon="phone"
              className="w-full justify-center sm:w-auto"
            >
              Call me
            </Pill>
            <Pill
              href={profile.cvHref}
              download
              icon="download"
              className="w-full justify-center sm:w-auto"
            >
              Download CV
            </Pill>
          </div>
        </InsetPanel>

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
          <InsetPanel className="rise rise-delay-3">
            <h3 className="text-base font-bold text-[#333333]">
              Professional profiles
            </h3>
            <div className="mt-4 flex flex-col gap-3">
              <QuickContactRow
                href={profile.github}
                label="GitHub"
                value={profile.githubLabel}
                icon="github"
              />
              <QuickContactRow
                href={profile.linkedin}
                label="LinkedIn"
                value={profile.linkedinLabel}
                icon="linkedin"
              />
            </div>
          </InsetPanel>
        </div>
      </div>
    </SectionCard>
  )
}
