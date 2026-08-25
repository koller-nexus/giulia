import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface PanelProps {
  label?: string
  title?: string
  span?: 'wide' | 'normal'
  className?: string
  stagger?: number
  children: ReactNode
}

export function Panel({
  label,
  title,
  span = 'normal',
  className = '',
  stagger = 0,
  children,
}: PanelProps) {
  const { ref, visible } = useReveal<HTMLElement>()
  const delayStyle = stagger > 0 ? { transitionDelay: `${stagger}ms` } : undefined

  return (
    <section
      ref={ref}
      style={delayStyle}
      className={`panel reveal ${visible ? 'is-visible' : ''} ${
        span === 'wide' ? 'is-wide' : ''
      } ${className}`.trim()}
    >
      {(label || title) && (
        <header className="panel-head">
          {label && <span className="panel-label">{label}</span>}
          {title && <h2 className="panel-title">{title}</h2>}
        </header>
      )}
      <div className="panel-body">{children}</div>
    </section>
  )
}