import { Ambient } from './components/Ambient'
import { LangToggle } from './components/LangToggle'
import { Hero } from './components/Hero'
import { Panel } from './components/Panel'
import { Carousel } from './components/Carousel'
import { DaysTogether } from './components/DaysTogether'
import { AnniversaryCountdown } from './components/AnniversaryCountdown'
import { Manifest } from './components/Manifest'
import { useI18n } from './i18n'
import './App.css'

function App() {
  const { t } = useI18n()

  return (
    <>
      <Ambient />
      <LangToggle />
      <div className="dashboard">
        <div className="dashboard-hero">
          <Hero />
        </div>

        <div id="capabilities" className="bento">
          <Panel
            label={t.panels.gallery.label}
            title={t.panels.gallery.title}
            span="wide"
            stagger={0}
            className="bento-carousel"
          >
            <Carousel />
          </Panel>

          <Panel
            label={t.panels.days.label}
            title={t.panels.days.title}
            stagger={120}
            className="bento-days"
          >
            <DaysTogether />
          </Panel>

          <Panel
            label={t.panels.countdown.label}
            title={t.panels.countdown.title}
            span="wide"
            stagger={240}
            className="bento-countdown"
          >
            <AnniversaryCountdown />
          </Panel>

          <Panel
            label={t.panels.manifest.label}
            title={t.panels.manifest.title}
            stagger={360}
            className="bento-manifest"
          >
            <Manifest />
          </Panel>
        </div>
      </div>
      <footer className="site-footer">
        <p>{t.footer}</p>
      </footer>
    </>
  )
}

export default App