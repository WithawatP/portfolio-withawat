import { profile } from '../data/portfolio'

export default function Footer() {
  return (
    <footer className="mt-[72px] flex flex-col gap-1 text-center text-xs text-muted wide:mt-24 wide:flex-row wide:justify-between wide:text-left wide:text-[13px]">
      <p>© 2026 {profile.name}</p>
      <p>Built with React and Tailwind CSS</p>
    </footer>
  )
}
