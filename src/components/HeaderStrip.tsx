export function HeaderStrip() {
  return (
    <header className="header-strip" role="banner">
      <div className="header-left">
        <span className="header-mono">OBSERVATION NODE — 01 / GIULIA</span>
      </div>
      <div className="header-right">
        <span className="header-mono">SYSTEM: LIVE</span>
        <span className="live-dot" aria-hidden="true" />
      </div>
    </header>
  )
}
