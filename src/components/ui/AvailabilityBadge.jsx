export default function AvailabilityBadge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-ink-2 sh-well wide:gap-2.5 wide:px-[18px] wide:py-2.5 wide:text-[13px] ${className}`}
    >
      <span aria-hidden="true" className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-led opacity-75"></span>
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-led"></span>
      </span>
      {children}
    </span>
  )
}
