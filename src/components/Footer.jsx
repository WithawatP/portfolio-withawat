import { useContent } from '../lib/content'

export default function Footer() {
  const { profile, ui } = useContent()
  return (
    <footer className="flex flex-col gap-1 text-center text-xs text-muted wide:flex-row wide:justify-between wide:text-left wide:text-[13px]">
      <p>© 2026 {profile.name}</p>
      <p>{ui.footer.builtWith}</p>
    </footer>
  )
}
