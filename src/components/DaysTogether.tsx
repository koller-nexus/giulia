import { useEffect, useState } from 'react'
import { MET_ON } from '../photos'
import { useReveal } from '../hooks/useReveal'
import { useI18n } from '../i18n'

interface Duration {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function since(dateStr: string, now: number): Duration {
  const totalSeconds = Math.max(
    0,
    Math.floor((now - new Date(dateStr).getTime()) / 1000),
  )
  const seconds = totalSeconds % 60
  const minutes = Math.floor(totalSeconds / 60) % 60
  const hours = Math.floor(totalSeconds / 3600) % 24
  const days = Math.floor(totalSeconds / 86400)
  return { days, hours, minutes, seconds }
}

const pad = (n: number) => n.toString().padStart(2, '0')

const SPARK_MONTHS = 24

export function DaysTogether() {
  const [now, setNow] = useState(() => Date.now())
  const { ref, visible } = useReveal<HTMLDivElement>()
  const { t } = useI18n()

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const d = since(MET_ON, now)

  const elapsedMonths = (() => {
    const start = new Date(MET_ON)
    const cur = new Date(now)
    return (
      (cur.getFullYear() - start.getFullYear()) * 12 +
      (cur.getMonth() - start.getMonth())
    )
  })()
  const bars = Array.from({ length: SPARK_MONTHS }, (_, i) => {
    const filled = i < elapsedMonths
    const height = 30 + ((i * 13) % 55)
    return { key: i, filled, height }
  })

  return (
    <div
      ref={ref}
      className={`days reveal ${visible ? 'is-visible' : ''}`}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="days-main">
        <span className="days-value">{d.days}</span>
        <span className="days-unit">{t.days.unit}</span>
      </div>
      <div className="days-sub">
        <span>
          {pad(d.hours)}
          <span className="visually-hidden">{t.days.hours}</span>
        </span>
        <span>
          {pad(d.minutes)}
          <span className="visually-hidden">{t.days.minutes}</span>
        </span>
        <span>
          {pad(d.seconds)}
          <span className="visually-hidden">{t.days.seconds}</span>
        </span>
        <span className="days-since">· {t.days.since}</span>
      </div>
      <div className="sparkline" aria-hidden="true">
        {bars.map((b) => (
          <span
            key={b.key}
            className={`spark-bar ${b.filled ? 'is-filled' : ''}`}
            style={{ height: `${b.height}%` }}
          />
        ))}
      </div>
    </div>
  )
}