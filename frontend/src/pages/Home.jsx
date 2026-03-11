import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const T = {
  bg: '#faf7f2',
  white: '#ffffff',
  textPrimary: '#1a1614',
  textSecondary: '#78716c',
  textMuted: '#a8968c',
  accent: '#c4614a',
  accentHover: '#ad5340',
  accentLight: '#f9ede9',
  sage: '#6b9e7e',
  sageLight: '#e8f3ec',
  gold: '#c9973e',
  goldLight: '#fdf3e0',
  border: '#e8e0d8',
  shadow: '0 4px 24px rgba(26,22,20,0.07)',
  shadowLg: '0 12px 48px rgba(26,22,20,0.12)',
}

export default function Home() {
  const navigate = useNavigate()
  const [btnHovered, setBtnHovered] = useState(false)

  return (
    <div style={{
      minHeight: '100vh',
      background: T.bg,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      overflowX: 'hidden',
      position: 'relative',
    }}>

      {/* Warm ambient blobs */}
      <div style={{
        position: 'fixed', top: '-180px', right: '-80px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(196,97,74,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '-120px', left: '-80px',
        width: '450px', height: '450px',
        background: 'radial-gradient(circle, rgba(107,158,126,0.1) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', top: '30%', left: '20%',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(201,151,62,0.07) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(250,247,242,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${T.border}`,
        padding: '0 32px', height: '60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '10px',
            background: `linear-gradient(135deg, ${T.accent}, ${T.gold})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '14px', fontWeight: 900,
            boxShadow: '0 4px 12px rgba(196,97,74,0.35)',
          }}>S</div>
          <span style={{ fontSize: '18px', fontWeight: 900, color: T.textPrimary, letterSpacing: '-0.03em' }}>
            Style<span style={{ color: T.accent }}>AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{
            fontSize: '12px', fontWeight: 600, color: T.sage,
            background: T.sageLight, borderRadius: '999px', padding: '4px 12px',
          }}>Free · No signup</span>
          <button
            onClick={() => navigate('/upload')}
            style={{
              fontSize: '13px', fontWeight: 700,
              padding: '8px 20px', borderRadius: '10px', border: 'none',
              background: T.accent, color: '#fff', cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(196,97,74,0.3)',
            }}
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 60px', textAlign: 'center',
        position: 'relative', zIndex: 1,
      }}>

        {/* Eyebrow tag */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: T.accentLight,
          border: `1px solid rgba(196,97,74,0.2)`,
          borderRadius: '999px', padding: '6px 18px', marginBottom: '36px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: T.accent, display: 'inline-block' }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: T.accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Powered by Google Gemini Vision
          </span>
        </div>

        {/* Big headline */}
        <h1 style={{
          fontSize: 'clamp(42px, 8vw, 88px)', fontWeight: 900,
          lineHeight: 1.0, margin: '0 0 24px',
          color: T.textPrimary, letterSpacing: '-0.04em',
          maxWidth: '800px',
        }}>
          Dress for
          <br />
          <span style={{
            background: `linear-gradient(135deg, ${T.accent} 0%, ${T.gold} 60%)`,
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            your body.
          </span>
        </h1>

        <p style={{
          fontSize: 'clamp(15px, 2.2vw, 19px)', color: T.textSecondary,
          margin: '0 0 12px', maxWidth: '520px', lineHeight: 1.65,
        }}>
          Upload 3 photos. Our AI reads your skin tone, body shape, and face structure — then builds a complete personal style guide.
        </p>
        <p style={{ fontSize: '13px', color: T.textMuted, margin: '0 0 52px' }}>
          Takes 15 seconds · Completely free · No account needed
        </p>

        {/* Feature row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '48px' }}>
          {[
            { icon: '🎨', label: 'Color Palette', bg: T.accentLight, color: T.accent },
            { icon: '👤', label: 'Body Type', bg: T.sageLight, color: T.sage },
            { icon: '✂️', label: 'Style Guide', bg: T.goldLight, color: T.gold },
            { icon: '📅', label: 'Outfit Ideas', bg: T.accentLight, color: T.accent },
            { icon: '💡', label: 'Pro Tips', bg: T.sageLight, color: T.sage },
          ].map(f => (
            <div key={f.label} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: f.bg, borderRadius: '999px', padding: '8px 16px',
            }}>
              <span style={{ fontSize: '13px' }}>{f.icon}</span>
              <span style={{ fontSize: '12px', fontWeight: 700, color: f.color }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate('/upload')}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            fontSize: '16px', fontWeight: 800,
            padding: '18px 48px', borderRadius: '16px', border: 'none',
            background: btnHovered
              ? `linear-gradient(135deg, ${T.accentHover}, #b0852c)`
              : `linear-gradient(135deg, ${T.accent}, ${T.gold})`,
            color: '#fff', cursor: 'pointer',
            boxShadow: btnHovered
              ? '0 12px 40px rgba(196,97,74,0.45)'
              : '0 6px 24px rgba(196,97,74,0.35)',
            transform: btnHovered ? 'translateY(-2px)' : 'translateY(0)',
            transition: 'all 0.2s ease',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}
        >
          Find My Style
          <span style={{ fontSize: '20px', transition: 'transform 0.2s', transform: btnHovered ? 'translateX(4px)' : 'translateX(0)' }}>→</span>
        </button>

        {/* How it works */}
        <div style={{ marginTop: '100px', width: '100%', maxWidth: '800px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px', justifyContent: 'center' }}>
            <div style={{ flex: 1, height: '1px', background: T.border }} />
            <span style={{ fontSize: '12px', fontWeight: 700, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
              How it works
            </span>
            <div style={{ flex: 1, height: '1px', background: T.border }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {[
              { step: '01', icon: '📸', title: 'Upload 3 Photos', desc: 'Front body, face closeup, side profile — gives AI a full picture of you', color: T.accent, light: T.accentLight },
              { step: '02', icon: '🧠', title: 'AI Reads You', desc: 'Gemini Vision analyzes skin tone, body proportions, and facial features', color: T.sage, light: T.sageLight },
              { step: '03', icon: '✦', title: 'Get Your Guide', desc: 'Colors, fits, styles, outfit ideas — all tailored specifically to you', color: T.gold, light: T.goldLight },
            ].map(s => (
              <div key={s.step} style={{
                background: T.white, border: `1px solid ${T.border}`,
                borderRadius: '20px', padding: '28px 24px', textAlign: 'left',
                boxShadow: T.shadow,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px',
                    background: s.light,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px',
                  }}>{s.icon}</div>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: s.color, letterSpacing: '0.06em', textTransform: 'uppercase' }}>{s.step}</span>
                </div>
                <p style={{ fontSize: '15px', fontWeight: 800, color: T.textPrimary, margin: '0 0 8px' }}>{s.title}</p>
                <p style={{ fontSize: '13px', color: T.textSecondary, margin: 0, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom privacy note */}
        <p style={{ marginTop: '80px', fontSize: '12px', color: T.textMuted }}>
          🔒 Photos are never stored — processed instantly and discarded
        </p>
      </main>
    </div>
  )
}
