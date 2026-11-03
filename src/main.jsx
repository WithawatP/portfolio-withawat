import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { initSmoothScroll } from './lib/smoothScroll'

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
}

window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
initSmoothScroll()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
