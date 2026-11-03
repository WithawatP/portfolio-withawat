import { scrollToSection } from './sectionScroll'

// The WP mark in the Hero's top row. Same as the navs' Home: the very top of the page.
export function scrollToTop(event) {
  scrollToSection(event, 'home')
}
