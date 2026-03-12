import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'

function buildImageKeywords(occasion, idea, result) {
  // ALWAYS start with fashion,clothing,outfit — this forces Flickr to only return
  // photos tagged with ALL three terms, eliminating off-topic results like statues/cats
  const fashionBase = 'fashion,clothing,outfit'

  // Pick one specific garment word from the AI recommendation
  const garment = (idea.toLowerCase().match(
    /\b(blazer|shirt|trousers|jeans|dress|skirt|jacket|coat|sweater|suit|linen|denim|saree|kurta|chinos|turtleneck)\b/
  ) || [])[0] || ''

  // Occasion-specific fashion term (no generic words like "casual","campus","office")
  const occasionTag = {
    'Daily Casual':  'streetfashion',
    'Office':        'businessattire',
    'College':       'casualwear',
    'Gym':           'sportswear,activewear',
    'Formal Events': 'formalwear,eveningwear',
  }[occasion] || 'fashionweek'

  return [fashionBase, occasionTag, garment]
    .filter(Boolean).join(',').replace(/,+/g, ',')
}

function OutfitImage({ occasion, idea, result }) {
  const [status, setStatus] = useState('idle')
  const [counter, setCounter] = useState(0)

  const keywords = buildImageKeywords(occasion, idea, result)
  // loremflickr with strict fashion keywords — lock changes on "Different" click
  const src = `https://loremflickr.com/400/560/${keywords}?lock=${counter}`

  if (status === 'idle') {
    return (
      <button
        onClick={() => setStatus('loading')}
        style={{
          marginTop: '12px',
          fontSize: '12px', fontWeight: 700, letterSpacing: '-0.01em',
          padding: '8px 16px', borderRadius: '999px',
          border: `1.5px solid ${T.border}`,
          background: T.white, color: T.textSecondary,
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
          transition: 'all 0.15s',
        }}
      >
        ✦ Show Style Inspiration
      </button>
    )
  }

  return (
    <div style={{ marginTop: '14px' }}>
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {status === 'loading' && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 2,
            background: 'rgba(249,247,244,0.9)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            borderRadius: '14px', width: '200px', height: '280px', gap: '10px',
          }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              border: `2px solid ${T.border}`,
              borderTop: `2px solid ${T.accent}`,
              animation: 'spin 0.8s linear infinite',
            }} />
            <span style={{ fontSize: '11px', color: T.textMuted, fontWeight: 600 }}>Loading…</span>
          </div>
        )}
        <img
          key={src}
          src={src}
          alt={`${occasion} style inspiration`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          style={{
            width: '200px', height: '280px',
            objectFit: 'cover', borderRadius: '14px',
            border: `1px solid ${T.border}`,
            display: status === 'error' ? 'none' : 'block',
            opacity: status === 'loaded' ? 1 : 0,
            transition: 'opacity 0.4s',
            boxShadow: '0 4px 20px rgba(15,14,13,0.08)',
          }}
        />
        {status === 'loaded' && (
          <div style={{ position: 'absolute', bottom: '8px', right: '8px' }}>
            <button
              onClick={e => { e.stopPropagation(); setStatus('loading'); setCounter(c => c + 1) }}
              title="Show different photo"
              style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '-0.01em',
                padding: '5px 10px', borderRadius: '999px', border: 'none',
                background: T.textPrimary, color: '#fff', cursor: 'pointer',
              }}
            >↻ Different</button>
          </div>
        )}
      </div>
      {status === 'error' && (
        <div style={{ marginTop: '8px' }}>
          <p style={{ fontSize: '12px', color: '#ef4444', margin: '0 0 6px' }}>Could not load photo</p>
          <button
            onClick={() => { setStatus('loading'); setCounter(c => c + 1) }}
            style={{
              fontSize: '12px', fontWeight: 600, padding: '5px 12px',
              borderRadius: '999px', border: `1.5px solid ${T.border}`,
              background: T.white, color: T.textSecondary, cursor: 'pointer',
            }}
          >Retry</button>
        </div>
      )}
      <p style={{ fontSize: '10px', color: T.textMuted, margin: '8px 0 0' }}>
        Style inspiration via Flickr
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

const T = {
  white: '#ffffff',
  bg: '#f9f7f4',
  textPrimary: '#0f0e0d',
  textSecondary: '#4a4540',
  textMuted: '#9a9088',
  accent: '#d95f3b',
  accentLight: '#fce8e1',
  pastelSage: '#d4ecdf',
  sageText: '#2e7d52',
  pastelGold: '#fdecc8',
  goldText: '#a06820',
  pastelLavender: '#e8dff8',
  lavenderText: '#5b3fa6',
  pastelSky: '#d6edf8',
  skyText: '#1a6a99',
  border: '#e8e4de',
  shadow: '0 2px 16px rgba(15,14,13,0.06)',
}

// Section configs
const SECTIONS = {
  accent: { bg: T.accentLight, text: T.accent },
  sage: { bg: T.pastelSage, text: T.sageText },
  gold: { bg: T.pastelGold, text: T.goldText },
  lavender: { bg: T.pastelLavender, text: T.lavenderText },
  sky: { bg: T.pastelSky, text: T.skyText },
}

