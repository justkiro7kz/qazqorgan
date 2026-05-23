'use client'

export function Navbar() {
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 100,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      <div
        className="container"
        style={{
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          className="display-font"
          style={{
            fontSize: 18,
            letterSpacing: '0.12em',
            fontWeight: 700,
          }}
        >
          QAZQORGAN
        </div>

        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
          }}
        >
          <a href="#about">About</a>
          <a href="#products">Products</a>
          <a href="#technology">Technology</a>
          <a href="#contacts">Contacts</a>
        </nav>

        <button className="btn-primary">
          Request Briefing
        </button>
      </div>
    </header>
  )
}