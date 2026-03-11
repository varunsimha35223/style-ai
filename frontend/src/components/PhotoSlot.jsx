import { useState, useRef } from 'react'

const T = {
  bg: '#faf7f2',
  white: '#ffffff',
  textPrimary: '#1a1614',
  textSecondary: '#78716c',
  textMuted: '#a8968c',
  accent: '#c4614a',
  accentLight: '#f9ede9',
  border: '#e8e0d8',
  borderHover: 'rgba(196,97,74,0.5)',
  borderActive: '#c4614a',
}

export default function PhotoSlot({ label, hint, icon, index, file, onChange }) {
  const [dragging, setDragging] = useState(false)
  const [hovered, setHovered] = useState(false)
  const inputRef = useRef()

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

  const borderColor = file
    ? T.borderActive
    : dragging
    ? T.borderActive
    : hovered
    ? T.borderHover
    : T.border

  const bg = file
    ? '#fff'
    : dragging
    ? T.accentLight
    : hovered
    ? '#fdf9f7'
    : T.white

  return (
    <div
      onClick={() => !file && inputRef.current?.click()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onDragOver={e => { e.preventDefault(); setDragging(true) }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      style={{
        border: `2px dashed ${borderColor}`,
        borderRadius: '18px',
        background: bg,
        transition: 'all 0.2s ease',
        cursor: file ? 'default' : 'pointer',
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '3/4',
        boxShadow: file ? '0 4px 20px rgba(26,22,20,0.08)' : 'none',
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
              background: 'rgba(26,22,20,0.55)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}>
              <button
                onClick={handleRemove}
                style={{
                  fontSize: '13px', fontWeight: 700,
                  background: '#ef4444', color: '#fff',
                  border: 'none', borderRadius: '10px',
                  padding: '8px 18px', cursor: 'pointer',
                }}
              >
                Remove ✕
              </button>
              <button
                onClick={e => { e.stopPropagation(); inputRef.current?.click() }}
                style={{
                  fontSize: '13px', fontWeight: 700,
                  background: T.accent, color: '#fff',
                  border: 'none', borderRadius: '10px',
                  padding: '8px 18px', cursor: 'pointer',
                }}
              >
                Change Photo
              </button>
            </div>
          )}
          <div style={{
            position: 'absolute', bottom: '10px', left: '10px',
            background: T.accent,
            borderRadius: '8px', padding: '4px 10px',
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
            width: '52px', height: '52px', borderRadius: '14px',
            background: T.accentLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', transition: 'transform 0.2s',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
          }}>
            {icon}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '13px', fontWeight: 800, color: T.textPrimary, margin: '0 0 4px' }}>{label}</p>
            <p style={{ fontSize: '11px', color: T.textMuted, margin: 0, lineHeight: 1.5 }}>{hint}</p>
          </div>
          <p style={{ fontSize: '11px', color: dragging ? T.accent : T.textMuted, fontWeight: dragging ? 700 : 400, margin: 0 }}>
            {dragging ? 'Drop to upload' : 'Click or drag & drop'}
          </p>
          <span style={{
            fontSize: '10px', fontWeight: 700,
            background: T.accentLight, color: T.accent,
            borderRadius: '999px', padding: '3px 10px',
          }}>
            Photo {index} of 3
          </span>
        </div>
      )}
    </div>
  )
}
