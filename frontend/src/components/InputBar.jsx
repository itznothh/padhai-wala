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
    <div className="border-t border-saffron-100 bg-white px-3 pt-2 pb-3 safe-bottom">
      {/* Quick suggestions */}
      {showSuggestions && (
        <div className="flex flex-wrap gap-2 mb-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => { setText(s); setShowSuggestions(false); textareaRef.current?.focus() }}
              className="text-xs bg-saffron-50 text-saffron-700 border border-saffron-200 rounded-full px-3 py-1 hover:bg-saffron-100 transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-end gap-2 bg-gray-50 border border-saffron-200 rounded-2xl px-3 py-2 focus-within:border-saffron-400 transition-colors">
        {/* Suggestions toggle */}
        <button
          onClick={() => setShowSuggestions(v => !v)}
          className="text-saffron-400 hover:text-saffron-600 transition-colors flex-shrink-0 mb-0.5"
          title="Quick suggestions"
          aria-label="Quick suggestions"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          className="flex-1 bg-transparent resize-none outline-none text-sm text-gray-800 placeholder-gray-400 font-body leading-relaxed py-0.5"
        />

        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="flex-shrink-0 w-8 h-8 rounded-xl bg-saffron-500 text-white flex items-center justify-center disabled:opacity-40 hover:bg-saffron-600 active:scale-95 transition-all mb-0.5"
          aria-label="Send"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
          </svg>
        </button>
      </div>

      <p className="text-center text-xs text-gray-400 mt-1.5">
        PathGuide AI · Free school guidance · AI-powered
      </p>
    </div>
  )
}
