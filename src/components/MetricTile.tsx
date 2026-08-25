interface MetricTileProps {
  value: string | number
  label: string
  className?: string
}

export function MetricTile({ value, label, className = '' }: MetricTileProps) {
  return (
    <div className={`metric ${className}`.trim()}>
      <span className="metric-value">{value}</span>
      <span className="metric-label">{label}</span>
    </div>
  )
}
