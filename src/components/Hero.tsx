import { useReveal } from '../hooks/useReveal'
import { useI18n } from '../i18n'

export function Hero() {
  const { ref, visible } = useReveal<HTMLElement>()
  const { t } = useI18n()

  return (
    <section
      ref={ref}
      className={`hero reveal ${visible ? 'is-visible' : ''}`}
      aria-labelledby="hero-title"
    >
      <p className="hero-label">{t.hero.label}</p>
      <h1 id="hero-title" className="hero-title">
        {t.hero.title}
      </h1>
      <p className="hero-body">{t.hero.body}</p>
      <div className="hero-actions">
        <a className="cta" href="#capabilities">
          {t.hero.cta}
        </a>
        <a className="cta-ghost" href="#capabilities">
          {t.hero.ghost}
        </a>
      </div>
    </section>
  )
}