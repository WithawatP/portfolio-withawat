import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Build-time only (scripts/prerender.mjs): the page's HTML, so it is readable before and without JavaScript.
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>
  )
}
