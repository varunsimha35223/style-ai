import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Editorial pastel palette — inspired by award-winning light/colourful brand sites
const T = {
  white: '#ffffff',
  bg: '#f9f7f4',
  textPrimary: '#0f0e0d',
  textSecondary: '#4a4540',
  textMuted: '#9a9088',
  // Brand accent
  accent: '#d95f3b',
  accentLight: '#fce8e1',
  // Pastels
  pastelPeach: '#fde8dc',
  pastelSage: '#d4ecdf',
  pastelGold: '#fdecc8',
  pastelLavender: '#e8dff8',
  pastelSky: '#d6edf8',
  // Text on pastels
  sageText: '#2e7d52',
  goldText: '#a06820',
  lavenderText: '#5b3fa6',
  skyText: '#1a6a99',
  border: '#e8e4de',
}

export default function Home() {
  const navigate = useNavigate()
  const [btnHovered, setBtnHovered] = useState(false)

  const features = [
    { icon: '🎨', label: 'Color Palette', bg: T.pastelPeach, text: T.accent },
    { icon: '👤', label: 'Body Type', bg: T.pastelSage, text: T.sageText },
    { icon: '✂️', label: 'Style Guide', bg: T.pastelGold, text: T.goldText },
    { icon: '📅', label: 'Outfit Ideas', bg: T.pastelLavender, text: T.lavenderText },
    { icon: '💡', label: 'Pro Tips', bg: T.pastelSky, text: T.skyText },
  ]

  const steps = [
    {
      num: '01',
      icon: '📸',
      title: 'Upload 3 Photos',
      desc: 'Front body, face closeup, and side profile — gives the AI a complete picture of you.',
      bg: T.pastelPeach,
      col: T.accent,
    },
    {
      num: '02',
      icon: '🧠',
      title: 'AI Reads You',
      desc: 'Gemini Vision analyzes your skin tone, body proportions, and facial structure.',
      bg: T.pastelSage,
      col: T.sageText,
    },
    {
      num: '03',
      icon: '✦',
      title: 'Get Your Guide',
      desc: 'Colors, fits, styles, outfit ideas — all crafted specifically for your body and life.',
      bg: T.pastelGold,
      col: T.goldText,
    },
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: T.white,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      overflowX: 'hidden',
    }}>

      {/* Nav */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${T.border}`,
        padding: '0 40px', height: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px', height: '28px', borderRadius: '8px',
            background: T.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '12px', fontWeight: 900, letterSpacing: '-0.05em',
          }}>S</div>
          <span style={{ fontSize: '16px', fontWeight: 900, color: T.textPrimary, letterSpacing: '-0.04em' }}>
            Style<span style={{ color: T.accent }}>AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            fontSize: '11px', fontWeight: 700, letterSpacing: '0.04em',
            textTransform: 'uppercase', color: T.sageText,
            background: T.pastelSage, borderRadius: '999px', padding: '4px 12px',
          }}>Free · No signup</span>
          <button
            onClick={() => navigate('/upload')}
            style={{
              fontSize: '13px', fontWeight: 700, letterSpacing: '-0.02em',
              padding: '8px 20px', borderRadius: '999px', border: 'none',
              background: T.textPrimary, color: '#fff', cursor: 'pointer',
            }}
          >
            Get Started →
          </button>
        </div>
      </nav>

      {/* Hero — full viewport */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px 60px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        background: T.white,
      }}>
        {/* Large pastel blob background */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-5%',
          width: '55vw', height: '55vw', maxWidth: '700px', maxHeight: '700px',
          background: T.pastelPeach,
          borderRadius: '50%', filter: 'blur(80px)',
          opacity: 0.55, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-5%', right: '-5%',
          width: '45vw', height: '45vw', maxWidth: '600px', maxHeight: '600px',
          background: T.pastelSage,
          borderRadius: '50%', filter: 'blur(80px)',
          opacity: 0.4, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '10%',
          width: '30vw', height: '30vw', maxWidth: '400px', maxHeight: '400px',
          background: T.pastelLavender,
          borderRadius: '50%', filter: 'blur(60px)',
          opacity: 0.35, pointerEvents: 'none',
        }} />

        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: T.white,
          border: `1.5px solid ${T.border}`,
          borderRadius: '999px', padding: '6px 18px', marginBottom: '44px',
          position: 'relative',
        }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: T.accent, display: 'inline-block' }} />
          <span style={{ fontSize: '11px', fontWeight: 700, color: T.textSecondary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Powered by Google Gemini Vision
          </span>
        </div>

        {/* Massive headline */}
        <h1 style={{
          fontSize: 'clamp(52px, 10vw, 104px)',
          fontWeight: 900, lineHeight: 0.95,
          margin: '0 0 32px',
          color: T.textPrimary,
          letterSpacing: '-0.05em',
          maxWidth: '860px',
          position: 'relative',
        }}>
          Dress for<br />
          <span style={{ color: T.accent }}>your body.</span>
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2vw, 19px)',
          color: T.textSecondary, lineHeight: 1.7,
          margin: '0 0 10px', maxWidth: '500px',
          position: 'relative',
        }}>
          Upload 3 photos. Our AI reads your skin tone, body shape, and face structure — then builds a complete personal style guide.
        </p>
        <p style={{ fontSize: '13px', color: T.textMuted, margin: '0 0 52px', position: 'relative' }}>
          Takes 15 seconds · Completely free · No account needed
        </p>

        {/* Feature pills — pastel colourful */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '8px',
          justifyContent: 'center', marginBottom: '52px',
          position: 'relative',
        }}>
          {features.map(f => (
            <div key={f.label} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: f.bg, borderRadius: '999px', padding: '9px 18px',
            }}>
              <span style={{ fontSize: '14px' }}>{f.icon}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: f.text, letterSpacing: '-0.01em' }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/upload')}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            fontSize: '16px', fontWeight: 800, letterSpacing: '-0.02em',
            padding: '18px 52px', borderRadius: '999px', border: 'none',
            background: btnHovered ? '#c4522e' : T.accent,
            color: '#fff', cursor: 'pointer',
            boxShadow: btnHovered
              ? '0 16px 48px rgba(217,95,59,0.45)'
              : '0 8px 28px rgba(217,95,59,0.35)',
            transform: btnHovered ? 'translateY(-3px)' : 'translateY(0)',
            transition: 'all 0.2s ease',
            display: 'flex', alignItems: 'center', gap: '12px',
            position: 'relative',
          }}
        >
          Find My Style
          <span style={{
            fontSize: '20px',
            transform: btnHovered ? 'translateX(5px)' : 'translateX(0)',
            transition: 'transform 0.2s',
          }}>→</span>
        </button>
      </section>

      {/* How it works — pastel section */}
      <section style={{
        background: T.bg,
        borderTop: `1px solid ${T.border}`,
        padding: '80px 24px',
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{
              fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
              letterSpacing: '0.12em', color: T.textMuted, margin: '0 0 12px',
            }}>Process</p>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900,
              letterSpacing: '-0.04em', color: T.textPrimary, margin: 0,
              lineHeight: 1,
            }}>How it works</h2>
          </div>

          {/* 3 cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}>
            {steps.map(s => (
              <div key={s.num} style={{
                background: T.white,
                border: `1px solid ${T.border}`,
                borderRadius: '24px', padding: '32px 28px',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Pastel corner blob */}
                <div style={{
                  position: 'absolute', top: '-30px', right: '-30px',
                  width: '120px', height: '120px',
                  background: s.bg, borderRadius: '50%',
                  opacity: 0.7, pointerEvents: 'none',
                }} />
                <div style={{
                  width: '48px', height: '48px', borderRadius: '14px',
                  background: s.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '22px', marginBottom: '20px',
                }}>{s.icon}</div>
                <p style={{
                  fontSize: '11px', fontWeight: 800, color: s.col,
                  letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 10px',
                }}>{s.num}</p>
                <p style={{
                  fontSize: '20px', fontWeight: 800, color: T.textPrimary,
                  margin: '0 0 10px', letterSpacing: '-0.03em',
                }}>{s.title}</p>
                <p style={{
                  fontSize: '14px', color: T.textSecondary,
                  margin: 0, lineHeight: 1.65,
                }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bold CTA banner */}
      <section style={{
        background: T.textPrimary,
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.12em', color: 'rgba(255,255,255,0.4)', margin: '0 0 20px',
        }}>Start now</p>
        <h2 style={{
          fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 900,
          letterSpacing: '-0.04em', color: '#fff',
          margin: '0 0 32px', lineHeight: 1,
        }}>
          Your style,<br />
          <span style={{ color: T.accent }}>understood.</span>
        </h2>
        <button
          onClick={() => navigate('/upload')}
          style={{
            fontSize: '15px', fontWeight: 800, letterSpacing: '-0.02em',
            padding: '16px 44px', borderRadius: '999px', border: 'none',
            background: T.accent, color: '#fff', cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(217,95,59,0.4)',
          }}
        >
          Analyze My Style →
        </button>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '16px' }}>
          Free · No signup · Photos never stored
        </p>
      </section>
    </div>
  )
}
