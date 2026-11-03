import AvailabilityBadge from './ui/AvailabilityBadge'
import CopyKey from './ui/CopyKey'
import Key, { IconKey, PadKey } from './ui/Key'
import { profile } from '../data/portfolio'

export default function Contact() {
  const mailHref = `mailto:${profile.email}`

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="flex items-center justify-between gap-4">
        <h2
          id="contact-title"
          className="text-[11px] font-semibold uppercase tracking-[0.22em] text-label wide:text-xs"
        >
          Contact
        </h2>
        <AvailabilityBadge>{profile.statusShort}</AvailabilityBadge>
      </div>

      <div className="mt-7 flex items-center gap-3.5 wide:mt-12 wide:justify-center wide:gap-6">
        <p className="min-w-0 flex-1 whitespace-nowrap text-[clamp(19px,5.9vw,24px)] font-semibold leading-[1.2] tracking-[-0.02em] text-ink wide:flex-none wide:text-[clamp(40px,4.45vw,64px)] wide:leading-none wide:tracking-[-0.03em]">
          {profile.email}
        </p>
        <CopyKey value={profile.email} label="Copy email" />
      </div>

      <p className="mt-[18px] text-[15px] leading-[1.65] text-body wide:mt-[22px] wide:text-center wide:text-[17px] wide:leading-[1.6]">
        <span className="block wide:inline">{profile.phone}</span>
        <span className="hidden wide:inline"> · </span>
        {profile.contactLine}
      </p>

      {/* >= 900px: the keypad. No Call key on desktop. */}
      <div className="mt-14 hidden justify-center gap-5 wide:flex">
        <PadKey href={mailHref} icon="mail" label="Send email" variant="primary" className="w-[280px]" />
        <PadKey href={profile.cvHref} download icon="download" label="Download CV" className="w-[140px]" />
        <PadKey href={profile.github} external icon="github" label="GitHub" className="w-[140px]" />
        <PadKey href={profile.linkedin} external icon="linkedin" label="LinkedIn" className="w-[140px]" />
      </div>

      {/* < 900px: one wide key, then a row of four icon keys. */}
      <div className="mt-10 wide:hidden">
        <Key href={mailHref} variant="primary" icon="mail" className="w-full">
          Send email
        </Key>
        <div className="mt-8 grid grid-cols-4">
          <IconKey href={profile.phoneHref} icon="phone" label="Call" />
          <IconKey href={profile.cvHref} download icon="download" label="CV" />
          <IconKey href={profile.github} external icon="github" label="GitHub" />
          <IconKey href={profile.linkedin} external icon="linkedin" label="LinkedIn" />
        </div>
      </div>
    </section>
  )
}
