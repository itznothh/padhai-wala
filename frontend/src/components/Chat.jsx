import { useState, useRef, useEffect, useCallback } from 'react'
import Message from './Message'
import InputBar from './InputBar'
import { sendMessage, newSession, resetSession } from '../api/chat'

const WELCOME = `Namaste! 🙏 Main Saathi hoon — aapka padhai ka dost.

Main aapke bachche ke liye **bilkul free** mein best school dhundhne mein madad karunga — government schools, free schemes, aur exact documents ki poori jaankari.

Pehle mujhe batao — **aapka bachcha kitne saal ka hai?**`

export default function Chat({ lang }) {
  const [messages, setMessages]     = useState([{ role: 'assistant', text: WELCOME }])
  const [loading, setLoading]       = useState(false)
  const [sessionId, setSessionId]   = useState('default')
  const [hasResults, setHasResults] = useState(false)
  const [error, setError]           = useState(null)
  const bottomRef = useRef(null)

  // Init session on mount
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
    } catch (err) {
      setError('Kuch problem aayi. Internet check karein aur dobara try karein.')
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: '⚠️ Sorry, kuch technical issue hua. Please dobara try karein.',
        isNew: true
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
    <div className="flex flex-col flex-1 min-h-0">
      {/* Status bar */}
      {hasResults && (
        <div className="bg-green-50 border-b border-green-100 px-4 py-2 text-xs text-green-700 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
          School options mil gayi! Upar dekho 👆
        </div>
      )}
      {error && (
        <div className="bg-red-50 border-b border-red-100 px-4 py-2 text-xs text-red-600">
          {error}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {messages.map((m, i) => (
          <Message key={i} role={m.role} text={m.text} isNew={m.isNew} />
        ))}
        {loading && <Message role="assistant" loading />}
        <div ref={bottomRef} />
      </div>

      {/* Reset button */}
      {messages.length > 3 && (
        <div className="px-3 pb-1 flex justify-center">
          <button
            onClick={handleReset}
            className="text-xs text-gray-400 hover:text-saffron-500 transition-colors"
          >
            🔄 Nayi baat shuru karein
          </button>
        </div>
      )}

      <InputBar onSend={handleSend} disabled={loading} />
    </div>
  )
}
