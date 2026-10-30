export default function SectionHeading({ id, title, intro, meta }) {
  return (
    <header className="rise mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h2
          id={id}
          className="text-balance text-[clamp(1.9rem,3.4vw,2.75rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-ink"
        >
          {title}
        </h2>
        {intro ? (
          <p className="mt-3 max-w-[62ch] text-base leading-relaxed text-ink">
            {intro}
          </p>
        ) : null}
      </div>
      {meta ? (
        <p className="shrink-0 text-[13px] font-medium text-ink">{meta}</p>
      ) : null}
    </header>
  )
}
