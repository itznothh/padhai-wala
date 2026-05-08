const BASE = '/api'

// ── Session management ──────────────────────────────────────────────────────

export async function newSession() {
  const res = await fetch(`${BASE}/session`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to create session')
  return res.json()   // expects { session_id: string }
}

export async function resetSession(sessionId) {
  const res = await fetch(`${BASE}/session/${sessionId}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to reset session')
  return res.json()
}

// ── Chat ────────────────────────────────────────────────────────────────────

/**
 * Send a user message to the backend.
 *
 * @param {string} text       - The user's message
 * @param {string} sessionId  - Active session ID
 * @param {string} lang       - Currently selected language: 'English' | 'Hindi' | 'Kannada'
 * @returns {Promise<{ response: string, has_results?: boolean }>}
 */
export async function sendMessage(text, sessionId, lang = 'English') {
  const res = await fetch(`${BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message:    text,
      session_id: sessionId,
      language:   lang,        // ← backend reads this to set response language
    }),
  })
  if (!res.ok) throw new Error(`Chat request failed: ${res.status}`)
  return res.json()   // expects { response: string, has_results?: boolean }
}