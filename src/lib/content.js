// L1: the page in English (/) or Thai (/th/). Components read their copy from useContent(), never from the
// data files directly, so one render tree serves both languages. main.jsx picks the language from the
// path; scripts/prerender.mjs renders each language into its own HTML file.
import { createContext, useContext } from 'react'
import * as en from '../data/portfolio'
import * as th from '../data/portfolio.th'

export const CONTENT = {
  en: { lang: 'en', ...en },
  th: { lang: 'th', ...th },
}

export const langFromPath = (path) => (/^\/th(\/|$)/.test(path) ? 'th' : 'en')

export const ContentContext = createContext(CONTENT.en)

export const useContent = () => useContext(ContentContext)
