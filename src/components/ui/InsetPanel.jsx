import { LEVEL_2 } from '../../lib/styles'

export default function InsetPanel({ className = '', children }) {
  return <div className={`${LEVEL_2} min-w-0 ${className}`}>{children}</div>
}
