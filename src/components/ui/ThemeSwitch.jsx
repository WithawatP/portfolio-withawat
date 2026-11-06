import Icon from './Icon'
import { getTheme, setTheme, useTheme } from '../../lib/theme'

// design.md 6.8. Adapted from "bright-dolphin-91" by Yaya12085 on uiverse.io (MIT).
// The look lives in index.css (.theme-switch): the knob's side comes from html[data-theme], so it is right
// in the prerendered HTML too. React only keeps aria-checked in step and handles the click.
export default function ThemeSwitch() {
  const isDark = useTheme() === 'dark'
  // Reads the page's attribute, not isDark, which is still false while React hydrates.
  const toggle = () => setTheme(getTheme() === 'dark' ? 'light' : 'dark')

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark theme"
      onClick={toggle}
      className="theme-switch focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      <Icon name="sun" strokeWidth={2} className="theme-switch-icon theme-switch-sun" />
      <Icon name="moon" strokeWidth={2} className="theme-switch-icon theme-switch-moon" />
      <span aria-hidden="true" className="theme-switch-knob" />
    </button>
  )
}
