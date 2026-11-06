import { useCallback, useSyncExternalStore } from 'react'

// The page is prerendered at build time (scripts/prerender.mjs), where there is no screen: every query
// is false there, so the HTML is the phone layout. While hydrating, React uses that same false, then
// re-renders with the real value, so the markup always matches and there is no hydration error.
const serverValue = () => false

export function useMediaQuery(query) {
  const subscribe = useCallback(
    (onChange) => {
      const mediaQuery = window.matchMedia(query)
      mediaQuery.addEventListener('change', onChange)
      return () => mediaQuery.removeEventListener('change', onChange)
    },
    [query]
  )
  const getSnapshot = () => window.matchMedia(query).matches
  return useSyncExternalStore(subscribe, getSnapshot, serverValue)
}

// False in the prerendered HTML and while hydrating, true from then on. For parts that only exist in
// the browser (the navs, which portal into <body> or watch the screen).
const subscribeNever = () => () => {}

export function useHydrated() {
  return useSyncExternalStore(subscribeNever, () => true, serverValue)
}