function Section({ title, icon, accentKey, children }) {
  const s = SECTIONS[accentKey] || SECTIONS.accent
  return (
    <div style={{
      background: T.white,
      border: `1px solid ${T.border}`,
      borderRadius: '24px', padding: '28px 28px',
      marginBottom: '14px',
      boxShadow: T.shadow,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '22px' }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '12px',
          background: s.bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', flexShrink: 0,
        }}>{icon}</div>
        <h2 style={{
          fontSize: '17px', fontWeight: 900, color: T.textPrimary,
          margin: 0, letterSpacing: '-0.03em',
        }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Tag({ label, accentKey }) {
  const s = SECTIONS[accentKey] || SECTIONS.sage
  return (
    <span style={{
      fontSize: '13px', fontWeight: 600, letterSpacing: '-0.01em',
      background: s.bg, color: s.text,
      borderRadius: '999px', padding: '7px 16px',
      display: 'inline-block',
    }}>
      {label}
    </span>
  )
}

function BulletList({ items, accentKey }) {
  const s = SECTIONS[accentKey] || SECTIONS.accent
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: s.text, flexShrink: 0, marginTop: '8px',
          }} />
          <span style={{ fontSize: '14px', color: T.textSecondary, lineHeight: 1.65 }}>{item}</span>
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
        minHeight: '100vh', background: T.white,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        gap: '16px',
      }}>
        <p style={{ fontSize: '20px', color: T.textPrimary, fontWeight: 800, letterSpacing: '-0.03em' }}>No results found.</p>
        <button
          onClick={() => navigate('/upload')}
          style={{
            padding: '12px 32px', borderRadius: '999px', border: 'none',
            background: T.accent, color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
          }}
        >Try Again</button>
      </div>
    )
  }

  function handleCopy() {
    navigator.clipboard.writeText(JSON.stringify(result, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{
      minHeight: '100vh', background: T.bg,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${T.border}`,
        padding: '0 32px', height: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px', background: T.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '12px', fontWeight: 900,
          }}>S</div>
          <span style={{ fontSize: '16px', fontWeight: 900, color: T.textPrimary, letterSpacing: '-0.04em' }}>
            Style<span style={{ color: T.accent }}>AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleCopy}
            style={{
              fontSize: '12px', fontWeight: 600, letterSpacing: '-0.01em',
              padding: '7px 16px', borderRadius: '999px',
              border: `1.5px solid ${T.border}`,
              background: T.white,
              color: copied ? T.sageText : T.textSecondary,
              cursor: 'pointer',
            }}
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          <button
            onClick={() => navigate('/upload')}
            style={{
              fontSize: '12px', fontWeight: 700, letterSpacing: '-0.01em',
              padding: '7px 18px', borderRadius: '999px', border: 'none',
              background: T.accent, color: '#fff', cursor: 'pointer',
            }}
          >
            New Analysis
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '36px 20px 80px' }}>

        {/* Hero profile banner */}
        <div style={{
          background: T.textPrimary,
          borderRadius: '28px', padding: '32px 28px',
          marginBottom: '16px', position: 'relative', overflow: 'hidden',
        }}>
          {/* Pastel blobs inside banner */}
          <div style={{
            position: 'absolute', top: '-40px', right: '-40px',
            width: '200px', height: '200px',
            background: T.accentLight, borderRadius: '50%',
            opacity: 0.15, pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: '-40px', left: '30%',
            width: '160px', height: '160px',
            background: T.pastelSage, borderRadius: '50%',
            opacity: 0.12, pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center', position: 'relative' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{
                fontSize: '10px', color: 'rgba(255,255,255,0.4)',
                margin: '0 0 8px', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700,
              }}>
                Your Style Profile
              </p>
              <h1 style={{
                fontSize: 'clamp(18px, 3vw, 26px)', fontWeight: 900,
                color: '#fff', margin: '0 0 6px', letterSpacing: '-0.04em', lineHeight: 1.1,
              }}>
                {result.skin_tone} · {result.undertone} Undertone
              </h1>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', margin: 0, fontWeight: 600 }}>
                {result.body_type} body · {result.face_shape} face
              </p>
            </div>

            {/* Color swatches */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {(result.best_colors || []).slice(0, 5).map(color => {
                const hex = colorSwatch(color)
                return (
                  <div
                    key={color}
                    title={color}
                    style={{
                      width: '36px', height: '36px', borderRadius: '12px',
                      background: hex || T.accentLight,
                      border: '2px solid rgba(255,255,255,0.15)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
                    }}
                  />
                )
              })}
            </div>
          </div>
        </div>

        {/* 1. Color Palette */}
        <Section title="Your Color Palette" icon="🎨" accentKey="accent">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '18px' }}>
            <div>
              <p style={{
                fontSize: '10px', fontWeight: 800, color: T.textMuted,
                textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px',
              }}>Best Colors</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(result.best_colors || []).map(color => {
                  const hex = colorSwatch(color)
                  return (
                    <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '8px',
                        background: hex || T.accentLight,
                        border: `1px solid ${T.border}`, flexShrink: 0,
                      }} />
                      <span style={{ fontSize: '13px', color: T.textSecondary, fontWeight: 500 }}>{color}</span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <p style={{
                fontSize: '10px', fontWeight: 800, color: '#ef4444',
                textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 12px',
              }}>Avoid</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(result.avoid_colors || []).map(color => {
                  const hex = colorSwatch(color)
                  return (
                    <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '22px', height: '22px', borderRadius: '8px',
                        background: hex || '#f5f5f5',
                        border: `1px solid ${T.border}`, flexShrink: 0, opacity: 0.5,
                      }} />
                      <span style={{ fontSize: '13px', color: T.textMuted, textDecoration: 'line-through' }}>{color}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          {result.color_reasoning && (
            <div style={{
              background: T.accentLight, borderRadius: '14px',
              padding: '14px 16px',
              borderLeft: `3px solid ${T.accent}`,
            }}>
              <p style={{ fontSize: '13px', color: T.textSecondary, lineHeight: 1.65, margin: 0 }}>
                {result.color_reasoning}
              </p>
            </div>
          )}
        </Section>

        {/* 2. Body Type */}
        <Section title="Your Body Type" icon="👤" accentKey="sage">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: T.pastelSage, borderRadius: '14px',
            padding: '10px 20px', marginBottom: '18px',
          }}>
            <span style={{ fontSize: '16px', fontWeight: 900, color: T.sageText, letterSpacing: '-0.03em' }}>{result.body_type}</span>
            <span style={{ fontSize: '12px', color: T.textMuted }}>body shape</span>
          </div>
          <BulletList items={result.body_tips || []} accentKey="sage" />
        </Section>

        {/* 3. Styles */}
        <Section title="Styles That Suit You" icon="🧥" accentKey="accent">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '18px' }}>
            {(result.style_suggestions || []).map(s => <Tag key={s} label={s} accentKey="sage" />)}
          </div>
          {(result.avoid_styles || []).length > 0 && (
            <div>
              <p style={{
                fontSize: '10px', fontWeight: 800, color: '#ef4444',
                margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.1em',
              }}>Avoid</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {result.avoid_styles.map(s => (
                  <span key={s} style={{
                    fontSize: '13px', fontWeight: 600,
                    background: '#fef2f2', border: '1px solid #fecaca',
                    color: '#ef4444', borderRadius: '999px', padding: '7px 16px',
                    textDecoration: 'line-through', opacity: 0.8,
                  }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* 4. Outfit Ideas */}
        {result.outfit_ideas && Object.keys(result.outfit_ideas).length > 0 && (
          <Section title="Daily Outfit Ideas" icon="📅" accentKey="gold">
            <p style={{ fontSize: '12px', color: T.textMuted, margin: '0 0 18px', lineHeight: 1.5 }}>
              Tap <strong style={{ color: T.accent }}>Show Style Inspiration</strong> for real fashion photos matching each look.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {Object.entries(result.outfit_ideas).map(([occasion, idea]) => (
                <div key={occasion} style={{
                  background: T.bg, border: `1px solid ${T.border}`,
                  borderRadius: '18px', padding: '18px 20px',
                }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <span style={{
                      flexShrink: 0, fontSize: '10px', fontWeight: 800,
                      color: T.goldText, textTransform: 'uppercase', letterSpacing: '0.08em',
                      background: T.pastelGold, borderRadius: '999px', padding: '3px 10px',
                      marginTop: '2px', whiteSpace: 'nowrap',
                    }}>
                      {occasion}
                    </span>
                    <p style={{ fontSize: '14px', color: T.textSecondary, margin: 0, lineHeight: 1.65, flex: 1 }}>{idea}</p>
                  </div>
                  <OutfitImage occasion={occasion} idea={idea} result={result} />
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* 5. Pro Tips */}
        {(result.pro_tips || []).length > 0 && (
          <Section title="Pro Stylist Tips" icon="💡" accentKey="lavender">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {result.pro_tips.map((tip, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '14px',
                  background: T.pastelLavender, borderRadius: '16px', padding: '16px 18px',
                }}>
                  <span style={{
                    flexShrink: 0, width: '26px', height: '26px', borderRadius: '9px',
                    background: 'rgba(91,63,166,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 900, color: T.lavenderText,
                  }}>{i + 1}</span>
                  <p style={{ fontSize: '14px', color: T.textSecondary, margin: 0, lineHeight: 1.65 }}>{tip}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            onClick={() => navigate('/upload')}
            style={{
              padding: '16px 48px', borderRadius: '999px', border: 'none',
              background: T.accent,
              color: '#fff', fontSize: '15px', fontWeight: 900, cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(217,95,59,0.35)',
              letterSpacing: '-0.02em',
            }}
          >
            ✦ Analyze Another Look →
          </button>
          <p style={{ fontSize: '12px', color: T.textMuted, marginTop: '12px' }}>
            Free · No signup · Instant results
          </p>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
