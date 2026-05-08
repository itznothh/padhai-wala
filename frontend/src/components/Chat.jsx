import { useState, useRef, useEffect, useCallback } from 'react'
import Message from './Message'
import InputBar from './InputBar'
import { sendMessage, newSession, resetSession } from '../api/chat'

const WELCOME = `Namaste! 🙏 I'm Guide — your learning companion.

I'll help you find the **best free schools** for your child — government schools, free schemes, and complete information about the exact documents needed.

Let's start — **how old is your child?**`

// Confirmation message shown when user switches language
const LANG_SWITCH_MSG = {
  Hindi:   '🌐 ठीक है! अब मैं हिंदी में जवाब दूँगा।',
  English: "🌐 Got it! I'll now respond in English.",
  Kannada: '🌐 ಸರಿ! ಇನ್ನು ಮುಂದೆ ನಾನು ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಿಸುತ್ತೇನೆ.',
}

export default function Chat({ lang }) {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('pg_messages')
      return saved ? JSON.parse(saved) : [{ role: 'assistant', text: WELCOME }]
    } catch {
      return [{ role: 'assistant', text: WELCOME }]
    }
  })
  const [loading, setLoading]       = useState(false)
  const [sessionId, setSessionId]   = useState('default')
  const [hasResults, setHasResults] = useState(false)
  const [error, setError]           = useState(null)
  const bottomRef    = useRef(null)
  const isFirstRender = useRef(true)   // ← tracks initial mount

  // Persist messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pg_messages', JSON.stringify(messages))
    } catch {}
  }, [messages])

  // Create session on mount
  useEffect(() => {
    newSession()
      .then(data => setSessionId(data.session_id))
      .catch(() => setSessionId('default-' + Date.now()))
  }, [])

  // Auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  // Show language-switch confirmation whenever lang changes (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    setMessages(prev => [
      ...prev,
      { role: 'assistant', text: LANG_SWITCH_MSG[lang] ?? LANG_SWITCH_MSG.English, isNew: true },
    ])
  }, [lang])

  // Send user message — passes current lang to backend
  const handleSend = useCallback(async (text) => {
    setMessages(prev => [...prev, { role: 'user', text, isNew: true }])
    setLoading(true)
    setError(null)
    try {
      const data = await sendMessage(text, sessionId, lang)   // ← lang passed here
      setMessages(prev => [...prev, { role: 'assistant', text: data.response, isNew: true }])
      if (data.has_results) setHasResults(true)
    } catch {
      setError('Something went wrong. Please check your internet and try again.')
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: '⚠️ Sorry, a technical issue occurred. Please try again.',
        isNew: true,
      }])
    }
    setLoading(false)
  }, [sessionId, lang])   // ← lang in dependency array

  const handleReset = async () => {
    try { await resetSession(sessionId) } catch {} // non-fatal — continue regardless
    const data = await newSession()
    setSessionId(data.session_id)
    localStorage.removeItem('pg_messages')
    setMessages([{ role: 'assistant', text: WELCOME }])
    setHasResults(false)
    setError(null)
  }

  return (
    <div className="flex flex-col flex-1 min-h-0" style={{ background: 'var(--bg-void)' }}>

      {/* Status banners */}
      {hasResults && (
        <div
          className="px-4 py-2 text-xs flex items-center gap-2 flex-shrink-0"
          style={{ background: 'rgba(74,222,128,0.07)', borderBottom: '1px solid rgba(74,222,128,0.15)', color: '#4ADE80' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
          School options found! Scroll up to see 👆
        </div>
      )}
      {error && (
        <div
          className="px-4 py-2 text-xs flex-shrink-0"
          style={{ background: 'rgba(239,68,68,0.07)', borderBottom: '1px solid rgba(239,68,68,0.15)', color: '#F87171' }}
        >
          {error}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
        {messages.map((m, i) => (
          <Message key={i} role={m.role} text={m.text} isNew={m.isNew} />
        ))}
        {loading && <Message role="assistant" loading />}
        <div ref={bottomRef} />
      </div>

      {/* Reset button */}
      {messages.length > 3 && (
        <div className="px-3 pb-1 flex justify-center flex-shrink-0">
          <button
            onClick={handleReset}
            className="text-xs transition-colors"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--orange-soft)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            🔄 Start a new conversation
          </button>
        </div>
      )}

      <InputBar onSend={handleSend} disabled={loading} />
    </div>
  )
}