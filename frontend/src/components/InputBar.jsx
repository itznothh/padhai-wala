import { useState, useRef, useEffect } from 'react'

const SUGGESTIONS = [
  'My child is 7 years old',
  'We belong to SC category, what benefits are available?',
  'What is the RTE quota?',
  'Which documents are required?',
]

export default function InputBar({ onSend, disabled }) {
  const [text, setText] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const textareaRef = useRef(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [text])

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
    setShowSuggestions(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div
      className="px-3 pt-2 pb-3 flex-shrink-0"
      style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-dim)' }}
    >
      {/* Quick suggestions */}
      {showSuggestions && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => { setText(s); setShowSuggestions(false); textareaRef.current?.focus() }}
              className="text-xs rounded-full px-3 py-1 transition-all"
              style={{
                background: 'var(--orange-muted)',
                border: '1px solid var(--orange-border)',
                color: 'var(--orange-soft)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(247,97,10,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--orange-muted)'}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div
        className="flex items-end gap-2 rounded-2xl px-3 py-2 transition-all"
        style={{
          background: 'var(--bg-raised)',
          border: '1px solid var(--border-mid)',
        }}
        onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--orange-border)'}
        onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border-mid)'}
      >
        {/* Suggestions toggle */}
        <button
          onClick={() => setShowSuggestions(v => !v)}
          className="flex-shrink-0 mb-0.5 transition-colors"
          style={{ color: showSuggestions ? 'var(--orange-glow)' : 'var(--text-muted)' }}
          title="Quick suggestions"
          aria-label="Quick suggestions"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
          </svg>
        </button>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask your question here..."
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent resize-none outline-none text-sm leading-relaxed py-0.5"
          style={{ color: 'var(--text-primary)', fontFamily: '"DM Sans", sans-serif' }}
        />

        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all mb-0.5"
          style={{
            background: (disabled || !text.trim()) ? 'var(--bg-card)' : 'var(--orange-glow)',
            boxShadow: (disabled || !text.trim()) ? 'none' : '0 0 16px rgba(247,97,10,0.4)',
            opacity: (disabled || !text.trim()) ? 0.4 : 1,
          }}
          aria-label="Send"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>

      <p className="text-center text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>
        PathGuide AI · Free school guidance · AI-powered
      </p>
    </div>
  )
}
