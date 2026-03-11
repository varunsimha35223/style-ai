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

const T = {
  bg: '#faf7f2', white: '#ffffff',
  textPrimary: '#1a1614', textSecondary: '#78716c', textMuted: '#a8968c',
  accent: '#c4614a', accentLight: '#f9ede9',
  sage: '#6b9e7e', sageLight: '#e8f3ec',
  gold: '#c9973e', goldLight: '#fdf3e0',
  border: '#e8e0d8',
  shadow: '0 4px 24px rgba(26,22,20,0.07)',
  shadowLg: '0 8px 40px rgba(26,22,20,0.1)',
}

function Section({ title, icon, accent, children }) {
  const bg = accent === 'sage' ? T.sageLight : accent === 'gold' ? T.goldLight : T.accentLight
  const col = accent === 'sage' ? T.sage : accent === 'gold' ? T.gold : T.accent
  return (
    <div style={{
      background: T.white, border: `1px solid ${T.border}`,
      borderRadius: '22px', padding: '28px', marginBottom: '16px',
      boxShadow: T.shadow,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <div style={{
          width: '38px', height: '38px', borderRadius: '11px', background: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px',
          flexShrink: 0,
        }}>{icon}</div>
        <h2 style={{ fontSize: '16px', fontWeight: 900, color: T.textPrimary, margin: 0, letterSpacing: '-0.02em' }}>{title}</h2>
      </div>
      {children}
    </div>
  )
}

function Tag({ label, accent }) {
  const bg = accent === 'sage' ? T.sageLight : accent === 'gold' ? T.goldLight : '#f0ece8'
  const col = accent === 'sage' ? T.sage : accent === 'gold' ? T.gold : T.textSecondary
  return (
    <span style={{
      fontSize: '13px', fontWeight: 600,
      background: bg, color: col,
      borderRadius: '10px', padding: '7px 14px',
      display: 'inline-block',
    }}>
      {label}
    </span>
  )
}

function BulletList({ items, accent }) {
  const col = accent === 'sage' ? T.sage : accent === 'gold' ? T.gold : T.accent
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: col, flexShrink: 0, marginTop: '7px',
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
        minHeight: '100vh', background: T.bg,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: T.textSecondary, gap: '16px',
      }}>
        <p style={{ fontSize: '18px', color: T.textPrimary, fontWeight: 700 }}>No results found.</p>
        <button
          onClick={() => navigate('/upload')}
          style={{
            padding: '12px 28px', borderRadius: '12px', border: 'none',
            background: T.accent, color: '#fff', fontSize: '14px', fontWeight: 700, cursor: 'pointer',
          }}
        >Try Again</button>
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
      minHeight: '100vh', background: T.bg,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      position: 'relative',
    }}>
      {/* Warm blobs */}
      <div style={{
        position: 'fixed', top: '-100px', right: '-60px', width: '360px', height: '360px',
        background: 'radial-gradient(circle, rgba(196,97,74,0.09) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-80px', left: '-60px', width: '320px', height: '320px',
        background: 'radial-gradient(circle, rgba(107,158,126,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(250,247,242,0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${T.border}`,
        padding: '0 24px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '9px',
            background: `linear-gradient(135deg, ${T.accent}, #c9973e)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '13px', fontWeight: 900,
            boxShadow: '0 3px 10px rgba(196,97,74,0.3)',
          }}>S</div>
          <span style={{ fontSize: '17px', fontWeight: 900, color: T.textPrimary, letterSpacing: '-0.03em' }}>
            Style<span style={{ color: T.accent }}>AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleCopy}
            style={{
              fontSize: '12px', fontWeight: 600,
              padding: '7px 14px', borderRadius: '8px',
              border: `1px solid ${T.border}`,
              background: T.white,
              color: copied ? T.sage : T.textSecondary,
              cursor: 'pointer',
            }}
          >
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          <button
            onClick={() => navigate('/upload')}
            style={{
              fontSize: '12px', fontWeight: 700,
              padding: '7px 16px', borderRadius: '8px', border: 'none',
              background: T.accent, color: '#fff', cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(196,97,74,0.3)',
            }}
          >
            New Analysis
          </button>
        </div>
      </header>

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '36px 20px 80px', position: 'relative', zIndex: 1 }}>

        {/* Hero profile banner */}
        <div style={{
          background: T.white,
          border: `1px solid ${T.border}`,
          borderRadius: '24px', padding: '28px', marginBottom: '20px',
          boxShadow: T.shadowLg,
          display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center',
        }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <p style={{ fontSize: '11px', color: T.textMuted, margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
              Your Style Profile
            </p>
            <h1 style={{ fontSize: '22px', fontWeight: 900, color: T.textPrimary, margin: '0 0 4px', letterSpacing: '-0.03em' }}>
              {result.skin_tone} · {result.undertone} Undertone
            </h1>
            <p style={{ fontSize: '14px', color: T.accent, margin: 0, fontWeight: 700 }}>
              {result.body_type} body · {result.face_shape} face
            </p>
          </div>
          {/* Color swatches */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(result.best_colors || []).slice(0, 5).map(color => {
              const hex = colorSwatch(color)
              return (
                <div key={color} title={color} style={{
                  width: '38px', height: '38px', borderRadius: '12px',
                  background: hex || T.accentLight,
                  border: `2px solid ${T.border}`,
                  boxShadow: T.shadow,
                }} />
              )
            })}
          </div>
        </div>

        {/* 1. Color Palette */}
        <Section title="Your Color Palette" icon="🎨" accent="accent">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '16px' }}>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 800, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                Best Colors
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(result.best_colors || []).map(color => {
                  const hex = colorSwatch(color)
                  return (
                    <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '6px',
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
              <p style={{ fontSize: '11px', fontWeight: 800, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
                Avoid
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(result.avoid_colors || []).map(color => {
                  const hex = colorSwatch(color)
                  return (
                    <div key={color} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '20px', height: '20px', borderRadius: '6px',
                        background: hex || '#f5f5f5',
                        border: `1px solid ${T.border}`, flexShrink: 0, opacity: 0.55,
                      }} />
                      <span style={{ fontSize: '13px', color: T.textMuted, textDecoration: 'line-through' }}>{color}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          {result.color_reasoning && (
            <p style={{
              fontSize: '13px', color: T.textSecondary, lineHeight: 1.65, margin: 0,
              background: T.accentLight, borderRadius: '12px', padding: '14px 16px',
              borderLeft: `3px solid ${T.accent}`,
            }}>
              {result.color_reasoning}
            </p>
          )}
        </Section>

        {/* 2. Body Type */}
        <Section title="Your Body Type" icon="👤" accent="sage">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: T.sageLight, borderRadius: '12px',
            padding: '10px 18px', marginBottom: '18px',
          }}>
            <span style={{ fontSize: '15px', fontWeight: 900, color: T.sage }}>{result.body_type}</span>
            <span style={{ fontSize: '12px', color: T.textMuted }}>body shape</span>
          </div>
          <BulletList items={result.body_tips || []} accent="sage" />
        </Section>

        {/* 3. Styles That Suit You */}
        <Section title="Styles That Suit You" icon="🧥" accent="accent">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {(result.style_suggestions || []).map(s => <Tag key={s} label={s} accent="sage" />)}
          </div>
          {(result.avoid_styles || []).length > 0 && (
            <div style={{ marginTop: '4px' }}>
              <p style={{ fontSize: '11px', fontWeight: 800, color: '#ef4444', margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Avoid
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {result.avoid_styles.map(s => (
                  <span key={s} style={{
                    fontSize: '13px', fontWeight: 600,
                    background: '#fef2f2', border: '1px solid #fecaca',
                    color: '#ef4444', borderRadius: '10px', padding: '7px 14px',
                    textDecoration: 'line-through', opacity: 0.8,
                  }}>{s}</span>
                ))}
              </div>
            </div>
          )}
        </Section>

        {/* 4. Daily Outfit Ideas */}
        {result.outfit_ideas && Object.keys(result.outfit_ideas).length > 0 && (
          <Section title="Daily Outfit Ideas" icon="📅" accent="gold">
            <p style={{ fontSize: '12px', color: T.textMuted, margin: '0 0 16px' }}>
              Tap <strong style={{ color: T.accent }}>Show Style Inspiration</strong> on any occasion for real fashion photos
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {Object.entries(result.outfit_ideas).map(([occasion, idea]) => (
                <div key={occasion} style={{
                  background: '#faf7f2', border: `1px solid ${T.border}`,
                  borderRadius: '16px', padding: '18px',
                }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '6px' }}>
                    <div style={{
                      flexShrink: 0, fontSize: '11px', fontWeight: 800,
                      color: T.accent, textTransform: 'uppercase', letterSpacing: '0.07em',
                      paddingTop: '2px', width: '80px',
                    }}>
                      {occasion}
                    </div>
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
          <Section title="Pro Stylist Tips" icon="💡" accent="gold">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {result.pro_tips.map((tip, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '14px',
                  background: T.goldLight, borderRadius: '14px', padding: '16px',
                  borderLeft: `3px solid ${T.gold}`,
                }}>
                  <span style={{
                    flexShrink: 0, width: '24px', height: '24px', borderRadius: '8px',
                    background: 'rgba(201,151,62,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '12px', fontWeight: 900, color: T.gold,
                  }}>{i + 1}</span>
                  <p style={{ fontSize: '14px', color: T.textSecondary, margin: 0, lineHeight: 1.65 }}>{tip}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <button
            onClick={() => navigate('/upload')}
            style={{
              padding: '16px 44px', borderRadius: '16px', border: 'none',
              background: `linear-gradient(135deg, ${T.accent}, #c9973e)`,
              color: '#fff', fontSize: '15px', fontWeight: 900, cursor: 'pointer',
              boxShadow: '0 6px 24px rgba(196,97,74,0.35)',
              letterSpacing: '-0.01em',
            }}
          >
            ✦ Analyze Another Look
          </button>
          <p style={{ fontSize: '12px', color: T.textMuted, marginTop: '12px' }}>Free · No signup · Instant results</p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
