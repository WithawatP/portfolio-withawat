export default function AvailabilityBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-surface px-3 py-1.5 text-[13px] font-semibold text-ink neu-inset-press">
      <span aria-hidden="true" className="relative mr-2 flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
      </span>
      Open to work
    </span>
  )
}
