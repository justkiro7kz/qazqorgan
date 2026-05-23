'use client'

import { useState } from 'react'
import { PRODUCTS } from '@/data/products'
import { SpecCard } from '@/components/product/SpecCard'

const tabs = [
  {
    id: 'uas',
    label: 'Unmanned Systems',
  },
]

export function ProductsSection() {
  const [activeTab, setActiveTab] = useState('uas')

  const filtered = PRODUCTS.filter(
    p => p.category === activeTab
  )

  return (
    <section
      id="products"
      className="section"
      style={{
        background: '#f8fafc',
      }}
    >
      <div className="container">
        <div style={{ marginBottom: 48 }}>
          <div className="section-label">
            Product Portfolio
          </div>

          <h2 className="section-title">
            Integrated autonomous systems
          </h2>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 10,
            marginBottom: 32,
          }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                height: 42,
                padding: '0 18px',
                borderRadius: 10,
                border:
                  activeTab === tab.id
                    ? '1px solid #2563eb'
                    : '1px solid #e2e8f0',
                background:
                  activeTab === tab.id
                    ? '#2563eb'
                    : 'white',
                color:
                  activeTab === tab.id
                    ? 'white'
                    : '#0f172a',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit,minmax(320px,1fr))',
            gap: 20,
          }}
        >
          {filtered.map(p => (
            <SpecCard
              key={p.code}
              p={p}
            />
          ))}
        </div>
      </div>
    </section>
  )
}