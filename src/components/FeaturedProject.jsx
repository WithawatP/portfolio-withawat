import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'
import KnobSwitch from './ui/KnobSwitch'
import Icon from './ui/Icon'
import { IconKey } from './ui/Key'
import { featuredProject } from '../data/portfolio'
import atelierHome from '../assets/atelier-home.webp'
import atelierProducts from '../assets/atelier-products.webp'
import atelierBlog from '../assets/atelier-blog.webp'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

const projectGallery = [
  {
    src: atelierProducts,
    alt: 'Product catalogue with filters and bouquet cards',
  },
  {
    src: atelierHome,
    alt: 'Atelier De Flora homepage with the custom bouquet builder',
  },
  {
    src: atelierBlog,
    alt: 'Floral care blog with guides and studio stories',
  },
]

const INITIAL_SLIDE = 1

const projectViews = [
  { id: 'build', label: 'Build' },
  { id: 'test', label: 'Test' },
]

const EYEBROW = 'text-[11px] font-semibold uppercase tracking-[0.22em] text-label'
const SMALL_LABEL = 'text-[11px] font-semibold uppercase tracking-[0.2em] text-label'

function BuildView({ title, rows }) {
  return (
    <div className="flex flex-col gap-[18px]">
      <h3 className={EYEBROW}>{title}</h3>
      <ul className="flex flex-col gap-[18px]">
        {rows.map((row) => (
          <li key={row.title} className="flex items-center gap-3.5">
            <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full text-ink-2 sh-well">
              <Icon name={row.icon} className="h-[19px] w-[19px]" />
            </span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[15px] font-semibold text-ink">{row.title}</span>
              <span className="text-[13px] leading-normal text-muted">{row.line}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TestView({ testing }) {
  return (
    <div className="flex flex-col gap-[18px]">
      <h3 className={EYEBROW}>{testing.title}</h3>
      <div className="flex items-baseline gap-3.5">
        <span className="font-display text-[clamp(42px,4vw,56px)] leading-none text-accent">
          {testing.requestCount}
        </span>
        <span className="max-w-[240px] text-[13px] leading-normal text-muted">
          {testing.requestCaption}
        </span>
      </div>
      {testing.bugs.map((bug) => (
        <div key={bug.label} className="flex flex-col gap-1">
          <span className={SMALL_LABEL}>{bug.tag}</span>
          <p className="text-sm leading-[1.55] text-ink">{bug.short}</p>
        </div>
      ))}
    </div>
  )
}

export default function FeaturedProject() {
  const project = featuredProject
  const [projectView, setProjectView] = useState('build')
  const [activeSlide, setActiveSlide] = useState(INITIAL_SLIDE)

  return (
    <section
      id="featured"
      aria-labelledby="featured-title"
      className="flex flex-col gap-7 wide:gap-12"
    >
      <div className="flex flex-col gap-6 wide:flex-row wide:flex-wrap wide:items-end wide:justify-between wide:gap-10">
        <div className="flex max-w-[620px] flex-col gap-3.5">
          <p className={EYEBROW}>Featured project · {project.context}</p>
          <h2
            id="featured-title"
            className="text-[clamp(32px,3.4vw,48px)] font-semibold leading-[1.1] tracking-[-0.02em] text-ink"
          >
            {project.name}
          </h2>
          <p className="text-[clamp(15px,1.2vw,17px)] leading-[1.65] text-body">
            {project.summary}
          </p>
        </div>
        <dl className="flex flex-wrap gap-x-10 gap-y-4">
          {project.facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1">
              <dt className={SMALL_LABEL}>{fact.label}</dt>
              <dd className="text-sm font-semibold text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="flex flex-col gap-6 rounded-[32px] bg-ground p-4 sh-device wide:grid wide:grid-cols-[55fr_45fr] wide:gap-10 wide:rounded-[48px] wide:p-8">
        <div className="flex min-w-0 flex-col justify-center gap-3.5">
          <div className="rounded-3xl p-2.5 sh-screen">
            <div className="h-[210px] overflow-hidden rounded-2xl bg-screen wide:h-[400px]">
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                spaceBetween={16}
                initialSlide={INITIAL_SLIDE}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 150,
                  modifier: 2.5,
                  slideShadows: false,
                }}
                modules={[EffectCoverflow]}
                onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                className="atelier-coverflow h-full"
              >
                {projectGallery.map((shot) => (
                  // The cap keeps a 16:10 image inside the 210px screen on wide phones and tablets.
                  <SwiperSlide key={shot.src} className="!w-[78%] max-wide:!max-w-[304px]">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      width="1440"
                      height="900"
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full rounded-xl object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
          <div aria-hidden="true" className="flex justify-center gap-2">
            {projectGallery.map((shot, index) => (
              <span
                key={shot.src}
                className={`h-1.5 rounded-full [transition:all_.3s] ${
                  index === activeSlide ? 'w-[18px] bg-accent' : 'w-1.5 bg-faint'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-6 px-1 pb-2 wide:gap-8 wide:py-2 wide:pl-0 wide:pr-2">
          <KnobSwitch
            options={projectViews}
            value={projectView}
            onChange={setProjectView}
            ariaLabel="Project view"
            role="radiogroup"
            showLed
            className="w-full max-w-[320px] self-center"
          />

          {/* Both views share one grid cell, so the panel keeps the taller height. */}
          <div aria-live="polite" className="grid">
            {projectViews.map((view) => {
              const isActive = view.id === projectView
              return (
                <div
                  key={view.id}
                  inert={!isActive}
                  className={`col-start-1 row-start-1 min-w-0 ${isActive ? 'visible' : 'invisible'}`}
                >
                  {view.id === 'build' ? (
                    <BuildView title={project.buildTitle} rows={project.buildRows} />
                  ) : (
                    <TestView testing={project.testing} />
                  )}
                </div>
              )
            })}
          </div>

          <p className="text-[13px] leading-[1.6] text-muted">{project.techLine.join(' · ')}</p>

          <div className="grid grid-cols-4 gap-2 wide:flex wide:gap-7">
            {project.links.map((link) => (
              <IconKey
                key={link.label}
                href={link.href}
                icon={link.icon}
                label={link.shortLabel}
                external
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
