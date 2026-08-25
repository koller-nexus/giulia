import { useI18n } from '../i18n'

function UsFlag() {
  return (
    <svg viewBox="0 0 1235 650" aria-hidden="true" focusable="false">
      <rect width="1235" height="650" fill="#fff" />
      <path
        d="M0 0h1235v25H0zM0 50h1235v25H0zM0 100h1235v25H0zM0 150h1235v25H0zM0 200h1235v25H0zM0 250h1235v25H0zM0 300h1235v25H0zM0 350h1235v25H0zM0 400h1235v25H0zM0 450h1235v25H0zM0 500h1235v25H0zM0 550h1235v25H0zM0 600h1235v25H0z"
        fill="#b22234"
      />
      <rect width="494" height="325" fill="#3c3b6e" />
    </svg>
  )
}

function BrFlag() {
  return (
    <svg viewBox="0 0 720 504" aria-hidden="true" focusable="false">
      <rect width="720" height="504" fill="#009b3a" />
      <path d="M360 63 668 252 360 441 52 252Z" fill="#fedd00" />
      <circle cx="360" cy="252" r="120" fill="#002776" />
      <path
        d="M333 202q27-40 66-31l6 8q-10 4-20 14t-21 26q-17-7-31-17Z"
        fill="#fff"
      />
    </svg>
  )
}

export function LangToggle() {
  const { lang, setLang, t } = useI18n()

  return (
    <div className="lang-switch" role="group" aria-label={t.langToggle.label}>
      <button
        type="button"
        className={`lang-btn ${lang === 'en' ? 'is-active' : ''}`}
        aria-pressed={lang === 'en'}
        aria-label={t.langToggle.en}
        onClick={() => setLang('en')}
      >
        <span className="lang-flag">
          <UsFlag />
        </span>
        EN
      </button>
      <button
        type="button"
        className={`lang-btn ${lang === 'pt' ? 'is-active' : ''}`}
        aria-pressed={lang === 'pt'}
        aria-label={t.langToggle.pt}
        onClick={() => setLang('pt')}
      >
        <span className="lang-flag">
          <BrFlag />
        </span>
        PT-BR
      </button>
    </div>
  )
}