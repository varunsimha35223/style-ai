import { useState, useRef } from 'react'

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
    ? 'rgba(168,85,247,0.6)'
    : dragging
    ? 'rgba(168,85,247,0.8)'
    : hovered
    ? 'rgba(168,85,247,0.4)'
    : 'rgba(255,255,255,0.1)'

  const bg = file
    ? 'rgba(168,85,247,0.06)'
    : dragging
    ? 'rgba(168,85,247,0.1)'
    : hovered
    ? 'rgba(255,255,255,0.04)'
    : 'rgba(255,255,255,0.02)'

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
        borderRadius: '16px',
        background: bg,
        transition: 'all 0.2s ease',
        cursor: file ? 'default' : 'pointer',
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '3/4',
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
          {/* Overlay on hover */}
          {hovered && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '10px',
            }}>
              <button
                onClick={handleRemove}
                style={{
                  fontSize: '13px', fontWeight: 700,
                  background: 'rgba(239,68,68,0.9)', color: '#fff',
                  border: 'none', borderRadius: '8px',
                  padding: '8px 18px', cursor: 'pointer',
                }}
              >
                Remove ✕
              </button>
              <button
                onClick={e => { e.stopPropagation(); inputRef.current?.click() }}
                style={{
                  fontSize: '13px', fontWeight: 700,
                  background: 'rgba(168,85,247,0.9)', color: '#fff',
                  border: 'none', borderRadius: '8px',
                  padding: '8px 18px', cursor: 'pointer',
                }}
              >
                Change
              </button>
            </div>
          )}
          {/* Badge */}
          <div style={{
            position: 'absolute', bottom: '10px', left: '10px',
            background: 'rgba(168,85,247,0.9)',
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
            background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px',
          }}>
            {icon}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '13px', fontWeight: 700, color: '#e2e8f0', margin: '0 0 4px' }}>{label}</p>
            <p style={{ fontSize: '11px', color: '#64748b', margin: 0, lineHeight: 1.5 }}>{hint}</p>
          </div>
          <p style={{ fontSize: '11px', color: '#475569', margin: 0 }}>
            {dragging ? 'Drop it!' : 'Click or drag & drop'}
          </p>
          <span style={{
            fontSize: '10px', fontWeight: 600,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: '#94a3b8', borderRadius: '999px', padding: '2px 8px',
          }}>
            Photo {index}
          </span>
        </div>
      )}
    </div>
  )
}
