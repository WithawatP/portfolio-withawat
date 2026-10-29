export default function SkillChip({ className = '', children }) {
  return (
    <li
      className={`flex h-8 w-full items-center justify-center whitespace-nowrap rounded-full bg-surface px-2.5 text-[12px] font-medium text-ink-2 neu-inset-sm sm:px-3 sm:text-[13px] ${className}`}
    >
      {children}
    </li>
  )
}
