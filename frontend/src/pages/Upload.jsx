import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhotoSlot from '../components/PhotoSlot'
import { analyzeStyle } from '../api/client'

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
  border: '#e8e0d8',
  shadow: '0 4px 24px rgba(26,22,20,0.07)',
}

const OCCASIONS = ['Daily Casual', 'Office', 'College', 'Gym', 'Formal Events']

export default function Upload() {
  const navigate = useNavigate()

  const [photos, setPhotos] = useState([null, null, null])
  const [occasions, setOccasions] = useState([])
  const [budget, setBudget] = useState('')
  const [colorPref, setColorPref] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [loadingStep, setLoadingStep] = useState(0)

  const allPhotos = photos.every(Boolean)
  const canSubmit = allPhotos && occasions.length > 0 && budget

  function toggleOccasion(occ) {
    setOccasions(prev => prev.includes(occ) ? prev.filter(o => o !== occ) : [...prev, occ])
  }

  function setPhoto(index, file) {
    setPhotos(prev => { const n = [...prev]; n[index] = file; return n })
  }

  const loadingSteps = [
    'Uploading your photos…',
    'Analyzing skin tone & undertones…',
    'Detecting body type & proportions…',
    'Building your color palette…',
    'Crafting outfit recommendations…',
  ]

  async function handleSubmit() {
    if (!canSubmit) return
    setError(null)
    setLoading(true)
    setLoadingStep(0)

    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < loadingSteps.length - 1 ? prev + 1 : prev))
    }, 2500)

    try {
      const result = await analyzeStyle({
        photo1: photos[0], photo2: photos[1], photo3: photos[2],
        occasions: occasions.join(', '),
        budget,
        colorPreference: colorPref || 'No preference',
      })
      clearInterval(interval)
      navigate('/results', { state: { result } })
    } catch (err) {
      clearInterval(interval)
      setError(err.message || 'Analysis failed. Please try again.')
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: T.bg,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: '24px',
      }}>
        <div style={{
          position: 'fixed', top: '-100px', right: '-80px',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(196,97,74,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Spinner */}
        <div style={{ position: 'relative', width: '72px', height: '72px', marginBottom: '28px' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: `3px solid ${T.border}`,
          }} />
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '3px solid transparent',
            borderTop: `3px solid ${T.accent}`,
            animation: 'spin 0.9s linear infinite',
          }} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '26px',
          }}>✦</div>
        </div>

        <p style={{ fontSize: '22px', fontWeight: 900, color: T.textPrimary, margin: '0 0 6px', letterSpacing: '-0.02em' }}>
          Styling you…
        </p>
        <p style={{ fontSize: '14px', color: T.accent, margin: '0 0 48px', fontWeight: 600 }}>
          {loadingSteps[loadingStep]}
        </p>

        <div style={{
          background: T.white, borderRadius: '20px', padding: '24px 32px',
          border: `1px solid ${T.border}`, boxShadow: T.shadow,
          display: 'flex', flexDirection: 'column', gap: '14px',
          width: '100%', maxWidth: '340px',
        }}>
          {loadingSteps.map((step, i) => (
            <div key={step} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              opacity: i <= loadingStep ? 1 : 0.35,
              transition: 'opacity 0.4s',
            }}>
              <div style={{
                width: '22px', height: '22px', borderRadius: '50%', flexShrink: 0,
                background: i < loadingStep ? T.sageLight : i === loadingStep ? T.accentLight : '#f5f5f5',
                border: `1.5px solid ${i < loadingStep ? T.sage : i === loadingStep ? T.accent : T.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: 800,
                color: i < loadingStep ? T.sage : i === loadingStep ? T.accent : T.textMuted,
              }}>
                {i < loadingStep ? '✓' : i === loadingStep ? '●' : ''}
              </div>
              <span style={{
                fontSize: '13px',
                color: i < loadingStep ? T.sage : i === loadingStep ? T.accent : T.textMuted,
                fontWeight: i === loadingStep ? 700 : 400,
              }}>
                {step}
              </span>
            </div>
          ))}
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const photoCount = photos.filter(Boolean).length

  return (
    <div style={{
      minHeight: '100vh', background: T.bg,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      position: 'relative',
    }}>
      {/* Warm blobs */}
      <div style={{
        position: 'fixed', top: '-100px', right: '-60px',
        width: '360px', height: '360px',
        background: 'radial-gradient(circle, rgba(196,97,74,0.09) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-80px', left: '-60px',
        width: '320px', height: '320px',
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
        {/* Progress dots */}
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: T.textMuted, marginRight: '4px' }}>
            {photoCount}/3 photos
          </span>
          {[0, 1, 2].map(n => (
            <div key={n} style={{
              width: '28px', height: '5px', borderRadius: '999px',
              background: photos[n] ? T.accent : T.border,
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px 80px', position: 'relative', zIndex: 1 }}>

        {/* Title */}
        <div style={{ marginBottom: '36px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: T.textPrimary, margin: '0 0 8px', letterSpacing: '-0.03em' }}>
            Upload Your Photos
          </h1>
          <p style={{ fontSize: '14px', color: T.textSecondary, margin: 0 }}>
            3 angles give the AI a complete picture — better photos = better recommendations
          </p>
        </div>

        {/* Photo grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }}>
          <PhotoSlot
            index={1} label="Front Body" icon="🧍"
            hint="Full length, facing camera, standing straight"
            file={photos[0]} onChange={f => setPhoto(0, f)}
          />
          <PhotoSlot
            index={2} label="Face Closeup" icon="🙂"
            hint="Natural lighting, no heavy filters"
            file={photos[1]} onChange={f => setPhoto(1, f)}
          />
          <PhotoSlot
            index={3} label="Side Profile" icon="🚶"
            hint="Full length side view, natural posture"
            file={photos[2]} onChange={f => setPhoto(2, f)}
          />
        </div>

        {/* Questions card */}
        <div style={{
          background: T.white, border: `1px solid ${T.border}`,
          borderRadius: '24px', padding: '32px',
          boxShadow: T.shadow, marginBottom: '28px',
        }}>
          <h2 style={{ fontSize: '17px', fontWeight: 900, color: T.textPrimary, margin: '0 0 28px', letterSpacing: '-0.02em' }}>
            Quick Questions
          </h2>

          {/* Occasions */}
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: T.textPrimary, margin: '0 0 12px' }}>
              When do you usually dress up?
              <span style={{ color: T.accent }}> *</span>
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {OCCASIONS.map(occ => {
                const active = occasions.includes(occ)
                return (
                  <button
                    key={occ}
                    onClick={() => toggleOccasion(occ)}
                    style={{
                      fontSize: '13px', fontWeight: 600,
                      padding: '9px 18px', borderRadius: '12px', border: 'none',
                      background: active ? T.accentLight : '#f5f0eb',
                      color: active ? T.accent : T.textSecondary,
                      cursor: 'pointer',
                      outline: active ? `2px solid ${T.accent}` : '2px solid transparent',
                      transition: 'all 0.15s',
                    }}
                  >
                    {occ}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Budget */}
          <div style={{ marginBottom: '28px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: T.textPrimary, margin: '0 0 12px' }}>
              Budget range<span style={{ color: T.accent }}> *</span>
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { label: 'Budget', sub: 'Affordable picks' },
                { label: 'Mid-range', sub: 'Best of both worlds' },
                { label: 'Premium', sub: 'Investment pieces' },
              ].map(b => {
                const active = budget === b.label
                return (
                  <button
                    key={b.label}
                    onClick={() => setBudget(b.label)}
                    style={{
                      textAlign: 'left',
                      padding: '12px 18px', borderRadius: '14px', border: 'none',
                      background: active ? T.accentLight : '#f5f0eb',
                      cursor: 'pointer',
                      outline: active ? `2px solid ${T.accent}` : '2px solid transparent',
                      transition: 'all 0.15s',
                      minWidth: '130px',
                    }}
                  >
                    <p style={{ fontSize: '13px', fontWeight: 700, color: active ? T.accent : T.textPrimary, margin: '0 0 2px' }}>{b.label}</p>
                    <p style={{ fontSize: '11px', color: active ? T.accent : T.textMuted, margin: 0 }}>{b.sub}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Color preference */}
          <div>
            <p style={{ fontSize: '13px', fontWeight: 700, color: T.textPrimary, margin: '0 0 12px' }}>
              Colors you love or hate
              <span style={{ color: T.textMuted, fontWeight: 400 }}> (optional)</span>
            </p>
            <input
              type="text"
              value={colorPref}
              onChange={e => setColorPref(e.target.value)}
              placeholder="e.g. I love earth tones, hate bright yellow…"
              style={{
                width: '100%', padding: '12px 16px',
                background: '#f9f5f0', border: `1.5px solid ${T.border}`,
                borderRadius: '12px', color: T.textPrimary, fontSize: '14px',
                outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
                transition: 'border-color 0.15s',
              }}
              onFocus={e => e.target.style.borderColor = T.accent}
              onBlur={e => e.target.style.borderColor = T.border}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: '#fef2f2', border: '1px solid #fecaca',
            borderRadius: '14px', padding: '14px 18px',
            color: '#ef4444', fontSize: '14px', marginBottom: '20px',
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width: '100%', padding: '18px',
            fontSize: '16px', fontWeight: 900,
            borderRadius: '16px', border: 'none',
            background: canSubmit
              ? `linear-gradient(135deg, ${T.accent}, #c9973e)`
              : '#e8e0d8',
            color: canSubmit ? '#fff' : T.textMuted,
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            boxShadow: canSubmit ? '0 6px 24px rgba(196,97,74,0.35)' : 'none',
            transition: 'all 0.2s',
            letterSpacing: '-0.01em',
          }}
        >
          {!allPhotos
            ? `Upload ${3 - photos.filter(Boolean).length} more photo${3 - photos.filter(Boolean).length !== 1 ? 's' : ''} to continue`
            : !occasions.length
            ? 'Select at least one occasion'
            : !budget
            ? 'Select a budget range'
            : '✦ Analyze My Style'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: T.textMuted, marginTop: '14px' }}>
          Your photos are analyzed instantly and never saved
        </p>
      </div>
    </div>
  )
}
