type Props = {
  p: {
    badge: string
    title: string
    description: string
    code: string
    specs: string[][]
  }
}

export function SpecCard({ p }: Props) {
  return (
    <div
      className="card"
      style={{
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <div
        style={{
          aspectRatio: '16 / 9',
          borderRadius: 12,
          border: '1px solid #e2e8f0',
          background: '#f8fafc',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 12,
            letterSpacing: '0.14em',
            color: '#64748b',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {p.code}
        </span>
      </div>

      <div>
        <div
          style={{
            display: 'inline-flex',
            padding: '6px 10px',
            borderRadius: 999,
            background: '#eff6ff',
            color: '#2563eb',
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginBottom: 16,
          }}
        >
          {p.badge}
        </div>

        <h3
          className="display-font"
          style={{
            margin: 0,
            fontSize: 28,
          }}
        >
          {p.title}
        </h3>

        <p
          style={{
            color: '#64748b',
            lineHeight: 1.7,
            marginTop: 10,
          }}
        >
          {p.description}
        </p>
      </div>

      <div
        style={{
          borderTop: '1px solid #e2e8f0',
        }}
      >
        {p.specs.map(([k, v]) => (
          <div
            key={k}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 0',
              borderBottom: '1px solid #f1f5f9',
              gap: 20,
            }}
          >
            <span style={{ color: '#64748b' }}>
              {k}
            </span>

            <strong>
              {v}
            </strong>
          </div>
        ))}
      </div>
    </div>
  )
}