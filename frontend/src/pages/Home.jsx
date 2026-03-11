import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()
  const [btnHovered, setBtnHovered] = useState(false)

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080810',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      overflowX: 'hidden',
      position: 'relative',
    }}>

      {/* Background ambient glows */}
      <div style={{
        position: 'fixed', top: '-200px', left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '600px',
        background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-200px', right: '-100px',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-100px', left: '-100px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      {/* Subtle grid */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(8,8,16,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '0 24px', height: '56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        maxWidth: '100%',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '30px', height: '30px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px', boxShadow: '0 0 16px rgba(168,85,247,0.5)',
          }}>✦</div>
          <span style={{ fontSize: '17px', fontWeight: 900, color: '#fff', letterSpacing: '-0.02em' }}>
            Style<span style={{ color: '#a855f7' }}>AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontSize: '11px', fontWeight: 600, color: '#34d399',
            background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.3)',
            borderRadius: '999px', padding: '3px 10px',
          }}>Free · No signup</span>
        </div>
      </nav>

      {/* Hero */}
      <main style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', minHeight: '100vh',
        padding: '100px 24px 60px', textAlign: 'center',
        position: 'relative', zIndex: 1,
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)',
          borderRadius: '999px', padding: '6px 16px', marginBottom: '32px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 8px #a855f7', display: 'inline-block' }} />
          <span style={{ fontSize: '12px', color: '#c084fc', fontWeight: 600 }}>Powered by Google Gemini Vision AI</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 900, lineHeight: 1.05, margin: '0 0 20px', color: '#fff', letterSpacing: '-0.03em', maxWidth: '800px' }}>
          Your Personal{' '}
          <span style={{
            background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>AI Stylist</span>
        </h1>

        <p style={{ fontSize: 'clamp(15px, 2.5vw, 19px)', color: '#94a3b8', margin: '0 0 48px', maxWidth: '560px', lineHeight: 1.6 }}>
          Upload 3 photos. AI analyzes your skin tone, body type, and face shape — then gives you a full personalized style guide.
        </p>

        {/* Feature pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '48px' }}>
          {[
            { icon: '🎨', text: 'Color Palette', color: '#a855f7' },
            { icon: '👤', text: 'Body Type', color: '#3b82f6' },
            { icon: '✂️', text: 'Style Guide', color: '#ec4899' },
            { icon: '📅', text: 'Daily Outfits', color: '#f97316' },
            { icon: '💡', text: 'Pro Tips', color: '#10b981' },
          ].map(f => (
            <div key={f.text} style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '999px', padding: '8px 16px',
            }}>
              <span style={{ fontSize: '14px' }}>{f.icon}</span>
              <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: 500 }}>{f.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/upload')}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            fontSize: '16px', fontWeight: 700,
            padding: '16px 40px', borderRadius: '14px', border: 'none',
            background: btnHovered
              ? 'linear-gradient(135deg, #9333ea, #db2777)'
              : 'linear-gradient(135deg, #a855f7, #ec4899)',
            color: '#fff', cursor: 'pointer',
            boxShadow: btnHovered
              ? '0 0 40px rgba(168,85,247,0.6), 0 20px 40px rgba(0,0,0,0.4)'
              : '0 0 24px rgba(168,85,247,0.4), 0 8px 24px rgba(0,0,0,0.3)',
            transform: btnHovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
            transition: 'all 0.2s ease',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}
        >
          Get My Style Analysis
          <span style={{ fontSize: '18px', transition: 'transform 0.2s', transform: btnHovered ? 'translateX(4px)' : 'translateX(0)' }}>→</span>
        </button>

        <p style={{ fontSize: '12px', color: '#475569', marginTop: '16px' }}>
          Free · No account needed · Results in seconds
        </p>

        {/* How it works */}
        <div style={{ marginTop: '100px', width: '100%', maxWidth: '760px' }}>
          <p style={{ fontSize: '12px', fontWeight: 700, color: '#475569', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '40px' }}>
            How it works
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {[
              { step: '01', icon: '📸', title: 'Upload 3 Photos', desc: 'Front body, face closeup, side profile — for complete visual analysis' },
              { step: '02', icon: '🧠', title: 'AI Analyzes You', desc: 'Gemini Vision reads skin tone, body shape, and facial features' },
              { step: '03', icon: '✦', title: 'Get Your Guide', desc: 'Personalized colors, fits, styles, and daily outfit ideas just for you' },
            ].map(s => (
              <div key={s.step} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px', padding: '24px', textAlign: 'left',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '22px' }}>{s.icon}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#475569', letterSpacing: '0.05em' }}>{s.step}</span>
                </div>
                <p style={{ fontSize: '15px', fontWeight: 700, color: '#f1f5f9', margin: '0 0 8px' }}>{s.title}</p>
                <p style={{ fontSize: '13px', color: '#64748b', margin: 0, lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <p style={{ marginTop: '80px', fontSize: '12px', color: '#334155', textAlign: 'center' }}>
          🔒 Your photos are processed instantly and never stored
        </p>
      </main>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
    </div>
  )
}
