// The Hero starts below the WP row, so the #home anchor would stop with that row under the status bar.
export function scrollToTop(event) {
  event.preventDefault()
  window.history.pushState(null, '', window.location.pathname + window.location.search)
  window.scrollTo(0, 0)
}
