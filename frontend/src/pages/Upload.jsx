import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhotoSlot from '../components/PhotoSlot'
import { analyzeStyle } from '../api/client'

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

  async function handleSubmit() {
    if (!canSubmit) return
    setError(null)
    setLoading(true)
    setLoadingStep(0)

    const steps = [
      'Uploading your photos…',
      'Analyzing skin tone & undertones…',
      'Detecting body type & proportions…',
      'Building your color palette…',
      'Crafting outfit recommendations…',
    ]

    const interval = setInterval(() => {
      setLoadingStep(prev => (prev < steps.length - 1 ? prev + 1 : prev))
    }, 2000)

    try {
      const result = await analyzeStyle({
        photo1: photos[0],
        photo2: photos[1],
        photo3: photos[2],
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

  const loadingSteps = [
    'Uploading your photos…',
    'Analyzing skin tone & undertones…',
    'Detecting body type & proportions…',
    'Building your color palette…',
    'Crafting outfit recommendations…',
  ]

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', background: '#080810',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        padding: '24px',
      }}>
        <div style={{
          position: 'fixed', top: '-200px', left: '50%', transform: 'translateX(-50%)',
          width: '700px', height: '500px',
          background: 'radial-gradient(ellipse, rgba(168,85,247,0.2) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', width: '80px', height: '80px', marginBottom: '28px' }}>
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '2px solid rgba(168,85,247,0.15)',
          }} />
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            borderTop: '2px solid #a855f7',
            animation: 'spin 0.9s linear infinite',
          }} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '28px',
          }}>✦</div>
        </div>

        <p style={{ fontSize: '20px', fontWeight: 800, color: '#f1f5f9', margin: '0 0 8px' }}>
          AI is styling you
        </p>
        <p style={{ fontSize: '14px', color: '#a855f7', margin: '0 0 40px', fontWeight: 600 }}>
          {loadingSteps[loadingStep]}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%', maxWidth: '320px' }}>
          {loadingSteps.map((step, i) => (
            <div key={step} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              opacity: i <= loadingStep ? 1 : 0.3,
              transition: 'opacity 0.4s',
            }}>
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                background: i < loadingStep
                  ? 'rgba(52,211,153,0.2)'
                  : i === loadingStep
                  ? 'rgba(168,85,247,0.2)'
                  : 'rgba(255,255,255,0.05)',
                border: `1px solid ${i < loadingStep ? 'rgba(52,211,153,0.5)' : i === loadingStep ? 'rgba(168,85,247,0.5)' : 'rgba(255,255,255,0.1)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '10px',
              }}>
                {i < loadingStep ? '✓' : i === loadingStep ? '●' : ''}
              </div>
              <span style={{
                fontSize: '13px',
                color: i < loadingStep ? '#34d399' : i === loadingStep ? '#c084fc' : '#475569',
                fontWeight: i === loadingStep ? 600 : 400,
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

  return (
    <div style={{
      minHeight: '100vh', background: '#080810',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      position: 'relative',
    }}>
      {/* Glows */}
      <div style={{
        position: 'fixed', top: '-150px', right: '-100px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'fixed', bottom: '-100px', left: '-100px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)',
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
        <div style={{ display: 'flex', gap: '6px' }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{
              width: '24px', height: '4px', borderRadius: '999px',
              background: photos[n - 1] ? '#a855f7' : 'rgba(255,255,255,0.1)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
      </header>

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '36px 20px 60px', position: 'relative', zIndex: 1 }}>

        {/* Title */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#f1f5f9', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Upload Your Photos
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
            3 photos give the AI a complete picture — better photos = better recommendations
          </p>
        </div>

        {/* Photo grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '36px' }}>
          <PhotoSlot
            index={1} label="Front Body" icon="🧍"
            hint="Full length, standing straight, facing camera"
            file={photos[0]} onChange={f => setPhoto(0, f)}
          />
          <PhotoSlot
            index={2} label="Face Closeup" icon="🙂"
            hint="Natural lighting, no heavy filters or makeup"
            file={photos[1]} onChange={f => setPhoto(1, f)}
          />
          <PhotoSlot
            index={3} label="Side Profile" icon="🚶"
            hint="Full length side view, natural posture"
            file={photos[2]} onChange={f => setPhoto(2, f)}
          />
        </div>

        {/* Questions */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '18px', padding: '28px', marginBottom: '28px',
        }}>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#f1f5f9', margin: '0 0 24px', letterSpacing: '-0.01em' }}>
            Quick Questions
          </h2>

          {/* Occasions */}
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', margin: '0 0 12px' }}>
              When do you usually dress up? <span style={{ color: '#ef4444' }}>*</span>
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
                      padding: '8px 16px', borderRadius: '10px', border: 'none',
                      background: active ? 'rgba(168,85,247,0.25)' : 'rgba(255,255,255,0.05)',
                      color: active ? '#e879f9' : '#94a3b8',
                      cursor: 'pointer',
                      outline: active ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(255,255,255,0.08)',
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
          <div style={{ marginBottom: '24px' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', margin: '0 0 12px' }}>
              Budget range <span style={{ color: '#ef4444' }}>*</span>
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Budget', 'Mid-range', 'Premium'].map(b => {
                const active = budget === b
                return (
                  <button
                    key={b}
                    onClick={() => setBudget(b)}
                    style={{
                      fontSize: '13px', fontWeight: 600,
                      padding: '8px 20px', borderRadius: '10px', border: 'none',
                      background: active ? 'rgba(168,85,247,0.25)' : 'rgba(255,255,255,0.05)',
                      color: active ? '#e879f9' : '#94a3b8',
                      cursor: 'pointer',
                      outline: active ? '1px solid rgba(168,85,247,0.5)' : '1px solid rgba(255,255,255,0.08)',
                      transition: 'all 0.15s',
                    }}
                  >
                    {b}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Color preference */}
          <div>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#cbd5e1', margin: '0 0 12px' }}>
              Colors you love or hate <span style={{ color: '#64748b', fontWeight: 400 }}>(optional)</span>
            </p>
            <input
              type="text"
              value={colorPref}
              onChange={e => setColorPref(e.target.value)}
              placeholder="e.g. I love navy and earth tones, hate yellow..."
              style={{
                width: '100%', padding: '12px 16px',
                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '10px', color: '#f1f5f9', fontSize: '14px',
                outline: 'none', fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px', padding: '14px 18px',
            color: '#fca5a5', fontSize: '14px', marginBottom: '20px',
          }}>
            ⚠️ {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          style={{
            width: '100%', padding: '16px',
            fontSize: '16px', fontWeight: 800,
            borderRadius: '14px', border: 'none',
            background: canSubmit
              ? 'linear-gradient(135deg, #a855f7, #ec4899)'
              : 'rgba(255,255,255,0.07)',
            color: canSubmit ? '#fff' : '#475569',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            boxShadow: canSubmit ? '0 0 24px rgba(168,85,247,0.4)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {!allPhotos
            ? `Upload ${3 - photos.filter(Boolean).length} more photo${3 - photos.filter(Boolean).length !== 1 ? 's' : ''}`
            : !occasions.length
            ? 'Select at least one occasion'
            : !budget
            ? 'Select a budget range'
            : '✦ Analyze My Style'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#334155', marginTop: '14px' }}>
          Photos are analyzed instantly and never saved to any server
        </p>
      </div>
    </div>
  )
}
