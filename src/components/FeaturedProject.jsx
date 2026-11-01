import { useId, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'
import SectionCard from './ui/SectionCard'
import SectionHeading from './ui/SectionHeading'
import InsetPanel from './ui/InsetPanel'
import SkillChip from './ui/SkillChip'
import KnobSwitch from './ui/KnobSwitch'
import Icon from './ui/Icon'
import { FOCUS, LEVEL_3_ACTIVE, LEVEL_3_COMPACT, LEVEL_3_HOVER } from '../lib/styles'
import { useMediaQuery } from '../lib/useMediaQuery'
import { featuredProject } from '../data/portfolio'
import atelierHome from '../assets/atelier-home.jpg'
import atelierProducts from '../assets/atelier-products.jpg'
import atelierBlog from '../assets/atelier-blog.jpg'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

const projectGallery = [
  {
    src: atelierProducts,
    alt: 'Product catalogue with filters and bouquet cards',
    caption: 'Products - filterable catalogue',
  },
  {
    src: atelierHome,
    alt: 'Atelier De Flora homepage with the custom bouquet builder',
    caption: 'Home - custom bouquet builder',
  },
  {
    src: atelierBlog,
    alt: 'Floral care blog with guides and studio stories',
    caption: 'Blog - guides and studio stories',
  },
]

function FlowerMark({ className = '' }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <g transform="translate(24 24)">
        {[0, 60, 120, 180, 240, 300].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-10"
            rx="4.5"
            ry="7"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx="0" cy="0" r="3" />
      </g>
    </svg>
  )
}

const projectViews = [
  { id: 'build', label: 'Build' },
  { id: 'test', label: 'Test' },
]

function BuildView({ contributions }) {
  return (
    <>
      <h3 className="text-base font-bold text-ink">What I built</h3>
      <ul className="mt-5 flex flex-col gap-5">
        {contributions.map((contribution) => (
          <li key={contribution.title} className="flex gap-4">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface text-ink neu-raise-xs">
              <Icon name="check" className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <h4 className="text-base font-bold text-ink">{contribution.title}</h4>
              <p className="mt-1 text-base leading-relaxed text-ink">{contribution.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

function TermList({ rows, className = '' }) {
  return (
    <dl className={`flex flex-col gap-2 ${className}`}>
      {rows.map(([term, detail]) => (
        <div key={term} className="sm:grid sm:grid-cols-[5rem_minmax(0,1fr)] sm:gap-3">
          <dt className="mr-2 inline text-[13px] font-bold leading-6 text-ink sm:mr-0">{term}</dt>
          <dd className="inline text-base leading-relaxed text-ink">{detail}</dd>
        </div>
      ))}
    </dl>
  )
}

function TestView({ testing }) {
  return (
    <>
      <h3 className="text-base font-bold text-ink">{testing.title}</h3>
      <p className="mt-3 text-base leading-relaxed text-ink">{testing.method}</p>

      <div className="mt-5 flex items-center gap-4">
        <span className="font-display text-[2.25rem] font-bold leading-none text-ink">
          {testing.requestCount}
        </span>
        <p className="text-[13px] font-medium text-ink">{testing.requestLabel}</p>
      </div>

      <TermList
        className="mt-4"
        rows={testing.folders.map((folder) => [folder.label, folder.items.join(', ')])}
      />

      <h4 className="mt-6 text-base font-bold text-ink">{testing.bugsTitle}</h4>
      <ul className="mt-4 flex flex-col gap-5">
        {testing.bugs.map((bug) => (
          <li key={bug.label}>
            <p className="text-[13px] font-medium text-ink">{bug.label}</p>
            <TermList
              className="mt-2"
              rows={[
                ['Symptom', bug.symptom],
                ['Cause', bug.cause],
                ['Fix', bug.fix],
              ]}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default function FeaturedProject() {
  const project = featuredProject
  const [techOpen, setTechOpen] = useState(false)
  const [projectView, setProjectView] = useState('build')
  const isSmall = useMediaQuery('(max-width: 639px)')
  const techPanelId = useId()

  return (
    <SectionCard id="featured" labelledBy="featured-title">
      <SectionHeading
        id="featured-title"
        title="Featured project"
        intro="A team-built storefront for ready-made and custom bouquets, with a complete customer and admin experience."
        meta={project.context}
      />

      <InsetPanel>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-ink">{project.type}</p>
            <h3 className="mt-2 text-balance text-[clamp(2.25rem,5vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.045em] text-ink">
              {project.name}
            </h3>
            <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-ink">
              {project.summary}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="hidden h-28 w-28 shrink-0 items-center justify-center rounded-full bg-surface text-ink neu-raise-sm sm:flex"
          >
            <FlowerMark className="h-14 w-14" />
          </span>
        </div>

        <dl className="mt-7 grid gap-4 sm:grid-cols-3">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[13px] font-medium text-ink">{fact.label}</dt>
              <dd className="mt-1 text-base font-semibold text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </InsetPanel>

      <div className="mt-6">
        <div className="inset-window-tray rounded-2xl bg-surface p-3 neu-inset-lg sm:rounded-3xl sm:p-4">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            spaceBetween={16}
            initialSlide={1}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 150,
              modifier: 2.5,
              slideShadows: false,
            }}
            modules={[EffectCoverflow]}
            className="atelier-coverflow"
          >
            {projectGallery.map((shot) => (
              <SwiperSlide key={shot.caption} className="!w-[78%] sm:!w-[58%] lg:!w-[38%]">
                <figure className="min-w-0">
                  <div className="rounded-2xl bg-surface p-2 neu-raise-sm sm:rounded-3xl">
                    <div className="overflow-hidden rounded-xl sm:rounded-2xl">
                      <img
                        src={shot.src}
                        alt={shot.alt}
                        width="1440"
                        height="900"
                        loading="lazy"
                        decoding="async"
                        className="inset-window-img aspect-[16/10] w-full object-cover"
                      />
                    </div>
                  </div>
                  <figcaption className="mt-2 px-2 text-center text-[13px] font-medium text-ink">
                    {shot.caption}
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <p className="mt-3 px-2 text-[13px] text-ink">Screens captured from the deployed demo.</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <InsetPanel className="lg:col-span-7">
          <KnobSwitch
            options={projectViews}
            value={projectView}
            onChange={setProjectView}
            ariaLabel="Project view"
            role="radiogroup"
            showLed
            knobMotion="duration-[450ms] ease-[cubic-bezier(0.3,1.3,0.5,1)]"
            className="sm:max-w-xs"
          />
          {/* Both views share one grid cell, so the panel keeps the taller height. */}
          <div aria-live="polite" className="mt-6 grid">
            {projectViews.map((view) => {
              const isActive = view.id === projectView
              return (
                <div
                  key={view.id}
                  inert={!isActive}
                  className={`col-start-1 row-start-1 min-w-0 transition-[opacity,visibility] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                    isActive ? 'visible opacity-100' : 'invisible opacity-0'
                  }`}
                >
                  {view.id === 'build' ? (
                    <BuildView contributions={project.contributions} />
                  ) : (
                    <TestView testing={project.testing} />
                  )}
                </div>
              )
            })}
          </div>
        </InsetPanel>

        <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
          <InsetPanel>
            <button
              type="button"
              aria-expanded={techOpen}
              aria-controls={techPanelId}
              onClick={() => setTechOpen((value) => !value)}
              className={`${FOCUS} ${LEVEL_3_ACTIVE} flex min-h-11 w-full items-center justify-between rounded-2xl bg-surface px-4 text-base font-bold text-ink neu-raise-sm transition-all duration-200 sm:hidden`}
            >
              <span>Tech stack</span>
              <Icon
                name="chevronDown"
                className={`h-4 w-4 text-faint transition-transform duration-300 ${
                  techOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <h3 className="hidden text-base font-bold text-ink sm:block">
              Tech stack
            </h3>
            <div
              id={techPanelId}
              inert={isSmall && !techOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-[400ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${
                techOpen
                  ? 'grid-rows-[1fr] opacity-100'
                  : 'grid-rows-[0fr] opacity-0'
              } sm:grid-rows-[1fr] sm:opacity-100`}
            >
              <div className="overflow-hidden">
                <div className="mt-4 flex flex-col gap-5">
                  {project.stack.map((group, groupIndex) => {
                    const onePerRow = group.items.length <= 2
                    const labelId = `stack-label-${groupIndex}`
                    return (
                      <div key={group.label}>
                        <p id={labelId} className="text-[13px] font-medium text-ink">
                          {group.label}
                        </p>
                        <ul
                          aria-labelledby={labelId}
                          className="mt-2 grid grid-cols-2 gap-2"
                        >
                          {group.items.map((item, itemIndex) => {
                            const spansBoth =
                              onePerRow ||
                              (group.items.length % 2 === 1 &&
                                itemIndex === group.items.length - 1)
                            return (
                              <SkillChip
                                key={item}
                                className={spansBoth ? 'col-span-2' : ''}
                              >
                                {item}
                              </SkillChip>
                            )
                          })}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </InsetPanel>

          <InsetPanel>
            <h3 className="text-base font-bold text-ink">Project links</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:flex sm:flex-col">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${LEVEL_3_COMPACT} ${LEVEL_3_HOVER} ${LEVEL_3_ACTIVE} ${FOCUS} group flex min-h-11 w-full items-center justify-center gap-2 text-[13px] sm:min-h-0 sm:justify-start sm:gap-3`}
                >
                  <Icon name={link.icon} className="h-4 w-4 shrink-0 text-faint" />
                  <span className="text-center sm:hidden">{link.shortLabel}</span>
                  <span className="hidden flex-1 text-left sm:inline">{link.label}</span>
                  <Icon name="arrowUpRight" className="hidden h-4 w-4 shrink-0 text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" />
                </a>
              ))}
            </div>
          </InsetPanel>
        </div>
      </div>
    </SectionCard>
  )
}
