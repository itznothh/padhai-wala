import { useState, useRef, useEffect, useCallback } from 'react'
import Message from './Message'
import InputBar from './InputBar'
import { sendMessage, newSession, resetSession } from '../api/chat'

const WELCOME = `Namaste! 🙏 I'm Guide — your learning companion.

I'll help you find the **best free schools** for your child — government schools, free schemes, and complete information about the exact documents needed.

Let's start — **how old is your child?**`

export default function Chat({ lang }) {
  const [messages, setMessages]     = useState([{ role: 'assistant', text: WELCOME }])
  const [loading, setLoading]       = useState(false)
  const [sessionId, setSessionId]   = useState('default')
  const [hasResults, setHasResults] = useState(false)
  const [error, setError]           = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    newSession()
      .then(data => setSessionId(data.session_id))
      .catch(() => setSessionId('default-' + Date.now()))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = useCallback(async (text) => {
    setMessages(prev => [...prev, { role: 'user', text, isNew: true }])
    setLoading(true)
    setError(null)
    try {
      const data = await sendMessage(text, sessionId)
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
  }, [sessionId])

  const handleReset = async () => {
    await resetSession(sessionId)
    const data = await newSession()
    setSessionId(data.session_id)
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
