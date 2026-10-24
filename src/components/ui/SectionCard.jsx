import { LEVEL_1 } from '../../lib/styles'

export default function SectionCard({ id, labelledBy, className = '', children }) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${LEVEL_1} ${className}`}
    >
      {children}
    </section>
  )
}
