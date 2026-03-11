import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhotoSlot from '../components/PhotoSlot'
import { analyzeStyle } from '../api/client'

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
  border: '#e8e4de',
  shadow: '0 2px 16px rgba(15,14,13,0.06)',
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

  const stepColors = [T.accentLight, T.pastelSage, T.pastelGold, T.pastelLavender, T.accentLight]
  const stepTextColors = [T.accent, T.sageText, T.goldText, T.lavenderText, T.accent]

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

  // Loading screen
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: T.white,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: '24px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Pastel blobs */}
        <div style={{
          position: 'fixed', top: '-80px', right: '-80px',
          width: '400px', height: '400px',
          background: T.accentLight, borderRadius: '50%',
          filter: 'blur(60px)', opacity: 0.6, pointerEvents: 'none',
        }} />
        <div style={{
          position: 'fixed', bottom: '-80px', left: '-80px',
          width: '360px', height: '360px',
          background: T.pastelSage, borderRadius: '50%',
          filter: 'blur(60px)', opacity: 0.5, pointerEvents: 'none',
        }} />

        {/* Spinner */}
        <div style={{ position: 'relative', width: '64px', height: '64px', marginBottom: '32px' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: `2px solid ${T.border}`,
          }} />
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '2px solid transparent',
            borderTop: `2px solid ${T.accent}`,
            animation: 'spin 0.9s linear infinite',
          }} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '22px',
          }}>✦</div>
        </div>

        <p style={{
          fontSize: '28px', fontWeight: 900, color: T.textPrimary,
          margin: '0 0 6px', letterSpacing: '-0.04em',
        }}>
          Styling you…
        </p>
        <p style={{ fontSize: '14px', color: T.accent, margin: '0 0 48px', fontWeight: 700 }}>
          {loadingSteps[loadingStep]}
        </p>

        {/* Step list */}
        <div style={{
          background: T.white, borderRadius: '20px', padding: '24px 28px',
          border: `1px solid ${T.border}`, boxShadow: T.shadow,
          display: 'flex', flexDirection: 'column', gap: '12px',
          width: '100%', maxWidth: '360px',
        }}>
          {loadingSteps.map((step, i) => (
            <div key={step} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              opacity: i <= loadingStep ? 1 : 0.3,
              transition: 'opacity 0.4s',
            }}>
              <div style={{
                width: '24px', height: '24px', borderRadius: '8px', flexShrink: 0,
                background: i <= loadingStep ? stepColors[i] : '#f0ece8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px', fontWeight: 900,
                color: i < loadingStep ? stepTextColors[i] : i === loadingStep ? stepTextColors[i] : T.textMuted,
              }}>
                {i < loadingStep ? '✓' : i === loadingStep ? '●' : ''}
              </div>
              <span style={{
                fontSize: '13px',
                color: i < loadingStep ? stepTextColors[i] : i === loadingStep ? T.textPrimary : T.textMuted,
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
      minHeight: '100vh', background: T.white,
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
            width: '28px', height: '28px', borderRadius: '8px',
            background: T.accent,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: '12px', fontWeight: 900,
          }}>S</div>
          <span style={{ fontSize: '16px', fontWeight: 900, color: T.textPrimary, letterSpacing: '-0.04em' }}>
            Style<span style={{ color: T.accent }}>AI</span>
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '12px', color: T.textMuted, fontWeight: 600 }}>
            {photoCount}/3 photos
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[0, 1, 2].map(n => (
              <div key={n} style={{
                width: '32px', height: '4px', borderRadius: '999px',
                background: photos[n] ? T.accent : T.border,
                transition: 'background 0.3s',
              }} />
            ))}
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Page title */}
        <div style={{ marginBottom: '40px' }}>
          <p style={{
            fontSize: '11px', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.12em', color: T.textMuted, margin: '0 0 8px',
          }}>Step 1</p>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 900,
            color: T.textPrimary, margin: '0 0 8px', letterSpacing: '-0.04em',
          }}>
            Upload Your Photos
          </h1>
          <p style={{ fontSize: '14px', color: T.textSecondary, margin: 0, lineHeight: 1.6 }}>
            3 angles give the AI a complete picture — better photos = better recommendations
          </p>
        </div>

        {/* Photo grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px', marginBottom: '48px',
        }}>
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

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div style={{ flex: 1, height: '1px', background: T.border }} />
          <p style={{
            fontSize: '10px', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '0.12em', color: T.textMuted, margin: 0,
          }}>Step 2 — Quick Questions</p>
          <div style={{ flex: 1, height: '1px', background: T.border }} />
        </div>

        {/* Questions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', marginBottom: '40px' }}>

          {/* Occasions */}
          <div>
            <p style={{ fontSize: '15px', fontWeight: 800, color: T.textPrimary, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              When do you usually dress up?
              <span style={{ color: T.accent }}> *</span>
            </p>
            <p style={{ fontSize: '12px', color: T.textMuted, margin: '0 0 14px' }}>Select all that apply</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {OCCASIONS.map(occ => {
                const active = occasions.includes(occ)
                return (
                  <button
                    key={occ}
                    onClick={() => toggleOccasion(occ)}
                    style={{
                      fontSize: '13px', fontWeight: 700,
                      padding: '10px 20px', borderRadius: '999px',
                      border: active ? `1.5px solid ${T.accent}` : `1.5px solid ${T.border}`,
                      background: active ? T.accentLight : T.white,
                      color: active ? T.accent : T.textSecondary,
                      cursor: 'pointer', transition: 'all 0.15s',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {occ}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Budget */}
          <div>
            <p style={{ fontSize: '15px', fontWeight: 800, color: T.textPrimary, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              Budget range<span style={{ color: T.accent }}> *</span>
            </p>
            <p style={{ fontSize: '12px', color: T.textMuted, margin: '0 0 14px' }}>Choose one</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {[
                { label: 'Budget', sub: 'Affordable picks', bg: T.pastelSage, col: T.sageText },
                { label: 'Mid-range', sub: 'Best of both worlds', bg: T.pastelGold, col: T.goldText },
                { label: 'Premium', sub: 'Investment pieces', bg: T.pastelLavender, col: T.lavenderText },
              ].map(b => {
                const active = budget === b.label
                return (
                  <button
                    key={b.label}
                    onClick={() => setBudget(b.label)}
                    style={{
                      textAlign: 'left',
                      padding: '14px 20px', borderRadius: '16px',
                      border: active ? `2px solid ${T.accent}` : `1.5px solid ${T.border}`,
                      background: active ? b.bg : T.white,
                      cursor: 'pointer', transition: 'all 0.15s',
                      minWidth: '140px',
                    }}
                  >
                    <p style={{ fontSize: '14px', fontWeight: 800, color: active ? b.col : T.textPrimary, margin: '0 0 2px', letterSpacing: '-0.02em' }}>{b.label}</p>
                    <p style={{ fontSize: '11px', color: active ? b.col : T.textMuted, margin: 0, fontWeight: 500 }}>{b.sub}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Color preference */}
          <div>
            <p style={{ fontSize: '15px', fontWeight: 800, color: T.textPrimary, margin: '0 0 4px', letterSpacing: '-0.02em' }}>
              Colors you love or hate
              <span style={{ fontSize: '13px', color: T.textMuted, fontWeight: 400 }}> — optional</span>
            </p>
            <p style={{ fontSize: '12px', color: T.textMuted, margin: '0 0 14px' }}>Free text, be as specific as you like</p>
            <input
              type="text"
              value={colorPref}
              onChange={e => setColorPref(e.target.value)}
              placeholder="e.g. I love earth tones, hate bright yellow…"
              style={{
                width: '100%', padding: '14px 16px',
                background: T.white,
                border: `1.5px solid ${T.border}`,
                borderRadius: '14px', color: T.textPrimary, fontSize: '14px',
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

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width: '100%', padding: '18px',
            fontSize: '16px', fontWeight: 900, letterSpacing: '-0.02em',
            borderRadius: '999px', border: 'none',
            background: canSubmit ? T.accent : T.border,
            color: canSubmit ? '#fff' : T.textMuted,
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            boxShadow: canSubmit ? '0 8px 32px rgba(217,95,59,0.35)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {!allPhotos
            ? `Upload ${3 - photos.filter(Boolean).length} more photo${3 - photos.filter(Boolean).length !== 1 ? 's' : ''} to continue`
            : !occasions.length
            ? 'Select at least one occasion'
            : !budget
            ? 'Select a budget range'
            : '✦ Analyze My Style →'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: T.textMuted, marginTop: '14px' }}>
          Your photos are analyzed instantly and never saved
        </p>
      </div>
    </div>
  )
}
