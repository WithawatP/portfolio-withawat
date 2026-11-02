import AvailabilityBadge from './ui/AvailabilityBadge'
import ContourHero from './ui/ContourHero'
import Icon from './ui/Icon'
import Key from './ui/Key'
import { profile } from '../data/portfolio'

export default function Hero() {
  const [firstName, lastName] = profile.name.split(' ')

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex flex-col wide:min-h-[760px] wide:justify-center"
    >
      <ContourHero className="relative h-[230px] wide:absolute wide:inset-y-0 wide:right-0 wide:h-auto wide:w-[52%]" />

      <div className="mx-auto -mt-6 w-full max-w-[1240px] px-4 wide:mt-0 wide:px-12">
        <div className="relative z-10 flex flex-col gap-5 wide:max-w-[540px] wide:gap-7">
          <div className="hidden wide:block">
            <AvailabilityBadge>{profile.statusLong}</AvailabilityBadge>
          </div>

          <h1
            id="hero-title"
            className="font-display text-[clamp(34px,4.6vw,64px)] font-normal uppercase leading-[1.06] tracking-[-0.01em] text-ink"
          >
            {firstName}
            <br />
            {lastName}
          </h1>

          <p className="text-[clamp(16px,1.4vw,19px)] font-semibold text-ink-2">
            {profile.heroRole}
          </p>

          <p className="max-w-[440px] text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-body">
            {profile.headline}
          </p>

          <div className="grid grid-cols-2 gap-3.5 pt-2 wide:flex wide:gap-5">
            <Key
              href={profile.cvHref}
              download
              variant="primary"
              icon="download"
              className="whitespace-nowrap max-wide:px-3.5"
            >
              Download CV
            </Key>
            <Key href="#featured" className="whitespace-nowrap max-wide:px-3.5">
              View project
              <Icon name="arrowRight" className="h-[18px] w-[18px] shrink-0" />
            </Key>
          </div>
        </div>
      </div>
    </section>
  )
}
