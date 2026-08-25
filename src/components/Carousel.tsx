import { useEffect, useState } from 'react'
import { photos } from '../photos'
import { useReveal } from '../hooks/useReveal'
import { useI18n } from '../i18n'

const AUTO_INTERVAL = 5000

export function Carousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const { ref, visible } = useReveal<HTMLDivElement>()
  const { t } = useI18n()
  const count = photos.length

  const go = (delta: number) =>
    setIndex((prev) => (prev + delta + count) % count)

  useEffect(() => {
    if (paused || count <= 1) return
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % count)
    }, AUTO_INTERVAL)
    return () => window.clearInterval(id)
  }, [paused, count])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    }
  }

  const active = photos[index]

  return (
    <div
      ref={ref}
      className={`carousel reveal ${visible ? 'is-visible' : ''}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={t.carousel.region}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="carousel-stage" aria-live="polite">
        <img
          key={active.src}
          src={active.src}
          alt={active.alt}
          className="carousel-slide"
        />
        <span className="carousel-index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>
      </div>

      {active.caption && (
        <p className="carousel-caption">{active.caption}</p>
      )}

      <div className="carousel-controls">
        <button
          type="button"
          className="carousel-btn"
          aria-label={t.carousel.prev}
          onClick={() => go(-1)}
        >
          ‹
        </button>
        <div className="carousel-dots" role="tablist" aria-label={t.carousel.choose}>
          {photos.map((p, i) => (
            <button
              key={p.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${t.carousel.photo} ${i + 1}`}
              className={`carousel-dot ${i === index ? 'is-active' : ''}`}
              onClick={() => go(i - index)}
            />
          ))}
        </div>
        <button
          type="button"
          className="carousel-btn"
          aria-label={t.carousel.next}
          onClick={() => go(1)}
        >
          ›
        </button>
      </div>
    </div>
  )
}