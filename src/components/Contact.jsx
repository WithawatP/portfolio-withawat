import SectionCard from "./ui/SectionCard";
import SectionHeading from "./ui/SectionHeading";
import InsetPanel from "./ui/InsetPanel";
import QuickContactRow from "./ui/QuickContactRow";
import UiverseButton from "./ui/UiverseButton";
import { FOCUS } from "../lib/styles";
import { profile } from "../data/portfolio";

export default function Contact() {
  const [emailUser, emailDomain] = profile.email.split("@");

  return (
    <SectionCard id="contact" labelledBy="contact-title">
      <SectionHeading id="contact-title" title="Contact" />

      <div className="grid gap-6 lg:grid-cols-12">
        <InsetPanel className="rise rise-delay-1 lg:col-span-12">
          <a
            href={`mailto:${profile.email}`}
            className={`block rounded-lg text-[clamp(2rem,9.2vw,2.25rem)] font-extrabold leading-tight tracking-[-0.04em] text-ink underline-offset-8 transition-all duration-200 hover:underline [overflow-wrap:anywhere] sm:text-[clamp(2.25rem,5.8vw,4.5rem)] ${FOCUS}`}
          >
            {emailUser}
            <wbr />@{emailDomain}
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
        </InsetPanel>

        <div className="rise rise-delay-2 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:col-span-7 lg:content-center lg:items-center">
          <UiverseButton
            href={`mailto:${profile.email}`}
            icon="mail"
            primary
            mobileBlock
            className="col-span-2 sm:col-auto"
          >
            Send an email
          </UiverseButton>
          <UiverseButton href={profile.phoneHref} icon="phone" mobileBlock>
            Call me
          </UiverseButton>
          <UiverseButton
            href={profile.cvHref}
            download
            icon="download"
            mobileBlock
          >
            Download CV
          </UiverseButton>
        </div>

        <div className="hidden min-w-0 flex-col gap-6 sm:flex lg:col-span-5">
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
  );
}
