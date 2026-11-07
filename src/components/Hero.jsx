import { useRef } from 'react'
import AvailabilityBadge from './ui/AvailabilityBadge'
import ContourHero from './ui/ContourHero'
import Icon from './ui/Icon'
import Key from './ui/Key'
import { useHeroMotion } from '../lib/useHeroMotion'
import { useContent } from '../lib/content'

// The name: Michroma capitals on two lines on /; on /th/ the Thai name on one line in Mitr 300 (design.md 4),
// a little looser, because Thai vowels and tone marks sit above and below the line. Below 900px the Thai name
// is 42.4px, measured so it ends where the role line under it ends (both are fixed sizes there).
const NAME = {
  en: 'font-display font-normal uppercase leading-[1.06] tracking-[-0.01em] text-[clamp(34px,4.6vw,64px)]',
  th: 'font-thai-name font-light leading-[1.2] whitespace-nowrap text-[42.4px] wide:text-[clamp(34px,4.6vw,64px)]',
}

export default function Hero() {
  const { lang, profile, ui } = useContent()
  const [firstName, lastName] = profile.name.split(' ')
  const sectionRef = useRef(null)
  useHeroMotion(sectionRef)

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-title"
      className="relative flex flex-col wide:min-h-[760px] wide:justify-center"
    >
      <ContourHero className="relative h-[230px] wide:absolute wide:inset-y-0 wide:right-0 wide:h-auto wide:w-[52%]" />

      <div className="mx-auto w-full max-w-[1240px] px-4 wide:px-12">
        <div className="hero-copy relative z-10 flex flex-col gap-5 wide:max-w-[540px] wide:gap-7">
          <div className="hidden wide:block">
            <AvailabilityBadge>{profile.statusLong}</AvailabilityBadge>
          </div>

          <h1
            id="hero-title"
            className={`${NAME[lang]} text-ink`}
          >
            {profile.heroName ?? (
              <>
                {firstName}
                <br />
                {lastName}
              </>
            )}
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
              {ui.hero.downloadCv}
            </Key>
            <Key href="#featured" className="whitespace-nowrap max-wide:px-3.5">
              {ui.hero.viewProject}
              <Icon name="arrowRight" className="h-[18px] w-[18px] shrink-0" />
            </Key>
          </div>
        </div>
      </div>
    </section>
  )
}
