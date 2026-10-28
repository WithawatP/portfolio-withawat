export default function SkillChip({ className = '', children }) {
  return (
    <li
      className={`flex h-8 w-full items-center justify-center whitespace-nowrap rounded-full bg-[#E7E7E7] px-2.5 text-[12px] font-medium text-[#4A4A4A] shadow-[inset_2px_2px_4px_#c9c9c9,inset_-2px_-2px_4px_#FFFFFF] sm:px-3 sm:text-[13px] ${className}`}
    >
      {children}
    </li>
  )
}
