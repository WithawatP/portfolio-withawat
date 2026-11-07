import { useContent } from '../../lib/content'

// design.md 6.9: the link to the same page in the other language (/ and /th/). Text only, no key: the
// label is in the language it leads to ("ไทย" on /, "EN" on /th/). The look lives in index.css (.lang-link).
export default function LanguageLink() {
  const { ui } = useContent()
  const { label, name, href, lang } = ui.language

  return (
    <a
      href={href}
      lang={lang}
      hrefLang={lang}
      aria-label={name}
      className="lang-link focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
    >
      {label}
    </a>
  )
}
