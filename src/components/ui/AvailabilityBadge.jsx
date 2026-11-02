export default function AvailabilityBadge({ children, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-ink-2 sh-well wide:gap-2.5 wide:px-[18px] wide:py-2.5 wide:text-[13px] ${className}`}
    >
      <span
        aria-hidden="true"
        className="h-[7px] w-[7px] shrink-0 animate-led-blink rounded-full bg-led [box-shadow:var(--led-glow-green)] wide:h-2 wide:w-2"
      />
      {children}
    </span>
  )
}
