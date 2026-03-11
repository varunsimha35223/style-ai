import { useState, useRef } from 'react'

const T = {
  white: '#ffffff',
  textPrimary: '#0f0e0d',
  textMuted: '#9a9088',
  accent: '#d95f3b',
  accentLight: '#fce8e1',
  border: '#e8e4de',
}

// Each slot gets a distinct pastel bg for its empty state
const SLOT_PASTELS = [
  { bg: '#fdecc8', icon: '#a06820' },  // gold
  { bg: '#d4ecdf', icon: '#2e7d52' },  // sage
  { bg: '#e8dff8', icon: '#5b3fa6' },  // lavender
]

export default function PhotoSlot({ label, hint, icon, index, file, onChange }) {
  const [dragging, setDragging] = useState(false)
  const [hovered, setHovered] = useState(false)
  const inputRef = useRef()

  const slotIndex = (index - 1) % 3
  const pastel = SLOT_PASTELS[slotIndex]

  const preview = file ? URL.createObjectURL(file) : null

  function handleDrop(e) {
    e.preventDefault()
    setDragging(false)
    const dropped = e.dataTransfer.files[0]
    if (dropped && dropped.type.startsWith('image/')) onChange(dropped)
  }

  function handleFile(e) {
    const picked = e.target.files[0]
    if (picked) onChange(picked)
  }

  function handleRemove(e) {
    e.stopPropagation()
    onChange(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div
      onClick={() => !file && inputRef.current?.click()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        border: file
          ? `2px solid ${T.accent}`
          : dragging
          ? `2px dashed ${T.accent}`
          : `2px dashed ${hovered ? T.accent : T.border}`,
        borderRadius: '20px',
        background: file ? T.white : dragging ? T.accentLight : pastel.bg,
        transition: 'all 0.2s ease',
        cursor: file ? 'default' : 'pointer',
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '3/4',
        boxShadow: file
          ? '0 4px 20px rgba(15,14,13,0.08)'
          : hovered
          ? '0 4px 16px rgba(217,95,59,0.12)'
          : 'none',
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        style={{ display: 'none' }}
        onChange={handleFile}
      />

      {file && preview ? (
        <>
          <img
            src={preview}
            alt={label}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {hovered && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(15,14,13,0.55)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}>
              <button
                onClick={handleRemove}
                style={{
                  fontSize: '13px', fontWeight: 700,
                  background: '#ef4444', color: '#fff',
                  border: 'none', borderRadius: '999px',
                  padding: '8px 20px', cursor: 'pointer',
                }}
              >
                Remove ✕
              </button>
              <button
                onClick={e => { e.stopPropagation(); inputRef.current?.click() }}
                style={{
                  fontSize: '13px', fontWeight: 700,
                  background: T.accent, color: '#fff',
                  border: 'none', borderRadius: '999px',
                  padding: '8px 20px', cursor: 'pointer',
                }}
              >
                Change Photo
              </button>
            </div>
          )}
          <div style={{
            position: 'absolute', bottom: '10px', left: '10px',
            background: T.accent,
            borderRadius: '999px', padding: '4px 12px',
            fontSize: '11px', fontWeight: 700, color: '#fff',
          }}>
            ✓ {label}
          </div>
        </>
      ) : (
        <div style={{
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          height: '100%', padding: '20px', gap: '12px',
        }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'rgba(255,255,255,0.7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '26px', transition: 'transform 0.2s',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}>
            {icon}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '13px', fontWeight: 800, color: T.textPrimary, margin: '0 0 4px', letterSpacing: '-0.02em' }}>{label}</p>
            <p style={{ fontSize: '11px', color: T.textMuted, margin: 0, lineHeight: 1.5 }}>{hint}</p>
          </div>
          <p style={{
            fontSize: '11px', fontWeight: 700,
            color: dragging ? T.accent : T.textMuted,
            margin: 0,
          }}>
            {dragging ? 'Drop to upload' : 'Click or drag & drop'}
          </p>
          <span style={{
            fontSize: '10px', fontWeight: 700,
            background: 'rgba(255,255,255,0.7)',
            color: pastel.icon,
            borderRadius: '999px', padding: '3px 10px',
          }}>
            Photo {index} of 3
          </span>
        </div>
      )}
    </div>
  )
}
