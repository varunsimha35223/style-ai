import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function buildFlickrKeywords(occasion, idea, result) {
  // Pull specific clothing words from the idea text
  const words = idea.toLowerCase().match(/\b(blazer|shirt|trousers|jeans|dress|skirt|jacket|coat|sweater|kurta|saree|suit|formal|casual|sporty|elegant|fitted|loose|linen|cotton|denim)\b/g) || []
  const colors = (result.best_colors || []).slice(0, 2).map(c => c.toLowerCase().split(' ')[0])
  const occasionMap = {
    'Daily Casual': 'casual,streetstyle',
    'Office': 'office,workwear,professional',
    'College': 'campus,student,casual',
    'Gym': 'activewear,sportswear,gym',
    'Formal Events': 'formal,elegant,gala',
  }
  const base = occasionMap[occasion] || 'fashion,outfit'
  const extras = [...new Set([...words.slice(0, 2), ...colors.slice(0, 1)])].join(',')
  return `${base},${extras}`.replace(/,+/g, ',').replace(/,$/, '')
}

function OutfitImage({ occasion, idea, result }) {
  const [status, setStatus] = useState('idle') // idle | loading | loaded | error
  const [counter, setCounter] = useState(0) // increment to get a new random photo

  const keywords = buildFlickrKeywords(occasion, idea, result)
  // loremflickr returns real Flickr photos matching the keywords — free, no API key
  const src = `https://loremflickr.com/400/560/${keywords}?lock=${counter}`

  function handleShow() {
    setStatus('loading')
  }

  function handleRegenerate(e) {
    e.stopPropagation()
    setStatus('loading')
    setCounter(c => c + 1)
  }

  if (status === 'idle') {
    return (
      <button
        onClick={handleShow}
        style={{
          marginTop: '10px',
          fontSize: '12px', fontWeight: 700,
          padding: '7px 16px', borderRadius: '8px', border: 'none',
          background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))',
          outline: '1px solid rgba(168,85,247,0.4)',
          color: '#e879f9', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '6px',
          transition: 'all 0.15s',
        }}
      >
        ✦ Show Style Inspiration
      </button>
    )
  }

  return (
    <div style={{ marginTop: '12px' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {status === 'loading' && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            background: 'rgba(8,8,16,0.8)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            borderRadius: '12px', width: '220px', height: '308px', gap: '10px',
          }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              border: '2px solid rgba(168,85,247,0.2)',
              borderTop: '2px solid #a855f7',
              animation: 'spin 0.8s linear infinite',
            }} />
            <span style={{ fontSize: '12px', color: '#a855f7', fontWeight: 600 }}>Loading look…</span>
          </div>
        )}
        <img
          key={src}
          src={src}
          alt={`${occasion} style inspiration`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          style={{
            width: '220px', height: '308px',
            objectFit: 'cover',
            borderRadius: '12px',
            border: '1px solid rgba(168,85,247,0.3)',
            display: status === 'error' ? 'none' : 'block',
            opacity: status === 'loaded' ? 1 : 0,
            transition: 'opacity 0.4s',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        />
        {status === 'loaded' && (
          <div style={{
            position: 'absolute', bottom: '8px', right: '8px',
          }}>
            <button
              onClick={handleRegenerate}
              title="Show different photo"
              style={{
                fontSize: '11px', fontWeight: 700,
                padding: '5px 10px', borderRadius: '6px', border: 'none',
                background: 'rgba(168,85,247,0.85)', color: '#fff',
                cursor: 'pointer',
              }}
            >
              ↻ Different
            </button>
          </div>
        )}
      </div>
      {status === 'error' && (
        <div style={{ marginTop: '8px' }}>
          <p style={{ fontSize: '12px', color: '#ef4444', margin: '0 0 6px' }}>
            Could not load photo
          </p>
          <button
            onClick={() => { setStatus('loading'); setCounter(c => c + 1) }}
            style={{
              fontSize: '12px', fontWeight: 600,
              padding: '5px 12px', borderRadius: '6px', border: 'none',
              background: 'rgba(168,85,247,0.2)', color: '#e879f9',
              cursor: 'pointer', outline: '1px solid rgba(168,85,247,0.4)',
            }}
          >
            Retry
          </button>
        </div>
      )}
      <p style={{ fontSize: '10px', color: '#334155', margin: '6px 0 0' }}>
        Style inspiration photo via Flickr
      </p>
    </div>
  )
}

const COLOR_MAP = {
  'Navy': '#1e3a5f', 'Navy Blue': '#1e3a5f',
  'White': '#f8fafc', 'Cream': '#fef9ef', 'Ivory': '#fffff0',
  'Black': '#1a1a1a', 'Charcoal': '#374151',
  'Beige': '#d4b896', 'Camel': '#c19a6b', 'Tan': '#d2b48c',
  'Olive': '#6b7c2e', 'Sage': '#87a96b', 'Khaki': '#c3b091',
  'Burgundy': '#800020', 'Maroon': '#800000', 'Wine': '#722f37',
  'Terracotta': '#c17a5e', 'Rust': '#b7410e',
  'Dusty Rose': '#c99a9a', 'Blush': '#f4a7a7', 'Mauve': '#c8a2c8',
  'Lavender': '#b57bee', 'Purple': '#7c3aed', 'Violet': '#8b5cf6',
  'Royal Blue': '#2563eb', 'Cobalt': '#2a52be', 'Sky Blue': '#7dd3fc',
  'Teal': '#0d9488', 'Emerald': '#059669', 'Forest Green': '#166534',
  'Mustard': '#d97706', 'Gold': '#f59e0b', 'Yellow': '#facc15',
  'Coral': '#ff7f7f', 'Peach': '#ffb347', 'Salmon': '#fa8072',
  'Red': '#dc2626', 'Tomato': '#e34234',
  'Grey': '#9ca3af', 'Gray': '#9ca3af', 'Silver': '#c0c0c0',
  'Soft Pink': '#f9a8d4', 'Pink': '#ec4899', 'Hot Pink': '#db2777',
  'Chocolate': '#7b3f00', 'Brown': '#92400e',
}

function colorSwatch(name) {
  const lower = name.toLowerCase()
  const key = Object.keys(COLOR_MAP).find(k => k.toLowerCase() === lower)
  return key ? COLOR_MAP[key] : null
}

function Section({ title, icon, children }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '18px', padding: '24px', marginBottom: '16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
        <span style={{ fontSize: '20px' }}>{icon}</span>
        <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#f1f5f9', margin: 0, letterSpacing: '-0.01em' }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Tag({ label, color }) {
  return (
    <span style={{
      fontSize: '13px', fontWeight: 600,
      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
      color: color || '#cbd5e1', borderRadius: '8px', padding: '6px 14px',
      display: 'inline-block',
    }}>
      {label}
    </span>
  )
}

function BulletList({ items, color }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <span style={{ color: color || '#a855f7', flexShrink: 0, marginTop: '2px' }}>▸</span>
          <span style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: 1.6 }}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Results() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const result = state?.result

  if (!result) {
    return (
      <div style={{
        minHeight: '100vh', background: '#080810',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: '#94a3b8', gap: '16px',
      }}>
        <p style={{ fontSize: '18px' }}>No results found.</p>
        <button
          onClick={() => navigate('/upload')}
          style={{
            padding: '12px 28px', borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      </div>
    )
  }

  function handleCopy() {
    const text = JSON.stringify(result, null, 2)
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#080810',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      position: 'relative',
    }}>
      {/* Glow */}
      <div style={{
        position: 'fixed', top: '-150px', left: '50%', transform: 'translateX(-50%)',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(168,85,247,0.12) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(8,8,16,0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '0 24px', height: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', boxShadow: '0 0 12px rgba(168,85,247,0.4)',
          }}>✦</div>
          <span style={{ fontSize: '16px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
            Style<span style={{ color: '#a855f7' }}>AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleCopy}
            style={{
              fontSize: '12px', fontWeight: 600,
              padding: '6px 14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(255,255,255,0.05)', color: copied ? '#34d399' : '#94a3b8',
              cursor: 'pointer',
            }}
          >
            {copied ? '✓ Copied!' : '📋 Copy Results'}
          </button>
          <button
            onClick={() => navigate('/upload')}
            style={{
              fontSize: '12px', fontWeight: 600,
              padding: '6px 14px', borderRadius: '8px', border: 'none',
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              color: '#fff', cursor: 'pointer',
            }}
          >
            New Analysis
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '36px 20px 80px', position: 'relative', zIndex: 1 }}>

        {/* Hero summary bar */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(168,85,247,0.15), rgba(236,72,153,0.1))',
          border: '1px solid rgba(168,85,247,0.3)',
          borderRadius: '18px', padding: '24px', marginBottom: '24px',
          display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center',
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              Your Style Profile
            </p>
            <h1 style={{ fontSize: '22px', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em' }}>
              {result.skin_tone} · {result.undertone} Undertone
            </h1>
            <p style={{ fontSize: '14px', color: '#a855f7', margin: '4px 0 0', fontWeight: 600 }}>
              {result.body_type} · {result.face_shape} face
            </p>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {(result.best_colors || []).slice(0, 5).map(color => {
              const hex = colorSwatch(color)
              return (
                <div key={color} title={color} style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: hex || 'rgba(168,85,247,0.3)',
                  border: '2px solid rgba(255,255,255,0.15)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                  position: 'relative',
                }} />
              )
            })}
          </div>
        </div>

        {/* 1. Color Palette */}
        <Section title="Your Color Palette" icon="🎨">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
                Best Colors
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(result.best_colors || []).map(color => {
                  const hex = colorSwatch(color)
                  return (
                    <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '4px',
                        background: hex || 'rgba(168,85,247,0.5)',
                        border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0,
                      }} />
                      <span style={{ fontSize: '13px', color: '#cbd5e1' }}>{color}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <p style={{ fontSize: '12px', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
                Avoid
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(result.avoid_colors || []).map(color => {
                  const hex = colorSwatch(color)
                  return (
                    <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{
                        width: '16px', height: '16px', borderRadius: '4px',
                        background: hex || 'rgba(239,68,68,0.4)',
                        border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0,
                        opacity: 0.7,
                      }} />
                      <span style={{ fontSize: '13px', color: '#94a3b8', textDecoration: 'line-through' }}>{color}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          {result.color_reasoning && (
            <p style={{
              fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, margin: 0,
              background: 'rgba(168,85,247,0.06)', borderRadius: '10px', padding: '12px 14px',
              borderLeft: '3px solid rgba(168,85,247,0.5)',
            }}>
              {result.color_reasoning}
            </p>
          )}
        </Section>

        {/* 2. Body Type */}
        <Section title="Your Body Type" icon="👤">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)',
            borderRadius: '10px', padding: '8px 16px', marginBottom: '16px',
          }}>
            <span style={{ fontSize: '16px', fontWeight: 900, color: '#e879f9' }}>{result.body_type}</span>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>body shape</span>
          </div>
          <BulletList items={result.body_tips || []} color="#a855f7" />
        </Section>

        {/* 3. Styles That Suit You */}
        <Section title="Styles That Suit You" icon="🧥">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
            {(result.style_suggestions || []).map(s => <Tag key={s} label={s} color="#93c5fd" />)}
          </div>
          {(result.avoid_styles || []).length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#ef4444', margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Avoid
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {result.avoid_styles.map(s => (
                  <span key={s} style={{
                    fontSize: '13px', fontWeight: 600,
                    background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
                    color: '#fca5a5', borderRadius: '8px', padding: '6px 14px',
                    textDecoration: 'line-through', opacity: 0.8,
                  }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* 4. Daily Outfit Ideas */}
        {result.outfit_ideas && Object.keys(result.outfit_ideas).length > 0 && (
          <Section title="Daily Outfit Ideas" icon="📅">
            <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 16px' }}>
              Click <strong style={{ color: '#a855f7' }}>✦ Show Style Inspiration</strong> on any occasion to see real fashion photos matching your style
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {Object.entries(result.outfit_ideas).map(([occasion, idea]) => (
                <div key={occasion} style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px', padding: '16px',
                }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '4px' }}>
                    <div style={{
                      flexShrink: 0, width: '90px', fontSize: '11px', fontWeight: 700,
                      color: '#a855f7', textTransform: 'uppercase', letterSpacing: '0.05em',
                      paddingTop: '2px',
                    }}>
                      {occasion}
                    </div>
                    <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0, lineHeight: 1.6, flex: 1 }}>{idea}</p>
                  </div>
                  <OutfitImage occasion={occasion} idea={idea} result={result} />
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* 5. Pro Tips */}
        {(result.pro_tips || []).length > 0 && (
          <Section title="Pro Stylist Tips" icon="💡">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {result.pro_tips.map((tip, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '12px',
                  background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.15)',
                  borderRadius: '12px', padding: '14px 16px',
                }}>
                  <span style={{
                    flexShrink: 0, width: '22px', height: '22px', borderRadius: '6px',
                    background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '11px', fontWeight: 900, color: '#fbbf24',
                  }}>{i + 1}</span>
                  <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0, lineHeight: 1.6 }}>{tip}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button
            onClick={() => navigate('/upload')}
            style={{
              padding: '14px 36px', borderRadius: '12px', border: 'none',
              background: 'linear-gradient(135deg, #a855f7, #ec4899)',
              color: '#fff', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 0 24px rgba(168,85,247,0.35)',
            }}
          >
            ✦ Analyze Another Look
          </button>
          <p style={{ fontSize: '12px', color: '#334155', marginTop: '12px' }}>Free · No signup · Instant results</p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
