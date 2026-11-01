import { LEVEL_2 } from '../../lib/styles'

export default function InsetPanel({ className = '', children, ...props }) {
  return (
    <div {...props} className={`${LEVEL_2} min-w-0 ${className}`}>
      {children}
    </div>
  )
}
