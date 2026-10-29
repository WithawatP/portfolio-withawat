import SectionCard from './ui/SectionCard'
import SectionHeading from './ui/SectionHeading'
import InsetPanel from './ui/InsetPanel'
import QuickContactRow from './ui/QuickContactRow'
import UiverseButton from './ui/UiverseButton'
import { FOCUS } from '../lib/styles'
import { profile } from '../data/portfolio'

export default function Contact() {

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
              className={`block break-all rounded-lg text-[clamp(1.5rem,3.8vw,2.75rem)] font-extrabold leading-tight tracking-[-0.04em] text-ink underline-offset-8 transition-all duration-200 hover:underline ${FOCUS}`}
            >
              {profile.email}
            </a>
            <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-ink">
              Based in Pathum Thani, Thailand. Open to remote and hybrid roles
              across Bangkok and Pathum Thani.
            </p>
            <a
              href={profile.phoneHref}
              className={`mt-2 inline-block rounded-lg text-base font-semibold text-ink underline-offset-4 transition-all duration-200 hover:underline ${FOCUS}`}
            >
              {profile.phone}
            </a>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <UiverseButton href="mailto:withawat1201@gmail.com" icon="mail">
              Send an email
            </UiverseButton>
            <UiverseButton href={profile.phoneHref} icon="phone">
              Call me
            </UiverseButton>
            <UiverseButton href={profile.cvHref} download icon="download">
              Download CV
            </UiverseButton>
          </div>
        </InsetPanel>

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
          <InsetPanel className="rise rise-delay-3">
            <h3 className="text-base font-bold text-ink">
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
