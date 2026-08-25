import { useEffect, useState } from 'react'
import { MET_ON, TWO_YEAR_ON } from '../photos'
import { useReveal } from '../hooks/useReveal'
import { useI18n } from '../i18n'

interface Remaining {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function remaining(target: string, now: number): Remaining | null {
  const totalSeconds = Math.floor((new Date(target).getTime() - now) / 1000)
  if (totalSeconds <= 0) return null
  const seconds = totalSeconds % 60
  const minutes = Math.floor(totalSeconds / 60) % 60
  const hours = Math.floor(totalSeconds / 3600) % 24
  const days = Math.floor(totalSeconds / 86400)
  return { days, hours, minutes, seconds }
}

const pad = (n: number) => n.toString().padStart(2, '0')

export function AnniversaryCountdown() {
  const [now, setNow] = useState(() => Date.now())
  const { ref, visible } = useReveal<HTMLDivElement>()
  const { t } = useI18n()

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const r = remaining(TWO_YEAR_ON, now)

  const progress = (() => {
    const start = new Date(MET_ON).getTime()
    const end = new Date(TWO_YEAR_ON).getTime()
    const clamped = Math.min(Math.max(now - start, 0), end - start)
    return Math.round((clamped / (end - start)) * 100)
  })()

  return (
    <div
      ref={ref}
      className={`countdown reveal ${visible ? 'is-visible' : ''}`}
      role="timer"
      aria-live="polite"
      aria-atomic="true"
    >
      {r ? (
        <>
          <div className="countdown-tiles">
            {[
              { label: t.countdown.days, value: r.days },
              { label: t.countdown.hours, value: pad(r.hours) },
              { label: t.countdown.minutes, value: pad(r.minutes) },
              { label: t.countdown.seconds, value: pad(r.seconds) },
            ].map((c) => (
              <div key={c.label} className="cd-tile">
                <span className="cd-value">{c.value}</span>
                <span className="cd-label">{c.label}</span>
              </div>
            ))}
          </div>
          <div
            className="progress"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t.panels.countdown.title}
          >
            <span className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="countdown-foot">
            <span>{t.countdown.target}</span>
            <span>{t.countdown.elapsed(progress)}</span>
          </div>
        </>
      ) : (
        <div className="milestone" role="status" aria-live="polite">
          <span className="milestone-mark">{t.countdown.milestoneMark}</span>
          <span className="milestone-note">{t.countdown.milestoneNote}</span>
        </div>
      )}
    </div>
  )
}