export default function AvailabilityBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-[#E7E7E7] px-3 py-1.5 text-[13px] font-semibold text-[#333333] shadow-[inset_3px_3px_6px_#b6b6b6,inset_-3px_-3px_6px_#ffffff]">
      <span aria-hidden="true" className="relative mr-2 flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
      </span>
      Open to work
    </span>
  )
}
