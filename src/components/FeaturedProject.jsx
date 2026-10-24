import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow } from 'swiper/modules'
import SectionCard from './ui/SectionCard'
import SectionHeading from './ui/SectionHeading'
import InsetPanel from './ui/InsetPanel'
import Pill from './ui/Pill'
import Icon from './ui/Icon'
import { FOCUS, LEVEL_3, LEVEL_3_ACTIVE, LEVEL_3_HOVER } from '../lib/styles'
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

export default function FeaturedProject() {
  const project = featuredProject

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .atelier-coverflow .swiper-slide {
        transition: transform 400ms ease, filter 400ms ease;
      }
      .atelier-coverflow .swiper-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .atelier-coverflow .swiper-slide-shadow-left,
      .atelier-coverflow .swiper-slide-shadow-right {
        background-image: none !important;
      }
    `
    document.head.appendChild(style)
    return () => document.head.removeChild(style)
  }, [])

  return (
    <SectionCard id="featured" labelledBy="featured-title">
      <SectionHeading
        id="featured-title"
        title="Featured project"
        intro="A team-built storefront for ready-made and custom bouquets, with a complete customer and admin experience."
        meta={project.context}
      />

      <InsetPanel className="rise rise-delay-1">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-[13px] font-medium text-[#333333]">{project.type}</p>
            <h3 className="mt-2 text-balance text-[clamp(2.25rem,5vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.045em] text-[#333333]">
              {project.name}
            </h3>
            <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-[#333333]">
              {project.summary}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="hidden h-28 w-28 shrink-0 items-center justify-center rounded-full bg-[#E7E7E7] text-[#333333] shadow-[4px_4px_10px_#b6b6b6,-4px_-4px_10px_#ffffff] sm:flex"
          >
            <FlowerMark className="h-14 w-14" />
          </span>
        </div>

        <dl className="mt-7 grid gap-4 sm:grid-cols-3">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="text-[13px] font-medium text-[#333333]">{fact.label}</dt>
              <dd className="mt-1 text-base font-semibold text-[#333333]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </InsetPanel>

      <div className="mt-6">
        <div className="rounded-3xl bg-[#E7E7E7] p-3 shadow-[inset_6px_6px_12px_#b6b6b6,inset_-6px_-6px_12px_#ffffff] sm:p-4">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            spaceBetween={16}
            initialSlide={0}
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
                  <div className="rounded-3xl bg-[#E7E7E7] p-2 shadow-[4px_4px_10px_#b6b6b6,-4px_-4px_10px_#ffffff]">
                    <img
                      src={shot.src}
                      alt={shot.alt}
                      width="1440"
                      height="900"
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full rounded-2xl object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 px-2 text-center text-[13px] font-medium text-[#333333]">
                    {shot.caption}
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <p className="mt-3 px-2 text-[13px] text-[#333333]">Screens captured from the deployed demo.</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <InsetPanel className="rise rise-delay-3 lg:col-span-7">
          <h3 className="text-base font-bold text-[#333333]">What I built</h3>
          <ul className="mt-5 flex flex-col gap-5">
            {project.contributions.map((contribution) => (
              <li key={contribution.title} className="flex gap-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7E7E7] text-[#333333] shadow-[3px_3px_6px_#b6b6b6,-3px_-3px_6px_#ffffff]">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-[#333333]">{contribution.title}</h4>
                  <p className="mt-1 text-base leading-relaxed text-[#333333]">{contribution.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </InsetPanel>

        <div className="rise rise-delay-4 flex min-w-0 flex-col gap-6 lg:col-span-5">
          <InsetPanel>
            <h3 className="text-base font-bold text-[#333333]">Tech stack</h3>
            <div className="mt-4 flex flex-col gap-4">
              {project.stack.map((group) => (
                <div key={group.label}>
                  <p className="text-[13px] font-medium text-[#333333]">{group.label}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Pill>{item}</Pill>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </InsetPanel>

          <InsetPanel>
            <h3 className="text-base font-bold text-[#333333]">Project links</h3>
            <div className="mt-4 flex flex-col gap-3">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${LEVEL_3} ${LEVEL_3_HOVER} ${LEVEL_3_ACTIVE} ${FOCUS} group flex w-full items-center gap-3 text-[13px]`}
                >
                  <Icon name={link.icon} className="h-4 w-4 shrink-0 text-[#9B9B9B]" />
                  <span className="flex-1 text-left">{link.label}</span>
                  <Icon name="arrowUpRight" className="h-4 w-4 shrink-0 text-[#9B9B9B] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          </InsetPanel>
        </div>
      </div>
    </SectionCard>
  )
}
