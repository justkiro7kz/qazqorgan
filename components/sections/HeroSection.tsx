export function HeroSection() {
  return (
    <section
      style={{
        background: '#0f172a',
        color: 'white',
        paddingTop: 160,
        paddingBottom: 120,
      }}
    >
      <div className="container">
        <div style={{ maxWidth: 760 }}>
          <div
            style={{
              marginBottom: 24,
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#93c5fd',
              fontWeight: 700,
            }}
          >
            Astana · Republic of Kazakhstan
          </div>

          <h1
            className="display-font"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 7rem)',
              lineHeight: 0.9,
              letterSpacing: '-0.05em',
              margin: 0,
            }}
          >
            Autonomous
            <br />
            Defense
            <br />
            Systems
          </h1>

          <p
            style={{
              marginTop: 32,
              maxWidth: 560,
              fontSize: 18,
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.72)',
            }}
          >
            QazQorgan develops unmanned aerial systems,
            anti-UAV solutions and tactical communication
            infrastructure for defense and industrial use.
          </p>

          <div
            style={{
              display: 'flex',
              gap: 14,
              marginTop: 40,
            }}
          >
            <button className="btn-primary">
              Explore Products
            </button>

            <button
              style={{
                height: 48,
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: 'white',
                padding: '0 22px',
                fontWeight: 600,
              }}
            >
              Company Overview
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}